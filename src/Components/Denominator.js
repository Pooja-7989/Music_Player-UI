import { useEffect, useState } from 'react';
import {FastAverageColor} from 'fast-average-color';

export const useDominantColor = (imageUrl) => {
  const [dominantColor, setDominantColor] = useState('rgb(0, 0, 0)');

  useEffect(() => {
    const fac = new FastAverageColor();
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl;

    image.onload = () => {
      fac.getColorAsync(image)
        .then((color) => {
          setDominantColor(`rgb(${color.value.join(',')})`);
        })
        .catch((err) => {
          console.error('Error getting color:', err);
        });
    };
  }, [imageUrl]);

  return dominantColor;
};
