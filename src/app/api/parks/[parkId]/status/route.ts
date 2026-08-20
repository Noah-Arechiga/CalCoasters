// src/app/api/parks/[parkId]/status/route.ts

// Purpose: Backend endpoint. The frontend calls this route
// (e.g. /api/parks/abc123/status), and this route does the work of:
//   1. Looking up the park + its coasters in our database
//   2. Fetching live wait times from Queue-Times.com
//   3. Merging the two together into one clean response

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getParkWaitTimes, findRideWaitTime, type QueueTimesRide } from '@/lib/queue-times';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ parkId: string }> }
) {
  const { parkId } = await params;

  const park = await db.park.findUnique({
    where: { id: parkId },
    include: { coasters: true },
  });

  if (!park) {
    return NextResponse.json({ error: 'Park not found' }, { status: 404 });
  }

  // If this park isn't linked to Queue-Times, just return static data
  if (!park.queueTimesParkId) {
    return NextResponse.json({
      park: { id: park.id, name: park.name, slug: park.slug },
      coasters: park.coasters.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        isOpen: null,
        waitMinutes: null,
      })),
    });
  }

  let liveRides: QueueTimesRide[];
  try {
    liveRides = await getParkWaitTimes(park.queueTimesParkId);
  } catch (error) {
    console.error('Failed to fetch Queue-Times data:', error);
    liveRides = []; // fall back gracefully to "unknown" status per ride
  }

  const coastersWithStatus = park.coasters.map((coaster) => {
    const live = coaster.queueTimesRideId
      ? findRideWaitTime(liveRides, coaster.queueTimesRideId)
      : undefined;

    return {
      id: coaster.id,
      name: coaster.name,
      slug: coaster.slug,
      isOpen: live?.is_open ?? null,
      waitMinutes: live?.wait_time ?? null,
      lastUpdated: live?.last_updated ?? null,
    };
  });

  return NextResponse.json({
    park: { id: park.id, name: park.name, slug: park.slug },
    coasters: coastersWithStatus,
  });
}