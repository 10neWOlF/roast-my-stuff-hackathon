import React from "react";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import Main from "../components/layout/Main";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Main />
      <Footer />
    </div>
  );
};

export default LandingPage;