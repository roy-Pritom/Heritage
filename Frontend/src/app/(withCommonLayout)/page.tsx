import Banner from "@/components/FrontPage/Home/Banner";
import Footer from "@/components/FrontPage/Home/Footer";
import PropertySecond from "@/components/FrontPage/Home/PropertySecond";
import Service from "@/components/FrontPage/Home/Service";
import Property from "@/components/FrontPage/Property";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <div className="container lg:w-[1400px] md:w-full w-full mx-auto">
        
      <Property />
      <PropertySecond />
      <Service />
      </div>
      <Footer />
    </div>
  );
}
