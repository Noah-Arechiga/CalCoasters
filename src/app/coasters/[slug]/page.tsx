// src/app/coasters/[slug]/page.tsx

// Purpose: Gets one specific coaster by its URL slug, plus its live wait time,
// and renders the detail page with image and stats/specs

import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { getParkWaitTimes, findRideWaitTime } from '@/lib/queue-times';
import CoasterThumb from '@/components/CoasterThumb';
import { formatEnumLabel } from '@/lib/format-enum';

export default async function CoasterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const coaster = await db.coaster.findUnique({
    where: { slug },
    include: { park: true },
  });

  if (!coaster) {
    notFound();
  }

  let isOpen: boolean | null = null;
  let waitMinutes: number | null = null;

  if (coaster.park.queueTimesParkId && coaster.queueTimesRideId) {
    try {
      const liveRides = await getParkWaitTimes(coaster.park.queueTimesParkId);
      const live = findRideWaitTime(liveRides, coaster.queueTimesRideId);
      if (live) {
        isOpen = live.is_open;
        waitMinutes = live.wait_time;
      }
    } catch (error) {
      console.error('Failed to fetch live status:', error);
    }
  }

  return (
    <main className="bg-white min-h-full px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-royal mb-3">
          {coaster.park.name}
        </p>
        <h1 className="text-6xl mb-4">{coaster.name}</h1>

        {isOpen !== null && (
          <div className="mb-6">
            <span className={isOpen ? 'badge-open' : 'badge-closed'}>
              {isOpen ? `Open · ${waitMinutes} min wait` : 'Closed'}
            </span>
          </div>
        )}

        <div className="rounded-2xl overflow-hidden border border-steel mb-8">
          <CoasterThumb
            imageUrl={coaster.imageUrl}
            name={coaster.name}
            type={coaster.type}
            design={coaster.design}
            className="w-full h-64 sm:h-80"
          />
        </div>

        <div className="card">
          <StatRow label="Type" value={coaster.type} />
          <StatRow label="Design" value={formatEnumLabel(coaster.design)} />
          <StatRow label="Manufacturer" value={coaster.manufacturer ?? '—'} />
          <StatRow label="Height" value={coaster.heightFt ? `${coaster.heightFt} ft` : '—'} />
          <StatRow label="Drop" value={coaster.dropFt ? `${coaster.dropFt} ft` : '—'} />
          <StatRow label="Speed" value={coaster.speedMph ? `${coaster.speedMph} mph` : '—'} />
          <StatRow label="Inversions" value={String(coaster.inversions)} />
          <StatRow
            label="Duration"
            value={
              coaster.durationSec
                ? `${Math.floor(coaster.durationSec / 60)}:${String(coaster.durationSec % 60).padStart(2, '0')}`
                : '—'
            }
          />
          <StatRow label="Intensity" value={`${coaster.intensityScore} / 10`} highlight />
          <StatRow label="Opened" value={String(coaster.openedYear ?? '—')} last />
        </div>
      </div>
    </main>
  );
}

function StatRow({
  label,
  value,
  highlight = false,
  last = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between py-3 ${last ? '' : 'border-b border-steel'}`}>
      <span className="font-body text-sm text-navy-950/60">{label}</span>
      <span className={`font-mono text-sm font-semibold ${highlight ? 'text-royal' : 'text-navy-950'}`}>
        {value}
      </span>
    </div>
  );
}