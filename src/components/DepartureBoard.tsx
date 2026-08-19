'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import CoasterThumb from './CoasterThumb';

// src/components/DepartureBoard.tsx

// Purpose: Handles the region tabs and search box on the live wait board,
// and sorts open coasters to the top

interface BoardRow {
  id: string;
  slug: string;
  name: string;
  parkName: string;
  region: 'LA' | 'OC' | 'SD';
  type: string;
  design: string;
  imageUrl: string | null;
  isOpen: boolean | null;
  waitMinutes: number | null;
}

const REGIONS: { value: 'LA' | 'OC' | 'SD'; label: string }[] = [
  { value: 'LA', label: 'Los Angeles County Area' },
  { value: 'OC', label: 'Orange County Area' },
  { value: 'SD', label: 'San Diego County Area' },
];

// Open coasters first (shortest wait first), then unknown status,
// then closed ones at the very bottom, which matches how you'd actually
// decide where to go next
function sortByStatus(rows: BoardRow[]): BoardRow[] {
  return [...rows].sort((a, b) => {
    const rank = (r: BoardRow) => (r.isOpen === true ? 0 : r.isOpen === null ? 1 : 2);
    const rankDiff = rank(a) - rank(b);
    if (rankDiff !== 0) return rankDiff;
    if (a.isOpen && b.isOpen) return (a.waitMinutes ?? 0) - (b.waitMinutes ?? 0);
    return 0;
  });
}

export default function DepartureBoard({ rows }: { rows: BoardRow[] }) {
  const [region, setRegion] = useState<'LA' | 'OC' | 'SD'>('LA');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const byRegionAndSearch = rows.filter((row) => {
      if (row.region !== region) return false;
      if (search.trim() && !row.name.toLowerCase().includes(search.trim().toLowerCase())) return false;
      return true;
    });
    return sortByStatus(byRegionAndSearch);
  }, [rows, region, search]);

  return (
    <div className="bg-navy-800 rounded-2xl border border-white/10 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
        <div className="flex gap-2">
          {REGIONS.map((r) => (
            <button
              key={r.value}
              onClick={() => setRegion(r.value)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wide font-mono transition-colors ${
                region === r.value ? 'bg-royal text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coasters…"
          className="bg-white/10 placeholder-white/40 text-white text-xs font-mono rounded-full px-4 py-1.5 outline-none focus:bg-white/20 transition-colors w-full sm:w-48"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="px-5 py-8 text-sm text-white/40 font-mono">
          No coasters match {search ? 'that search' : 'this area'} yet.
        </p>
      ) : (
        <div className="flex gap-3 overflow-x-auto px-5 py-5 scrollbar-thin">
          {filtered.map((row, i) => (
            <Link
              key={row.id}
              href={`/coasters/${row.slug}`}
              className="shrink-0 w-40 rounded-xl overflow-hidden bg-navy-950 border border-white/10 hover:border-royal transition-colors animate-flip-in"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <CoasterThumb imageUrl={row.imageUrl} name={row.name} type={row.type} design={row.design} className="w-full h-24" />
              <div className="p-3">
                <p className="font-body text-sm font-semibold text-white truncate">{row.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-white/50 truncate mb-2">
                  {row.parkName}
                </p>
                {row.isOpen === true && (
                  <span className="font-mono text-xs text-[#7CE8A8]">{row.waitMinutes} min</span>
                )}
                {row.isOpen === false && (
                  <span className="font-mono text-xs text-[#FF8B7A]">Closed</span>
                )}
                {row.isOpen === null && (
                  <span className="font-mono text-xs text-white/30">— —</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}