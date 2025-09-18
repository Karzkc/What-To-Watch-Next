'use client';

import React, { useEffect, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';

const Poster = () => {
  const [isBgDark, setIsBgDark] = useState(true);
  const imageUrl = 'https://lumiere-a.akamaihd.net/v1/images/fightclub_mainmenu_ka_3840x2160_98330c30.jpeg?region=0,0,1600,686&width=960';

  useEffect(() => {
    const fac = new FastAverageColor();
    fac.getColorAsync(imageUrl, { crossOrigin: 'anonymous' })
      .then(color => {
        setIsBgDark(color.isDark);
      })
      .catch(e => {
        console.error(e);
      });
  }, [imageUrl]);

  const glassStyle = isBgDark
    ? 'bg-black/30 border-black/20 text-white'
    : 'bg-white/30 border-white/20 text-black';

  return (
    <div
      className="poster pl-10 border w-full h-128 flex items-center justify-start inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        className={`poster-content w-[50%] h-76 flex-col items-center justify-center py-10 px-8  gap-10  backdrop-blur-lg rounded-xl shadow-lg ${glassStyle}`}
      >
        <div className="content-top flb px-2 ml-1 gap-3 w-44 bg-black/60 backdrop-blur-lg rounded shadow-lg text-white">
          <div className="top-rating">8.4</div>
          <div className="top-year">1999</div>
          <div className="top-genre">Drama</div>
        </div>
        <div className="content-text">
          <div className="content-title text-5xl font-bold">Fight Club</div>
          <div className="content-desc text-lg mt-2 font-[600]">
            A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy...
          </div>
        </div>
        <div className="content-options flex justify-start gap-3 mt-5">
          <div className="options-trailer">Watch Trailer</div>
          <div className="content-info">More Info</div>
        </div>
      </div>
    </div>
  );
};

export default Poster;