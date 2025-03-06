import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center font-medium">
      <div className="flex flex-col items-center justify-center w-full max-w-6xl gap-8 px-6">
        <h1 className="text-4xl text-center  text-red-600">
          404 | Page Not Found
        </h1>

        {/* Text content */}
        <div className="flex flex-col items-center ">
          <p className="text-white text-lg text-center">
            Oops! The page you are looking for doesn’t exist.
          </p>
          <p className="text-white text-xl text-center">
            Let's get you back on track.
          </p>

          <Link
            to="/"
            className="flex items-center gap-2 mt-8 bg-white text-black py-3 px-8 rounded-md font-medium hover:bg-gray-200 transition-colors"
          >
            TAKE ME HOME
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
