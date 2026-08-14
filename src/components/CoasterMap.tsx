'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { CoasterMapData } from '@/types/coaster';

// src/components/CoasterMap.tsx

// Purpose: // Leaflet's default marker icon files don't load correctly once 
// bundled by Next.js —> this resets the icon URLs to load from a CDN instead,
// so map pins actually appear instead of showing broken images

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface CoasterMapProps {
  coasters: CoasterMapData[];
}

// Roughly centered between Los Angeles and Orange County
const SOCAL_CENTER: [number, number] = [33.95, -118.1];

export default function CoasterMap({ coasters }: CoasterMapProps) {
  return (
    <MapContainer
      center={SOCAL_CENTER}
      zoom={9}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coasters.map((coaster) => (
        <Marker key={coaster.id} position={[coaster.lat, coaster.lng]}>
          <Popup>
            <strong>{coaster.name}</strong>
            <br />
            {coaster.park.name}
            <br />
            Intensity: {coaster.intensityScore}/10
            {coaster.heightFt && (
              <>
                <br />
                Height: {coaster.heightFt} ft
              </>
            )}
            {coaster.speedMph && (
              <>
                <br />
                Speed: {coaster.speedMph} mph
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}