import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "What a great experience! So many details, don't know where to start. Try it yourself you'll not regret! Very happy we chose this place for our short vacation! Thanks for the special price and white glove service!",
    author: "CM",
    location: "Lakewood, NJ"
  },
  {
    text: "Everything is new clean and beautiful. My husband is a vegetarian and they were very accommodating. Stayed there over Shabbat and loved every minute. They have everything you need!!! A few shuls and beautiful lake to enjoy in walking distance. Really enjoyed our stay",
    author: "FK",
    location: "Lakewood, NJ"
  },
  {
    text: "We stayed at Malon for a few days and we loved the experience. Every detail has been carefully thought about to give guests a true hotel feeling. It is very comfortable, spacious enough for a couple, and in an excellent location, being close enough to shuls and stores but having enough privacy and not being in a very busy area. We highly recommend Malon!",
    author: "MD",
    location: "Lakewood, NJ"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-[150px] bg-malon-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 border-b border-malon-gold/20 pb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-malon-gold uppercase tracking-[.4em] text-[12px] font-bold mb-6">Testimonial</p>
            <h2 className="text-[55px] md:text-[70px] font-forum leading-tight text-malon-dark">What Our Clients Says</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 lg:mt-0"
          >
            <a 
              href="https://www.google.com/search?q=malon+lakewood" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-transparent border border-malon-accent text-malon-accent px-10 py-4 text-[11px] uppercase tracking-[.3em] font-bold hover:bg-malon-accent hover:text-white transition-all duration-500"
            >
              Read More Reviews
            </a>
          </motion.div>
        </div>

        <div className="relative max-w-[1000px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <div className="flex justify-center space-x-1 mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-malon-gold text-malon-gold" />
                ))}
              </div>
              
              <p className="text-[24px] md:text-[32px] font-lora italic text-malon-dark leading-relaxed mb-12">
                "{testimonials[currentIndex].text}"
              </p>
              
              <div className="w-16 h-[1px] bg-malon-gold mx-auto mb-8"></div>
              
              <p className="uppercase tracking-[.4em] text-[11px] font-poppins font-bold text-malon-gold">
                — {testimonials[currentIndex].author}, {testimonials[currentIndex].location}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-3 mt-20">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 ${
                  currentIndex === index 
                    ? 'w-10 h-[2px] bg-malon-gold' 
                    : 'w-4 h-[2px] bg-malon-gold/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
