"use client"
import Loader from "@/components/Common/Loader";
import { useGetPropertyQuery } from "@/components/Redux/api/propertyApi";
import { Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import BidModal from "../components/BidModal";
import Testimonial from "@/components/FrontPage/BuyPage/Testmonial";
import ReviewModal from "../components/ReviewModal";
import { useState } from "react";
import { FaUserTie, FaEnvelope, FaBriefcase } from "react-icons/fa";

const PropertyDetailsPage = ({ params }: { params: { propertyId: string } }) => {
    const [isReview, setIsReview] = useState(false);
    // const [isAllReview, setIsAllReview] = useState(false);
    const { propertyId } = params;
    const { data, isLoading } = useGetPropertyQuery(propertyId)
    // console.log(data);
    const property = data?.data;
    console.log(property);
    const highestBid = property?.highestBid?.amount;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const defaultImg = "https://img.freepik.com/free-psd/interior-luxury-hospital-hall-generative-ai_587448-2014.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid"
    return (
        <div className="py-20">
            {
                isLoading ?
                    <Loader />
                    :
                    <>
                        <div className="mb-6">
                            <div className="flex justify-center items-center gap-5 ">
                                <h3 className="text-xl font-bold">{property?.title}</h3>
                                <p className="font-bold text-2xl">${property?.price}</p>
                            </div>
                            <p className="mt-2 text-center">{property?.location}</p>
                        </div>
                        <div className="flex justify-center items-center gap-5 ">
                            <div className="">
                                <Image className="rounded-lg w-full h-[200px]" height={200} width={220} src={property?.images[0] ? property?.images[0] : defaultImg} alt="img1" />
                                <div className="flex justify-center items-center mt-3 gap-2">
                                    <Image className="rounded-lg" height={300} width={200} src={property?.images[1] ? property?.images[1] : defaultImg} alt="img2" />
                                    <Image className="rounded-lg" height={300} width={200} src={property?.images[2] ? property?.images[2] : defaultImg} alt="img3" />
                                    <Image className="rounded-lg" height={300} width={200} src={property?.images[3] ? property?.images[3] : defaultImg} alt="img4" />
                                </div>
                            </div>
                            <div className="w-[300px] bg-blue-100 p-5 h-[375px] rounded-lg">
                                <p >Property Value</p>
                                <p className="text-xl font-bold">
                                    $ {property?.price}
                                </p>
                                <p className="my-5">{property?.description}</p>

                                <div className="flex justify-start mb-8">
                                    <p className="font-semibold">Current Highest Bid : <span className="text-green-500">{highestBid}</span></p>
                                </div>

                                <Button onClick={() => setIsReview(false)} onPress={onOpen} className="bg-blue-600 text-white">Bid Property</Button>

                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="bg-[#F9FAFB] w-[40%] border-2 mt-2 p-6 rounded-lg">
                                <p className="font-bold mb-3">Overview</p>
                                <div className="flex items-center justify-around mb-3">
                                    <p className="font-semibold">{property?.bedrooms} Beds</p>
                                    <p className="font-semibold">{property?.bath} Bath</p>
                                    <p className="font-semibold">{property?.balcony} Balcony</p>
                                    <p className="font-semibold">Fully Furnished</p>
                                </div>
                                <hr className="border-1 mb-4" />
                                <div className="flex items-center justify-start gap-11">
                                    <p>Carpet Area <br /><span className="font-semibold">{property?.totalArea}</span></p>
                                    <p>Floor <br /><span className="font-semibold">{property?.floor}</span></p>
                                    <p>Transaction Type <br /><span className="font-semibold">{property?.status}</span></p>
                                </div>
                            </div>
                            <div className="w-[21%] ml-5 mt-3 ">
                            {property?.teamMembers?.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 transition-transform transform hover:scale-105"
        >
          <div className="flex items-center space-x-4 mb-4">
            <FaUserTie className="text-blue-500 text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{item?.name}</h3>
              <p className="text-gray-500 text-sm">Team Member</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <FaBriefcase className="text-gray-400" />
            <p className="text-gray-700">{item?.role}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-gray-400" />
            <a
              href={`mailto:${item?.contact}`}
              className="text-blue-500 hover:underline"
            >
              {item?.contact}
            </a>
          </div>
        </div>
      ))}
                                <Button onClick={() => setIsReview(true)} onPress={onOpen} className="ml-2 mt-2">Give Review</Button>
                            </div>
                        </div>
                    </>
            }
            <Testimonial propertyId={propertyId} isAllReview={false} />
            {
                isReview ?
                    <ReviewModal onOpen={onOpen} isOpen={isOpen} onOpenChange={onOpenChange} propertyId={propertyId} highestBid={highestBid} />

                    :
                    <BidModal onOpen={onOpen} isOpen={isOpen} onOpenChange={onOpenChange} propertyId={propertyId} highestBid={highestBid} />

            }

        </div>
    );
};

export default PropertyDetailsPage;