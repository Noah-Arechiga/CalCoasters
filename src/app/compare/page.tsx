// src/app/compare/page.tsx

// Purpose: Gets every coaster, then hands it to CompareClient to handle 
// the interactive comparison tool

import { db } from '@/lib/db';
import CompareClient from './CompareClient';

export default async function ComparePage() {
  const coasters = await db.coaster.findMany({
    include: { park: true },
    orderBy: { name: 'asc' },
  });

  const shaped = coasters.map((c) => ({
    id: c.id,
    name: c.name,
    parkName: c.park.name,
    type: c.type,
    design: c.design,
    imageUrl: c.imageUrl,
    manufacturer: c.manufacturer,
    heightFt: c.heightFt,
    dropFt: c.dropFt,
    speedMph: c.speedMph,
    inversions: c.inversions,
    durationSec: c.durationSec,
    intensityScore: c.intensityScore,
    openedYear: c.openedYear,
  }));

  return (
    <main className="bg-white min-h-full px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-royal mb-3">Head to Head</p>
        <h1 className="text-5xl mb-2">Compare Coasters</h1>
        <p className="font-body text-navy-950/60 mb-10">Search for 2 or 3 coasters to compare side by side.</p>
        <CompareClient coasters={shaped} />
      </div>
    </main>
  );
}