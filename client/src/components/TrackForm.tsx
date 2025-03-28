import React, { useState, useEffect } from 'react';
import { Track } from '@/types/track.types';

// Use Omit to create a type for the form data, excluding IDs generated by backend
type TrackFormData = Omit<Track, 'id' | '_id' | 'createdAt' | 'updatedAt'>;

interface TrackFormProps {
  onSubmit: (data: TrackFormData | Track) => void; // Accept both add (no id) and edit (with id) data
  initialData?: Track | null;
  isEditing?: boolean;
  isLoading?: boolean;
  onCancel?: () => void; // Optional cancel action for edit mode
}

const TrackForm: React.FC<TrackFormProps> = ({
    onSubmit,
    initialData = null,
    isEditing = false,
    isLoading = false,
    onCancel
}) => {
  const [formData, setFormData] = useState<TrackFormData>({
    title: '',
    artist: '',
    album: '',
  });

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        title: initialData.title,
        artist: initialData.artist,
        album: initialData.album,
      });
    } else {
        // Reset form if switching back to add mode or initial load
         setFormData({ title: '', artist: '', album: '' });
    }
  }, [initialData, isEditing]); // Depend on initialData and isEditing flag

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.artist || !formData.album) {
        alert('Please fill in all fields.');
        return;
    }
    // If editing, include the original _id
    const dataToSubmit = isEditing && initialData?._id
        ? { ...formData, _id: initialData._id }
        : formData;

    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc' }}>
      <h3>{isEditing ? 'Edit Track' : 'Add New Track'}</h3>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="album">Album:</label>
        <input
          type="text"
          id="album"
          name="album"
          value={formData.album}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : (isEditing ? 'Update Track' : 'Add Track')}
      </button>
       {isEditing && onCancel && (
         <button type="button" onClick={onCancel} disabled={isLoading} style={{ marginLeft: '10px' }}>
           Cancel Edit
         </button>
       )}
    </form>
  );
};

export default TrackForm;