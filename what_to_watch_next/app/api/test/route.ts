import { dbConnect } from "@/lib/db";
import { userModel } from "@/models/user.model";
import { NextResponse } from "next/server";


export async function GET() {
    dbConnect()
    await userModel.create({
        name : "kartik",
        email: "hello@123",
        password:"1234",
        role:'guest'
    })
    return NextResponse.json("Created and isnerted")
}
