import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Property } from "../property/property.model";
import { IReview } from "./review.interface";
import { Review } from "./review.model";

// create review
const createReviewInToDb=async(payload:IReview,id:string,userId:string)=>{
    console.log(userId);
    const result=await Review.create({
        ...payload,
        propertyId:id,
        reviewerId:userId
    });
    return result;
}
// All review
const getReviewsFromDb=async(payload:IReview)=>{
    const result=await Review.find({}).populate('reviewerId');
    return result;
}
// get review by property Id
const getReviewsByPropertyIdFromDb=async(id:string)=>{
    if(!await Property.isPropertyExistById(id)){
        throw new AppError(httpStatus.NOT_FOUND,"Property Does not exist!")
    }
    const result=await Review.find({propertyId:id}).populate('propertyId reviewerId');
    return result;
}

export const ReviewServices={
    createReviewInToDb,
    getReviewsFromDb,
    getReviewsByPropertyIdFromDb
}