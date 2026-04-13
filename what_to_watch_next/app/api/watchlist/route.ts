import { getUserFromRequest } from "@/server/lib/auth"
import { dbConnect } from "@/server/lib/db"
import { addToWatchlist, getUserWatchlist } from "@/server/services/watchlist.services"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        await dbConnect()
        const userId = (await getUserFromRequest()).userId

        const body = await req.json()
        const { tmdbId, mediaType } = body
        const media = mediaType.toLowerCase()

        if (!tmdbId || !mediaType) {
            return NextResponse.json(
                { error: "TMDB id or Media Type not Provided!" },
                { status: 400 }
            )
        }

        if (!["movie", "tv"].includes(media)) {
            return NextResponse.json(
                { error: "Provide appropriate Media Type" },
                { status: 400 }
            )
        }

        const document = await addToWatchlist({ userId, tmdbId, mediaType })

        return NextResponse.json(
            { watchlistItem: document },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server Error" },
            { status: 400 }
        )
    }
}

export async function GET(req: Request) {
    try {
        await dbConnect()

        const { searchParams } = new URL(req.url)
        const status = searchParams.get("status")

        if (status && !["planned", "watching", "completed"].includes(status)) {
            return NextResponse.json(
                { error: "Invalid Status!" },
                { status: 400 }
            )
        }

        const auth = await getUserFromRequest()
        const watchlist = await getUserWatchlist(auth.userId, status)

        const apiKey = process.env.TMDB_API_KEY

        const enriched = await Promise.all( // adding extra data liek title poster etc
            watchlist.map(async (item: any) => {
                try {
                    const res = await fetch(
                        `https://api.themoviedb.org/3/${item.mediaType}/${item.tmdbId}?api_key=${apiKey}`
                    )

                    const data = await res.json()
                    return {
                        _id: item._id,
                        tmdbId: item.tmdbId || item.tmdb_id,
                        mediaType: item.mediaType || item.media_type,

                        status: item.status,

                        title: data.title || data.name,
                        posterPath: data.poster_path
                    }
                } catch (err) {
                    console.error("TMDB fetch error:", err)
                    return item._doc
                }
            })
        )

        return NextResponse.json(
            { watchlist: enriched },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server Error" },
            { status: 400 }
        )
    }
}