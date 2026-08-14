import { db } from '@/lib/db';
import MapPageClient from './MapPageClient';

// src/app/map/page.tsx

// Purpose: This is a Server Component, it runs on the server, queries 
// Postgres directly via Prisma (no API route needed, since the page 
// itself runs server-side), reshapes the data to match CoasterMapData, then 
// hands it off to the client wrapper to render

export default async function MapPage() {
  const coasters = await db.coaster.findMany({
    include: { park: true },
  });

  const shaped = coasters.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    lat: c.lat,
    lng: c.lng,
    intensityScore: c.intensityScore,
    type: c.type,
    heightFt: c.heightFt,
    speedMph: c.speedMph,
    park: {
      id: c.park.id,
      name: c.park.name,
      slug: c.park.slug,
    },
  }));

  return (
    <main style={{ padding: '2rem' }}>
      <h1>SoCal Roller Coaster Map</h1>
      <MapPageClient coasters={shaped} />
    </main>
  );
}