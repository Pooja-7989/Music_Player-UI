import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './Player';
import SongList from './SongList';
import './main.css';
import Spotify from './Spotify';
import imageFromSrc from '../images/images.png';
import imageSrc from '../images/image1.jpg';


const MainPage = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dominantColor, setDominantColor] = useState('rgb(0, 0, 0)');
  const [isSongListVisible, setIsSongListVisible] = useState(true); 

  useEffect(() => {
    axios.get('https://cms.samespace.com/items/songs')
      .then(response => {
        const data = response.data.data || response.data;
        if (Array.isArray(data)) {
          setSongs(data);
          setCurrentSong(data[0]);
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const selectSong = (song) => {
    setCurrentSong(song);
  };

  const handlePrevSong = () => {
    const currentIndex = songs.indexOf(currentSong);
    const prevIndex = (currentIndex === 0 ? songs.length - 1 : currentIndex - 1);
    setCurrentSong(songs[prevIndex]);
  };

  const handleNextSong = () => {
    const currentIndex = songs.indexOf(currentSong);
    const nextIndex = (currentIndex === songs.length - 1 ? 0 : currentIndex + 1);
    setCurrentSong(songs[nextIndex]);
  };

  useEffect(() => {
    const appElement = document.querySelector('.app');
    if (appElement) {
      appElement.style.setProperty('--dominant-color', dominantColor);
    }
  }, [dominantColor]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
            <div className="spt">
        <img src={imageFromSrc} alt="Spotify" className="spotify-logo" />
        <p style={{ marginLeft: '5px' }}>Spotify</p>
        <div className="menu-icon" onClick={() => setIsSongListVisible(!isSongListVisible)} style={{marginLeft:'15px'}}>
        <svg width="24" height="24" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
        </svg>
      </div>
      </div>

      
      {isSongListVisible && <SongList songs={songs} onSelectSong={selectSong} />}
      <Player
        song={currentSong}
        onPrevSong={handlePrevSong}
        onNextSong={handleNextSong}
        setDominantColor={setDominantColor}
      />
            <div>
        <img src={imageSrc} alt="User" className="user-avatar" />
      </div>
    </div>
  );
};

export default MainPage;
