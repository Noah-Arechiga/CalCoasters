// src/app/map/page.tsx

// Purpose: Gets every coaster's location data and renders the 
// Leaflet map plus the "Nearest Coasters" widget below it

import { db } from '@/lib/db';
import MapPageClient from './MapPageClient';
import NearestCoasters from '@/components/NearestCoasters';

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
    design: c.design,
    heightFt: c.heightFt,
    speedMph: c.speedMph,
    imageUrl: c.imageUrl,
    park: {
      id: c.park.id,
      name: c.park.name,
      slug: c.park.slug,
    },
  }));

  return (
    <main className="bg-white min-h-full px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-royal mb-3">
          Live Map
        </p>
        <h1 className="text-5xl mb-8">SoCal Roller Coaster Map</h1>
        <div className="rounded-xl overflow-hidden border border-steel mb-8">
          <MapPageClient coasters={shaped} />
        </div>
        <NearestCoasters />
      </div>
    </main>
  );
}