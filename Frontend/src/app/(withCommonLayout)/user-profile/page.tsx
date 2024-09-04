"use client"

import Loader from "@/components/Common/Loader";
import { useGetWinBidPropertyQuery } from "@/components/Redux/api/propertyApi";
import { getUserInfo } from "@/components/Server/auth.service";
import { TUser } from "@/types";

const UserProfilePage = () => {
    const user=getUserInfo() as TUser;
    const {data,isLoading}=useGetWinBidPropertyQuery({});
    const winProperties=data?.data;
    return (
        <div className="h-screen bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
            <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
                <div className=" h-32 overflow-hidden" >
                    <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                </div>
                <div className="flex justify-center px-5  -mt-12">
                    <img className="h-32 w-32 bg-white p-2 rounded-full   " src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010" alt="" />

                </div>
                <div className=" ">
                    <div className=" px-14">
                        <h2 className="text-gray-800 text-3xl font-bold text-center">{user?.name}</h2>
                        <p className="text-gray-400 mt-2 hover:text-blue-500 text-center">{user?.email}</p>
                        <div className="">

                        <p className="my-2 text-gray-500 text-sm">Wins Property</p>

                        {
                            isLoading ?
                            <Loader/>
                            :
                            <>
                            {
                                winProperties?.map((item:any)=>
                                    <li key={item?._id} className="flex justify-between items-center py-2">
                                <span className="flex-1">{item?.title}</span>
                                <span className="text-green-500 ml-10">Bid: {item?.highestBid?.amount}</span>
                              </li>
                                )
                            }
                            </>
                        }
                        </div>
                    </div>
                    <hr className="mt-6" />
                    <div className="flex  bg-gray-50 ">
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p><span className="font-semibold">2.5 k </span> Followers</p>
                        </div>
                        <div className="border"></div>
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p> <span className="font-semibold">2.0 k </span> Following</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;