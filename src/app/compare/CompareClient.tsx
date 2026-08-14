'use client';

import { useState } from 'react';

// src/app/compare/CompareClient.tsx

// Purpose: Allows user to compare 2-3 coasters at at time. On rows
// like height/speed/inversions/intensity automatically green-highlights
// whichever coaster "wins" that stat

interface CompareCoaster {
  id: string;
  name: string;
  parkName: string;
  type: string;
  manufacturer: string | null;
  heightFt: number | null;
  dropFt: number | null;
  speedMph: number | null;
  inversions: number;
  durationSec: number | null;
  intensityScore: number;
  openedYear: number | null;
}

const MAX_SELECTION = 3;

export default function CompareClient({
  coasters,
}: {
  coasters: CompareCoaster[];
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function toggle(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((existingId) => existingId !== id);
      }
      if (prev.length >= MAX_SELECTION) {
        return prev; // Already at the cap, ignore further clicks
      }
      return [...prev, id];
    });
  }

  const selectedCoasters = coasters.filter((c) => selectedIds.includes(c.id));

  return (
    <div>
      {/* Selection checkboxes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        {coasters.map((coaster) => {
          const isSelected = selectedIds.includes(coaster.id);
          const isDisabled = !isSelected && selectedIds.length >= MAX_SELECTION;

          return (
            <label
              key={coaster.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                opacity: isDisabled ? 0.4 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => toggle(coaster.id)}
              />
              {coaster.name}
            </label>
          );
        })}
      </div>

      {/* Comparison table */}
      {selectedCoasters.length >= 2 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={headerCellStyle}></th>
                {selectedCoasters.map((c) => (
                  <th key={c.id} style={headerCellStyle}>
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <StatRow
                label="Park"
                coasters={selectedCoasters}
                getValue={(c) => c.parkName}
              />
              <StatRow
                label="Type"
                coasters={selectedCoasters}
                getValue={(c) => c.type}
              />
              <StatRow
                label="Manufacturer"
                coasters={selectedCoasters}
                getValue={(c) => c.manufacturer ?? '—'}
              />
              <StatRow
                label="Height"
                coasters={selectedCoasters}
                getValue={(c) => (c.heightFt ? `${c.heightFt} ft` : '—')}
                highlightMax={(c) => c.heightFt}
              />
              <StatRow
                label="Drop"
                coasters={selectedCoasters}
                getValue={(c) => (c.dropFt ? `${c.dropFt} ft` : '—')}
                highlightMax={(c) => c.dropFt}
              />
              <StatRow
                label="Speed"
                coasters={selectedCoasters}
                getValue={(c) => (c.speedMph ? `${c.speedMph} mph` : '—')}
                highlightMax={(c) => c.speedMph}
              />
              <StatRow
                label="Inversions"
                coasters={selectedCoasters}
                getValue={(c) => String(c.inversions)}
                highlightMax={(c) => c.inversions}
              />
              <StatRow
                label="Duration"
                coasters={selectedCoasters}
                getValue={(c) =>
                  c.durationSec
                    ? `${Math.floor(c.durationSec / 60)}:${String(
                        c.durationSec % 60
                      ).padStart(2, '0')}`
                    : '—'
                }
              />
              <StatRow
                label="Intensity"
                coasters={selectedCoasters}
                getValue={(c) => `${c.intensityScore}/10`}
                highlightMax={(c) => c.intensityScore}
              />
              <StatRow
                label="Opened"
                coasters={selectedCoasters}
                getValue={(c) => String(c.openedYear ?? '—')}
              />
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ color: '#999' }}>
          Select at least 2 coasters above to compare.
        </p>
      )}
    </div>
  );
}

// Renders one row of the table. If `highlightMax` is provided, the cell
// with the highest numeric value in that row gets a highlight -> easy
// way to visually spot "which one wins" per stat
function StatRow({
  label,
  coasters,
  getValue,
  highlightMax,
}: {
  label: string;
  coasters: CompareCoaster[];
  getValue: (c: CompareCoaster) => string;
  highlightMax?: (c: CompareCoaster) => number | null;
}) {
  let maxValue: number | null = null;
  if (highlightMax) {
    const values = coasters.map(highlightMax).filter((v): v is number => v !== null);
    maxValue = values.length ? Math.max(...values) : null;
  }

  return (
    <tr style={{ borderBottom: '1px solid #eee' }}>
      <td style={{ ...cellStyle, color: '#666', fontWeight: 600 }}>{label}</td>
      {coasters.map((c) => {
        const isMax =
          highlightMax && maxValue !== null && highlightMax(c) === maxValue;
        return (
          <td
            key={c.id}
            style={{
              ...cellStyle,
              background: isMax ? '#d4edda' : undefined,
              fontWeight: isMax ? 700 : 400,
            }}
          >
            {getValue(c)}
          </td>
        );
      })}
    </tr>
  );
}

const headerCellStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.75rem 0.5rem',
  borderBottom: '2px solid #333',
};

const cellStyle: React.CSSProperties = {
  padding: '0.6rem 0.5rem',
};