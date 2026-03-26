import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ mediaType: string; id: string }> }) {

    const { mediaType, id } = await params

    if (!["movie", "tv"].includes(mediaType)) {
        return NextResponse.json({ error: "Invalid Media Type!" }, { status: 400 })
    }

    const url = `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${process.env.TMDB_API_KEY}`

    const res = await fetch(url)
    const data = await res.json()

    return NextResponse.json(data.results)
}