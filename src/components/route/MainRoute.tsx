import { Outlet } from "react-router-dom";
import FirstNavbar from "../Pages/Navbar/FirstNavbar";
import Footer from "../Pages/Footer/Footer";
import ScrollingBtn from "../Pages/GlobalArrowScrollBtn/Scrolling";
import WhatsAppButton from "../Pages/GlobalWhatsUpContact/WhatsUp";

const MainRoute = () => {
  return (
    <div className="min-h-screen bg-white">
      <FirstNavbar />

      <Outlet></Outlet>
      <ScrollingBtn />
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default MainRoute;
