import React, { useEffect, useState } from 'react'
import Slider from "../shadcn/Slider"
import { Movie } from "@/app/types/movie"
import Note from '../Note'


const Recommended = () => {
  const [moviesTodayData, setMoviesTodayData] = useState<Movie[]>([])
  const [moviesWeekData, setMoviesWeekData] = useState<Movie[]>([])
  const [showsTodayData, setShowsTodayData] = useState<Movie[]>([])
  const [showsWeekData, setShowsWeekData] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrendingData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [moviesTodayResponse, moviesWeekResponse, showsTodayResponse, showsWeekResponse] = await Promise.all([
        fetch(`/api/trending?period=day&type=movie`),
        fetch(`/api/trending?period=week&type=movie`),
        fetch(`/api/trending?period=day&type=tv`),
        fetch(`/api/trending?period=week&type=tv`)
      ])
      if (
        !moviesTodayResponse.ok ||
        !moviesWeekResponse.ok ||
        !showsTodayResponse.ok ||
        !showsWeekResponse.ok
      ) {
        throw new Error('Failed to fetch')
      }
      const [moviesToday, moviesWeek, showsToday, showsWeek] = await Promise.all([
        moviesTodayResponse.json(),
        moviesWeekResponse.json(),
        showsTodayResponse.json(),
        showsWeekResponse.json(),
      ])
      setMoviesTodayData(moviesToday.results?.slice(0, 10) || [])
      setMoviesWeekData(moviesWeek.results?.slice(0, 10) || [])
      setShowsTodayData(showsToday.results?.slice(0, 10) || [])
      setShowsWeekData(showsWeek.results?.slice(0, 10) || [])
    } catch (err) {
      console.error('Error fetching trending data:', err)
      setError('Failed to load trending data')
      setMoviesTodayData([])
      setMoviesWeekData([])
      setShowsTodayData([])
      setShowsWeekData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingData()
  }, [])

  
  if (loading) {
    return (
      <div className="w-full min-h-[320px] mx-auto 
      bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 flex flex-col justify-center items-center ">
        <Note />
        <div className="animate-pulse space-y-8 w-full flex flex-col items-center">
          <div className="h-8 rounded w-48
           bg-gray-800 mb-4"></div>
          <div className="h-64 rounded w-full max-w-xl
           bg-gray-800"></div>
        </div>
        
      </div>
    )
  }

  // Err
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchTrendingData}
            className="px-4 py-2 
            bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="trending relative w-full max-w-8xl mx-auto mb-10 
    bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 rounded-xl py-8 px-2">
      <Note />


      
      <section className="mb-12">
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
  )
}

export default Recommended
