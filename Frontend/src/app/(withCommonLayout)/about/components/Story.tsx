"use client";
import Testimonial from "@/components/FrontPage/BuyPage/Testmonial";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const Story = () => {
  const teamData = [
    {
      id: 1,
      img: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid",
    },
    {
      id: 2,
      img: "https://img.freepik.com/free-photo/handsome-bearded-businessman-rubbing-hands-having-deal_176420-18778.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid",
    },
    {
      id: 3,
      img: "https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid",
    },
    {
      id: 4,
      img: "https://img.freepik.com/free-photo/confident-handsome-guy-posing-against-white-wall_176420-32936.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, teamData.length - itemsPerPage)
    );
  };

  const visibleItems = teamData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className=" container mx-auto pt-16 pb-32 md:px-0 px-8">
      <div className="w-full h-full  relative">
        <Image
          src={
            "https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799629.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid"
          }
          width={500}
          height={400}
          alt=""
          className=" w-[60%] h-[70%]"
        />
        <div className=" w-[50%] md:h-[50%] h-[80%]  absolute md:-bottom-20  -bottom-6 right-0 bg-blue-100 overflow-hidden">
          <div className=" p-5">
            <h1 className=" text-yellow-700 font-bold text-base md:text-3xl vigaRegular">
              {" "}
              Our Story
            </h1>
            <h1 className="text-base md:text-5xl vigaRegular text-slate-800">
              Efficient and Transparent
            </h1>
            <h1 className="text-base md:text-5xl vigaRegular text-slate-800">
              Home Buying Solutions
            </h1>
            <div className="text-slate-800 py-6">
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page
              </p>
              <p>when looking at its layout.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full  relative pt-40">
        <div className=" flex justify-end ">
          <Image
            src={
              "https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799629.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid"
            }
            width={500}
            height={300}
            alt=""
            className=" w-[60%] flex justify-end"
          />
        </div>
        <div className=" w-[60%] absolute md:-bottom-20 -bottom-20  bg-[#fdf0e7]">
          <div className=" p-5">
            <h1 className=" text-yellow-700 font-bold text-base md:text-3xl vigaRegular">
              {" "}
              Our Story
            </h1>
            <h1 className="text-base md:text-5xl vigaRegular text-slate-800">
              Efficient and Transparent
            </h1>
            <h1 className="text-base md:text-5xl vigaRegular text-slate-800">
              Home Buying Solutions
            </h1>
            <div className="text-slate-800 py-6 hidden md:block">
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page
              </p>
              <p>when looking at its layout.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-32 flex items-center">
        <button
          onClick={handlePrevious}
          className="bg-blue-600 text-white w-12 h-12 rounded-full flex justify-center items-center -mr-6 z-30"
          disabled={startIndex === 0}
        >
          <ArrowLeft />
        </button>
        <div className="grid md:grid-cols-3 gap-12 mx-auto">
          {visibleItems.map((data) => (
            <div key={data.id}>
              <Image src={data.img} alt="" width={500} height={500} />
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white h-12 w-12 rounded-full flex justify-center items-center -ml-6 z-30"
          disabled={startIndex >= teamData.length - itemsPerPage}
        >
          <ArrowRight />
        </button>
      </div>

      <div className=" py-24">
        <div className=" flex flex-col md:flex-row w-full">
          <div className=" md:w-[60%] w-full">
            <div className=" space-y-6">
              <h1 className=" text-2xl font-semibold text-yellow-800 ">
                Meet the Team For Book Consultation
              </h1>
              <div>
                <h1 className=" text-5xl vigaRegular text-slate-800">
                  Meet the stewards of your
                </h1>
                <h1 className=" text-5xl vigaRegular text-slate-800">
                  heritage journey
                </h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit quia id error?
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit quia id error?
                </p>
              </div>
              <button className=" px-4 py-2 bg-blue-800 text-white">
                Book Consultation Now
              </button>
            </div>
          </div>
          <div className=" md:w-[40%] w-full flex md:justify-end justify-center">
            <Image
              src={
                "https://img.freepik.com/free-photo/hand-presenting-model-house-home-loan-campaign_53876-104970.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid"
              }
              alt=""
              width={500}
              height={500}
              className=""
            />
          </div>
        </div>
      </div>
      <Testimonial propertyId="" isAllReview={true} />
    </div>
  );
};

export default Story;