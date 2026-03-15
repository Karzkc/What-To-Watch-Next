import { getUserFromRequest } from "@/server/lib/auth";
import { dbConnect } from "@/server/lib/db";
import { watchlistModel } from "@/server/models/watchlist.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ tmdbId: string }> }) {
    await dbConnect()

    const { tmdbId } = await params
    const { userId } = await getUserFromRequest()

    const watchlist = await watchlistModel.findOne({
        userId,
        tmdbId: Number(tmdbId)
    })
    if (watchlist) {
        return NextResponse.json({
            "inWatchlist": true,
            "status": "watching"
        })
    }
    else{
        return NextResponse.json({
            "inWatchlist": false,
        })
        
    }
}