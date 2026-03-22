import { watchlistModel } from "../models/watchlist.model";
import { watchlistInfo } from '../lib/interfaces/watchlist.interfaces'
import mongoose from "mongoose";


export async function addToWatchlist({ userId, tmdbId, mediaType }: watchlistInfo) {
    const ifExists = await watchlistModel.findOne({ userId, tmdbId })
    if (ifExists) {
        throw new Error(`This ${mediaType} already Exists in Watchlist!`);

    }
    const createNew = await watchlistModel.create({
        userId,
        tmdbId,
        mediaType
    })
    return createNew
}

export async function getUserWatchlist(userId: string, status?: string | null) {
    const query: { userId: string; status?: string | null } = { userId }

    if (status) {
        query.status = status
    }

    const watchlist = await watchlistModel.find(query).sort({ createdAt: -1 }).lean()

    return watchlist
}

export async function updateWatchStatus({ userId, watchlistItemId, status }: watchlistInfo) {
    const item = await watchlistModel.findById(watchlistItemId)
    if (!item) {
        throw new Error("Item not Found");
    }

    if (item.userId.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    item.status = status
    await item.save()
    return item
}

export async function removeFromWatchlist({
  userId,
  watchlistItemId
}: watchlistInfo) {
  const deletedItem = await watchlistModel.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(watchlistItemId),
    userId: new mongoose.Types.ObjectId(userId)
  })

  if (!deletedItem) {
    throw new Error("Item not found or unauthorized")
  }

  return deletedItem
}