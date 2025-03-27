import React from 'react';
import { Track } from '@/types/track.types';

interface TrackItemProps {
  track: Track;
  onEdit: (track: Track) => void;
  onDelete: (id: string) => void;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, onEdit, onDelete }) => {
    const handleDeleteClick = () => {
        if (track._id) {
             onDelete(track._id);
        } else {
            console.error("Track ID is missing, cannot delete.");
        }
    };

    const handleEditClick = () => {
        onEdit(track);
    };

  return (
    <li style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <strong>{track.title}</strong>
        <br />
        <small>Artist: {track.artist}</small>
        <br />
        <small>Album: {track.album}</small>
      </div>
      <div>
        <button onClick={handleEditClick} style={{ marginRight: '5px' }}>Edit</button>
        <button onClick={handleDeleteClick} style={{ color: 'red' }}>Delete</button>
      </div>
    </li>
  );
};

export default TrackItem;