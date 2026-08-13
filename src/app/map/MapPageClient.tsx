// src/app/map/MapPageClient.tsx

// Purpose: Leaflet needs direct access to the browser's `window` object, which
// doesn't exist while Next.js is rendering the page on the server

'use client';

import dynamic from 'next/dynamic';
import type { CoasterMapData } from '@/types/coaster';

const CoasterMap = dynamic(() => import('@/components/CoasterMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function MapPageClient({
  coasters,
}: {
  coasters: CoasterMapData[];
}) {
  return <CoasterMap coasters={coasters} />;
}