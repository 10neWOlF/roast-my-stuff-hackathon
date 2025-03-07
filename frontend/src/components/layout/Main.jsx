import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Globe,
  Flame,
  ChevronRight,
  Github,
  Lightbulb,
  Users,
  ThumbsUp,
  Laugh,
  Upload,
  Zap,
  MessageSquare,
  CheckCircle,
  Share2,
  MessageCircle,
} from "lucide-react";
import "../../utils/global.css";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors">
    <CardContent className="p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-900/30 flex items-center justify-center">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {title}
          </h3>
        </div>
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
      icon: Flame,
      title: "3 Roast Levels",
      description:
        "Choose from Mild, Spicy, or Extra Burn depending on how much heat you can handle.",
    },
    {
      icon: FileText,
      title: "Resume Analysis",
      description:
        "Upload your resume and get detailed feedback on formatting, content, and impact.",
    },
    {
      icon: Github,
      title: "GitHub Critique",
      description:
        "Share your GitHub profile for insights on projects, commit patterns, and documentation.",
    },
    {
      icon: Globe,
      title: "Portfolio Review",
      description:
        "Get your portfolio website analyzed for design, UX, and content effectiveness.",
    },
    {
      icon: ThumbsUp,
      title: "Progress Tracking",
      description: "Track improvements over time as you implement suggestions.",
    },
    {
      icon: Laugh,
      title: "Humor That Helps",
      description:
        "Learn through laughter with roasts that entertain while educating.",
    },
  ];

  const steps = [
    {
      icon: <Upload className="h-10 w-10 text-purple-400" />,
      title: "Upload Your Work",
      description:
        "Share your resume, GitHub profile, or portfolio website link.",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-400" />,
      title: "Choose Roast Level",
      description: "Select from Mild, Spicy, or Extra Burn intensity levels.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-purple-400" />,
      title: "Get Roasted",
      description:
        "Receive AI-generated feedback that's both funny and insightful.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-purple-400" />,
      title: "Implement & Improve",
      description:
        "Use the actionable advice to enhance your professional materials.",
    },
  ];

  const roast = [
    {
      icon: <MessageCircle className="h-10 w-10 text-purple-400" />,
      title: "Fun & Engaging Feedback",
      description:
        "Receiving feedback doesn't have to be boring. Our AI delivers critiques with humor that makes improvement enjoyable.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-purple-400" />,
      title: "Actionable Insights",
      description:
        "Behind every joke is a real tip to help you improve your professional materials and stand out.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-purple-400" />,
      title: "Shareable Results",
      description:
        "Share your roasts on social media to show your growth journey and sense of humor.",
    },
  ];

  return (
    <>
      <div className="text-white min-h-screen px-6 sm:px-6 py-4 sm:py-6 text-center ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">
              <span className="gradient-text">
                Features That Burn and Build
              </span>
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

      <section className="w-full py-10 md:py-20  mb-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter gradient-text sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] gradient-text md:text-xl">
                Four simple steps to get roasted and improve your professional
                presence.
              </p>
            </div>
          </div>
          <div className="mx-auto  grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 pt-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 rounded-lg bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 transition-colors p-4"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-900/30">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-center gradient-text">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-10 md:py-20 ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter gradient-text sm:text-4xl md:text-5xl">
                Why Get Roasted?
              </h2>
              {/* <p className="mx-auto max-w-[700px] gradient-text md:text-xl">
                Upload your resume, GitHub repo, or portfolio and get honest
                feedback with a side of humor.
              </p> */}
            </div>
          </div>
          <div className="mx-auto  grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pt-12">
            {roast.map((roast, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 rounded-lg bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 transition-colors p-4"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-900/30">
                  {roast.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{roast.title}</h3>
                  <p className="text-center gradient-text">
                    {roast.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-10">
            <Link to="/upload" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto cursor-pointer bg-white text-black hover:bg-gray-200 px-6 py-6 rounded-md transition-all duration-300 text-base">
                <Flame className="w-6 h-6 ml-2 text-red-500" /> Get Started
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
      </section>
    </>
  );
};

export default Main;

{
  /* <div className="flex justify-center space-x-4">
              <Link to="/upload" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto cursor-pointer bg-white text-black hover:bg-gray-200 px-6 py-6 rounded-md transition-all duration-300 text-base">
                  <Flame className="w-6 h-6 ml-2 text-red-500" /> Get Started
                </Button>
              </Link>

              <Link to="/roast-stuff" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto cursor-pointer text-white bg-black group hover:bg-black flex items-center justify-center gap-2 px-6 py-6 rounded-md transition-all duration-300">
                  View Examples
                  <ChevronRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1 duration-300" />
                </Button>
              </Link>
            </div> 
            
            
             <h1 className="text-5xl font-bold mb-4">Ready to Get Roasted?</h1>
          <p className="text-xl text-gray-300 mb-8">
            Upload your resume, GitHub repo, or portfolio and get honest
            feedback with a side of humor.
          </p>
            
            <span className="gradient-text">Features That</span> 
<span className="text-orange-500"> Burn </span> 
<span className="gradient-text">and</span> 
<span className="text-green-500"> Build</span>

            
            */
}
