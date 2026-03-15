import { ratingModel } from "../models/rating.model";
import { ratingInfo } from "../lib/interfaces/rating.interfaces";
import { Types } from "mongoose"

export async function addRating({ userId, tmdbId, mediaType, rating }: ratingInfo) {
    const existingRating = await ratingModel.findOne({ userId, tmdbId })
    if (existingRating) {
        throw new Error("The rating already Exists!");
    }

    const createRating = await ratingModel.create({
        userId,
        tmdbId,
        mediaType,  
        rating
    })

    return createRating;
}

export async function getUserRatings(userId: Types.ObjectId | string) {
    const rating = await ratingModel.find({ userId }).sort({ createdAt: -1 })
    return rating;
}

export async function updateRating({ userId, ratingId, rating }:
    { userId: Types.ObjectId | string, ratingId: Types.ObjectId | string, rating: 1 | 2 | 3 | 4 | 5 }) {
    const item = await ratingModel.findById(ratingId)
    if (!item) {
        throw new Error("Item not Found!");
    }

    if (item.userId.toString() !== userId) {
        throw new Error("Unauthorized");

    }
    item.rating = rating
    await item.save()
    return item;
}

export async function removeRating({ userId, ratingId }: { userId: Types.ObjectId | string, ratingId: Types.ObjectId | string }) {
    const item = await ratingModel.findById(ratingId)
    if (!item) {
        throw new Error("Item not Found!");
    }

    if (item.userId.toString() !== userId) {
        throw new Error("Unauthorized");

    }

    const deleteItem = await item.deleteOne()
    return deleteItem;
}