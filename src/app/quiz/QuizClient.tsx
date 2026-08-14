'use client';

import { useState } from 'react';
import Link from 'next/link';
import { rankCoasters, type QuizAnswers } from '@/lib/quiz-scoring';

// src/app/quiz/QuizClient.tsx

// Purpose: Once 3 questions are answered, instead of rendering a question
// it calls rankCoasters and shows the top 3 with a match percentage,
// linked to each coaster's detail page.

interface QuizCoaster {
  id: string;
  name: string;
  slug: string;
  parkName: string;
  type: string;
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
  const [inversionPref, setInversionPref] = useState<
    QuizAnswers['inversionPref'] | null
  >(null);
  const [heightPref, setHeightPref] = useState<
    QuizAnswers['heightPref'] | null
  >(null);

  const isComplete =
    targetIntensity !== null && inversionPref !== null && heightPref !== null;

  function restart() {
    setStep(0);
    setTargetIntensity(null);
    setInversionPref(null);
    setHeightPref(null);
  }

  if (isComplete) {
    const results = rankCoasters(coasters, {
      targetIntensity,
      inversionPref,
      heightPref,
    }).slice(0, 3);

    return (
      <div>
        <h2>Your Top Matches</h2>
        {results.map((coaster, i) => (
          <Link
            key={coaster.id}
            href={`/coasters/${coaster.slug}`}
            style={{
              display: 'block',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>
                #{i + 1} {coaster.name}
              </h3>
              <span style={{ color: '#155724', fontWeight: 700 }}>
                {coaster.matchPercent}% match
              </span>
            </div>
            <p style={{ color: '#666', margin: '0.3rem 0' }}>
              {coaster.parkName}
            </p>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>
              Intensity {coaster.intensityScore}/10 · {coaster.inversions}{' '}
              inversions
              {coaster.heightFt && ` · ${coaster.heightFt} ft`}
            </p>
          </Link>
        ))}
        <button onClick={restart} style={buttonStyle}>
          Retake Quiz
        </button>
      </div>
    );
  }

  // Question flow
  const questions = [
    {
      prompt: 'How intense do you want your coaster?',
      render: () => (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {INTENSITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setTargetIntensity(opt.value);
                setStep(1);
              }}
              style={optionButtonStyle}
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
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <button
            onClick={() => {
              setInversionPref('none');
              setStep(2);
            }}
            style={optionButtonStyle}
          >
            No thanks, keep me right-side up
          </button>
          <button
            onClick={() => {
              setInversionPref('some');
              setStep(2);
            }}
            style={optionButtonStyle}
          >
            A few are fine
          </button>
          <button
            onClick={() => {
              setInversionPref('love');
              setStep(2);
            }}
            style={optionButtonStyle}
          >
            The more the better
          </button>
        </div>
      ),
    },
    {
      prompt: 'Big heights and drops, or keep it lower to the ground?',
      render: () => (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <button
            onClick={() => setHeightPref('low')}
            style={optionButtonStyle}
          >
            Keep it low
          </button>
          <button
            onClick={() => setHeightPref('no-preference')}
            style={optionButtonStyle}
          >
            Doesn't matter to me
          </button>
          <button
            onClick={() => setHeightPref('high')}
            style={optionButtonStyle}
          >
            Go big
          </button>
        </div>
      ),
    },
  ];

  const current = questions[step];

  return (
    <div>
      <p style={{ color: '#666' }}>
        Question {step + 1} of {questions.length}
      </p>
      <h2>{current.prompt}</h2>
      {current.render()}
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  border: '1px solid #333',
  background: '#333',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem',
  marginTop: '1rem',
};

const optionButtonStyle: React.CSSProperties = {
  padding: '1rem',
  borderRadius: '6px',
  border: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
  fontSize: '1rem',
  textAlign: 'left',
};