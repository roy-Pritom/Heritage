import BuyService from '@/components/FrontPage/BuyPage/BuyService';
import Footer from '@/components/FrontPage/Home/Footer';
import Image from 'next/image';
import React from 'react';
import Story from './components/Story';

const ServicePage = () => {
    return (
        <div className=" ">
      <div className="h-[50vh] w-full relative">
        <Image
          src={
            "https://img.freepik.com/free-photo/photorealistic-wooden-house-with-timber-structure_23-2151302660.jpg?ga=GA1.1.1828852587.1722179846&semt=ais_hybrid"
          }
          alt="Wooden house"
          layout="fill"
        />
      </div>
      <div className="container lg:w-[1400px] md:w-full w-full mx-auto">
      <BuyService />
      <Story/>

      </div>
      <Footer />
    </div>
    );
};

export default ServicePage;