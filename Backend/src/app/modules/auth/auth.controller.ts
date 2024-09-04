import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
// import config from "../../config";

const loginUser=catchAsync(async(req,res)=>{
   const result=await AuthServices.loginUserIntoDb(req.body);
   const {refreshToken}=result;
   res.cookie('refreshToken', refreshToken, {
    httpOnly: true
})
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"User Login successfully",
    data:result
   })
})
const generateAccessTokenByRefreshToken=catchAsync(async(req,res)=>{
    const { refreshToken } = req.cookies;
  
   const result=await AuthServices.refreshToken(refreshToken);
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Access token is retrieved successfully!",
    data:result
   })
})

export const AuthControllers={
    loginUser,
    generateAccessTokenByRefreshToken
}