import { Date} from "mongoose"
import { Types } from "mongoose"

export interface ratingInfo {
    userId: Types.ObjectId | string,
    tmdbId: number,
    mediaType: 'movie' | 'tv',
    rating: 1 | 2 | 3 | 4 | 5,
    createdAt?: Date,
    updatedAt?: Date
}
