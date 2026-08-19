'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { renderToStaticMarkup } from 'react-dom/server';
import type { CoasterMapData } from '@/types/coaster';

// src/components/CoasterMap.tsx

// Purpose: Renders the Leaflet map with pinpoints on the locations of
// each SoCal coaster

// A custom pin shaped like a rounded badge in the site's royal blue,
// showing the coaster's intensity score, which replaces Leaflet's default
// generic teardrop marker
function buildIcon(intensityScore: number) {
  const html = renderToStaticMarkup(
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: '50% 50% 50% 0',
        transform: 'rotate(-45deg)',
        background: '#2F4BE0',
        border: '2px solid white',
        boxShadow: '0 2px 6px rgba(11,27,43,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          transform: 'rotate(45deg)',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {intensityScore}
      </span>
    </div>
  );

  return L.divIcon({
    html,
    className: '',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
}

interface CoasterMapProps {
  coasters: CoasterMapData[];
}

const SOCAL_CENTER: [number, number] = [33.95, -118.1];

export default function CoasterMap({ coasters }: CoasterMapProps) {
  return (
    <MapContainer center={SOCAL_CENTER} zoom={9} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coasters.map((coaster) => (
        <Marker
          key={coaster.id}
          position={[coaster.lat, coaster.lng]}
          icon={buildIcon(coaster.intensityScore)}
        >
          <Popup minWidth={220}>
            <div style={{ fontFamily: 'sans-serif', margin: '-8px -12px', width: 220 }}>
              {coaster.imageUrl ? (
                <img
                  src={coaster.imageUrl}
                  alt={coaster.name}
                  style={{ width: '100%', height: 100, objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: 100,
                    background: 'linear-gradient(135deg, #142A40, #2F4BE0)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 12,
                    letterSpacing: 1,
                  }}
                >
                  {coaster.type}
                </div>
              )}
              <div style={{ padding: '10px 12px' }}>
                <strong style={{ fontSize: 15 }}>{coaster.name}</strong>
                <p style={{ margin: '2px 0 8px', fontSize: 12, color: '#666' }}>
                  {coaster.park.name}
                </p>
                <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#333', marginBottom: 8 }}>
                  {coaster.heightFt && <span>{coaster.heightFt} ft</span>}
                  {coaster.speedMph && <span>{coaster.speedMph} mph</span>}
                  <span style={{ color: '#2F4BE0', fontWeight: 700 }}>
                    Intensity {coaster.intensityScore}/10
                  </span>
                </div>
                <Link
                  href={`/coasters/${coaster.slug}`}
                  style={{
                    display: 'inline-block',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'white',
                    background: '#2F4BE0',
                    padding: '5px 12px',
                    borderRadius: 999,
                    textDecoration: 'none',
                  }}
                >
                  View Details →
                </Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}