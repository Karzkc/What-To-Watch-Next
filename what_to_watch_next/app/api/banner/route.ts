import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error("TMDB Key err");
    return NextResponse.json({ error: "TMDB key error" }, { status: 500 });
  }

  const movieTrendingUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
  const showTrendingUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`;

  const moviePopularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const showPopularUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

  const movieLatestUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
  const showLatestUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`;

  const movieGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
  const showGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`;

  try {

    const [
      movieTrending,
      showTrending,
      moviePopular,
      showPopular,
      movieLatest,
      showLatest,
      movieGenresRes,
      showGenresRes,
    ] = await Promise.all([
      fetch(movieTrendingUrl).then((res) => res.json()),
      fetch(showTrendingUrl).then((res) => res.json()),
      fetch(moviePopularUrl).then((res) => res.json()),
      fetch(showPopularUrl).then((res) => res.json()),
      fetch(movieLatestUrl).then((res) => res.json()),
      fetch(showLatestUrl).then((res) => res.json()),
      fetch(movieGenresUrl).then((res) => res.json()),
      fetch(showGenresUrl).then((res) => res.json()),
    ]);


    const movieGenreMap = new Map();
    movieGenresRes.genres.forEach((g: { id: number; name: string }) => {
      movieGenreMap.set(g.id, g.name);
    });

    const showGenreMap = new Map();
    showGenresRes.genres.forEach((g: { id: number; name: string }) => {
      showGenreMap.set(g.id, g.name);
    });


    function mapGenresToObjects(genreIds: number[], isMovie: boolean) {
      const genreMap = isMovie ? movieGenreMap : showGenreMap;
      return genreIds.map((id) => ({
        id,
        name: genreMap.get(id) || "Unknown",
      }));
    }


    function attachGenres(items: Record<string, unknown>[], isMovie: boolean) {
      return items.map((item: Record<string, unknown>) => ({
        ...item,
        genres: Array.isArray(item.genre_ids)
          ? mapGenresToObjects(item.genre_ids, isMovie)
          : [],
      }));
    }

    return NextResponse.json({
      moviesTrending: attachGenres(movieTrending.results.slice(0, 2), true),
      showsTrending: attachGenres(showTrending.results.slice(0, 2), false),
      moviesPopular: attachGenres(moviePopular.results.slice(0, 2), true),
      showsPopular: attachGenres(showPopular.results.slice(0, 2), false),
      moviesLatest: attachGenres(movieLatest.results.slice(0, 2), true),
      showsLatest: attachGenres(showLatest.results.slice(0, 2), false),
    });
  } catch (error) {
    console.error("Error fetching TMDB data:", error);
    return NextResponse.json({ error: "Failed to fetch TMDB data" }, { status: 500 });
  }
}
