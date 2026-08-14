'use client';

import { useState } from 'react';
import CoasterCard from '@/components/CoasterCard';

// src/app/near-me/page.tsx

// Purpose: a Client Component (needs 'use client' because it uses browser
// APIs and React state). Once location is granted, it calls 
// /api/coasters/nearby route with the coordinates and chosen mode, 
// then renders results using the updated CoasterCard

interface NearbyCoaster {
  id: string;
  name: string;
  slug: string;
  type: string;
  intensityScore: number;
  heightFt: number | null;
  speedMph: number | null;
  distanceMiles: number;
  isOpen: boolean | null;
  waitMinutes: number | null;
  park: { name: string; slug: string };
}

export default function NearMePage() {
  const [mode, setMode] = useState<'nearest' | 'best'>('nearest');
  const [results, setResults] = useState<NearbyCoaster[]>([]);
  const [status, setStatus] = useState<
    'idle' | 'locating' | 'loading' | 'error' | 'done'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function findCoasters(selectedMode: 'nearest' | 'best') {
    setMode(selectedMode);
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
          const res = await fetch(
            `/api/coasters/nearby?lat=${latitude}&lng=${longitude}&mode=${selectedMode}`
          );
          if (!res.ok) throw new Error('Request failed');
          const data = await res.json();
          setResults(data.results);
          setStatus('done');
        } catch (error) {
          console.error(error);
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
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Find a Coaster Near You</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button onClick={() => findCoasters('nearest')} style={buttonStyle}>
          Nearest Coaster
        </button>
        <button onClick={() => findCoasters('best')} style={buttonStyle}>
          Best Coaster Near Me
        </button>
      </div>

      {status === 'locating' && <p>Getting your location...</p>}
      {status === 'loading' && <p>Finding coasters...</p>}
      {status === 'error' && <p style={{ color: '#721c24' }}>{errorMessage}</p>}

      {status === 'done' && (
        <>
          <p style={{ color: '#666' }}>
            Showing results by {mode === 'nearest' ? 'distance' : 'best match'}
          </p>
          {results.map((coaster) => (
            <CoasterCard
              key={coaster.id}
              slug={coaster.slug}
              name={coaster.name}
              parkName={coaster.park.name}
              type={coaster.type}
              intensityScore={coaster.intensityScore}
              heightFt={coaster.heightFt}
              speedMph={coaster.speedMph}
              distanceMiles={coaster.distanceMiles}
              isOpen={coaster.isOpen}
              waitMinutes={coaster.waitMinutes}
            />
          ))}
        </>
      )}
    </main>
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
};