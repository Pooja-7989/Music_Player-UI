import React, { useState, useRef, useEffect } from 'react';
import Controls from './Controler';
import { useDominantColor } from './Denominator';
import './main.css'; 

const MusicPlayer = ({ song, onPrevSong, onNextSong, setDominantColor }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const imageUrl = `https://cms.samespace.com/assets/${song.cover}`;
  const dominantColor = useDominantColor(imageUrl);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [song]);

  useEffect(() => {
    const playerElement = document.querySelector('.music-player');
    if (playerElement) {
      playerElement.style.setProperty('--dominant-color', dominantColor);
    }

    if (setDominantColor) {
      setDominantColor(dominantColor);
    }
  }, [dominantColor, setDominantColor]);

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  if (!song) return <div>Loading...</div>;

  return (
    <div className="music-player">
      <div className="te">
        <h1>{song.name}</h1>
        <p>{song.artist}</p>
      </div>
      <img src={imageUrl} alt={`${song.name} cover`} />
      <audio ref={audioRef}>
        <source src={song.url} type="audio/mpeg" />
      </audio>
      <Controls
        audioRef={audioRef}
        isPlaying={isPlaying}
        onPlayPauseClick={handlePlayPauseClick}
        onPrevClick={onPrevSong}
        onNextClick={onNextSong}
      />
    </div>
  );
};

export default MusicPlayer;
