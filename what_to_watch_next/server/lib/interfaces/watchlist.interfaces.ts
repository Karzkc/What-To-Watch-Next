import { Date} from "mongoose"
import { Types } from "mongoose"

export interface watchlistInfo {
    _id?: Types.ObjectId 
    userId: Types.ObjectId  | string,
    watchlistItemId?: Types.ObjectId  | string,
    tmdbId?: number,
    mediaType?: 'movie' | 'tv',
    status?: 'planned' | 'watching' | 'completed'
    createdAt?: Date,
    updatedAt?: Date
}