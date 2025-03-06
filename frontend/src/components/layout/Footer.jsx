import React from "react";
import { Flame } from "lucide-react";
import "../../utils/global.css";

const Footer = () => {
  return (
    <div className="w-full py-6 sm:py-12 border-t border-gray-800 bg-black">
      <div className="flex flex-col items-center justify-center">
        <div className="container mx-auto flex justify-center">
          <div className="flex items-center justify-center gap-2 flex-nowrap">
            <Flame className="h-5 w-5 text-orange-500" />
            <p className="text-sm sm:text-xl font-medium text-white text-center">
              2025 Roast My Stuff. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
