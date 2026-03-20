import { dbConnect } from "@/server/lib/db";
import { loginUser, tokenGenerator } from "@/server/services/auth.services";
import { loginSchema } from "@/server/validators/auth.schema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";



export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json()
        const { email, password } = body;
        const parse = loginSchema.parse(body)

        const user = await loginUser(email, password)

        const token = await tokenGenerator(user._id.toString(), user.role!)

        const cookie = await cookies();
        cookie.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })
        return NextResponse.json(
            { message: "User logged in successfully" },
            { status: 201 }
        )

    } catch (error) {

        if (error instanceof ZodError) {
            const fieldErrors: Record<string, string> = {}

            error.issues.forEach((err) => {
                const field = err.path[0] as string
                fieldErrors[field] = err.message
            })

            return NextResponse.json(
                { errors: fieldErrors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Server Error" },
            { status: 400 }
        )
    }
}