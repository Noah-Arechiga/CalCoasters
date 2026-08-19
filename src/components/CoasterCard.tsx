// src/components/CoasterCard.tsx

// Purpose: Single, reusable card showing the key stats of each coaster 
// at a glance, wrapped in a link to that coaster's detail page

import Link from 'next/link';
import CoasterThumb from './CoasterThumb';
import { formatEnumLabel } from '@/lib/format-enum';

interface CoasterCardProps {
  slug: string;
  name: string;
  parkName: string;
  type: string;
  design: string;
  imageUrl?: string | null;
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
  design,
  imageUrl,
  intensityScore,
  heightFt,
  speedMph,
  distanceMiles,
  isOpen,
  waitMinutes,
}: CoasterCardProps) {
  return (
    <Link href={`/coasters/${slug}`} className="card overflow-hidden hover:border-royal transition-colors block p-0">
      <CoasterThumb imageUrl={imageUrl ?? null} name={name} type={type} design={design} className="w-full h-40" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h2 className="text-2xl">{name}</h2>
          {typeof distanceMiles === 'number' && (
            <span className="font-mono text-xs text-navy-950/50 whitespace-nowrap pt-1">{distanceMiles} mi</span>
          )}
        </div>
        <p className="font-body text-sm text-navy-950/60 mb-3">{parkName}</p>

        {isOpen !== undefined && isOpen !== null && (
          <div className="mb-3">
            <span className={isOpen ? 'badge-open' : 'badge-closed'}>
              {isOpen ? `Open · ${waitMinutes} min` : 'Closed'}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wide text-navy-950/70">
          <span>{type}</span>
          {design && <span>{formatEnumLabel(design)}</span>}
          {heightFt && <span>{heightFt} ft</span>}
          {speedMph && <span>{speedMph} mph</span>}
          <span className="text-royal">Intensity {intensityScore}/10</span>
        </div>
      </div>
    </Link>
  );
}