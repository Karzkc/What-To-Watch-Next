import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error("TMDB Key err");
    return NextResponse.json({ error: "TMDB key error" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const forPeriod = searchParams.get("period");
  // const forGenre = searchParams.get("genre");


  const period = forPeriod === "day" || forPeriod === "week" ? forPeriod : "day";

  const showTrending = `https://api.themoviedb.org/3/trending/tv/${period}?api_key=${apiKey}&language=en-US&include_adult=false
    &certification_country=US
    &certification.lte=PG-13
  `.replace(/\s+/g, '');
  const topIMDB = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1
  `.replace(/\s+/g, '');
  const showLatest = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1&include_adult=false
    &certification_country=US
    &certification.lte=PG-13
  `.replace(/\s+/g, '');


  try {
    const fetches = [
      fetch(showTrending).then(res => res.json()),
      fetch(showLatest).then(res => res.json()),
      fetch(topIMDB).then(res => res.json())
    ];



    const reqObj = await Promise.all(fetches);

    return NextResponse.json({
      showsTrending: reqObj[0].results,
      showsLatest: reqObj[1].results,
      topIMDB: reqObj[2].results,

    });
  } catch (error) {
    console.error("Error fetching TMDB data:", error);
    return NextResponse.json({ error: "Failed to fetch TMDB data" }, { status: 500 });
  }
}
