import React from 'react'
import { motion } from 'framer-motion'

const AboutUs = () => {
  return (
    <div className="pt-[150px]">
      {/* Hero Section */}
      <section className="bg-malon-dark text-white py-[180px] text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-[1000px] mx-auto px-10 relative z-10"
        >
          <h1 className="text-[60px] md:text-[90px] font-forum leading-tight mb-8">About Us</h1>
          <p className="text-[12px] uppercase tracking-[.5em] font-bold text-malon-gold">
            A HOTEL SUITE EXPERIENCE IN A HOME SETTING
          </p>
        </motion.div>
        
        {/* Subtle Background Pattern/Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 z-[-1] opacity-70"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
      </section>

      {/* Main Content */}
      <section className="py-[150px] bg-malon-cream overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="space-y-12"
            >
               <div>
                  <p className="text-malon-gold uppercase tracking-[.4em] text-[12px] font-bold mb-8">OUR STORY</p>
                  <h2 className="text-[55px] md:text-[65px] font-forum text-malon-dark leading-tight">Elevated Comfort, Locally Centered.</h2>
               </div>
               <div className="space-y-8 text-malon-gray/80 text-[16px] leading-loose font-medium">
                  <p>
                    Malon Luxury Suites was created from a single, compelling idea: that luxury shouldn’t always feel distant, and home shouldn’t always feel uncurated. 
                  </p>
                  <p>In the heart of Lakewood, NJ, we identified a need for sophisticated, boutique-style lodging. Traditional hotel chains often feel detached from the local rhythm, while home rentals can lack the consistency and premium finishes of a high-end suite. Malon Luxury Suites bridges that gap.</p>
                  <p>We offer three distinct, high-key suites designed for singles and couples who demand excellence. Every detail—from the bespoke furnishings to the modern kitchenettes and high-speed amenities—has been curated to ensure a seamless experience.</p>
                  <p>Whether you’re in town for a simcha, visiting family, or here on business, Malon Luxury Suites provides the privacy and style you expect, with the locality you need.</p>
               </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="relative"
            >
               <div className="aspect-[4/5] bg-malon-dark overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    className="w-full h-full object-cover" 
                    alt="Interior Design" 
                  />
               </div>
               {/* Accent decoration */}
               <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-malon-gold/30 hidden lg:block"></div>
               <div className="absolute -top-10 -left-10 w-40 h-40 border border-malon-gold/30 hidden lg:block"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy / Values */}
      <section className="py-[150px] bg-white border-t border-black/5">
         <div className="max-w-[1400px] mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
               {[
                 { title: "Consistency", text: "Unlike residential rentals, Malon provides a uniform standard of excellence across all suites. You know exactly what to expect: perfection." },
                 { title: "Sophistication", text: "High-key lighting, minimalist design, and refined materials create an atmosphere of quiet luxury and modern elegance." },
                 { title: "Locality", text: "Prime residential locations place you close to family, simchas, and the vibrant life of Lakewood without the hotel bustle." }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: i * 0.2 }}
                   className="space-y-8"
                 >
                    <h3 className="text-4xl font-forum text-malon-dark">{item.title}</h3>
                    <p className="text-malon-gray/60 text-[15px] leading-loose font-medium">
                      {item.text}
                    </p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>
    </div>
  )
}

export default AboutUs
