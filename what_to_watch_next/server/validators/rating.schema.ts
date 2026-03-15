import { z } from 'zod'

export const ratingValidatedSchema = z.object({
    tmdbId: z.number()
        .int()
        .positive()
        .min(1),

    mediaType: z.enum(["movie", "tv"]),

    rating: z.number()
        .int()
        .min(1)
        .max(5)

})

export const updateRatingSchema = z.object({
    rating: z.number()
        .int()
        .min(1)
        .max(5)
})