"use client";

import GenreToggle from '@/components/movieNshows/GenreToggle';
import Slider from '@/components/shadcn/Slider';
import React, { useState, useEffect } from 'react';

const page = () => {
  // Show genres - keep same or modify if needed
  const showGenres = {
    Action: 28, Adventure: 12, Animation: 16, Comedy: 35, Crime: 80,
    Documentary: 99, Drama: 18, Family: 10751, Fantasy: 14, History: 36,
    Horror: 27, Music: 10402, Mystery: 9648, Romance: 10749, ScienceFiction: 878,
    TVMovie: 10770, Thriller: 53, War: 10752, Western: 37,
  };

  const [showsToday, setShowsToday] = useState([]);
  const [showsWeek, setShowsWeek] = useState([]);
  const [showsLatest, setShowsLatest] = useState([]);
  const [showsTopIMDB, setShowsTopIMDB] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShows() {
      try {
        setLoading(true);
        const [todayRes, weekRes, latestRes, topIMDBRes] = await Promise.all([
          fetch('/api/showsAPI?period=day'),
          fetch('/api/showsAPI?period=week'),
          fetch('/api/showsAPI'),
          fetch('/api/showsAPI')
        ]);
        const todayData = await todayRes.json();
        const weekData = await weekRes.json();
        const latestData = await latestRes.json();
        const topIMDBData = await topIMDBRes.json();

        setShowsToday(todayData.showsTrending || []);
        setShowsWeek(weekData.showsTrending || []);
        setShowsLatest(latestData.showsLatest || []);
        setShowsTopIMDB(topIMDBData.topIMDB || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchShows();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="heading-shows w-full flex justify-center pt-20 pb-8 bg-black sticky top-0 z-20">
            <div className='text-4xl font-bold tracking-tight text-white'>Explore Shows</div>
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
    <div className='Shows relative w-full min-h-screen flex flex-col items-start border border-gray-300 z-10'>
      <div className="heading-shows w-full flex justify-center pt-20 pb-8 bg-black sticky top-0 z-20">
        <div className='text-4xl font-bold tracking-tight text-white'>Explore Shows</div>
      </div>

      <div className="shows-sections flex flex-col w-full gap-12 px-12 py-8">
        {/* Genre */}
        <section className="h-48 w-full bg-black rounded-lg " >
          <GenreToggle data=" " mediaType="tv" />
        </section >
        <section>
          <Slider
            params="Trending Shows"
            options={true}
            todayData={showsToday}
            weekData={showsWeek}
            mediaType="tv"
          />
        </section>

        
        <section className="h-48 w-full bg-black rounded-lg border" />

        <section>
          <Slider
            params="Latest Releases"
            options={false}
            todayData={showsLatest}
            mediaType="tv"
          />
        </section>

        <section>
          <Slider
            params="IMDB Top Rated"
            options={false}
            todayData={showsTopIMDB}
            mediaType="tv"
          />
        </section>

      </div>
    </div>
  );
};

export default page;
