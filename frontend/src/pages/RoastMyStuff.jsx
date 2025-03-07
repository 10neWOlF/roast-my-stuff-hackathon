import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Zap,
  Code,
  AlertCircle,
  Check,
  Loader,
  ChevronLeft,
  Flame,
} from "lucide-react";
import { Link } from "react-router-dom";

const ROAST_LEVELS = {
  MILD: "mild",
  SPICY: "spicy",
  EXTRA_BURN: "extra_burn",
};

function RoastMyStuff() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [roastLevel, setRoastLevel] = useState(ROAST_LEVELS.MILD);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("resume");
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingMessages = [
    "Roasting...",
    "Don't take this too seriously...",
    "Finding all the flaws...",
    "Preparing brutal honesty...",
    "Adding extra spice to the roast...",
    "Cranking up the heat...",
  ];

  useEffect(() => {
    let interval;

    if (loading) {
      interval = setInterval(() => {
        setLoadingTextIndex(
          (prevIndex) => (prevIndex + 1) % loadingMessages.length
        );
      }, 1000); // Change message every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid PDF or DOCX file");
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("roastLevel", roastLevel);

    setLoading(true);
    setError("");
    setLoadingTextIndex(0); // Reset the loading text index

    try {
      const response = await axios.post(
        "http://localhost:5000/api/roast-resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Navigate to the result page with the result data
      navigate("/result", {
        state: { result: { ...response.data, roastLevel: roastLevel } },
      });
    } catch (error) {
      setError(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectDescription.trim() || !projectLink.trim()) {
      setError("Both project description and project link are required.");
      return;
    }

    setLoading(true);
    setError("");
    setLoadingTextIndex(0); // Reset the loading text index

    try {
      const response = await axios.post(
        "http://localhost:5000/api/roast-project",
        {
          projectDescription,
          projectLink,
          roastLevel,
        }
      );
      // Navigate to the result page with the result data
      navigate("/result", {
        state: { result: { ...response.data, roastLevel: roastLevel } },
      });
    } catch (error) {
      setError(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  // Render loading screen if loading is true
  if (loading) {
    return (
      <div className="min-h-screen font-sans flex flex-col justify-center items-center text-white">
        <div className="max-w-md w-full mx-auto p-6  rounded-lg shadow-2xl text-center">
          <div className="mb-8">
            <Flame className="w-16 h-16 text-orange-500 mx-auto animate-pulse" />
          </div>

          <h2 className="text-2xl font-bold mb-6">
            {loadingMessages[loadingTextIndex]}
          </h2>

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 relative">
              <Loader size={64} className="animate-spin text-orange-500" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-400">
              Our AI critics are reviewing your{" "}
              {activeTab === "resume" ? "resume" : "project"} with
              {roastLevel === ROAST_LEVELS.MILD
                ? " mild"
                : roastLevel === ROAST_LEVELS.SPICY
                ? " spicy"
                : " extra hot"}{" "}
              intensity.
            </p>

            <p className="text-gray-300 text-sm">
              This should take just a few moments...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans flex flex-col text-white">
      <div className="container w-full flex justify-between items-center">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center cursor-pointer gap-2 bg-zinc-900 hover:bg-zinc-800 hover:text-white py-2 px-4 rounded-lg border border-zinc-800 transition-colors text-gray font-medium"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        <Link to="/example">
          <button className="flex items-center gap-2 cursor-pointer bg-white hover:bg-gray-200 text-black font-medium py-2 px-4 rounded-lg transition-colors">
            <Flame className="w-6 h-6 text-orange-500" /> View Roast Example
          </button>
        </Link>
      </div>

      <header className="py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold text-white mb-2">
              Roast My Stuff
            </h1>
            <Flame className="w-12 h-12 text-orange-400" />
          </div>
          <p className="text-white text-opacity-90 text-lg max-w-xl mx-auto">
            Get a humorous yet helpful critique of your resume or project
          </p>
        </div>
      </header>

      <main className="flex-1 py-2 px-4">
        <div className="max-w-xl mx-auto">
          <div className="flex mb-8 rounded-lg overflow-hidden shadow-md bg-gray-800">
            <button
              className={`flex-1 py-3 px-4 font-medium cursor-pointer transition-colors flex items-center justify-center ${
                activeTab === "resume"
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-950 text-gray-300 hover:bg-zinc-950"
              }`}
              onClick={() => setActiveTab("resume")}
              role="tab"
              aria-selected={activeTab === "resume"}
            >
              <FileText size={18} className="mr-2" />
              Resume
            </button>
            <button
              className={`flex-1 py-3 px-4 font-medium cursor-pointer transition-colors flex items-center justify-center ${
                activeTab === "project"
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-950 text-gray-300 hover:bg-zinc-950"
              }`}
              onClick={() => setActiveTab("project")}
              role="tab"
              aria-selected={activeTab === "project"}
            >
              <Code size={18} className="mr-2" />
              Project
            </button>
          </div>

          <div className="bg-zinc-950 rounded-lg shadow-lg p-6 mb-8">
            {activeTab === "resume" ? (
              <form onSubmit={handleResumeSubmit} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">
                  Upload Your Resume
                </h2>

                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="resumeUpload"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="resumeUpload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload size={32} className="text-purple-500 mb-2" />
                    <span className="text-gray-300 font-medium">
                      Drop your resume here or click to browse
                    </span>
                    <span className="text-gray-500 text-sm mt-1">
                      Accepts PDF or DOCX
                    </span>
                  </label>
                  {file && (
                    <div className="mt-3 text-sm flex items-center justify-center text-gray-300">
                      <Check size={16} className="text-green-500 mr-1" />
                      <span>Selected: {file.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Roast Intensity
                  </label>
                  <select
                    value={roastLevel}
                    onChange={(e) => setRoastLevel(e.target.value)}
                    className="w-full border border-gray-700 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-zinc-950"
                  >
                    <option value={ROAST_LEVELS.MILD}>Mild Roast 🔥</option>
                    <option value={ROAST_LEVELS.SPICY}>Spicy Roast 🔥🔥</option>
                    <option value={ROAST_LEVELS.EXTRA_BURN}>
                      Extra Burn 🔥🔥🔥
                    </option>
                  </select>
                </div>

                {error && (
                  <div className="bg-red-900 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex items-center">
                      <AlertCircle size={20} className="text-red-500 mr-2" />
                      <p className="text-red-300">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full ccursor-pointer bg-white text-black hover:bg-gray-200 rounded-md  duration-300 text-base py-3 px-4  font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
                >
                  <Zap size={18} className="mr-2" />
                  Roast My Resume
                </button>
              </form>
            ) : (
              <form onSubmit={handleProjectSubmit} className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">
                  Share Your Project
                </h2>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Project Description
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Tell us about your project..."
                    className="w-full border border-gray-700 rounded-lg p-3 text-gray-300 min-h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-zinc-950"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Project Link
                  </label>
                  <input
                    type="url"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="https://your-project-url.com"
                    className="w-full border border-gray-700 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-zinc-950"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Roast Intensity
                  </label>
                  <select
                    value={roastLevel}
                    onChange={(e) => setRoastLevel(e.target.value)}
                    className="w-full border border-gray-700 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-zinc-950 mb-2"
                  >
                    <option value={ROAST_LEVELS.MILD}>Mild Roast 🔥</option>
                    <option value={ROAST_LEVELS.SPICY}>Spicy Roast 🔥🔥</option>
                    <option value={ROAST_LEVELS.EXTRA_BURN}>
                      Extra Burn 🔥🔥🔥
                    </option>
                  </select>
                </div>

                {error && (
                  <div className="bg-red-900 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex items-center">
                      <AlertCircle size={20} className="text-red-500 mr-2" />
                      <p className="text-red-300">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full ccursor-pointer bg-white text-black hover:bg-gray-200 rounded-md  duration-300 text-base py-3 px-4  font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
                >
                  <Zap size={18} className="mr-2" />
                  Roast My Project
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <footer className="py-4 mt-auto">
        <div className="container mx-auto px-2 text-center text-gray-400">
          <p>
            Roast My Stuff • Get brutally honest feedback with a sense of humor
          </p>
        </div>
      </footer>
    </div>
  );
}

export default RoastMyStuff;
