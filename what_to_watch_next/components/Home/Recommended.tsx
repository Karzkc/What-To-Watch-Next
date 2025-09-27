import React, { useEffect, useState } from 'react';
import Slider from "../shadcn/Slider";
import { Movie } from "@/app/types/movie";

const Recommended = () => {
  const [moviesTodayData, setMoviesTodayData] = useState<Movie[]>([]); //*today trending movies
  const [moviesWeekData, setMoviesWeekData] = useState<Movie[]>([]); //* week movies
  const [showsTodayData, setShowsTodayData] = useState<Movie[]>([]); //*today trending shows
  const [showsWeekData, setShowsWeekData] = useState<Movie[]>([]); //* week shows
  const [loading, setLoading] = useState(true); //* loading (baad me)
  const [error, setError] = useState<string | null>(null); //* err msg

  const fetchTrendingData = async () => {
    try {
      setLoading(true);
      setError(null);

      //*fetching - promise.all - all req in one
      const [moviesTodayResponse, moviesWeekResponse, showsTodayResponse, showsWeekResponse] = await Promise.all([
        fetch(`/api/trending?period=day&type=movie`),
        fetch(`/api/trending?period=week&type=movie`),
        fetch(`/api/trending?period=day&type=tv`),
        fetch(`/api/trending?period=week&type=tv`)
      ]);

      if (!moviesTodayResponse.ok || !moviesWeekResponse.ok || !showsTodayResponse.ok || !showsWeekResponse.ok) {
        throw new Error('failed to fetch');
      }

      // parsing
      const [moviesTodayData, moviesWeekData, showsTodayData, showsWeekData] = await Promise.all([
        moviesTodayResponse.json(),
        moviesWeekResponse.json(),
        showsTodayResponse.json(),
        showsWeekResponse.json()
      ]);

      setMoviesTodayData(moviesTodayData.results?.slice(0, 10) || []);
      setMoviesWeekData(moviesWeekData.results?.slice(0, 10) || []);
      setShowsTodayData(showsTodayData.results?.slice(0, 10) || []);
      setShowsWeekData(showsWeekData.results?.slice(0, 10) || []);

    } catch (err) {
      console.error('Error fetching trending data:', err);
      setError('Failed to load trending data');
      //* if error - 
      setMoviesTodayData([]);
      setMoviesWeekData([]);
      setShowsTodayData([]);
      setShowsWeekData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  //*loading animation (add pulse)
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-8 rounded w-48 bg-gray-300"></div>
          <div className="h-64 rounded bg-gray-300"></div>
          <div className="h-8 rounded w-48 bg-gray-300"></div>
          <div className="h-64 rounded bg-gray-300"></div>
        </div>
      </div>
    );
  }

  // * error - blue to purple (tmr)
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchTrendingData}
            className="px-4 py-2 bg-purple-500 text-white rounded ease-in-out hover:bg-purple-600 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <section>
        <Slider
          params="Trending Movies"
          options={true}
          todayData={moviesTodayData}
          weekData={moviesWeekData}
          mediaType="movie"
        />
      </section>

      <section>
        <Slider
          params="Trending TV Shows"
          options={true}
          todayData={showsTodayData}
          weekData={showsWeekData}
          mediaType="tv"
        />
      </section>
    </div>
  );
};

export default Recommended;
