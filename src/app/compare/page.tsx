import { db } from '@/lib/db';
import CompareClient from './CompareClient';

// src/app/compare/page.tsx

// Purpose: A Server Component pulls everything from Postgres once, 
// reshapes it, and hands it to a Client Component for the interactive part

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
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Compare Coasters</h1>
      <p style={{ color: '#666' }}>Pick 2 or 3 coasters to compare side by side.</p>
      <CompareClient coasters={shaped} />
    </main>
  );
}