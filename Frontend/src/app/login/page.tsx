"use client";
import { storeUserInfo } from "@/components/Server/auth.service";
import { userLogin } from "@/components/Server/userlogin";
import { Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import DemoModal from "./components/DemoModal";

const LoginPage = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading('processing...')
    try{
     const res=await userLogin(data);
    //  console.log(res);
     if (res?.success === true) {
        toast.success('User login successfully!!!', { id: toastId, duration: 1000 })
        storeUserInfo(res?.data?.accessToken)
        router.push('/')
    }
    else{
        toast.error(res?.message, { id: toastId, duration: 1000 })

    }
    }
    catch(error:any){
        console.log(error?.message);
        toast.error(error?.message, { id: toastId, duration: 1000 })

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#ecf5ff] rounded ">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-0">Sign in to your account</h2>
        <p className="text-center">Or<Link href='/register'><span className="text-blue-500">create an account</span></Link></p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Typing..."
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full bg-white px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Typing..."
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full bg-white px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg focus:outline-none focus:shadow-outline hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
        <Button onPress={onOpen}>Demo Login</Button>
        <DemoModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen}/>
      </div>
    </div>
  );
};

export default LoginPage;
