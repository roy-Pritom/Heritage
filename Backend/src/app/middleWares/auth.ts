import httpStatus from "http-status";
import AppError from "../error/AppError";
import catchAsync from "../utils/catchAsync"
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUserRole } from "../modules/auth/auth.constant";
import { User } from "../modules/user/user.model";

export const auth = (...requiredRoles:TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // check token is missing or not
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED,"You are not authorized!")
        }
        // check tokes is valid or not
        let decoded;
        try{
            decoded=jwt.verify(token,config.jwt_secret as string) as JwtPayload;
        }catch(err){
            throw new AppError(httpStatus.UNAUTHORIZED,"You are not authorized!")
        }
        //   console.log(decoded);
        //   console.log(requiredRoles);
          const {email,role}=decoded;
        //   check user is exist or not
        const user=await User.isUserExistByEmail(email);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not exist!");
        }
        // check role
        if(requiredRoles && !requiredRoles.includes(role)  ){
            throw new AppError(httpStatus.UNAUTHORIZED,"You are not authorized!")
            
        }

        // send user
        req.user=decoded as JwtPayload;
        next();
    })
}