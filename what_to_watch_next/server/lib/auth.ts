import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET!
if (!JWT_SECRET) {
    throw new Error("Secret not found");
}

export function verifyToken(token:string): any {
    try {
       const payload = jwt.verify(token,JWT_SECRET) 
    
       return payload
    } catch (error) {
        throw new Error("Invalid Token")
    }
}

export async function getUserFromRequest() {
    const cookie = await cookies()
    const token = cookie.get("token")
    if (!token) {
        throw new Error("Unauthorized");
    }
    const payload = verifyToken(token.value)
    const {userId,role} = payload
    return {userId,role}
}