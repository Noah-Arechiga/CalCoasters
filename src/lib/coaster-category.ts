// src/lib/coaster-category.ts

// Purpose: Derives a Family/Thrill/Extreme label not stored in the database,
// it's derived from intensityScore so it always stays consistent with
// the number you actually curated

export function getCoasterCategory(
  intensityScore: number
): 'Family' | 'Thrill' | 'Extreme' {
  if (intensityScore <= 3) return 'Family';
  if (intensityScore <= 7) return 'Thrill';
  return 'Extreme';
}