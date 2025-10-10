import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error("TMDB Key err");
    return NextResponse.json({ error: "TMDB key error" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const forGenre = searchParams.get("genre");
  const forType = searchParams.get("type");

  if (!forGenre || !forType) {
    return NextResponse.json({ error: "Missing genre or type parameter" }, { status: 400 });
  }

 
  const genreBasis = `
    https://api.themoviedb.org/3/discover/${forType}?
    api_key=${apiKey}
    &with_genres=${forGenre}
    &sort_by=vote_average.desc
    &vote_count.gte=500
    &include_adult=false
    &certification_country=US
    &certification.lte=PG-13
  `.replace(/\s+/g, ''); 

  try {
    const genreObj = await fetch(genreBasis);
    if (!genreObj.ok) {
      throw new Error("TMDB fetch failed");
    }
    const res = await genreObj.json();

    // explicit content filteratiomn
    const genreDataFiltered = Array.isArray(res.results) 
      ? res.results.filter((item:{adult:boolean}) => !item.adult) 
      : [];

    return NextResponse.json({
      genreData: genreDataFiltered
    });
  } catch (error) {
    console.error("Error fetching Genre:", error);
    return NextResponse.json({ error: "Failed to fetch Genre data" }, { status: 500 });
  }
}
