import React from "react";
import { Link } from "react-router-dom";
import "../../utils/global.css";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className=" py-2 px-2 flex items-center justify-between  sticky top-0 z-50 backdrop-blur">
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2" onClick={scrollToTop} >
          <Flame className="h-6 w-6 text-orange-500" />
          <span className="font-bold text-xl">Roast My Stuff</span>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Link to="/upload" className="w-full sm:w-auto">
          <Button className="w-full cursor-pointer sm:w-auto bg-white text-black hover:bg-gray-200 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300">
            ROAST NOW!
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;