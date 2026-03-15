import { getUserFromRequest } from "@/server/lib/auth";
import { dbConnect } from "@/server/lib/db";
import { addRating, getUserRatings } from "@/server/services/rating.services";
import { ratingValidatedSchema } from "@/server/validators/rating.schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { userId } = await getUserFromRequest();
        const body = await req.json();
        const { tmdbId, mediaType, rating } = ratingValidatedSchema.parse(body);

        const document = await addRating({ userId, tmdbId, mediaType, rating: rating as 1 | 2 | 3 | 4 | 5 });
        return NextResponse.json(
            { rating: document },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const { userId } = await getUserFromRequest();
        const ratings = await getUserRatings(userId);
        return NextResponse.json(
            { ratings: ratings },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}