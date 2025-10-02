import React from "react";

// import ErrorRetry from "@/components/ErrorRetry";

async function getDetails(mediaType: string, id: string) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB API key is not defined");

  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

async function getVideo(mediaType: string, id: string) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB API key is not defined");

  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

export default async function DetailPage({
  params,
}: {
  params: { media_type: "movie" | "tv"; id: string };
}) {
  const { media_type, id } = params;

  const [details, videoData] = await Promise.all([
    getDetails(media_type, id),
    getVideo(media_type, id),
  ]);

  if (!details) {
    return (
      <div className="min-h-screen text-white pt-16 text-center">
        {media_type === "movie" ? "Movie" : "Show"} not found.
      </div>
    );
  }

  const trailer = videoData?.results?.find(
    (video: any) => video.site === "YouTube" && video.type === "Trailer"
  );
  const trailerKey = trailer ? trailer.key : null;

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 text-white mb-25">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
        className="fixed top-0 left-0 -z-10 h-screen w-screen"
      ></div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 p-5 bg-black/30 backdrop-blur-2xl">
          <img
            src={`https://image.tmdb.org/t/p/w200${details.poster_path}`} 
            alt={details.title ?? details.name}
            className="rounded-lg shadow-lg object-cover self-start"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-playfair font-bold mb-2">
              {details.title ?? details.name}
            </h1>
            <p className="mb-4 text-lg text-gray-300 font-cormorant italic">
              {details.tagline}
            </p>
            <div className="flex items-center gap-4 mb-4 text-gray-400 font-forum">
              <span>
                {(details.release_date ?? details.first_air_date)?.substring(
                  0,
                  4
                )}
              </span>
              <span>•</span>
              {media_type === "movie" && (
                <>
                  <span>{details.runtime} min</span>
                  <span>•</span>
                </>
              )}
              <span className="flex items-center gap-1">
                ⭐ {details.vote_average?.toFixed(1)}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-200 font-tenor">{details.overview}</p>
          </div>
        </div>
        <div className="fl">
          {trailerKey ? (
            <div className="mt-7 fl mx-auto">
              <div className="w-120 h-70">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title={`${details.title ?? details.name} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg border-0 focus:outline-none"
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="w-60 mt-7 fl mx-auto text-white backdrop-blur-2xl">
              No Trailer Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
