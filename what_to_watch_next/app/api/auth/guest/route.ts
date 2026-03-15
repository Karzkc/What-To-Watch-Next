import { dbConnect } from "@/server/lib/db";
import { userModel } from "@/server/models/user.model";
import { tokenGenerator } from "@/server/services/auth.services";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const existingToken = cookieStore.get("token");

        if (existingToken) {
            return NextResponse.json(
                { message: "Session already exists" },
                { status: 200 }
            );
        }

        const guestUser = await userModel.create({
            name: `Guest-${Math.floor(Math.random() * 10000)}`,
            role: "guest",
            isGuest: true,
        });

        const token = await tokenGenerator(guestUser._id.toString(), guestUser.role);

        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json(
            {
                message: "Guest session started",
                user: {
                    id: guestUser._id,
                    name: guestUser.name,
                    role: guestUser.role,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Server Error",
            },
            { status: 500 }
        );
    }
}