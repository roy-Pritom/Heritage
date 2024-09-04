import { Model } from "mongoose";

export type TUser={
    _id:string;
    firstName:string;
    lastName:string;
    location:string;
    gender:'male' | 'female';
    email:string;
    password:string;
    profilePhoto?:string;
    role:'admin' | 'user';
    isBlock:boolean;
    isDeleted:boolean;
}

export interface UserModel extends Model<TUser> {
    isUserExistByEmail(email:string):Promise<TUser>;
    isPasswordMatched(plainPassword:string,hashPassword:string):Promise<boolean>
  }