"use client"
import Loader from "@/components/Common/Loader";
import { useGetAllPropertyQuery } from "@/components/Redux/api/propertyApi";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Pagination from "./components/Pagination";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const AllPropertyPage = () => {
  const { data, isLoading } = useGetAllPropertyQuery({});
  const query: Record<string, any> = {};
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data?.data?.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="pt-20">
      <h3 className="text-3xl font-bold ml-7 mb-5">All Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
        {
          isLoading ?
            <Loader />
            :
            <>
              {currentPosts?.map((property: any) => (
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
      <div className="flex justify-center items-center mt-5">
        <Pagination
          totalPosts={data?.data?.length}
          postPerPage={postPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllPropertyPage;