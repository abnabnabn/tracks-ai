// Define the base Track interface
export interface ITrack {
  id?: string; // Optional: Mongoose uses _id, but we often map to id
  _id?: string; // Mongoose default ID
  title: string;
  artist: string;
  album: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for the paginated response
export interface PaginatedTracksResponse {
  data: ITrack[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  };
}

// Type for sorting parameters
export type SortOrder = 'asc' | 'desc';
export type SortByField = 'title' | 'artist' | 'album' | 'createdAt' | 'updatedAt'; // Add fields as needed

export interface TrackQueryOptions {
  page?: number;
  limit?: number;
  title?: string;
  artist?: string;
  album?: string;
  sortBy?: SortByField;
  sortOrder?: SortOrder;
}