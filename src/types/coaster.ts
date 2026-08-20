// src/types/coaster.ts

// Purpose: A shared shape for "coaster data formatted for the map"
// so database query, API route, and map component all
// agree on what fields exist -> TypeScript raises error if different

export interface CoasterMapData {
  id: string;
  name: string;
  slug: string;
  lat: number;
  lng: number;
  intensityScore: number;
  type: string;
  design: string;
  heightFt: number | null;
  speedMph: number | null;
  imageUrl: string | null;
  park: {
    id: string;
    name: string;
    slug: string;
  };
}