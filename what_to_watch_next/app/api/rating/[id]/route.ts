import { getUserFromRequest } from "@/server/lib/auth";
import { dbConnect } from "@/server/lib/db";
import { removeRating, updateRating } from "@/server/services/rating.services";
import { updateRatingSchema } from "@/server/validators/rating.schema";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();

        const ratingId = params.id
        const { userId } = await getUserFromRequest()
        const body = await req.json()

        const { rating } = updateRatingSchema.parse(body)
        const document = await updateRating({ userId, ratingId, rating: rating as 1 | 2 | 3 | 4 | 5 })

        return NextResponse.json(
            { updated: document },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message|| "Internal Server Error" },
            { status: 500 }
        );
    }

}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();

        const ratingId = params.id
        const { userId } = await getUserFromRequest()

        const document = await removeRating({ userId, ratingId })
        return NextResponse.json(
            { deleted: document },
            { status: 200 }
        )
    }
    catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}