import React from 'react';
import { motion } from 'framer-motion';

const images = [
  "/assets/images/SEV05322.jpg",
  "/assets/images/SEV05327.jpg",
  "/assets/images/SEV05337-1.jpg",
  "/assets/images/SEV05362.jpg",
  "/assets/images/SEV05372.jpg",
  "/assets/images/SEV05377.jpg",
  "/assets/images/SEV05387.jpg",
  "/assets/images/Room-4@2x.jpg",
  "/assets/images/Room-5@2x.jpg",
  "/assets/images/Room-6@2x.jpg",
  "/assets/images/Room-7@2x.jpg"
];

const ImageStrip = () => {
  // Multiply images to create seamless loop
  const duplicatedImages = [...images, ...images];
  
  // Each card is now 260px + 20px gap = 280px
  const scrollDistance = images.length * 280;

  return (
    <div className="w-full bg-[#FAF9F6] py-[40px] overflow-hidden relative">
      <motion.div 
        className="flex space-x-5 px-5"
        animate={{
          x: [0, -scrollDistance],
        }}
        transition={{
          duration: 35, // Adjusted to match smaller cards
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ width: 'fit-content' }}
      >
        {duplicatedImages.map((img, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-[200px] md:w-[260px] aspect-[1.3] rounded-[18px] overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.03)] border border-black/5"
          >
            <img 
              src={img} 
              alt={`Gallery ${index}`} 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110 cursor-pointer"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
      
      {/* Soft gradient edges for a more premium look */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default ImageStrip;
