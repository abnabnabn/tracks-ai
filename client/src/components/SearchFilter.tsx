import React, { useState } from 'react';
import { SortByField, SortOrder } from '@/types/track.types';

interface SearchFilterProps {
    onFilter: (filters: { title?: string; artist?: string; album?: string }) => void;
    onSort: (sortBy: SortByField, sortOrder: SortOrder) => void;
    currentSortBy: SortByField;
    currentSortOrder: SortOrder;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilter, onSort, currentSortBy, currentSortOrder }) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter({
            title: title || undefined,
            artist: artist || undefined,
            album: album || undefined,
        });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'sortBy') {
            onSort(value as SortByField, currentSortOrder);
        } else if (name === 'sortOrder') {
            onSort(currentSortBy, value as SortOrder);
        }
    };


    return (
        <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc' }}>
            <h4>Filter & Sort</h4>
            <form onSubmit={handleFilterSubmit}>
                <input
                    type="text"
                    placeholder="Filter by Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginRight: '5px' }}
                />
                <input
                    type="text"
                    placeholder="Filter by Artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    style={{ marginRight: '5px' }}
                />
                <input
                    type="text"
                    placeholder="Filter by Album"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <button type="submit">Apply Filters</button>
            </form>

             <div style={{ marginTop: '10px' }}>
                <label htmlFor="sortBy">Sort By:</label>
                <select id="sortBy" name="sortBy" value={currentSortBy} onChange={handleSortChange} style={{ marginLeft: '5px', marginRight: '15px' }}>
                    <option value="title">Title</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                    <option value="createdAt">Date Added</option>
                </select>

                 <label htmlFor="sortOrder">Order:</label>
                <select id="sortOrder" name="sortOrder" value={currentSortOrder} onChange={handleSortChange} style={{ marginLeft: '5px' }}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
    );
};

export default SearchFilter;