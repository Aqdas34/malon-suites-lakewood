import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show after 2 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenPromo');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenPromo', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl overflow-hidden bg-[#1e1e1e] border-4 border-[#9b804e] shadow-2xl"
          >
            {/* Background Image with Blur */}
            <div 
              className="absolute inset-0 z-0 opacity-40 blur-[2px]"
              style={{
                backgroundImage: 'url("/assets/images/SEV05362.jpg")',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 text-center text-white">
              <button 
                onClick={closePopup}
                className="absolute top-4 right-4 p-2 bg-[#9b804e] hover:bg-[#856d42] transition-colors text-white"
              >
                <X size={24} />
              </button>

              <div className="space-y-6">
                <span className="block text-[#9b804e] font-forum text-lg tracking-[0.2em] uppercase">
                  First-Stay Offers Await! 🎉
                </span>
                
                <h2 className="text-6xl md:text-8xl font-forum italic text-white leading-tight">
                  Exclusive
                </h2>

                <p className="max-w-xl mx-auto text-lg text-gray-200 font-lora leading-relaxed">
                  Enter your email to receive special promo codes for your first booking — including instant savings and a complimentary breakfast.
                </p>

                <div className="max-w-md mx-auto space-y-4">
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Your email address"
                      className="w-full bg-transparent border border-[#9b804e]/50 py-4 px-6 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#9b804e] transition-colors font-lora italic text-xl"
                    />
                  </div>
                  
                  <button 
                    onClick={closePopup}
                    className="w-full md:w-auto px-12 py-4 bg-[#9b804e] hover:bg-[#856d42] text-white font-forum text-2xl uppercase tracking-wider transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
