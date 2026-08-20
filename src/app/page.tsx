// src/app/page.tsx

// Purpose: Homepage -> fetches every coaster + live wait times, picks 
// the daily featured coaster, renders the hero, departure board, and feature grid

import Link from 'next/link';
import { db } from '@/lib/db';
import { getParkWaitTimes, findRideWaitTime } from '@/lib/queue-times';
import DepartureBoard from '@/components/DepartureBoard';
import FeaturedCoaster from '@/components/FeaturedCoaster';

// Picks a stable coaster for "today," same pick for everyone, all day,
// and it rotates automatically at midnight without needing a database field
function pickCoasterOfTheDay<T>(coasters: T[]): T {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return coasters[dayOfYear % coasters.length];
}

export default async function HomePage() {
  const coasters = await db.coaster.findMany({
    include: { park: true },
    orderBy: { name: 'asc' },
  });

  const distinctParkIds = [
    ...new Set(
      coasters.map((c) => c.park.queueTimesParkId).filter((id): id is number => id !== null)
    ),
  ];

  const waitTimesByPark = new Map<number, Awaited<ReturnType<typeof getParkWaitTimes>>>();
  await Promise.all(
    distinctParkIds.map(async (parkId) => {
      try {
        waitTimesByPark.set(parkId, await getParkWaitTimes(parkId));
      } catch {
        waitTimesByPark.set(parkId, []);
      }
    })
  );

  const boardRows = coasters.map((c) => {
    const parkRides = c.park.queueTimesParkId ? waitTimesByPark.get(c.park.queueTimesParkId) : undefined;
    const live = c.queueTimesRideId ? findRideWaitTime(parkRides ?? [], c.queueTimesRideId) : undefined;

    return {
      id: c.id,
      slug: c.slug,
      name: c.name,
      parkName: c.park.name,
      region: c.park.region,
      type: c.type,
      design: c.design,
      imageUrl: c.imageUrl,
      isOpen: live?.is_open ?? null,
      waitMinutes: live?.wait_time ?? null,
    };
  });

  const featured = pickCoasterOfTheDay(coasters);
  const featuredData = {
    slug: featured.slug,
    name: featured.name,
    parkName: featured.park.name,
    type: featured.type,
    design: featured.design,
    imageUrl: featured.imageUrl,
    heightFt: featured.heightFt,
    speedMph: featured.speedMph,
    intensityScore: featured.intensityScore,
  };

  const features = [
    { href: '/map', tag: 'Explore', title: 'Live Map', copy: 'Every SoCal coaster, pinned and ready to click.' },
    { href: '/coasters', tag: 'Browse', title: 'All Coasters', copy: 'Full specs for every ride we track.' },
    { href: '/compare', tag: 'Weigh', title: 'Compare', copy: 'Put two or three coasters side by side.' },
    { href: '/parks', tag: 'Check', title: 'Park Status', copy: 'See which parks are actually running right now.' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-white text-navy-950 px-6 py-20 border-b border-steel">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-royal mb-4">
            Southern California · Live Status
          </p>
          <h1 className="text-6xl md:text-8xl mb-6">
            Know Before<br />You Queue.
          </h1>
          <p className="font-body text-lg text-navy-950/70 max-w-xl mb-10">
            Real specs and live wait times across Southern California's parks —
            matched to exactly your enjoyment of roller coasters.
          </p>
          <div className="flex flex-wrap gap-4 mb-14">
            <Link href="/quiz" className="btn-primary">Take the Intensity Quiz</Link>
            <Link href="/map" className="btn-outline-dark">See Live Map</Link>
          </div>

          <div className="mb-8">
            <FeaturedCoaster coaster={featuredData} />
          </div>

          <DepartureBoard rows={boardRows} />
        </div>
      </section>

      {/* Feature grid */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <Link key={f.href} href={f.href} className="card hover:border-royal transition-colors group">
              <p className="font-mono text-xs uppercase tracking-widest text-royal mb-3">{f.tag}</p>
              <h2 className="text-3xl mb-2">{f.title}</h2>
              <p className="font-body text-sm text-navy-950/70">{f.copy}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}