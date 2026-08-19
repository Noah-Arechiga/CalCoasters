'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import CoasterThumb from '@/components/CoasterThumb';
import { formatEnumLabel } from '@/lib/format-enum';

// src/app/compare/CompareClient.tsx

// Purpose: Holds the search-to-add state for picking coasters and renders
// the side-by-side comparison table

interface CompareCoaster {
  id: string;
  name: string;
  parkName: string;
  type: string;
  design: string;
  imageUrl: string | null;
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

export default function CompareClient({ coasters }: { coasters: CompareCoaster[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedCoasters = coasters.filter((c) => selectedIds.includes(c.id));

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return coasters
      .filter((c) => !selectedIds.includes(c.id) && c.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [coasters, query, selectedIds]);

  function addCoaster(id: string) {
    if (selectedIds.length >= MAX_SELECTION) return;
    setSelectedIds((prev) => [...prev, id]);
    setQuery('');
    setShowSuggestions(false);
  }

  function removeCoaster(id: string) {
    setSelectedIds((prev) => prev.filter((existingId) => existingId !== id));
  }

  // Close the suggestion dropdown when clicking outside of it
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div>
      {/* Search-to-add */}
      <div ref={wrapperRef} className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          disabled={selectedIds.length >= MAX_SELECTION}
          placeholder={
            selectedIds.length >= MAX_SELECTION
              ? `Max ${MAX_SELECTION} selected — remove one to add another`
              : 'Search for a coaster to add…'
          }
          className="w-full rounded-full border border-steel px-5 py-3 font-body text-sm outline-none focus:border-royal transition-colors disabled:bg-plate disabled:cursor-not-allowed"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 top-full mt-2 w-full bg-white border border-steel rounded-xl shadow-lg overflow-hidden">
            {suggestions.map((c) => (
              <button
                key={c.id}
                onClick={() => addCoaster(c.id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-plate transition-colors text-left"
              >
                <CoasterThumb imageUrl={c.imageUrl} name={c.name} type={c.type} design={c.design} className="w-10 h-10 rounded-md shrink-0" />
                <div>
                  <p className="font-body text-sm font-semibold">{c.name}</p>
                  <p className="font-mono text-xs text-navy-950/50">{c.parkName}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected chips */}
      {selectedCoasters.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10">
          {selectedCoasters.map((c) => (
            <div key={c.id} className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-full border border-royal bg-royal/5">
              <CoasterThumb imageUrl={c.imageUrl} name={c.name} type={c.type} design={c.design} className="w-8 h-8 rounded-full shrink-0" />
              <span className="font-body text-sm font-semibold">{c.name}</span>
              <button
                onClick={() => removeCoaster(c.id)}
                aria-label={`Remove ${c.name}`}
                className="font-mono text-navy-950/40 hover:text-[#8A2323] transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Comparison table */}
      {selectedCoasters.length >= 2 ? (
        <div className="overflow-x-auto rounded-xl border border-steel">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-navy-950">
                <th className="px-4 py-3"></th>
                {selectedCoasters.map((c) => (
                  <th key={c.id} className="px-4 py-4 text-left">
                    <CoasterThumb
                      imageUrl={c.imageUrl}
                      name={c.name}
                      type={c.type}
                      design={c.design}
                      className="w-full h-24 rounded-lg mb-2"
                    />
                    <span className="font-display text-lg text-white block">{c.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <StatRow label="Park" coasters={selectedCoasters} getValue={(c) => c.parkName} />
              <StatRow label="Type" coasters={selectedCoasters} getValue={(c) => c.type} />
              <StatRow label="Design" coasters={selectedCoasters} getValue={(c) => formatEnumLabel(c.design)} />
              <StatRow label="Manufacturer" coasters={selectedCoasters} getValue={(c) => c.manufacturer ?? '—'} />
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
                    ? `${Math.floor(c.durationSec / 60)}:${String(c.durationSec % 60).padStart(2, '0')}`
                    : '—'
                }
              />
              <StatRow
                label="Intensity"
                coasters={selectedCoasters}
                getValue={(c) => `${c.intensityScore}/10`}
                highlightMax={(c) => c.intensityScore}
              />
              <StatRow label="Opened" coasters={selectedCoasters} getValue={(c) => String(c.openedYear ?? '—')} />
            </tbody>
          </table>
        </div>
      ) : (
        <p className="font-mono text-sm text-navy-950/40 uppercase tracking-wide">
          Search and add at least 2 coasters above to compare.
        </p>
      )}
    </div>
  );
}

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
    <tr className="border-b border-steel last:border-0">
      <td className="font-mono text-xs uppercase tracking-wide text-navy-950/50 px-4 py-3 whitespace-nowrap">
        {label}
      </td>
      {coasters.map((c) => {
        const isMax = highlightMax && maxValue !== null && highlightMax(c) === maxValue;
        return (
          <td
            key={c.id}
            className={`font-mono text-sm px-4 py-3 ${isMax ? 'bg-royal/10 text-royal font-bold' : 'text-navy-950'}`}
          >
            {getValue(c)}
          </td>
        );
      })}
    </tr>
  );
}