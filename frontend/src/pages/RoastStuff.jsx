import { ArrowLeft, ChevronLeft, Link } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const RoastStuff = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <>
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
                sorry guys, we are working on this feature.
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
    </>
  );
};

export default RoastStuff;
