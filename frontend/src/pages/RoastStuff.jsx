import {
  ArrowLeft,
  ChevronLeft,
  Flame,
  CheckCircle,
  AlertCircle,
  FileText,
  Code,
  Download,
  Twitter,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";




const RoastResult = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const examples = {
    resume: {
      title: "Software Engineer Resume",
      level: "spicy",
      content: {
        roast:
          "This resume has more buzzwords than a corporate bingo card. 'Passionate', 'team player', 'detail-oriented'... did you just throw darts at a LinkedIn word cloud? And those bullet points are longer than my last relationship but somehow say less.",
        feedback: [
          "Your experience section focuses on responsibilities rather than achievements",
          "Technical skills section is an unorganized list with no indication of proficiency",
          "Summary is generic and could apply to literally any developer",
        ],
        actionItems: [
          "Quantify achievements with metrics (e.g., 'Reduced load time by 40%')",
          "Group technical skills by category and indicate proficiency level",
          "Tailor your summary to highlight your unique value proposition",
        ],
      },
    },
    project: {
      title: "Project Review",
      level: "extra",
      content: {
        roast:
          "This project looks like it was built in a weekend hackathon... and then abandoned. The code is spaghetti, the UI is from 2005, and the functionality is questionable at best. Did you even bother testing this before deploying?",
        feedback: [
          "Code is poorly documented and difficult to understand",
          "UI is outdated and lacks basic usability",
          "Functionality is buggy and unreliable",
        ],
        actionItems: [
          "Refactor the code with clear comments and documentation",
          "Redesign the UI with modern design principles",
          "Implement thorough testing and bug fixes",
        ],
      },
    },
  };

  const [activeTab, setActiveTab] = useState("resume");

  const getRoastEmoji = (level) => {
    switch (level) {
      case "mild":
        return "🔥";
      case "spicy":
        return "🔥🔥";
      case "extra":
        return "🔥🔥🔥";
      default:
        return "";
    }
  };

  const currentExample = examples[activeTab];

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={handleGoBack}
            className="flex items-center cursor-pointer gap-2 bg-zinc-900 hover:bg-zinc-800 hover:text-white py-2 px-4 rounded-lg border border-zinc-800 transition-colors text-gray font-medium "
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>
      </div>
      <div className="min-h-screen rounded-md font-sans flex flex-col text-white bg-zinc-950">
        <main className="flex-1 py-8 px-4 max-w-6xl mx-auto w-full">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Example Roasts
            </h1>
            <p className="mx-auto max-w-[700px] text-white md:text-xl">
              See how our AI roasts different types of content at various
              intensity levels.
            </p>
          </div>

          <div className="container py-5">
            <div className="flex justify-center mb-8">
              <div className="bg-zinc-800 rounded-md py-2 px-2">
                <div className="flex rounded-lg overflow-hidden w-[300px] md:w-[400px]">
                  <button
                    className={`w-full py-2 px-2 font-medium rounded-md cursor-pointer transition-colors flex items-center justify-center ${
                      activeTab === "resume" ? "bg-zinc-950 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("resume")}
                    role="tab"
                    aria-selected={activeTab === "resume"}
                  >
                    <FileText size={18} className="mr-2" />
                    Resume
                  </button>
                  <button
                    className={`w-full py-3 px-4 rounded-md font-medium cursor-pointer transition-colors flex items-center justify-center ${
                      activeTab === "project" ? "bg-zinc-950 text-white" : ""
                    }`}
                    onClick={() => setActiveTab("project")}
                    role="tab"
                    aria-selected={activeTab === "project"}
                  >
                    <Code size={18} className="mr-2" />
                    Project
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <ChevronLeft
                  size={20}
                  className="text-gray-400 cursor-pointer"
                  onClick={handleGoBack}
                />
                {currentExample.title}
              </h1>
            </div>

            <div id="roast-content" className="space-y-6">
              {/* The Roast Section */}
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2">
                      <Flame
                        className="text-orange-500 mr-2 mt-1 flex-shrink-0"
                        size={20}
                      />
                    </span>
                    <h2 className="text-xl font-semibold">The Roast</h2>
                  </div>
                  <div className="bg-green-900/30 text-green-500 font-medium py-1 px-3 rounded-full text-sm flex items-center gap-1">
                    <span>
                      {currentExample.level
                        ?.replace("_", " ")
                        .charAt(0)
                        .toUpperCase() +
                        currentExample.level?.replace("_", " ").slice(1) ||
                        "Mild"}
                    </span>
                    {getRoastEmoji(currentExample.level || "mild")}
                  </div>
                </div>
                <div className="p-6 bg-zinc-950/50">
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      {/* <Flame
                      className="text-orange-500 mr-2 mt-1 flex-shrink-0"
                      size={20}
                    /> */}
                      <p className="text-gray-300 italic">
                        {currentExample.content.roast}
                      </p>
                    </div>

                    <div className="mt-4 text-right">
                      <span className="text-gray-400 text-sm">Rating: </span>
                      <span className="text-orange-400 font-bold">4/10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Issues and Action Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Key Issues */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                  <div className="p-4 border-b border-zinc-800">
                    <div className="flex items-center">
                      <AlertCircle className="text-orange-500 mr-2" size={20} />
                      <h2 className="text-xl font-semibold">Key Issues</h2>
                    </div>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-4">
                      {currentExample.content.feedback.map((issue, index) => (
                        <li key={index} className="flex">
                          <span className="flex-shrink-0 bg-orange-500/20 text-orange-400 rounded-full h-6 w-6 flex items-center justify-center mr-3">
                            {index + 1}
                          </span>
                          <span className="text-gray-300">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Items */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                  <div className="p-4 border-b border-zinc-800">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                      <h2 className="text-xl font-semibold">Action Items</h2>
                    </div>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-4">
                      {currentExample.content.actionItems.map((item, index) => (
                        <li key={index} className="flex">
                          <span className="flex-shrink-0 bg-green-500/20 text-green-400 rounded-full h-6 w-6 flex items-center justify-center mr-3">
                            {index + 1}
                          </span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Link to="/upload">
                <button
                  className=" flex items-center gap-2 bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                >

                  <Flame className="w-6 h-6 text-red-500" />
                  Get Your Own Roast
                </button>
             </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RoastResult;
