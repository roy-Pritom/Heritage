"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { redirect } from "next/navigation";
import setAccessToken from "./setAccessToken";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/types";

export const userLogin = async (formData: FieldValues) => {
  const res = await fetch(
    `https://manage-property-system-server.vercel.app/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const userInfo = await res.json();
  // console.log(userInfo);
  if (userInfo?.data?.accessToken) {
    
    // cookies().set("token", userInfo?.data?.accessToken);
    setAccessToken(userInfo?.data?.accessToken,{
      // redirect:'/'
  })
  }
  return userInfo;
};
