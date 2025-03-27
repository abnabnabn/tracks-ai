import { Track } from './track.types';

// Interface for the paginated response from the GET /tracks endpoint
export interface PaginatedTracksResponse {
  data: Track[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  };
}

// Interface for standard error response from API (example)
export interface ApiErrorResponse {
    status: 'error';
    message: string;
    stack?: string; // Optional: included in development
}