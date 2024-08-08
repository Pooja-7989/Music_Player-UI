import React, { useState, useEffect } from 'react';
import './SongList.css';

const SongList = ({ songs, onSelectSong }) => {
  const [activeTab, setActiveTab] = useState('forYou');
  const [searchTerm, setSearchTerm] = useState('');
  const [songsWithDuration, setSongsWithDuration] = useState([]);

  useEffect(() => {
    const getDuration = (url) => {
      return new Promise((resolve) => {
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
          resolve(audio.duration);
        });
      });
    };

    const fetchDurations = async () => {
      const songsWithDurations = await Promise.all(
        songs.map(async (song) => {
          const duration = await getDuration(song.url);
          return { ...song, duration };
        })
      );
      setSongsWithDuration(songsWithDurations);
    };

    fetchDurations();
  }, [songs]);

  const filteredSongs = songsWithDuration.filter((song) => {
    if (activeTab === 'topTrack' && !song.top_track) {
      return false;
    }

    return (
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="song-list-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'forYou' ? 'active' : ''}`}
          onClick={() => setActiveTab('forYou')}
        >
          For You
        </button>
        <button
          className={`tab ${activeTab === 'topTrack' ? 'active' : ''}`}
          onClick={() => setActiveTab('topTrack')}
        >
          Top Track
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Songs, Artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="song-list">
        {filteredSongs.map((song) => (
          <div key={song.id} className="song-item" onClick={() => onSelectSong(song)}>
            <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.title} className="song-cover" />
            <div className="song-details">
            <div className='list'>
              <div className="song-title">{song.name}</div>
              <div className="song-artist">{song.artist}</div>
            </div>
              <div className="song-duration">
                {Math.floor(song.duration / 60)}:{Math.floor(song.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        ))}

        {filteredSongs.length === 0 && (
          <div className="no-results">No songs found</div>
        )}
      </div>
    </div>
  );
};

export default SongList;
