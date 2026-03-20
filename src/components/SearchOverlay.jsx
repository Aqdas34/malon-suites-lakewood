import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [keyword, setKeyword] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#2b2922f2] backdrop-blur-md flex flex-col items-center pt-[20vh]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 text-white/80 hover:text-white hover:rotate-90 transition-all duration-500 p-2"
          >
            <X size={40} strokeWidth={1.5} />
          </button>

          {/* Search Content */}
          <div className="w-full max-w-[1000px] px-10 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-[50px] md:text-[70px] font-forum text-white/90 mb-16 tracking-tight leading-tight"
            >
              Search Result for: {keyword || ',hhkj'}
            </motion.h2>

            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col md:flex-row items-stretch border border-white/10 shadow-2xl"
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="text"
                placeholder="Enter Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 bg-black/20 text-white font-forum text-[24px] md:text-[32px] py-6 px-10 outline-none placeholder:text-white/20 transition-all focus:bg-black/30"
                autoFocus
              />
              <button 
                type="submit"
                className="bg-[#967D52] text-white px-16 py-6 uppercase tracking-[.4em] font-bold text-[14px] hover:bg-[#836c46] transition-all flex items-center justify-center whitespace-nowrap"
              >
                Go
              </button>
            </motion.form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-20 text-left"
            >
              <h3 className="text-[40px] md:text-[60px] font-forum text-white mb-6">Nothing Found.</h3>
              <p className="text-white/60 font-poppins text-sm tracking-widest uppercase">
                Apologies, but no results were found for the requested archive.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
