// src/components/FeaturedCoaster.tsx

// Purpose: Highlights a randomly featured SoCal coaster on the homepage

import Link from 'next/link';
import CoasterThumb from './CoasterThumb';

interface FeaturedCoasterData {
  slug: string;
  name: string;
  parkName: string;
  type: string;
  design: string;
  imageUrl: string | null;
  heightFt: number | null;
  speedMph: number | null;
  intensityScore: number;
}

export default function FeaturedCoaster({ coaster }: { coaster: FeaturedCoasterData }) {
  return (
    <Link
      href={`/coasters/${coaster.slug}`}
      className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-0 rounded-2xl overflow-hidden border border-steel hover:border-royal transition-colors group"
    >
      <CoasterThumb
        imageUrl={coaster.imageUrl}
        name={coaster.name}
        type={coaster.type}
        design={coaster.design}
        className="w-full h-40 sm:h-full"
      />
      <div className="p-6 flex flex-col justify-center">
        <p className="font-mono text-xs uppercase tracking-widest text-royal mb-2">
          Coaster of the Day
        </p>
        <h2 className="text-4xl mb-1 group-hover:text-royal transition-colors">{coaster.name}</h2>
        <p className="font-body text-sm text-navy-950/60 mb-3">{coaster.parkName}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wide text-navy-950/70">
          {coaster.heightFt && <span>{coaster.heightFt} ft</span>}
          {coaster.speedMph && <span>{coaster.speedMph} mph</span>}
          <span className="text-royal">Intensity {coaster.intensityScore}/10</span>
        </div>
      </div>
    </Link>
  );
}