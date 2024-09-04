import { Types } from "mongoose";

export interface IReview {
    propertyId: Types.ObjectId;
    rating: number;
    comment: string;
    reviewerId:Types.ObjectId;
    isDeleted:boolean;
  }