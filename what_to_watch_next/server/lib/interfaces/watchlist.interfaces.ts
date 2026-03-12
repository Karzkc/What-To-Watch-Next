import { Date, ObjectId } from "mongoose"

export interface watchlistInfo {
    _id?: ObjectId
    userId: ObjectId | string,
    watchlistItemId?: ObjectId | string,
    tmdbId?: number,
    mediaType?: 'movie' | 'tv',
    status?: 'planned' | 'watching' | 'completed'
    createdAt?: Date,
    updatedAt?: Date
}