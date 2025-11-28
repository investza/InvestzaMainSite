import React from "react";
import { useContext } from "react";
import { showFormContext } from "../contexts/showFormContext";

function Navbar() {
  const { showForm, setShowForm } = useContext(showFormContext);

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* === Left Section === */}
        <div className="flex items-center">
          <h1 className="font-montserrat text-white text-2xl md:text-3xl font-normal tracking-tight">
            Investza
          </h1>
        </div>

        {/* === Right Section === */}
        <div className="flex items-center space-x-0 md:space-x-6">
          {/* Member Login */}
          <button
            className="
    px-1 py-2
    mx-1
    text-xs font-medium 
    rounded-full 
    text-white 
    bg-gradient-to-r from-blue-600 to-purple-600 
    hover:from-blue-700 hover:to-purple-700 
    hover:shadow-md hover:shadow-purple-500/30 
    active:scale-95
    transition-all duration-300 
    cursor-pointer border-none
    
    md:px-6 md:py-3 
    md:text-base 
    md:font-semibold
    md:hover:shadow-lg md:hover:shadow-purple-500/40 
    md:hover:-translate-y-0.5
  "
            aria-label="Download on Google Play"
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps/details?id=com.nvcproject.InvestzaApp&pcampaignid=web_share",
                "_blank"
              )
            }
          >
            Download App
          </button>
          <button
            className="gradient-button px-6 py-3 rounded-full text-white font-semibold cursor-pointer border-none"
            onClick={() => setShowForm(true)}
          >
            Review My Portfolio
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
