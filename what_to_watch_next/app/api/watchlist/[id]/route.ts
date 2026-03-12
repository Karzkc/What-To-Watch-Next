import { getUserFromRequest } from "@/server/lib/auth";
import { dbConnect } from "@/server/lib/db";
import { removeFromWatchlist, updateWatchStatus } from "@/server/services/watchlist.services";
import { NextResponse } from "next/server";



export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const watchlistItemId = params.id

        await dbConnect();
        const auth = await getUserFromRequest()
        const userId = auth.userId;

        const body = await req.json()
        const { status } = body
        if (!['planned', 'watching', 'completed'].includes(status)) {
            return NextResponse.json(
                { error: "Wrong Status!" },
                { status: 400 }
            )
        }
        const document = await updateWatchStatus({ userId, watchlistItemId, status })
        return NextResponse.json(
            { updatedItem: document },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server Error" },
            { status: 400 }
        )
    }

}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const watchlistItemId = params.id

        await dbConnect();
        const auth = await getUserFromRequest()
        const userId = auth.userId;

        const document = await removeFromWatchlist({ userId, watchlistItemId })
        return NextResponse.json(
            { deletedItem: document },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server Error" },
            { status: 400 }
        )
    }
}