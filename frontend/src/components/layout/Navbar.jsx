import React from "react";
import { Link } from "react-router-dom";
import "../../utils/global.css";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="py-4 px-2 flex items-center justify-between ">
      {/* for scroll navbar add this:sticky top-0  z-50  */}
      {/* Logo */}
      <div className="flex items-center">
        <svg
          width="60"
          height="60"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M18 0L32.0526 8.1V24.3L18 32.4L3.94737 24.3V8.1L18 0Z"
            fill="white"
          />
          <path
            d="M18 8.1L25.0263 12.15V20.25L18 24.3L10.9737 20.25V12.15L18 8.1Z"
            fill="black"
          />
        </svg>
        <span className="text-white font-bold text-xl">RMS</span>
      </div>

      <div className="flex items-center space-x-2">
        <Link to="/upload" className="w-full sm:w-auto">
          <Button className="w-full cursor-pointer sm:w-auto bg-white text-black hover:bg-gray-200 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300">
            ROAST NOW!
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
