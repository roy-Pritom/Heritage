import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";

const createReview=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const {id:userId}=req.user;
    const result=await ReviewServices.createReviewInToDb(req.body,id,userId)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Review created successfully",
        data:result
    })
})
const getAllReview=catchAsync(async(req,res)=>{
    const result=await ReviewServices.getReviewsFromDb(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Reviews fetch successfully",
        data:result
    })
})
const getReviewsByProductId=catchAsync(async(req,res)=>{
    const {productId}=req.params;
    const result=await ReviewServices.getReviewsByPropertyIdFromDb(productId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Reviews retrieve successfully",
        data:result
    })
})

export const ReviewControllers={
    createReview,
    getAllReview,
    getReviewsByProductId

}