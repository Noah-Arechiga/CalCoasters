import { db } from '@/lib/db';
import QuizClient from './QuizClient';

// src/app/quiz/page.tsx

export default async function QuizPage() {
  const coasters = await db.coaster.findMany({
    include: { park: true },
  });

  const shaped = coasters.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    parkName: c.park.name,
    type: c.type,
    intensityScore: c.intensityScore,
    inversions: c.inversions,
    heightFt: c.heightFt,
    speedMph: c.speedMph,
  }));

  return (
    <main style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1>How Intense Do YOU Want Your Coaster?</h1>
      <QuizClient coasters={shaped} />
    </main>
  );
}