import { ShoppingCart } from "lucide-react";
import image1 from "../../../assets/Image2.png";
import image2 from "../../../assets/Image (1).png";
import { FcBusinessman } from "react-icons/fc";
import SecondNavbar from "./SecondNavbar";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const FirstNavbar = () => {
  return (
    <div className="shadow-sm w-full sticky top-0 z-50 bg-cyan-200">
      {/* Top Navbar */}
      <div className="flex items-center justify-between flex-wrap px-4 py-3 gap-4">
        {/* Logo (md up) */}
        <Link to="/">
          <div className="hidden md:flex items-center font-bold text-xl md:text-2xl text-[#469498] whitespace-nowrap mr-4">
            PharmaD
            <img src={image1} alt="logo" className="w-5 h-5 mx-1" />
            <img src={image1} alt="logo" className="w-5 h-5 mx-1" />r
          </div>
        </Link>

        {/* SearchBar (center but flexible on all screens) */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        {/* Right side: Cart, Register, Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Your Order (desktop only) */}
          <div className="hidden md:flex items-center">
            <img src={image2} alt="delivery" className="w-6 h-6 mr-1" />
            <p className="text-sm">Your Order</p>
          </div>

          {/* Cart */}
          <li className="relative list-none">
            <Link to={"/cart"} className="inline-block p-1">
              <ShoppingCart className="text-[#469498]" size={22} />
            </Link>
            <span className="absolute top-[-6px] left-[18px] bg-white text-black text-center w-[18px] h-[18px] flex items-center justify-center text-xs rounded-full">
              0
            </span>
          </li>

          {/* Login (sm up) */}
          <Link to="/login">
            <button className="btn btn-success btn-sm hidden sm:inline-block text-xs">
              Login
            </button>
          </Link>

          {/* Profile */}
          <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-gray-100">
            <FcBusinessman size={18} />
          </div>
        </div>
      </div>

      {/* Bottom Navbar (SecondNavbar) */}
      <div>
        <SecondNavbar />
      </div>
    </div>
  );
};

export default FirstNavbar;
