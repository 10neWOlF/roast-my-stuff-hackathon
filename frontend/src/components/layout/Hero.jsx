import React from "react";
import { ChevronRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import "../../utils/global.css";

const Hero = () => {
  return (
    <div className="min-h-screen md:min-h-screen flex flex-col items-center justify-center">
      <main className="container mx-auto px-4 sm:px-6 pt-0 sm:pt-6 md:pt-0 pb-8 sm:pb-12">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-5xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 gradient-text flex items-center">
            Roast My Stuff <Flame className="w-14 h-14 text-orange-400 mr-2" />
          </h1>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-lg mx-auto">
            Upload your resume, website, or portfolio and let our AI give you a
            hilarious and brutally honest roast. Because sometimes you need
            tough love to improve.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Link to="/upload" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto cursor-pointer bg-white text-black hover:bg-gray-200 px-6 py-6 rounded-lg transition-all duration-300">
                Upload Your Stuff
                <Flame className="w-6 h-6 ml-2 text-red-500" />
              </Button>
            </Link>

            <Link to="/docs" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto cursor-pointer text-white bg-black group hover:bg-black flex items-center justify-center gap-2 px-6 py-6 rounded-lg transition-all duration-300">
                See Roast Examples
                <ChevronRight className="w-8 h-8 transform transition-transform group-hover:translate-x-1 duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
