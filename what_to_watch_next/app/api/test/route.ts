import { dbConnect } from "@/lib/db";
import { Test } from "@/models/test.model";

export async function GET() {
    await Test.create({ name: "hello" });

    return Response.json({ message: "Inserted" });
}