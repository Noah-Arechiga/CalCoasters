// src/app/coasters/[slug]/page.tsx

// Purpose: Looks up one coaster by its slug Fetches live wait 
// time the same way API route does, but directly, 
// since this page already runs on the server

import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { getParkWaitTimes, findRideWaitTime } from '@/lib/queue-times';

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

  // Fetch live status directly here, same pattern as API route
  // this page is itself a server-side component, so it can call the
  // Queue-Times helper directly without needing to hit API route
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
    <main style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1>{coaster.name}</h1>
      <p style={{ color: '#666' }}>{coaster.park.name}</p>

      {isOpen !== null && (
        <div
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            background: isOpen ? '#d4edda' : '#f8d7da',
            color: isOpen ? '#155724' : '#721c24',
            marginBottom: '1.5rem',
          }}
        >
          {isOpen ? `Open — ${waitMinutes} min wait` : 'Closed'}
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <StatRow label="Type" value={coaster.type} />
          <StatRow label="Manufacturer" value={coaster.manufacturer ?? '—'} />
          <StatRow
            label="Height"
            value={coaster.heightFt ? `${coaster.heightFt} ft` : '—'}
          />
          <StatRow
            label="Drop"
            value={coaster.dropFt ? `${coaster.dropFt} ft` : '—'}
          />
          <StatRow
            label="Speed"
            value={coaster.speedMph ? `${coaster.speedMph} mph` : '—'}
          />
          <StatRow label="Inversions" value={String(coaster.inversions)} />
          <StatRow
            label="Duration"
            value={
              coaster.durationSec
                ? `${Math.floor(coaster.durationSec / 60)}:${String(
                    coaster.durationSec % 60
                  ).padStart(2, '0')}`
                : '—'
            }
          />
          <StatRow
            label="Intensity"
            value={`${coaster.intensityScore} / 10`}
          />
          <StatRow label="Opened" value={String(coaster.openedYear ?? '—')} />
        </tbody>
      </table>
    </main>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <tr style={{ borderBottom: '1px solid #eee' }}>
      <td style={{ padding: '0.5rem 0', color: '#666' }}>{label}</td>
      <td style={{ padding: '0.5rem 0', fontWeight: 600 }}>{value}</td>
    </tr>
  );
}