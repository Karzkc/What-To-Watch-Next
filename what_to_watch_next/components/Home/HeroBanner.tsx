'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SlidesData } from "@/app/types/banner"
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"
import { MdArrowOutward } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion";

const Poster = () => {
  const [allData, setAllData] = useState<SlidesData[]>([]);
  const [currSlide, setCurrSlide] = useState<SlidesData | null>(null);
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getSlidesData = async () => {
    try {
      const res = await fetch('/api/banner');
      if (!res.ok) throw new Error("Failed to fetch data from /api/banner");

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

    setCurrSlide(allData[Math.floor(Math.random() * allData.length)]);
    indexRef.current = 0;

    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        indexRef.current = (indexRef.current + 1) % allData.length;
        setCurrSlide(allData[indexRef.current]);
      }, 5000);
    };

    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [allData]);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % allData.length;
      setCurrSlide(allData[indexRef.current]);
    }, 5000);
  };

  const handleSlidesButton = (direction: number) => {
    if (allData.length === 0) return;
    indexRef.current = (indexRef.current + direction + allData.length) % allData.length;
    setCurrSlide(allData[indexRef.current]);
    resetInterval();
  };


  return (
    <div className="banner  relative w-full h-128 fl  shadow-lg cp overflow-hidden bg-gray-900 ">
      {/* framer animation , bw slide or fade */}
      {/* update - slide */}
      {currSlide?.backdrop_path && (
        <motion.div
          key={currSlide.backdrop_path}
          className="absolute inset-0 z-0"

          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${currSlide.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}

      <AnimatePresence mode="wait">
        {currSlide && (
          <motion.div
            key={currSlide.id}
            className="content fl w-[40%] gap-5 h-80 z-20 rounded-2xl bg-white/20 backdrop-blur-2xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* prev but */}
            <div
              className="prev-but hero-but absolute left-1 w-10 h-10 fl"
              onClick={() => handleSlidesButton(-1)}
            >
              <Button variant="secondary" size="icon" className="rounded-full">
                <ChevronLeftIcon />
              </Button>
            </div>

            {/* title img */}
            <div className="relative z-10 w-[30%] h-[70%] flex items-center justify-center self-center cp hover:scale-105 ease-in-out duration-300">
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

            {/* central content - text n all */}
            <div className="relative z-10 w-[50%] flex flex-col justify-center text-white">
              <div className="flex gap-1 w-fit px-3 py-1 bg-black/60 backdrop-blur-lg rounded shadow-lg text-white mb-3 font-forum">
                <div>{currSlide.vote_average?.toFixed(1)}⭐</div>
                <span>•</span>
                <div>
                  {currSlide.release_date
                    ? currSlide.release_date.split("-")[0]
                    : currSlide.first_air_date?.split("-")[0]}
                </div>
                <span className='font-extrabold'>•</span>
                <div>
                  {currSlide.genres?.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index !== currSlide.genres.length - 1 && ", "}
                    </span>
                  )) ?? <span>no</span>}
                </div>

              </div>

              <div className="text-3xl font-playfair font-bold">{currSlide.title || currSlide.name}</div>
              <Link href={`details/${currSlide?.type}/${currSlide?.id}`}>
                <div className="details-redirect z-10 mt-8 flex items-center justify-start font-josefin">
                  <Button variant="outline">
                    See Details <span className="text-sm text-black"><MdArrowOutward /></span>
                  </Button>
                </div>
              </Link>
            </div>

            {/* prev but */}

            <div
              className="next-but hero-but absolute right-1 w-10 h-10 fl"
              onClick={() => handleSlidesButton(1)}
            >
              <Button variant="secondary" size="icon" className="rounded-full ">
                <ChevronRightIcon />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Poster;
