import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Malon Luxury Suites",
      subtitle: "YOUR HOME AWAY FROM HOME",
      description: "HOTEL-STYLE COMFORT. HOME-STYLE PRIVACY.STAY LOCAL,STAY IN LUXURY",
      image: "/assets/images/SEV05322.jpg"
    },
    {
      title: "Luxury Redefined",
      subtitle: "YOUR HOME AWAY FROM HOME",
      description: "MODERN UPSCALE DESIGN WITH EVERY DIGITAL CREAYED FOR COMFORT AND STYLE",
      image: "/assets/images/Slider-01.jpg"
    },
    {
      title: "Nightly Stays",
      subtitle: "A HOTEL SUITE EXPERIENCE IN A HOME SETTING",
      description: "AVAILABLE FOR RENT JUST LIKE A HOTEL, WHILE STAYING LOCAL AND CLOSE TO EVERYTHING YOU NEED.",
      image: "/assets/images/Slider-02.jpg"
    },
    {
      title: "Perfectly Sized Suites",
      subtitle: "DESIGNED FOR YOUR COMFORT",
      description: "Ideal for singles or couples, thoughtfully priced for your stay.",
      image: "/assets/images/Slider-02.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-malon-cream">
      {/* Background Images with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        />
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="relative z-10 text-center px-5 max-w-[1100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              className="text-[60px] md:text-[100px] font-forum mb-4 text-malon-dark uppercase tracking-tight leading-none"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              className="text-malon-gold tracking-[.5em] uppercase text-[12px] md:text-[14px] font-bold mb-10"
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            <motion.p
              className="text-[14px] md:text-[16px] uppercase tracking-[.3em] mb-14 font-poppins font-bold text-malon-gray leading-relaxed max-w-[800px] mx-auto opacity-80"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div>
              <Link
                to="/hotel-search"
                className="inline-block bg-malon-primary text-white px-16 py-6 text-[13px] uppercase tracking-[.4em] font-bold hover:bg-malon-dark transition-all duration-700 rounded-sm shadow-2xl"
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-10 z-20 flex flex-col space-y-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-[2px] h-10 transition-all duration-500 ${currentSlide === index ? 'bg-malon-gold' : 'bg-malon-gold/20'
              }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 right-10 z-10 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-[.6em] text-malon-gold mb-6 font-bold -rotate-90 origin-right translate-x-4">Scroll</span>
        <div className="w-[1px] h-20 bg-malon-gold/20 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 80] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-malon-gold"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
