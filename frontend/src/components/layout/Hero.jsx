import React from "react";
import { ChevronRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import "../../utils/global.css";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-2 mt-16 sm:-mt-16  md:-mt-16">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side*/}
        <div className="text-center lg:text-left sm:text-left space-y-6">
          <h1 className="text-4xl  gradient-text sm:text-3xl md:text-5xl font-bold tracking-tight">
            Get Your Work <span className="text-red-500">Roasted</span> With a
            Side of Wisdom
          </h1>

          <p className="text-gray-300 text-lg max-w-xl mx-auto lg:mx-0">
            Upload your resume, GitHub repo, or portfolio and receive
            AI-generated roasts that are both hilarious and helpful.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link to="/upload" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto cursor-pointer bg-white text-black hover:bg-gray-200 px-6 py-6 rounded-md transition-all duration-300 text-base">
                <Flame className="w-6 h-6 ml-2 text-red-500" /> Start Roasting
              </Button>
            </Link>

            <Link to="/example" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto cursor-pointer text-white bg-black group hover:bg-black flex items-center justify-center gap-2 px-6 py-6 rounded-md transition-all duration-300">
                View Examples
                <ChevronRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1 duration-300" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side  */}
        <div className="flex items-center justify-center">
          <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
            <div className="absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-2 p-6 text-center text-white">
                  <div className="inline-block rounded-lg font-medium bg-white bg-opacity-20 text-black px-3 py-1 text-sm">
                    Example Roast
                  </div>
                  <p className="text-xl font-medium">
                    "Your projects are scarcer than a WiFi signal on a road
                    trip—unstable, frustrating, and in need of a reboot. Time to
                    re-build!"
                  </p>
                  <p className="inline-flex items-center bg-green-900/30 text-green-500 font-medium py-1 px-3 rounded-full text-sm gap-1">
                    Intensity: Spicy
                    <Flame className="w-5 h-5  text-orange-500" />
                    <Flame className="w-5 h-5  text-orange-500" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

{
  /* <h1 className="text-4xl sm:text-3xl md:text-5xl font-bold tracking-tight">
<span className="gradient-text">Get Your Work</span>
<span className="text-red-600"> Roasted </span>
<span className="gradient-text">With a Side of Wisdom</span>
</h1> */
}
