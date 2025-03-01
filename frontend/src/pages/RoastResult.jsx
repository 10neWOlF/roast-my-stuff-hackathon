import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, Flame } from "lucide-react";

function RoastResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && result.roast) {
      navigator.clipboard.writeText(result.roast).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  const getRoastEmoji = (level) => {
    const flameSize = 24; // Adjust size as needed

    const flames = {
      mild: [<Flame key="1" size={flameSize} className="text-orange-400" />],
      spicy: [
        <Flame key="1" size={flameSize} className="text-orange-400" />,
        <Flame key="2" size={flameSize} className="text-orange-400" />,
      ],
      extra_burn: [
        <Flame key="1" size={flameSize} className="text-orange-400" />,
        <Flame key="2" size={flameSize} className="text-orange-400" />,
        <Flame key="3" size={flameSize} className="text-orange-400" />,
      ],
    };

    return (
      <span className="inline-flex space-x-1">
        {flames[level] || flames.mild}
      </span>
    );
  };

  const handleGoBack = () => {
    navigate('/upload');
  };

  if (!result) {
    return (
      <div className="min-h-screen font-sans flex flex-col text-white ">
        <div className="container cursor-pointer mx-auto px-4 py-4">
          <button
            onClick={handleGoBack}
            className="flex items-center cursor-pointer transition-colors mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
        </div>
        <main className="flex-1 py-12 px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-zinc-950 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-4">
                No result found
              </h2>
              <p className="text-gray-300 mb-4 text-base md:text-lg">
                Looks like you got here without submitting anything to roast.
              </p>
              <Link
                to="/upload"
                className="inline-flex items-center text-purple-500 hover:text-purple-400"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to form
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans flex flex-col text-white ">
      {/* Back button in top left */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={handleGoBack}
          className="flex items-center cursor-pointer text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <header className="py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Your Roast Results
          </h1>
          <p className="text-white text-opacity-90 text-lg md:text-xl max-w-2xl mx-auto flex items-center justify-center">
            Here's your {result.roastLevel.replace("_", " ")} roast{" "}
            {getRoastEmoji(result.roastLevel)}
          </p>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {" "}
          {/* Increased max width for large screens */}
          <div className="bg-zinc-950 rounded-lg shadow-xl p-6 md:p-10 mb-8 border border-zinc-800 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200">
                Your{" "}
                {result.intensity?.charAt(0).toUpperCase() +
                  result.intensity?.slice(1) ||
                  result.roastLevel.charAt(0).toUpperCase() +
                    result.roastLevel.slice(1).replace("_", " ")}{" "}
                Roast
              </h2>
              <div className="text-2xl md:text-3xl">
                {getRoastEmoji(result.roastLevel)}
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-300 whitespace-pre-line text-base md:text-lg lg:text-xl leading-relaxed">
                {result.roast}
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-700 flex justify-between items-center">
              <Link
                to="/"
                className="inline-flex items-center text-purple-500 hover:text-purple-400 text-base md:text-lg transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Roast something else
              </Link>

              <button
                onClick={handleCopy}
                className={`px-4 py-2 cursor-pointer rounded-md transition-colors ${
                  copied
                    ? "text-green-500 bg-zinc-800" // 
                    : "bg-zinc-900 hover:bg-zinc-800 text-gray-200"
                }`}
              >
                {copied ? "Copied!" : "Copy to clipboard"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className=" py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>
            Roast My Stuff • Get brutally honest feedback with a sense of humor
          </p>
        </div>
      </footer>
    </div>
  );
}

export default RoastResult;
