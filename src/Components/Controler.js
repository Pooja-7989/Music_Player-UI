import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPause, faPlay, faForward, faEllipsis, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

const Controls = ({ audioRef, isPlaying, onPlayPauseClick, onPrevClick, onNextClick }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); 
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); 

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audioRef]);

  const handleSeek = (e) => {
    const newProgress = e.target.value;
    const audio = audioRef.current;
    audio.currentTime = (audio.duration * newProgress) / 100;
    setProgress(newProgress);
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const audio = audioRef.current;
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div className="controls">
      <div className="progress-bar">
        <input
          className="bar"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          style={{
            '--progress': `${progress}%`,
          }}
        />
      </div>
      <div className="set">
        <div>
          <button className="details" id='menu'><FontAwesomeIcon icon={faEllipsis} style={{ color: 'whitesmoke' }} /></button>
        </div>
        <div>
          <button onClick={onPrevClick} className="ctrl"><FontAwesomeIcon icon={faBackward} className="icon" /></button>
          <button onClick={onPlayPauseClick} className="play">
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="icon" />
          </button>
          <button onClick={onNextClick} className="ctrl"><FontAwesomeIcon icon={faForward} className="icon" /></button>
        </div>
        <div>
          <button className="details" onClick={toggleVolumeSlider}>
            <FontAwesomeIcon icon={faVolumeHigh} style={{ color: 'whitesmoke' }} />
          </button>
          {showVolumeSlider && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                  background: `linear-gradient(to right, #ddd ${volume * 100}%, #3c3c3c ${volume * 100}%)`
                }}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;
