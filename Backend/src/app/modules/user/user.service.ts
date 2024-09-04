import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model"

const createUserInToDb = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
}
const getAllUserFromDb = async () => {
  const result = await User.find().select('-password');
  return result;
}

const getUserProfile = async (id:string) => {
  const result = await User.findById(id);
  if (!result || result?.isBlock === true || result?.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, "User not exist!")
  }
  return result
}

const updateUserProfile = async (id:string,payload:Partial<TUser>) => {
  const user = await User.findById(id);
  if (!user || user?.isBlock === true || user?.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, "User not exist!")
  }
  const result=await User.findByIdAndUpdate(id,payload,{new:true});
  return result
}


export const UserServices = {
  createUserInToDb,
  getAllUserFromDb,
  getUserProfile,
  updateUserProfile,

}