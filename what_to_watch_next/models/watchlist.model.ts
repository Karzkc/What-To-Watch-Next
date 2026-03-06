import mongoose, { Schema, models, model } from "mongoose";
import { watchlistInfo } from '../lib/interfaces/watchlist.interfaces'

const watchlistSchema = new Schema<watchlistInfo>(
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
            enum: ["movie","tv"],
            required: true
        },

        status: {
            type: String,
            enum: ["planned", "watching", "completed"],
            default: "planned"
        }
    },
    {
        timestamps: true
    }
)
watchlistSchema.index({ userId: 1, tmdbId: 1 }, { unique: true })

export const watchlistModel = models.Watchlist || model("Watchlist",watchlistSchema)