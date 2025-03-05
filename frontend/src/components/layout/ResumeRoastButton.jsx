import React, { useState, useEffect } from 'react';
import { Loader, Zap } from 'lucide-react';

const ResumeRoastButton = () => {
  const [loading, setLoading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  
  const loadingMessages = [
    "Roasting...",
    "Don't take this too seriously...",
    "Finding your resume's flaws...",
    "Preparing brutal honesty...",
    "Adding extra spice to the roast...",
    "Cranking up the heat..."
  ];
  
  useEffect(() => {
    let interval;
    
    if (loading) {
      interval = setInterval(() => {
        setLoadingTextIndex((prevIndex) => 
          (prevIndex + 1) % loadingMessages.length
        );
      }, 2000); // Change message every 2 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);
  
  const handleClick = () => {
    setLoading(true);
    // Simulate API call or processing time
    setTimeout(() => {
      setLoading(false);
    }, 12000); // 12 seconds total loading time
  };
  
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-purple-600 to-red-500 text-white cursor-pointer py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? (
        <>
          <Loader size={18} className="animate-spin mr-2" />
          {loadingMessages[loadingTextIndex]}
        </>
      ) : (
        <>
          <Zap size={18} className="mr-2" />
          Roast My Resume
        </>
      )}
    </button>
  );
};

export default ResumeRoastButton;