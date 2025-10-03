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

    const movieTrending = `https://api.themoviedb.org/3/trending/movie/${forPeriod}?api_key=${apiKey}`;
    const topIMDB = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
    const movieLatest = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

    

    try {
        const reqObj = await Promise.all([
            fetch(movieTrending).then(res => res.json()),
            fetch(movieLatest).then(res => res.json()),
            fetch(topIMDB).then(res => res.json()),
            
        ]);
        return NextResponse.json({
            moviesTrending: reqObj[0].results,
            movieLatest: reqObj[1].results,
            topIMDB: reqObj[2].results,
            

        });
    } catch (error) {
        console.error("Error fetching TMDB data:", error);
        return NextResponse.json({ error: "Failed to fetch TMDB data" }, { status: 500 });
    }


}