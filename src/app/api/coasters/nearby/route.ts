import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { haversineDistanceMiles } from '@/lib/distance';
import { getParkWaitTimes, findRideWaitTime } from '@/lib/queue-times';

// src/app/api/coasters/nearby/route.ts

// Purpose: Given the user's lat/lng, returns coasters sorted either by
// pure distance ("nearest") or by a blended score of distance + live
// wait time + curated intensity rating ("best")

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = parseFloat(searchParams.get('lat') ?? '');
  const lng = parseFloat(searchParams.get('lng') ?? '');
  const mode = searchParams.get('mode') === 'best' ? 'best' : 'nearest';

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json(
      { error: 'Missing or invalid lat/lng query params' },
      { status: 400 }
    );
  }

  const coasters = await db.coaster.findMany({ include: { park: true } });

  // Attach distance to every coaster
  const withDistance = coasters.map((coaster) => ({
    ...coaster,
    distanceMiles: haversineDistanceMiles(lat, lng, coaster.lat, coaster.lng),
  }));

  if (mode === 'nearest') {
    const sorted = withDistance.sort(
      (a, b) => a.distanceMiles - b.distanceMiles
    );
    return NextResponse.json({ mode, results: shape(sorted) });
  }

  // Mode === 'best'
  // Fetch live wait times once per distinct park (not once per coaster)
  // to avoid hammering the Queue-Times API with redundant calls
  const distinctParkIds = [
    ...new Set(
      coasters
        .map((c) => c.park.queueTimesParkId)
        .filter((id): id is number => id !== null)
    ),
  ];

  const waitTimesByPark = new Map<number, Awaited<ReturnType<typeof getParkWaitTimes>>>();

  await Promise.all(
    distinctParkIds.map(async (parkId) => {
      try {
        const rides = await getParkWaitTimes(parkId);
        waitTimesByPark.set(parkId, rides);
      } catch (error) {
        console.error(`Failed to fetch wait times for park ${parkId}:`, error);
        waitTimesByPark.set(parkId, []);
      }
    })
  );

  const withLiveData = withDistance.map((coaster) => {
    const parkRides = coaster.park.queueTimesParkId
      ? waitTimesByPark.get(coaster.park.queueTimesParkId)
      : undefined;

    const live = coaster.queueTimesRideId
      ? findRideWaitTime(parkRides ?? [], coaster.queueTimesRideId)
      : undefined;

    return {
      ...coaster,
      isOpen: live?.is_open ?? null,
      waitMinutes: live?.wait_time ?? null,
    };
  });

  // Scoring: reward high intensity rating, penalize distance and wait time
  // Closed rides are pushed to the bottom rather than excluded: a rider
  // might still want to know it's there for later
  const scored = withLiveData.map((coaster) => {
    const distancePenalty = coaster.distanceMiles * 2;
    const waitPenalty = (coaster.waitMinutes ?? 20) * 0.5; // Assume 20 min if unknown
    const closedPenalty = coaster.isOpen === false ? 1000 : 0;

    const score =
      coaster.intensityScore * 10 -
      distancePenalty -
      waitPenalty -
      closedPenalty;

    return { ...coaster, score };
  });

  const sorted = scored.sort((a, b) => b.score - a.score);

  return NextResponse.json({ mode, results: shape(sorted) });
}

// Reshape DB rows into a clean response, dropping fields the frontend
// doesn't need (like raw Prisma metadata)
function shape(coasters: any[]) {
  return coasters.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    type: c.type,
    intensityScore: c.intensityScore,
    heightFt: c.heightFt,
    speedMph: c.speedMph,
    distanceMiles: Math.round(c.distanceMiles * 10) / 10,
    isOpen: c.isOpen ?? null,
    waitMinutes: c.waitMinutes ?? null,
    park: { name: c.park.name, slug: c.park.slug },
  }));
}