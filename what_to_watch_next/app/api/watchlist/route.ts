import { getUserFromRequest } from "@/server/lib/auth";
import { dbConnect } from "@/server/lib/db";
import { addToWatchlist, getUserWatchlist } from "@/server/services/watchlist.services";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        await dbConnect();
        const userId = (await getUserFromRequest()).userId
        const body = await req.json()
        const { tmdbId, mediaType } = body;
        const media = mediaType.toLowerCase();

        if (!tmdbId || !mediaType) {
            return NextResponse.json(
                { error: "TMDB id or Media Type not Provided!" },
                { status: 400 }
            )
        }

        if (!["movie", 'tv'].includes(media)) {
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

export async function GET(req:Request) {
    try {
        await dbConnect();
        const {searchParams} = new URL(req.url)
        const status = searchParams.get("status")

        if (status && !["toWatch", "watching", "watched"].includes(status)) {
            return NextResponse.json(
                {error:"Invalid Status!"},
                {status:400}
            )
        }
        const auth = await getUserFromRequest()
        const document = await getUserWatchlist(auth.userId,status)

        return NextResponse.json(
            { watchlist: document },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server Error" },
            { status: 400 }
        )
    }

}