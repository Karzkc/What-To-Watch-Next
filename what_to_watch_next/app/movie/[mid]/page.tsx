import React from 'react';

async function getMovieById(id: string) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB API key is not defined");
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
  if (!res.ok) return null;
  return res.json();
}

async function getVideo(id: string) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB API key is not defined");
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function MovieDetailPage({ params }: { params: { mid: string } }) {
  const movieDataPromise = getMovieById(params.mid);
  const videoDataPromise = getVideo(params.mid);

  const [movie, videoData] = await Promise.all([movieDataPromise, videoDataPromise]);

  if (!movie) {
    return <div className="min-h-screen text-white pt-16 text-center">Movie not found.</div>;
  }

  const trailer = videoData?.results?.find(
    (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
  );
  const trailerKey = trailer ? trailer.key : null;

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg  object-cover self-start"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-lg text-gray-300 mb-4 italic">{movie.tagline}</p>
            <div className="flex items-center gap-4 mb-4 text-gray-400">
              <span>{movie.release_date?.substring(0, 4)}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-200">{movie.overview}</p>
          </div>
        </div>
        {trailerKey && (
          <div className="mt-8 shadow-lg fl">
            <div className="w-120 h-70">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg border-0 focus:outline-none"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}