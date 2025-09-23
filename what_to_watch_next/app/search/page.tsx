"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Background from 'components/Background';

interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
}

const page = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [query, setQuery] = useState("");

    const handleAPI = async (searchQuery: string) => {
        try {
            if (!searchQuery || searchQuery.length < 1) {
                setMovies([]);
                return;
            }
            const res = await fetch(`/api/movies?query=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();

            if (data.results && data.results.length > 0) {
                setMovies(data.results);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error("API error:", error);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            handleAPI(query);
        }, 500);

        return () => clearTimeout(delay);
    }, [query]);

    return (
        <div className="min-h-screen text-white flex flex-col items-center pt-16">
            <Background />
            <div className="w-full mt-15 max-w-2xl px-4">
                <input
                    type="text"
                    placeholder="Type to search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="  w-[43.5%] z-10 p-3 fixed 
                    bg-transparent backdrop-blur-3xl border border-gray-700 rounded-md focus:outline-none shadow-lg
                    text-white placeholder-gray-100 "
                />

                <div className="mt-16 p-4 
                bg-transparent border overflow-scroll border-gray-700 rounded-lg shadow-lg backdrop-blur-3xl ">

                    {movies.length > 0 ? (
                        movies.map((item: Movie) => (
                            <Link href={`/movie/${item.id}`} key={item.id}>
                                <div className="flex -z-10 items-center space-x-4  mt-6 p-4 rounded-lg 
                                hover:bg-[#17112a] text-black hover:text-white transition-colors duration-200">

                                    {item.poster_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                            alt={item.title}
                                            className="w-24 rounded flex-shrink-0"
                                        />
                                    )}
                                    <div>
                                        <h1 className="text-2xl 
                                        -z-20  px-3 py-2  ">{item.title} ({item.release_date.slice(0, 4)})</h1>

                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="mt-6 text-center 
                        text-gray-800">
                            {query.length > 2 ? 'No movie found.' : 'Your movie results will appear here.'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default page
