// src/lib/format-enum.ts

// Purpose: CSS handles the actual visual uppercase styling (font-mono uppercase
// classes), so this only needs to swap underscores for spaces

export function formatEnumLabel(value: string): string {
  return value.replace(/_/g, ' ');
}