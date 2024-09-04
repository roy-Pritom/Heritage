import { model, Schema } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>({
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    reviewerId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


export const Review = model<IReview>('Review', reviewSchema);

