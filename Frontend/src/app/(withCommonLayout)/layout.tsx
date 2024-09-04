import Header from "@/components/Common/Header";
import Footer from "@/components/FrontPage/Home/Footer";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto">
      {/* <div className=""> */}
      <Header />
      {/* </div> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default CommonLayout;
