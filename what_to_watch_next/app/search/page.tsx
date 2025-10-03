'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Background from 'components/Background';
import Note from '@/components/Note';
import Image from 'next/image';


type SearchResult = {
  id: number;
  media_type: 'movie' | 'tv' | 'person'; // will filter person out if unwanted
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
};

const SearchPage = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');

  const handleAPI = async (searchQuery: string) => {
    try {
      if (!searchQuery || searchQuery.length < 1) {
        setResults([]);
        return;
      }

      const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        // Filter out persons if you want only movies / shows
        const filtered = data.results.filter((item: SearchResult) => item.media_type !== 'person');
        setResults(filtered);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      handleAPI(query);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="h-[90vh] text-white flex flex-col items-center pt-16">
      <Background />
      <div className="w-full mt-15 max-w-2xl px-4">
        <input
          type="text"
          placeholder="Type to search for movies or TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[43.5%] z-10 p-3 fixed bg-transparent backdrop-blur-3xl border border-gray-700 rounded-md focus:outline-none shadow-lg text-white placeholder-gray-
          placeholder:font-playfair"
        />

        <div className="mt-16 p-4 bg-transparent border overflow-auto border-gray-700 rounded-lg shadow-lg backdrop-blur-3xl max-h-[60vh]">
          {results.length > 0 ? (
            results.map((item) => (
              <Link key={item.id} href={`/details/${item.media_type}/${item.id}`}>

                <div className="flex items-center space-x-4 mt-6 p-4 rounded-lg hover:bg-[#17112a] text-black hover:text-white transition-colors duration-200 cursor-pointer">
                  {item.poster_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                      alt={"Movie Poster"}
                      width={200}
                      height={294}
                      className="w-24 rounded flex-shrink-0"
                    />
                  )}
                  <div>
                    <h1 className="text-2xl px-3 py-2 font-playfair font-bold">
                      {item.title || item.name} (
                      {(item.release_date || item.first_air_date)?.slice(0, 4)})
                    </h1>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="mt-6 text-center text-gray-800 font-playfair">
              {query.length > 2 ? 'No results found.' : 'Type to search movies and TV shows.'}
            </p>
          )}
        </div>
      </div>
      {(query.length>0 && results.length>0)?"":<Note />}
      
    </div>
  );
};

export default SearchPage;
