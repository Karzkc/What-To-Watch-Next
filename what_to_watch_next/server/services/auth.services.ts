import { userModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server'; 

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error("Secret not found")
}

export async function registerUser(data: { name: string, email: string, password: string }) {
    const { name, email, password } = data;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userModel.create({ name, email, password: passwordHash, role: 'user' });

    const userObj = user.toObject()
    delete userObj.password

    return userObj;
}

export async function loginUser(email: string, password: string) {
    const user = await userModel.findOne({ email })
    if (!user) {
        throw new Error("Invalid Credentials!")
    }

    const isCorrect = bcrypt.compare(password, user.password || "")
    if (!isCorrect) {
        throw new Error("Invalid Credentials!");
    }

    const userObj = user.toObject()
    delete userObj.password;

    return userObj

}

export async function tokenGenerator(userID: string, role: string) {
    return jwt.sign(
        { userID, role },
        JWT_SECRET as string,
        { expiresIn: "2d" }
    )
}