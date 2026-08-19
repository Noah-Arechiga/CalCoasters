// src/app/parks/page.tsx

// Purpose:	Gets every SoCal park plus live ride data, and renders each 
// park's open/closed status

import Link from 'next/link';
import { db } from '@/lib/db';
import { getParkWaitTimes } from '@/lib/queue-times';

export default async function ParksPage() {
  const parks = await db.park.findMany({
    include: { coasters: true },
    orderBy: { name: 'asc' },
  });

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
    <main className="bg-white min-h-full px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-royal mb-3">
          Right Now
        </p>
        <h1 className="text-5xl mb-2">Park Operating Status</h1>
        <p className="font-body text-navy-950/60 mb-10">
          Live snapshot based on how many tracked rides are currently open.
        </p>

        <div className="flex flex-col gap-4">
          {parksWithStatus.map((park) => {
            const trackedCoasterIds = new Set(
              park.coasters.map((c) => c.queueTimesRideId).filter(Boolean)
            );
            const trackedLiveRides = park.liveRides.filter((r) => trackedCoasterIds.has(r.id));
            const openCount = trackedLiveRides.filter((r) => r.is_open).length;
            const totalCount = park.coasters.length;

            let statusLabel: string;
            let badgeClass: string;

            if (park.fetchFailed || !park.queueTimesParkId) {
              statusLabel = 'Status unavailable';
              badgeClass = 'badge-unknown';
            } else if (openCount === 0) {
              statusLabel = 'Likely closed';
              badgeClass = 'badge-closed';
            } else if (openCount === totalCount) {
              statusLabel = 'Fully operating';
              badgeClass = 'badge-open';
            } else {
              statusLabel = 'Partially operating';
              badgeClass = 'badge-unknown';
            }

            return (
              <div key={park.id} className="card">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <h2 className="text-3xl">{park.name}</h2>
                  <span className={badgeClass}>{statusLabel}</span>
                </div>
                <p className="font-body text-sm text-navy-950/60 mb-4">
                  {park.queueTimesParkId
                    ? `${openCount} of ${totalCount} tracked coasters open`
                    : 'Live data not connected for this park'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {park.coasters.map((coaster) => {
                    const live = trackedLiveRides.find((r) => r.id === coaster.queueTimesRideId);
                    return (
                      <Link
                        key={coaster.id}
                        href={`/coasters/${coaster.slug}`}
                        className={live?.is_open ? 'badge-open' : 'badge-closed'}
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
        </div>
      </div>
    </main>
  );
}