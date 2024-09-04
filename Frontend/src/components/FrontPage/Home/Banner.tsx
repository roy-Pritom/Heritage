/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";
import { Search } from "lucide-react";

import Link from "next/link";

const Banner = () => {
  return (
    <div className=" relative">
      <div className="relative lg:h-[100vh] h-[500px]  w-full">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/Photo/banner.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60  text-white">
          <div className=" h-full flex items-center justify-center">
            <div className=" flex flex-col space-y-2 ">
              <h1 className="text-2xl md:text-6xl font-bold mb-1 vigaRegular text-center">
                Your Portal to India's
              </h1>
              <h1 className="text-2xl md:text-6xl font-bold mb-1 vigaRegular text-center">
                Exquisite Real Estate
              </h1>
              <div>
                <p className="text-lg md:text-2xl  py-3 text-center text-white">
                  Handpicked and ethically sourced for the best taste.
                </p>
              </div>
              <div className=" flex justify-center">
                <Link href='/buy'>
                <button className="py-2 px-5 bg-[#0059b1] flex items-center gap-3">
                  <Search /> Find Property
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
