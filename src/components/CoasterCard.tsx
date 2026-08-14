// src/components/CoasterCard.tsx

// Purpose: Single, reusable card showing the key stats at a glance, wrapped in a 
// link to that coaster's detail page. Keeping this as its own component 
// means the list page and (later) search/filter results can all reuse it 
// without duplicating markup

import Link from 'next/link';

interface CoasterCardProps {
  slug: string;
  name: string;
  parkName: string;
  type: string;
  intensityScore: number;
  heightFt: number | null;
  speedMph: number | null;
  distanceMiles?: number;
  isOpen?: boolean | null;
  waitMinutes?: number | null;
}

export default function CoasterCard({
  slug,
  name,
  parkName,
  type,
  intensityScore,
  heightFt,
  speedMph,
  distanceMiles,
  isOpen,
  waitMinutes,
}: CoasterCardProps) {
  return (
    <Link
      href={`/coasters/${slug}`}
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
        <h2 style={{ margin: '0 0 0.5rem' }}>{name}</h2>
        {typeof distanceMiles === 'number' && (
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {distanceMiles} mi
          </span>
        )}
      </div>
      <p style={{ margin: '0 0 0.5rem', color: '#666' }}>{parkName}</p>

      {isOpen !== undefined && isOpen !== null && (
        <span
          style={{
            display: 'inline-block',
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            background: isOpen ? '#d4edda' : '#f8d7da',
            color: isOpen ? '#155724' : '#721c24',
            marginBottom: '0.5rem',
          }}
        >
          {isOpen ? `Open — ${waitMinutes} min wait` : 'Closed'}
        </span>
      )}

      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
        <span>Type: {type}</span>
        {heightFt && <span>Height: {heightFt} ft</span>}
        {speedMph && <span>Speed: {speedMph} mph</span>}
        <span>Intensity: {intensityScore}/10</span>
      </div>
    </Link>
  );
}