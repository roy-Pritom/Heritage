"use client";
import Loader from "@/components/Common/Loader";
import { useGetAllPropertyQuery } from "@/components/Redux/api/propertyApi";
import { Button } from "@nextui-org/react";
import { LocateFixed, LocateIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const PopularProperties = () => {
  const {data,isLoading}=useGetAllPropertyQuery({});
  // console.log(data?.data);
  // const propertyData = [
  //   {
  //     id: "1",
  //     name: "Luxury Villa",
  //     img: "https://example.com/villa.jpg",
  //     count: "4 Beds, 3 Baths",
  //     appointment: "Available for viewing",
  //     location: "Beverly Hills, CA",
  //     price: "3,500,000",
  //   },
  //   {
  //     id: "2",
  //     name: "Modern Apartment",
  //     img: "https://example.com/apartment.jpg",
  //     count: "2 Beds, 2 Baths",
  //     appointment: "Available for viewing",
  //     location: "New York, NY",
  //     price: "1,200,000",
  //   },
  //   {
  //     id: "3",
  //     name: "Cozy Cottage",
  //     img: "https://example.com/cottage.jpg",
  //     count: "3 Beds, 2 Baths",
  //     appointment: "Available for viewing",
  //     location: "Napa Valley, CA",
  //     price: "850,000",
  //   },
  //   {
  //     id: "4",
  //     name: "Beachfront Condo",
  //     img: "https://example.com/condo.jpg",
  //     count: "3 Beds, 2 Baths",
  //     appointment: "Available for viewing",
  //     location: "Miami, FL",
  //     price: "2,300,000",
  //   },
  //   {
  //     id: "5",
  //     name: "Rustic Farmhouse",
  //     img: "https://example.com/farmhouse.jpg",
  //     count: "5 Beds, 4 Baths",
  //     appointment: "Available for viewing",
  //     location: "Austin, TX",
  //     price: "1,750,000",
  //   },
  // ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 3 >= data?.data?.length ? 0 : prevIndex + 3
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - 3 < 0 ? data?.data?.length - 3 : prevIndex - 3
    );
  };

  const displayedProperties = data?.data?.slice(startIndex, startIndex + 3);

  return (
    <div className="container mx-auto py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold vigaRegular text-slate-800">
          Popular Properties
        </h1>
        <Link href='/all-property'><h1 className="text-base text-[#0059b1] cursor-pointer border-b border-[#0059b1]">
          See all properties
        </h1></Link>
      </div>
      <div className="flex justify-between items-center ">
        <button
          onClick={handlePrev}
          className="text-white bg-[#0059b1] -mr-12 z-40 h-10 w-10 rounded-full flex justify-center items-center text-2xl font-bold"
        >
          &lt;
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
          {
            isLoading ?
            <Loader/>
            :
           <>
           {displayedProperties?.map((property:any) => (
            <div
              key={property._id}
              className=" bg-slate-50 p-4 rounded-lg cursor-pointer"
            >
              <Image
                src={property?.images[0]}
                alt={property?.title}
                width={500}
                height={500}
                className="w-full h-48 object-cover rounded-lg mb-1"
              />
              <div className=" flex justify-between items-center">
                <p className="text-[#0059b1] bg-[#ecf5ff] px-2">{property?.category}</p>
                <p className=" flex items-center">
                  <span className="text-[#d95d0f] text-5xl font-bold -mt-8 ">
                    .
                  </span>
                  Ready To Move
                </p>
                <Link href={`/property/${property._id}`}>
                      <Button className="mt-2">Details</Button>
                      
                      </Link>
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                {property?.title}
              </h2>
              {/* <p className="text-slate-600">{property.count}</p> */}
              <p className=" text-slate-600 text-sm flex items-center gap-2">
                <MapPin className=" text-[#d95d0f]" size={16} />{" "}
                {property?.location}
              </p>
              <p className="text-slate-800 font-semibold pt-3">
                $ {property?.price}
              </p>
            </div>
          ))}
           </> 
          }
          
        </div>
        <button
          onClick={handleNext}
          className="text-white bg-[#0059b1] -ml-12 z-40 h-10 w-10 rounded-full flex justify-center items-center text-2xl font-bold"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PopularProperties;
