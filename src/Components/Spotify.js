import React ,{useState}from 'react';
import imageFromSrc from '../images/images.png';
import imageSrc from '../images/image1.jpg';
import './Spotify.css'; 

function Spotify() {
  const [isSongListVisible, setIsSongListVisible] = useState(true); 
  return (
    <div className="spotify-container">
      <div className="spt">
        <img src={imageFromSrc} alt="Spotify" className="spotify-logo" />
        <p style={{ marginLeft: '5px' }}>Spotify</p>
      </div>
      <div className="spt1">
        <img src={imageSrc} alt="User" className="user-avatar" />
      </div>
    </div>
  );
}

export default Spotify;
