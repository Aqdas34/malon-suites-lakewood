import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const ConnectSection = () => {
  return (
    <section className="bg-malon-cream overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Side: Text and Form */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[48%] py-24 px-10 md:px-20 lg:px-24"
        >
          <p className="text-malon-gold uppercase tracking-[.4em] text-[12px] font-bold mb-4">REACH US</p>
          <h2 className="text-[55px] md:text-[65px] font-forum leading-tight mb-8">Connect With Malon</h2>
          <p className="text-malon-gray/80 text-[14px] leading-[1.8] font-poppins mb-12 max-w-[550px]">
            Have a question or want to book your stay? Contact Malon for quick
            assistance with availability, pricing, or custom packages. Your comfort is our
            priority.
          </p>
          
          <ContactForm />
        </motion.div>

        {/* Right Side: The Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[52%] min-h-[500px] relative mt-12 lg:mt-0"
        >
          <img 
            src="/assets/images/SEV05322.jpg" 
            alt="Malon Luxury Suite Interior" 
            className="w-full h-full object-cover shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default ConnectSection
