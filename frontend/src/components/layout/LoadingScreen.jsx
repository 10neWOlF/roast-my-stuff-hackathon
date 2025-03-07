import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const text = "ROAST MY STUFF";
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, (text.length * 200) + 2500);
    
    return () => clearTimeout(timer);
  }, [text.length]);
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 bg-zinc-950 flex flex-col justify-center items-center z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-center mb-8 w-full px-4 overflow-x-auto whitespace-nowrap">
            <div className="flex justify-center min-w-min mx-auto">
              {text.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mx-1 sm:mx-2 text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, color: '#ffffff' }}
                  transition={{ 
                    delay: index * 0.2,
                    duration: 0.5
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;