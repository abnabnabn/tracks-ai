import React, { useState, useEffect, useCallback, useRef } from 'react'; // <-- Added useRef
import { Track } from '@/types/track.types'; // Use frontend specific types
import { PaginatedTracksResponse } from '@/types/api.types'; // Define API response type
import * as api from '@/services/api'; // API service
import TrackItem from '@/components/TrackItem';
import TrackForm from '@/components/TrackForm';
import SearchFilter from '@/components/SearchFilter';
import PaginationControls from '@/components/PaginationControls';
import { SortByField, SortOrder, TrackQueryOptions } from '@/types/track.types';

const TrackListPage: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Pagination, Sorting, Filtering State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<{ title?: string; artist?: string; album?: string }>({});
  const [sortBy, setSortBy] = useState<SortByField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const formRef = useRef<HTMLDivElement>(null); // <-- Create the ref

  const fetchTracks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const queryOptions: TrackQueryOptions = {
        page: currentPage,
        limit: 10, // Or make configurable
        ...filters,
        sortBy,
        sortOrder,
    };
    try {
      const response: PaginatedTracksResponse = await api.getAllTracks(queryOptions);
      setTracks(response.data);
      setTotalPages(response.pagination.totalPages);
      // Ensure currentPage is not out of bounds after deletion/filtering
      if (currentPage > response.pagination.totalPages && response.pagination.totalPages > 0) {
        setCurrentPage(response.pagination.totalPages);
      } else if (response.pagination.totalPages === 0) {
        setCurrentPage(1); // Reset to page 1 if no results
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tracks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, filters, sortBy, sortOrder]); // Dependencies for useCallback

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]); // Re-run effect when fetchTracks function identity changes (due to dependencies)

  const handleAddOrUpdate = async (trackData: Omit<Track, 'id' | '_id'> | Track) => {
    setIsLoading(true);
    try {
        if ('_id' in trackData && trackData._id) { // Check if it's an update (has _id)
            await api.updateTrack(trackData._id, trackData);
        } else {
            await api.addTrack(trackData as Omit<Track, 'id' | '_id'>); // It's an add
        }
        setEditingTrack(null); // Close edit form
        setShowAddForm(false); // Close add form
        fetchTracks(); // Refresh list
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save track');
        console.error(err);
        setIsLoading(false); // Keep form open on error
    }
    // setIsLoading(false) is handled in finally block of fetchTracks
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this track?')) {
      setIsLoading(true);
      try {
        await api.deleteTrack(id);
        // Optimistic UI update or refetch:
        // setTracks(prev => prev.filter(t => t._id !== id));
        fetchTracks(); // Refresh the list to ensure pagination/counts are correct
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete track');
        console.error(err);
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (track: Track) => {
    setEditingTrack(track);
    setShowAddForm(false); // Ensure add form is hidden when editing

    // --- Add Scroll Logic ---
    // Use setTimeout to allow state update and re-render before scrolling
    setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
    // ------------------------
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (newFilters: { title?: string; artist?: string; album?: string }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 when filters change
  };

 const handleSortChange = (newSortBy: SortByField, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to page 1 when sorting changes
 };

  return (
    <div>
      <h2>Track List</h2>

      <button onClick={() => { setShowAddForm(!showAddForm); setEditingTrack(null); }}>
        {showAddForm ? 'Cancel Add' : 'Add New Track'}
      </button>

      {/* --- Wrap form area with the ref div --- */}
      <div ref={formRef}>
        {showAddForm && !editingTrack && (
          <TrackForm onSubmit={handleAddOrUpdate} isLoading={isLoading} />
        )}
        {editingTrack && (
          <TrackForm
            onSubmit={handleAddOrUpdate}
            initialData={editingTrack}
            isEditing={true}
            isLoading={isLoading}
            onCancel={() => setEditingTrack(null)}
          />
        )}
      </div>
      {/* ----------------------------------------- */}


      <SearchFilter onFilter={handleFilterChange} onSort={handleSortChange} currentSortBy={sortBy} currentSortOrder={sortOrder}/>

      {isLoading && <p>Loading tracks...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!isLoading && tracks.length === 0 && <p>No tracks found.</p>}

      <ul>
        {tracks.map((track) => (
          <TrackItem
            key={track._id} // Use MongoDB _id as key
            track={track}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TrackListPage;