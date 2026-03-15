import mongoose, { model, Model, models, Schema } from "mongoose";
import {userInfo} from '../lib/interfaces/userInfo.interfaces'

const userSchema = new Schema<userInfo>(
    {
        name: { type: String },
        email: { type: String, unique: true, sparse: true },
        password: { type: String },
        isGuest: { type: Boolean, default: false },
        role: {
            type: String,
            enum: ['user', 'guest'],
            default: 'user'
        }
    },
    { timestamps: true }
)

export const userModel : Model<userInfo> = models.User||model<userInfo>("User",userSchema)
