'use client';

import dynamic from 'next/dynamic';
import type { CoasterMapData } from '@/types/coaster';

// src/app/map/MapPageClient.tsx

// Purpose: Lazy-loads the actual Leaflet map with ssr: false, since Leaflet
// needs direct browser access and can't render on the server

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