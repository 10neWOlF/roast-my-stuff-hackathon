import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import Main from "../components/layout/Main";
import LoadingScreen from "../components/layout/LoadingScreen";
import { useLocation } from "react-router-dom";

const LandingPage = () => {
  const [loading, setLoading] = useState(() => {
    return true;
  });
  const location = useLocation();

  useEffect(() => {
    const isNavigating = sessionStorage.getItem("isNavigating");
    if (!isNavigating) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("isNavigating", "true");
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }

    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("isNavigating");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        sessionStorage.removeItem("isNavigating");
      });
    };
  }, []);
  


  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Hero />
          <Main />
          <Footer />
        </div>
      )}
    </>
  );
};

export default LandingPage;