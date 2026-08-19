'use client';

import { useState } from 'react';
import Link from 'next/link';
import { rankCoasters, type QuizAnswers } from '@/lib/quiz-scoring';

// src/app/quiz/QuizClient.tsx

// Purpose: Walks through the 3 quiz questions, tracks answers, and renders
// the top 5 ranked results once complete

interface QuizCoaster {
  id: string;
  name: string;
  slug: string;
  parkName: string;
  type: string;
  design: string;
  intensityScore: number;
  inversions: number;
  heightFt: number | null;
  speedMph: number | null;
}

const INTENSITY_OPTIONS = [
  { label: 'Mild — I just want the view', value: 3 },
  { label: 'Moderate — Some thrills are fine', value: 5 },
  { label: 'Intense — Bring on the drops', value: 7 },
  { label: 'Extreme — I want to scream', value: 10 },
];

export default function QuizClient({ coasters }: { coasters: QuizCoaster[] }) {
  const [step, setStep] = useState(0);
  const [targetIntensity, setTargetIntensity] = useState<number | null>(null);
  const [inversionPref, setInversionPref] = useState<QuizAnswers['inversionPref'] | null>(null);
  const [heightPref, setHeightPref] = useState<QuizAnswers['heightPref'] | null>(null);

  const isComplete = targetIntensity !== null && inversionPref !== null && heightPref !== null;

  function restart() {
    setStep(0);
    setTargetIntensity(null);
    setInversionPref(null);
    setHeightPref(null);
  }

  if (isComplete) {
    const results = rankCoasters(coasters, { targetIntensity, inversionPref, heightPref }).slice(0, 5);

    return (
      <div>
        <h2 className="text-3xl mb-6">Your Top Matches</h2>
        {results.map((coaster, i) => (
          <Link key={coaster.id} href={`/coasters/${coaster.slug}`} className="card hover:border-royal transition-colors block mb-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-2xl">
                <span className="text-royal">#{i + 1}</span> {coaster.name}
              </h3>
              <span className="font-mono text-sm font-bold text-royal">{coaster.matchPercent}% match</span>
            </div>
            <p className="font-body text-sm text-navy-950/60 mb-2">{coaster.parkName}</p>
            <p className="font-mono text-xs uppercase tracking-wide text-navy-950/70">
              Intensity {coaster.intensityScore}/10 · {coaster.inversions} inversions
              {coaster.heightFt && ` · ${coaster.heightFt} ft`}
            </p>
          </Link>
        ))}
        <button onClick={restart} className="btn-outline-dark mt-2">
          Retake Quiz
        </button>
      </div>
    );
  }

  const questions = [
    {
      prompt: 'How intense do you want your coaster?',
      render: () => (
        <div className="grid gap-3">
          {INTENSITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setTargetIntensity(opt.value);
                setStep(1);
              }}
              className="card text-left hover:border-royal transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      prompt: 'How do you feel about loops and inversions?',
      render: () => (
        <div className="grid gap-3">
          <button onClick={() => { setInversionPref('none'); setStep(2); }} className="card text-left hover:border-royal transition-colors">
            No thanks, keep me right-side up
          </button>
          <button onClick={() => { setInversionPref('some'); setStep(2); }} className="card text-left hover:border-royal transition-colors">
            A few are fine
          </button>
          <button onClick={() => { setInversionPref('love'); setStep(2); }} className="card text-left hover:border-royal transition-colors">
            The more the better
          </button>
        </div>
      ),
    },
    {
      prompt: 'Do you like big heights and drops, or keep it lower to the ground?',
      render: () => (
        <div className="grid gap-3">
          <button onClick={() => setHeightPref('low')} className="card text-left hover:border-royal transition-colors">
            Keep it low
          </button>
          <button onClick={() => setHeightPref('no-preference')} className="card text-left hover:border-royal transition-colors">
            Doesn't matter to me
          </button>
          <button onClick={() => setHeightPref('high')} className="card text-left hover:border-royal transition-colors">
            Go big or go home
          </button>
        </div>
      ),
    },
  ];

  const current = questions[step];

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wide text-navy-950/50 mb-2">
        Question {step + 1} of {questions.length}
      </p>
      <h2 className="text-3xl mb-6">{current.prompt}</h2>
      {current.render()}
    </div>
  );
}