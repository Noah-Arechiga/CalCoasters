// src/app/coasters/page.tsx

// Purpose: Gets every coaster, then gives it to CoastersClient to handle
// the interactive search/filtering

import { db } from '@/lib/db';
import CoastersClient from './CoastersClient';

export default async function CoastersPage() {
  const coasters = await db.coaster.findMany({
    include: { park: true },
    orderBy: { name: 'asc' },
  });

  const shaped = coasters.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    parkName: c.park.name,
    parkSlug: c.park.slug,
    type: c.type,
    design: c.design,
    imageUrl: c.imageUrl,
    manufacturer: c.manufacturer,
    intensityScore: c.intensityScore,
    heightFt: c.heightFt,
    speedMph: c.speedMph,
    inversions: c.inversions,
  }));

  return (
    <main className="bg-white min-h-full px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-royal mb-3">
          Full Roster
        </p>
        <h1 className="text-5xl mb-2">All SoCal Coasters</h1>
        <p className="font-body text-navy-950/60 mb-8">{coasters.length} coasters tracked</p>
        <CoastersClient coasters={shaped} />
      </div>
    </main>
  );
}