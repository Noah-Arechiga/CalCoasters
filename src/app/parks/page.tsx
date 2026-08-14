import Link from 'next/link';
import { db } from '@/lib/db';
import { getParkWaitTimes } from '@/lib/queue-times';

// src/app/parks/page.tsx

export default async function ParksPage() {
  const parks = await db.park.findMany({
    include: { coasters: true },
    orderBy: { name: 'asc' },
  });

  // Fetch live status for every park in parallel rather than one at a
  // time —> same batching idea as the "best near me" route, just scoped
  // to whichever parks exist
  const parksWithStatus = await Promise.all(
    parks.map(async (park) => {
      if (!park.queueTimesParkId) {
        return { ...park, liveRides: [], fetchFailed: false };
      }
      try {
        const liveRides = await getParkWaitTimes(park.queueTimesParkId);
        return { ...park, liveRides, fetchFailed: false };
      } catch (error) {
        console.error(`Failed to fetch status for ${park.name}:`, error);
        return { ...park, liveRides: [], fetchFailed: true };
      }
    })
  );

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Park Operating Status</h1>
      <p style={{ color: '#666' }}>
        Live snapshot based on how many tracked rides are currently open.
      </p>

      {parksWithStatus.map((park) => {
        const trackedCoasterIds = new Set(
          park.coasters.map((c) => c.queueTimesRideId).filter(Boolean)
        );
        const trackedLiveRides = park.liveRides.filter((r) =>
          trackedCoasterIds.has(r.id)
        );
        const openCount = trackedLiveRides.filter((r) => r.is_open).length;
        const totalCount = park.coasters.length;

        let statusLabel: string;
        let statusColor: string;

        if (park.fetchFailed || !park.queueTimesParkId) {
          statusLabel = 'Status unavailable';
          statusColor = '#999';
        } else if (openCount === 0) {
          statusLabel = 'Likely closed';
          statusColor = '#721c24';
        } else if (openCount === totalCount) {
          statusLabel = 'Fully operating';
          statusColor = '#155724';
        } else {
          statusLabel = 'Partially operating';
          statusColor = '#856404';
        }

        return (
          <div
            key={park.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1.25rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>{park.name}</h2>
              <span style={{ color: statusColor, fontWeight: 700 }}>
                {statusLabel}
              </span>
            </div>
            <p style={{ color: '#666', margin: '0.5rem 0' }}>
              {park.queueTimesParkId
                ? `${openCount} of ${totalCount} tracked coasters open`
                : 'Live data not connected for this park'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {park.coasters.map((coaster) => {
                const live = trackedLiveRides.find(
                  (r) => r.id === coaster.queueTimesRideId
                );
                return (
                  <Link
                    key={coaster.id}
                    href={`/coasters/${coaster.slug}`}
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      background: live?.is_open ? '#d4edda' : '#f8d7da',
                      color: live?.is_open ? '#155724' : '#721c24',
                    }}
                  >
                    {coaster.name}
                    {live?.is_open ? ` · ${live.wait_time}m` : ''}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
}