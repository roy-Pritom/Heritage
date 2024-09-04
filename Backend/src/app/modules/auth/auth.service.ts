import config from "../../config";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TUserLogin } from "./auth.interface";
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
const loginUserIntoDb = async (payload: TUserLogin) => {
    // check user is exist or not
    const user = await User.isUserExistByEmail(payload.email)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not exist!');
    }

    // check user is deleted or not
    if (user?.isDeleted === true) {
        throw new AppError(httpStatus.FORBIDDEN, "User is already deleted!");
    }

    // check password

    if (! await User.isPasswordMatched(payload.password, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!")
    }

    const jwtPayload = {
        id:user._id,
        name:`${user?.firstName} ${user?.lastName}`,
        email: user?.email,
        role: user?.role,
        location:user?.location

    }

    // accessToken
    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: config.jwt_accessToken_expiresIn })

    // refreshToken
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh as string, { expiresIn: config.jwt_refreshToken_expiresIn })



    return {
        accessToken,
        refreshToken
    }


}


const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = jwt.verify(token, config.jwt_refresh as string);

    const { email} = decoded as JwtPayload;

    // checking if the user is exist
    const user = await User.isUserExistByEmail(email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }



    const jwtPayload = {
        email: user.email,
        role: user.role,
    };

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_secret as string,
        { expiresIn: config.jwt_accessToken_expiresIn as string, }
    );

    return {
        accessToken,
    };
};

export const AuthServices = {
    loginUserIntoDb,
    refreshToken,

}