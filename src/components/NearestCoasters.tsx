'use client';

import { useState } from 'react';
import Link from 'next/link';
import CoasterThumb from './CoasterThumb';

// src/components/NearestCoaster.tsx

// Purpose: Triggers browser geolocation on click and renders the 5 nearest
// coasters once location is granted

interface NearbyCoaster {
  id: string;
  name: string;
  slug: string;
  type: string;
  design: string;
  imageUrl: string | null;
  intensityScore: number;
  distanceMiles: number;
  park: { name: string; slug: string };
}

export default function NearestCoasters() {
  const [results, setResults] = useState<NearbyCoaster[]>([]);
  const [status, setStatus] = useState<'idle' | 'locating' | 'loading' | 'error' | 'done'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function findNearest() {
    setStatus('locating');
    setErrorMessage('');

    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setStatus('loading');
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`/api/coasters/nearby?lat=${latitude}&lng=${longitude}&limit=5`);
          if (!res.ok) throw new Error('Request failed');
          const data = await res.json();
          setResults(data.results);
          setStatus('done');
        } catch {
          setStatus('error');
          setErrorMessage('Failed to load nearby coasters. Please try again.');
        }
      },
      (geoError) => {
        setStatus('error');
        setErrorMessage(
          geoError.code === geoError.PERMISSION_DENIED
            ? 'Location access was denied. Please enable it to use this feature.'
            : 'Could not determine your location.'
        );
      }
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-3xl">Nearest Coasters</h2>
        <button onClick={findNearest} className="btn-primary">
          {status === 'idle' ? 'Find Near Me' : 'Refresh'}
        </button>
      </div>

      {status === 'locating' && <p className="font-mono text-sm text-navy-950/60">Getting your location…</p>}
      {status === 'loading' && <p className="font-mono text-sm text-navy-950/60">Finding coasters…</p>}
      {status === 'error' && <p className="font-mono text-sm text-[#8A2323]">{errorMessage}</p>}

      {status === 'done' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {results.map((coaster) => (
            <Link
              key={coaster.id}
              href={`/coasters/${coaster.slug}`}
              className="border border-steel rounded-xl overflow-hidden hover:border-royal transition-colors block"
            >
              <CoasterThumb
                imageUrl={coaster.imageUrl}
                name={coaster.name}
                type={coaster.type}
                design={coaster.design}
                className="w-full h-24"
              />
              <div className="p-3">
                <p className="font-body text-sm font-semibold truncate">{coaster.name}</p>
                <p className="font-mono text-xs text-navy-950/50">{coaster.distanceMiles} mi</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}