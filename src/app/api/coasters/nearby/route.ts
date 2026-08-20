// src/app/api/coasters/nearby/route.ts

// Purpose: Given the user's lat/lng, returns coasters sorted by
// the nearest location to the user

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { haversineDistanceMiles } from '@/lib/distance';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = parseFloat(searchParams.get('lat') ?? '');
  const lng = parseFloat(searchParams.get('lng') ?? '');
  const limit = parseInt(searchParams.get('limit') ?? '5', 10);

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json(
      { error: 'Missing or invalid lat/lng query params' },
      { status: 400 }
    );
  }

  const coasters = await db.coaster.findMany({ include: { park: true } });

  const results = coasters
    .map((coaster) => ({
      id: coaster.id,
      name: coaster.name,
      slug: coaster.slug,
      type: coaster.type,
      design: coaster.design,
      imageUrl: coaster.imageUrl,
      intensityScore: coaster.intensityScore,
      distanceMiles:
        Math.round(haversineDistanceMiles(lat, lng, coaster.lat, coaster.lng) * 10) / 10,
      park: { name: coaster.park.name, slug: coaster.park.slug },
    }))
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, limit);

  return NextResponse.json({ results });
}