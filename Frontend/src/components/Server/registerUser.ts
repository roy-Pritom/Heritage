import { FieldValues } from "react-hook-form";

export const registerUser=async(data:FieldValues)=>{
    const res=await fetch('https://manage-property-system-server.vercel.app/api/v1/users/register',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials:"include"
    });
    const userData=await res.json();
    return userData;
}