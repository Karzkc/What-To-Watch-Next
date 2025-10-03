"use client"
import GenreToggle from '@/components/movieNshows/GenreToggle';
import Note from '@/components/Note';
import Slider from '@/components/shadcn/Slider';
import React, { useState, useEffect } from 'react';

const MoviesPage = () => {
  

  const [moviesToday, setMoviesToday] = useState([]);
  const [moviesWeek, setMoviesWeek] = useState([]);
  const [moviesLatest, setMoviesLatest] = useState([]);
  const [moviesTopIMDB, setMoviesTopIMDB] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const [todayRes, weekRes, latestRes, topIMDBRes] = await Promise.all([
          fetch('/api/movieAPI?period=day'),
          fetch('/api/movieAPI?period=week'),
          fetch('/api/movieAPI'),
          fetch('/api/movieAPI'),
        ]);
        const todayData = await todayRes.json();
        const weekData = await weekRes.json();
        const latestData = await latestRes.json();
        const topIMDBData = await topIMDBRes.json();

        setMoviesToday(todayData.moviesTrending || []);
        setMoviesWeek(weekData.moviesTrending || []);
        setMoviesLatest(latestData.movieLatest || []);
        setMoviesTopIMDB(topIMDBData.topIMDB || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800">
        <div className="animate-pulse space-y-8">
          <div className="heading-movies w-full flex justify-center pt-20 pb-8  sticky top-0 z-20">
            <div className='text-4xl font-bold tracking-tight text-white font-playfair'>Explore Movies</div>
          </div>
          <div className="h-8 rounded w-48 bg-gray-300"></div>
          <div className="h-64 rounded bg-gray-300"></div>
          <div className="h-8 rounded w-48 bg-gray-300"></div>
          <div className="h-64 rounded bg-gray-300"></div>
          <div className="h-8 rounded w-48 bg-gray-300"></div>
          <div className="h-64 rounded bg-gray-300"></div>
          <div className="h-8 rounded w-48 bg-gray-300"></div>
          <div className="h-64 rounded bg-gray-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='Movies relative w-full min-h-screen flex flex-col items-start bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800 z-10'>
      <div className="heading-movies w-full flex justify-center pt-20 pb-8 backdrop-blur-3xl sticky top-0 z-20">
        <div className='text-4xl font-bold tracking-tight text-white font-playfair'>Explore Movies</div>
      </div>

      <div className="movies-sections flex flex-col w-full gap-12 px-12 py-8">

        {/* Genre */}

        <section className="w-full  rounded-lg bg-black/80 backdrop-blur-3xl " >
          <GenreToggle mediaType = "movie" />
        </section >
        
        <section>
          <Slider
            params="Trending Movies"
            options={true}
            todayData={moviesToday}
            weekData={moviesWeek}
            mediaType="movie"
          />
        </section>

        <section>
          <Slider
            params="Latest Releases"
            options={false}
            todayData={moviesLatest}
            mediaType="movie"
          />
        </section>

       
        <section>
          <Slider
            params="IMDB Top Rated"
            options={false}
            todayData={moviesTopIMDB}
            mediaType="movie"
          />
        </section>

        <Note />
      </div>
    </div>
  );
};

export default MoviesPage;
