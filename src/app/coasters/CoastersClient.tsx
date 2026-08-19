'use client';

import { useState, useMemo } from 'react';
import CoasterCard from '@/components/CoasterCard';
import { getCoasterCategory } from '@/lib/coaster-category';
import { formatEnumLabel } from '@/lib/format-enum';

// src/app/coasters/CoastersClient.tsx

// Purpose: Holds all the search/filter state (search box, category toggles, dropdowns)
// and re-renders the coaster grid as filters change

interface CoasterListItem {
  id: string;
  slug: string;
  name: string;
  parkName: string;
  parkSlug: string;
  type: string;
  design: string;
  imageUrl: string | null;
  manufacturer: string | null;
  intensityScore: number;
  heightFt: number | null;
  speedMph: number | null;
  inversions: number;
}

export default function CoastersClient({ coasters }: { coasters: CoasterListItem[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'family' | 'thrill' | 'extreme'>('all');
  const [design, setDesign] = useState('all');
  const [inversionFilter, setInversionFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [type, setType] = useState('all');
  const [manufacturer, setManufacturer] = useState('all');
  const [park, setPark] = useState('all');

  const types = useMemo(() => [...new Set(coasters.map((c) => c.type))].sort(), [coasters]);
  const designs = useMemo(() => [...new Set(coasters.map((c) => c.design))].sort(), [coasters]);
  const manufacturers = useMemo(
    () => [...new Set(coasters.map((c) => c.manufacturer).filter((m): m is string => !!m))].sort(),
    [coasters]
  );
  const parkOptions = useMemo(
    () => [...new Map(coasters.map((c) => [c.parkSlug, c.parkName])).entries()],
    [coasters]
  );

  const filtered = useMemo(() => {
    return coasters.filter((c) => {
      if (search.trim() && !c.name.toLowerCase().includes(search.trim().toLowerCase())) return false;
      if (category !== 'all' && getCoasterCategory(c.intensityScore).toLowerCase() !== category) return false;
      if (inversionFilter === 'yes' && c.inversions === 0) return false;
      if (inversionFilter === 'no' && c.inversions > 0) return false;
      if (type !== 'all' && c.type !== type) return false;
      if (design !== 'all' && c.design !== design) return false;
      if (manufacturer !== 'all' && c.manufacturer !== manufacturer) return false;
      if (park !== 'all' && c.parkSlug !== park) return false;
      return true;
    });
  }, [coasters, search, category, inversionFilter, type, design, manufacturer, park]);

  function clearFilters() {
    setSearch('');
    setCategory('all');
    setInversionFilter('all');
    setType('all');
    setDesign('all');
    setManufacturer('all');
    setPark('all');
  }

  const hasActiveFilters =
    search ||
    category !== 'all' ||
    inversionFilter !== 'all' ||
    type !== 'all' ||
    design !== 'all' || 
    manufacturer !== 'all' ||
    park !== 'all';

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search coasters…"
        className="w-full rounded-full border border-steel px-5 py-3 font-body text-sm outline-none focus:border-royal transition-colors mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        <FilterToggle label="All" active={category === 'all'} onClick={() => setCategory('all')} />
        <FilterToggle label="Family" active={category === 'family'} onClick={() => setCategory('family')} />
        <FilterToggle label="Thrill" active={category === 'thrill'} onClick={() => setCategory('thrill')} />
        <FilterToggle label="Extreme" active={category === 'extreme'} onClick={() => setCategory('extreme')} />

        <span className="w-px bg-steel mx-1" />

        <FilterToggle label="Any Inversions" active={inversionFilter === 'all'} onClick={() => setInversionFilter('all')} />
        <FilterToggle label="Has Inversions" active={inversionFilter === 'yes'} onClick={() => setInversionFilter('yes')} />
        <FilterToggle label="No Inversions" active={inversionFilter === 'no'} onClick={() => setInversionFilter('no')} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <FilterSelect label="Track Type" value={type} onChange={setType} options={types} />
        <FilterSelect label="Design" value={design} onChange={setDesign} options={designs} renderLabel={formatEnumLabel} />
        <FilterSelect label="Manufacturer" value={manufacturer} onChange={setManufacturer} options={manufacturers} />
        <FilterSelect
          label="Park"
          value={park}
          onChange={setPark}
          options={parkOptions.map(([slug]) => slug)}
          renderLabel={(slug) => parkOptions.find(([s]) => s === slug)?.[1] ?? slug}
        />
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="font-mono text-xs uppercase tracking-wide text-royal hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="font-mono text-xs uppercase tracking-wide text-navy-950/50 mb-4">
        {filtered.length} of {coasters.length} coasters
      </p>

      {filtered.length === 0 ? (
        <p className="font-body text-navy-950/50">No coasters match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((coaster) => (
            <CoasterCard
              key={coaster.id}
              slug={coaster.slug}
              name={coaster.name}
              parkName={coaster.parkName}
              type={coaster.type}
              design={coaster.design}
              imageUrl={coaster.imageUrl}
              intensityScore={coaster.intensityScore}
              heightFt={coaster.heightFt}
              speedMph={coaster.speedMph}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wide transition-colors border ${
        active ? 'bg-royal text-white border-royal' : 'border-steel text-navy-950/70 hover:border-royal'
      }`}
    >
      {label}
    </button>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  renderLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  renderLabel?: (value: string) => string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-full border border-steel px-4 py-1.5 font-mono text-xs uppercase tracking-wide bg-white outline-none focus:border-royal transition-colors"
    >
      <option value="all">{label}: All</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {renderLabel ? renderLabel(opt) : opt}
        </option>
      ))}
    </select>
  );
}