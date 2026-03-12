import { getUserFromRequest } from "@/server/lib/auth";
import { dbConnect } from "@/server/lib/db";
import { userModel } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect()
        const auth = await getUserFromRequest()

        const user = await userModel
            .findById(auth.userId)
            .select("-password")

        if (!user) {
            return NextResponse.json(
                { error: "User not Found" },
                { status: 404 }
            )
        }
        return NextResponse.json({ user }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        )
    }

}