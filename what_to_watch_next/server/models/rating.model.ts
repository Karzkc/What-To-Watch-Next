import mongoose, { model, models, Schema } from "mongoose";
import { ratingInfo } from "../lib/interfaces/rating.interfaces";

const ratingSchema = new Schema<ratingInfo>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        tmdbId: {
            type: Number,
            required: true
        },

        mediaType: {
            type: String,
            enum: ["movie", "tv"],
            required: true
        },

        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true
        }
    },
    {
        timestamps: true
    }

)

ratingSchema.index({ userId: 1, tmdbId: 1 }, { unique: true })

export const ratingModel = models.Rating || model("Rating", ratingSchema)