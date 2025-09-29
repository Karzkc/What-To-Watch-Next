import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error("TMDB Key err");
    return NextResponse.json({ error: "TMDB key error" }, { status: 500 });
  }

  const movieTrending = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
  const showTrending = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`;

  const moviePopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const showPopular = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

  const movieLatest = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
  const showLatest = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const reqObj = await Promise.all([
      fetch(movieTrending).then(res => res.json()),
      fetch(showTrending).then(res => res.json()),
      fetch(moviePopular).then(res => res.json()),
      fetch(showPopular).then(res => res.json()),
      fetch(movieLatest).then(res => res.json()),
      fetch(showLatest).then(res => res.json()),
    ]);

    return NextResponse.json({
      moviesTrending: reqObj[0].results.slice(0, 2),
      showsTrending: reqObj[1].results.slice(0, 2),
      moviesPopular: reqObj[2].results.slice(0, 2),
      showsPopular: reqObj[3].results.slice(0, 2),
      moviesLatest: reqObj[4].results.slice(0, 2),
      showsLatest: reqObj[5].results.slice(0, 2),
    });
  } catch (error) {
    console.error("Error fetching TMDB data:", error);
    return NextResponse.json({ error: "Failed to fetch TMDB data" }, { status: 500 });
  }
}
