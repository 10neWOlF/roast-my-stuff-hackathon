import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, ExternalLink } from "lucide-react";
import "../../utils/global.css";

const Footer = () => {
  return (
    <div className="mx-auto px-4 sm:px-6">
      <div className="flex flex-col items-center justify-center">
        <footer className="w-full py-12 sm:py-20 border-t border-gray-800 bg-black">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {/* About Section */}
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl text-white font-bold mb-3 sm:mb-4 gradient-text">
                  Roast My Stuff
                </h3>
                <p className="text-gray-400 text-sm sm:text-base w-full sm:w-5/6 mx-auto sm:mx-0">
                  A platform where AI roasts your resume, website, or portfolio
                  to help you improve.
                </p>
              </div>

              {/* Resources Section */}
              <div className="text-center sm:text-left">
                <h4 className="text-lg sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                  Resources
                </h4>
                <ul className="space-y-2 text-white">
                  <li>
                    <Link
                      to="/workflow"
                      className="inline-flex items-center justify-center sm:justify-start w-full space-x-2 text-gray-300 hover:text-white transition-all text-sm sm:text-base py-1"
                    >
                      <span>How It Works ?</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Connect Section */}
              <div className="text-center sm:text-left">
                <h4 className="text-lg sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                  Connect
                </h4>
                <ul className="flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-start space-y-0 space-x-6 sm:space-x-0 sm:space-y-4 text-white">
                  <li>
                    <a
                      href="https://github.com/your-github-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm sm:text-base transform transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    >
                      <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/your-twitter-handle"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm sm:text-base transform transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    >
                      <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Twitter</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
