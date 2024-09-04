import { z } from "zod";


const createReviewValidationSchema = z.object({
    body: z.object({
        rating: z
            .number()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating cannot be more than 5"),
        comment: z.string().min(1, "Comment is required")
    })
})

export const ReviewValidationSchemas = {
    createReviewValidationSchema,

}