import { Video } from "@/app/types/movie"
import Note from "@/components/Note"
import Image from "next/image"
import WatchlistButton from "@/components/watchlist/WatchlistButton"
import SimilarSlider from "@/components/details/SimilarSection"
import Rating from "@/components/details/Rating"

async function getDetails(mediaType: string, id: string) {
  const apiKey = process.env.TMDB_API_KEY
  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`
  )
  return res.json()
}

async function getVideo(mediaType: string, id: string) {
  const apiKey = process.env.TMDB_API_KEY
  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}`
  )
  return res.json()
}

async function getSimilar(mediaType: string, id: string) {
  const apiKey = process.env.TMDB_API_KEY
  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${apiKey}`
  )
  return res.json()
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ media_type: "movie" | "tv"; id: string }>
}) {
  const { media_type, id } = await params

  const [details, videoData, similarData] = await Promise.all([
    getDetails(media_type, id),
    getVideo(media_type, id),
    getSimilar(media_type, id),
  ])

  if (!details) {
    return (
      <div className="min-h-screen text-white pt-16 text-center">
        Not found.
      </div>
    )
  }

  const trailer = videoData?.results?.find(
    (video: Video) =>
      video.site === "YouTube" && video.type === "Trailer"
  )

  const trailerKey = trailer?.key

  return (
    <div className="min-h-screen pt-50 sm:pt-40 lg:pt-25 px-4 sm:px-8 pb-20 text-white">

      
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) ",
          
        }}
        className="fixed top-0 left-0 -z-10 h-screen w-screen"
      />

      <div className="max-w-5xl mx-auto">

        
        <div className="flex flex-col md:flex-row gap-8 p-5 
        bg-black/30 backdrop-blur-2xl rounded-lg">

          <Image
            src={`https://image.tmdb.org/t/p/w200${details.poster_path}`}
            alt={details.title ?? details.name}
            width={200}
            height={300}
            className="rounded-lg shadow-lg"
          />

          <div className="flex-1">

            <h1 className="text-4xl font-playfair font-bold mb-2">
              {details.title ?? details.name}
            </h1>

            <p className="mb-4 text-lg text-gray-300 font-cormorant italic">
              {details.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-gray-400 font-forum">

              <span>
                {(details.release_date ?? details.first_air_date)?.substring(0, 4)}
              </span>

              <span>•</span>

              {media_type === "movie" && (
                <>
                  <span>{details.runtime} min</span>
                  <span>•</span>
                </>
              )}

              {details.genres?.map((g: any, i: number) => (
                <span key={g.id}>
                  {g.name}{i !== details.genres.length - 1 && ","}
                </span>
              ))}

              <span>• ⭐ {details.vote_average?.toFixed(1)}</span>
            </div>

            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-200 font-tenor">
              {details.overview}
            </p>

            <div className="mt-5">
              <WatchlistButton tmdbId={id} mediaType={media_type} />
              <Rating tmdbId={id} mediaType={media_type} />
            </div>

          </div>
        </div>

       
        <div className="mt-10">
          {trailerKey ? (
            <div className="max-w-xl mx-auto">
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <div className="text-center mt-5 text-gray-300">
              No Trailer Available
            </div>
          )}
        </div>

       
        <SimilarSlider
          data={similarData?.results || []}
          mediaType={media_type}
        />

      </div>

      <Note />
    </div>
  )
}