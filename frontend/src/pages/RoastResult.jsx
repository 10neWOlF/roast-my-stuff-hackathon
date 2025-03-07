import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  Flame,
  AlertCircle,
  CheckCircle,
  Download,
  Share,
  Twitter,
} from "lucide-react";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";

function RoastResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  const handleDownload = async () => {
    try {
      // Get dimensions of the entire page
      const body = document.body;
      const html = document.documentElement;
      
      const height = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
      );
      
      const width = Math.max(
        body.scrollWidth, body.offsetWidth,
        html.clientWidth, html.scrollWidth, html.offsetWidth
      );
      
      // Store current scroll position
      const originalScrollPos = window.pageYOffset;
      
      // Create a div that covers the entire page
      const screenshotDiv = document.createElement('div');
      screenshotDiv.style.position = 'absolute';
      screenshotDiv.style.top = '0';
      screenshotDiv.style.left = '0';
      screenshotDiv.style.width = `${width}px`;
      screenshotDiv.style.height = `${height}px`;
      screenshotDiv.style.zIndex = '-9999';
      
      // Clone the body content into this div
      const clone = document.body.cloneNode(true);
      // Remove any fixed position elements that could appear multiple times
      const fixedElements = clone.querySelectorAll('*[style*="position: fixed"], *[style*="position:fixed"]');
      fixedElements.forEach(el => {
        el.style.position = 'absolute';
        el.style.top = `${parseInt(el.style.top) + originalScrollPos}px`;
      });
      
      screenshotDiv.appendChild(clone);
      document.body.appendChild(screenshotDiv);
      
      // Scroll to top to ensure we capture from the beginning
      window.scrollTo(0, 0);
      
      // Capture the created div
      const canvas = await html2canvas(screenshotDiv, {
        useCORS: true,
        scale: window.devicePixelRatio,
        width: width,
        height: height,
        backgroundColor: "#000", // Dark background to match theme
        logging: false,
        allowTaint: true,
        foreignObjectRendering: true
      });
      
      // Clean up
      document.body.removeChild(screenshotDiv);
      
      // Restore scroll position
      window.scrollTo(0, originalScrollPos);
      
      const image = canvas.toDataURL("image/png");
      downloadjs(image, "roast-screenshot.png", "image/png");
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleShare = (platform) => {
    if (!result) {
      console.warn("No roast result to share.");
      return;
    }

    const roastRating = result.rating || "No rating available.";
    const roastLevel = result.roastLevel
      ? result.roastLevel.replace("_", " ").charAt(0).toUpperCase() +
        result.roastLevel.replace("_", " ").slice(1)
      : "Mild";

    const shareText =
      `🔥 Check out my Roast Result! 🔥\n\n` +
      `📌 Roast Result: https://roast-my-stuff.app/result\n` +
      `🔥 Roast Level: ${roastLevel}\n` +
      `⭐ Rating: ${roastRating}\n\n` +
      `Roast your own stuff now! 👉 https://roast-my-stuff.app/`;

    const encodedText = encodeURIComponent(shareText);
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
        console.error("Unsupported share platform:", platform);
        return;
    }

    window.open(shareUrl, "_blank");
  };

  const getRoastEmoji = (level) => {
    const flameSize = 24;

    const flames = {
      mild: [<Flame key="1" size={flameSize} className="text-orange-500" />],
      spicy: [
        <Flame key="1" size={flameSize} className="text-orange-500" />,
        <Flame key="2" size={flameSize} className="text-orange-500" />,
      ],
      extra_burn: [
        <Flame key="1" size={flameSize} className="text-orange-500" />,
        <Flame key="2" size={flameSize} className="text-orange-500" />,
        <Flame key="3" size={flameSize} className="text-orange-500" />,
      ],
    };

    return (
      <span className="inline-flex space-x-1">
        {flames[level] || flames.mild}
      </span>
    );
  };

  const handleGoBack = () => {
    navigate("/upload");
  };

  // Default values in case the API doesn't return the expected structure
  const keyIssues = result?.keyIssues || [
    "No specific issues identified",
    "Check the main roast for details",
    "Submit again for more specific feedback",
  ];

  const actionItems = result?.actionItems || [
    "Review the main roast for improvement suggestions",
    "Consider resubmitting with more details",
    "Focus on addressing the primary feedback points",
  ];

  const rating = result?.rating || "N/A";

  if (!result) {
    return (
      <div className="min-h-screen font-sans flex flex-col rounded-md text-white ">
        <div className="container cursor-pointer mx-auto px-4 py-4">
          <button
            onClick={handleGoBack}
            className="flex items-center cursor-pointer gap-2 bg-zinc-900 hover:bg-zinc-800 hover:text-white py-2 px-4 rounded-lg border border-zinc-800 transition-colors text-gray font-medium "
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
        </div>
        <main className="flex-1 py-12 px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-zinc-900 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
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
    <div className="min-h-screen rounded-md font-sans flex flex-col text-white bg-zinc-950">
      {/* Header and navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={handleGoBack}
            className="flex items-center cursor-pointer gap-2 bg-zinc-900 hover:bg-zinc-800 hover:text-white py-2 px-4 rounded-lg border border-zinc-800 transition-colors text-gray font-medium "
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <div className="flex space-x-2">
            <button
              onClick={handleDownload}
              className="flex items-center cursor-pointer gap-2 bg-zinc-900 hover:bg-zinc-800 hover:text-white py-2 px-4 rounded-lg border border-zinc-800 transition-colors text-gray font-medium "
            >
              <Download size={16} />
              <span>Download</span>
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center cursor-pointer gap-2 bg-zinc-900 hover:bg-zinc-800 hover:text-white py-2 px-4 rounded-lg border border-zinc-800 transition-colors text-gray font-medium "
            >
              <Twitter size={16} />

              <span>Tweet</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8 px-4 max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ChevronLeft
              size={20}
              className="text-gray-400 cursor-pointer"
              onClick={handleGoBack}
            />
            {result.title ||
              (result.contentType === "resume"
                ? "Resume Roast"
                : "Project Roast")}
          </h1>
        </div>

        <div id="roast-content" className="space-y-6">
          {/* The Roast Section */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2">
                  <Flame
                    className="text-orange-500 mr-2 mt-1 flex-shcdrink-0"
                    size={20}
                  />
                </span>
                <h2 className="text-xl font-semibold">The Roast</h2>
              </div>
              <div className="bg-green-900/30 text-green-500 font-medium py-1 px-3 rounded-full text-sm flex items-center gap-1">
                <span>
                  {result.roastLevel
                    ?.replace("_", " ")
                    .charAt(0)
                    .toUpperCase() +
                    result.roastLevel?.replace("_", " ").slice(1) || "Mild"}
                </span>
                {getRoastEmoji(result.roastLevel || "mild")}
              </div>
            </div>
            <div className="p-6 bg-zinc-950/50">
              <div className="flex flex-col">
                <div className="flex items-start">
                  {/* <Flame
                    className="text-orange-500 mr-2 mt-1 flex-shrink-0"
                    size={20}
                  /> */}
                  <p className="text-gray-300 italic">{result.roast}</p>
                </div>

                {rating && rating !== "N/A" && (
                  <div className="mt-4 text-right">
                    <span className="text-gray-400 text-sm">Rating: </span>
                    <span className="text-orange-400 font-bold">{rating}</span>
                  </div>
                )}
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
                  {keyIssues.map((issue, index) => (
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
                  {actionItems.map((item, index) => (
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

          {/* Get Another Roast Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Flame className="w-6 h-6 text-red-500" />
              Another Roast
            </button>
          </div>
        </div>
      </main>

      <footer className="py-6 mt-auto">
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
