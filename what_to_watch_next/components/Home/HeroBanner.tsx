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
      className="banner pl-10 border w-full h-128 flex items-center justify-end gap-20 px-20  
      "
    >
      <div className={`banner-content w-[20%] h-46 fl flex-col justify-self-center self-center  
          backdrop-blur-lg rounded-xl shadow-lg ${glassStyle}`} >

        <div className="content-top flb px-2 ml-1 gap-3 w-44 bg-black/60 backdrop-blur-lg rounded shadow-2xl text-white">
          <div className="top-rating">8.4</div>
          <div className="top-year">1999</div>
          <div className="top-genre">Drama</div>
        </div>

        <div className="content-text">
          <div className="content-title text-5xl font-bold">Fight Club</div>
        </div>

      </div>

      <div className="stacks w-[30%] h-56
      border justify-self-end
      ">

      </div>
    </div>
  );
};

export default Poster;