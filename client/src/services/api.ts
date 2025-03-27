import axios from 'axios';
import { Track, TrackQueryOptions } from '@/types/track.types';
import { PaginatedTracksResponse } from '@/types/api.types';

// Get base URL from environment variable set by Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all tracks with query options
export const getAllTracks = async (options: TrackQueryOptions = {}): Promise<PaginatedTracksResponse> => {
    const params = new URLSearchParams();
    if (options.page) params.append('page', String(options.page));
    if (options.limit) params.append('limit', String(options.limit));
    if (options.title) params.append('title', options.title);
    if (options.artist) params.append('artist', options.artist);
    if (options.album) params.append('album', options.album);
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.sortOrder) params.append('sortOrder', options.sortOrder);

    const response = await apiClient.get('/tracks', { params });
    return response.data;
};

// Function to get a single track by ID (if needed)
export const getTrackById = async (id: string): Promise<Track> => {
    const response = await apiClient.get(`/tracks/${id}`);
    return response.data;
};


// Function to add a new track
export const addTrack = async (trackData: Omit<Track, 'id' | '_id' | 'createdAt' | 'updatedAt'>): Promise<Track> => {
  const response = await apiClient.post('/tracks', trackData);
  return response.data;
};

// Function to update an existing track
export const updateTrack = async (id: string, trackData: Partial<Track>): Promise<Track> => {
  const response = await apiClient.put(`/tracks/${id}`, trackData);
  return response.data;
};

// Function to delete a track
export const deleteTrack = async (id: string): Promise<{ message: string, id: string }> => {
  const response = await apiClient.delete(`/tracks/${id}`);
  return response.data;
};