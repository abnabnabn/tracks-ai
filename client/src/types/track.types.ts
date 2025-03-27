// Define the base Track interface for the frontend
// Mirroring server/src/types/track.types.ts
export interface Track {
  id?: string; // Often map _id to id in frontend if needed
  _id?: string; // MongoDB default ID
  title: string;
  artist: string;
  album: string;
  createdAt?: string | Date; // Dates might be strings from JSON
  updatedAt?: string | Date;
}

// Type for sorting parameters
export type SortOrder = 'asc' | 'desc';
export type SortByField = 'title' | 'artist' | 'album' | 'createdAt' | 'updatedAt';

// Type for query options used in API calls
export interface TrackQueryOptions {
  page?: number;
  limit?: number;
  title?: string;
  artist?: string;
  album?: string;
  sortBy?: SortByField;
  sortOrder?: SortOrder;
}