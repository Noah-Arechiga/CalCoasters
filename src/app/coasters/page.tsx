// src/app/coasters/page.tsx

// Purpose: Server Component that queries every coaster from Postgres 
// (with its park attached via include), sorted alphabetically, and 
// renders one CoasterCard per result

import { db } from '@/lib/db';
import CoasterCard from '@/components/CoasterCard';

export default async function CoastersPage() {
  const coasters = await db.coaster.findMany({
    include: { park: true },
    orderBy: { name: 'asc' },
  });

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>All SoCal Coasters</h1>
      <p style={{ color: '#666' }}>{coasters.length} coasters tracked</p>

      {coasters.map((coaster) => (
        <CoasterCard
          key={coaster.id}
          slug={coaster.slug}
          name={coaster.name}
          parkName={coaster.park.name}
          type={coaster.type}
          intensityScore={coaster.intensityScore}
          heightFt={coaster.heightFt}
          speedMph={coaster.speedMph}
        />
      ))}
    </main>
  );
}