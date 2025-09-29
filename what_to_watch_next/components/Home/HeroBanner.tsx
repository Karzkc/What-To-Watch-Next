'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SlidesData } from "@/app/types/banner"
import Image from 'next/image';


const Poster = () => {
  const [allData, setAllData] = useState<SlidesData[]>([]);
  const [currSlide, setCurrSlide] = useState<SlidesData | null>(null);
  const indexRef = useRef(0);

  const getSlidesData = async () => {
    try {
      const res = await fetch('/api/banner');
      if (!res.ok) {
        throw new Error("Failed to fetch data from /api/banner");
      }
      const apiData = await res.json();

      const movies = [
        ...apiData.moviesTrending,
        ...apiData.moviesPopular,
        ...apiData.moviesLatest,
      ].map((item: any) => ({ ...item, type: 'movie' }));

      const shows = [
        ...apiData.showsTrending,
        ...apiData.showsPopular,
        ...apiData.showsLatest,
      ].map((item: any) => ({ ...item, title: item.name, type: 'tv' }));

      setAllData([...movies, ...shows]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSlidesData();
  }, []);

  useEffect(() => {
    if (allData.length === 0) return;

    setCurrSlide(allData[0]);
    indexRef.current = 0;

    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % allData.length;
      setCurrSlide(allData[indexRef.current]);
    }, 5000);

    return () => clearInterval(interval);
  }, [allData]);

  return (
    <div
      className="banner relative w-full h-128  fl rounded-xl shadow-lg"
    >

      {currSlide?.backdrop_path && (
        <div
          className="absolute inset-0 z-0 "
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${currSlide.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // filter: "blur(5px)",
            transition: "background-image 0.6s ease-in-out",
          }}
        />
      )}

      <div className="content fl w-[40%] gap-5 h-80 bg-white/20 z-20 backdrop-blur-2xl rounded-2xl">
        <div className="relative z-10 w-[30%] h-[70%] flex items-center justify-center self-center ">
          {currSlide?.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${currSlide.poster_path}`}
              alt="poster"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          )}
        </div>


        <div className="relative z-10 w-[50%] flex flex-col justify-center text-white">
          {currSlide && (
            <>
              <div className="flex gap-3 w-fit px-3 py-1 bg-black/60 backdrop-blur-lg rounded shadow-lg text-white mb-3">
                <div className="top-rating">{currSlide.vote_average?.toFixed(1)}⭐</div>
                <div className="top-year">
                  {currSlide.release_date
                    ? currSlide.release_date.split("-")[0]
                    : currSlide.first_air_date?.split("-")[0]}
                </div>
                <div className="top-genre">{currSlide.type}</div>
              </div>

              <div className="text-3xl font-bold">{currSlide.title || currSlide.name}</div>
            </>
          )}
        </div>
      </div>

    </div>


  );
};

export default Poster;
