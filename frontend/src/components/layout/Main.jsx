import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Globe,
  Briefcase,
  BookOpen,
  Flame,
  ChevronRight,
} from "lucide-react";
import "../../utils/global.css";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors">
    <CardContent className="p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-900/30 flex items-center justify-center">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white">
          {title}
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </CardContent>
  </Card>
);

const Main = () => {
  const features = [
    {
      icon: FileText,
      title: "Resume Roast",
      description:
        'Let AI tear apart your resume and point out those "creative" job titles and "ninja" skills.',
    },
    {
      icon: Globe,
      title: "Website Roast",
      description:
        "Get your website critiqued by an AI that doesn't care about your feelings, just your UX.",
    },
    {
      icon: Briefcase,
      title: "Portfolio Roast",
      description:
        "Have your portfolio judged by an AI that's seen everything and is not impressed easily.",
    },
  ];

  return (
    <>
      <div className="text-white min-h-screen px-6 sm:px-6 py-4 sm:py-6 text-center ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">
              Get <span className="gradient-text">roasted</span>
              <br className="sm:hidden" /> and{" "}
              <span className="gradient-text">improved.</span>
            </h1>
            <p className="text-lg sm:text-xl gradient-text">
              Upload your resume, website, or portfolio and let our AI give you
              a brutally honest roast.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-white py-8 sm:py-10 px-4 sm:px-6">
        <div className="text-center  mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-6 sm:mb-8">
            <span className="gradient-text">Get Roasted.</span>
            <br />
            <span className="gradient-text">Get Better.</span>
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Link to="/docs" className="w-full sm:w-auto">
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

          <p className="text-center text-sm sm:text-base gradient-text mx-auto w-full sm:w-4/5 md:w-1/2 leading-relaxed">
            Share your resume, website, or portfolio and receive a brutally
            honest roast from our AI. Improve your skills with actionable
            feedback and join a community that roasts to help each other grow.
          </p>
        </div>
      </div>
    </>
  );
};

export default Main;
