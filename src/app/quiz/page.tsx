// src/app/quiz/page.tsx

// Purpose: Gets every coaster, then hands it to QuizClient to run 
// the intensity-matching quiz

import { db } from '@/lib/db';
import QuizClient from './QuizClient';

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
    design: c.design,
    intensityScore: c.intensityScore,
    inversions: c.inversions,
    heightFt: c.heightFt,
    speedMph: c.speedMph,
  }));

  return (
    <main className="bg-white min-h-full px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-royal mb-3">
          3 Questions
        </p>
        <h1 className="text-5xl mb-10">How Intense Do You Want Your Coaster?</h1>
        <QuizClient coasters={shaped} />
      </div>
    </main>
  );
}