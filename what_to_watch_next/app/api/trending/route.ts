import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const forPeriod = searchParams.get("period");
        const mediaType = searchParams.get("type") || "movie";

        // * getting param for day or week
        if (!forPeriod || !['day', 'week'].includes(forPeriod)) {
            return NextResponse.json(
                { error: "Invalid period. must be 'day' or 'week'" },
                { status: 400 }
            );
        }

        if (!['movie', 'tv'].includes(mediaType)) {
            return NextResponse.json(
                { error: "Invalid type. must be 'movie' or 'tv'" },
                { status: 400 }
            );
        }

        const apiKey = process.env.TMDB_API_KEY;
        if (!apiKey) {
            console.error("TMDB Key err");
            return NextResponse.json(
                { error: "TMDB key error" },
                { status: 500 }
            );
        }

        const url = `https://api.themoviedb.org/3/trending/${mediaType}/${forPeriod}?api_key=${apiKey}&include_adult=false
    &certification_country=US
    &certification.lte=PG-13
  `.replace(/\s+/g, '');

        const res = await fetch(url, {
            next: { revalidate: 300 } // ISR , 5 min cacheing
        });

        if (!res.ok) {
            console.error(`TMDB key err: ${res.status} ${res.statusText}`);
            return NextResponse.json(
                { error: "failed to fetch" },
                { status: res.status }
            );
        }

        const data = await res.json();

        //* (later 2) headers for csr
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
            }
        });

    } catch (error) {
        console.error(" server error:", error);
        return NextResponse.json(
            { error: " Server Error" }, { status: 500 }
        );
    }
}
