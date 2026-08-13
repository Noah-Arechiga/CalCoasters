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
}

export default function CoasterCard({
  slug,
  name,
  parkName,
  type,
  intensityScore,
  heightFt,
  speedMph,
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
      <h2 style={{ margin: '0 0 0.5rem' }}>{name}</h2>
      <p style={{ margin: '0 0 0.5rem', color: '#666' }}>{parkName}</p>
      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
        <span>Type: {type}</span>
        {heightFt && <span>Height: {heightFt} ft</span>}
        {speedMph && <span>Speed: {speedMph} mph</span>}
        <span>Intensity: {intensityScore}/10</span>
      </div>
    </Link>
  );
}