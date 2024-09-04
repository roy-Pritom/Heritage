import { TUser } from "@/types";
import { decodeToken } from "../UtlitiFunction/jwtDecoder";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "../UtlitiFunction/localStorage";


export const storeUserInfo=(token:string)=>{
    // console.log({token});
 return setToLocalStorage('token',token)
}
export const getUserInfo=()=>{
  const token=getFromLocalStorage('token');
  if(token){
    const userData=decodeToken(token) as TUser;
    return {
      ...userData,
      role:userData?.role?.toLowerCase()
    };
  }
  else{
    return '';
  }
}
export const removeUserInfo=()=>{
 return removeFromLocalStorage('token')
}

export const isUserLoggedIn=()=>{
const token=getFromLocalStorage('token');
if(token){
  return !!token;
}
}
