import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'

const ContactUs = () => {
  return (
    <div className="pt-[150px]">
      <section className="bg-malon-dark text-white py-[180px] text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-[60px] md:text-[90px] font-forum leading-tight">Contact Us</h1>
          <div className="text-malon-gold tracking-[.4em] uppercase text-[12px] font-bold mt-4">Get In Touch</div>
        </motion.div>
        
        {/* Ken Burns Background */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 z-[-1] opacity-70"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
      </section>

      <section className="py-[120px] bg-white">
        <div className="max-w-[1400px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-16"
            >
                <div>
                   <h2 className="text-[55px] font-forum text-malon-dark mb-10">Our Studio</h2>
                   <div className="space-y-8 text-malon-gray/80 text-[16px] leading-[1.8] font-medium">
                      <p className="flex items-start">
                         <span className="text-malon-gold mr-6 font-bold text-[18px]">A.</span>
                         129 Miller Road, Lakewood, New Jersey 08701, United States
                      </p>
                      <p className="flex items-start">
                         <span className="text-malon-gold mr-6 font-bold text-[18px]">P.</span>
                         908 - 94- MALON (62566)
                      </p>
                      <p className="flex items-start">
                         <span className="text-malon-gold mr-6 font-bold text-[18px]">E.</span>
                         reservation@malonluxurysuites.com
                      </p>
                   </div>
                </div>
                
                <div className="pt-12 border-t border-black/5">
                   <h3 className="text-[12px] uppercase tracking-[.4em] font-bold text-malon-gold mb-10">FOLLOW US</h3>
                   <div className="flex space-x-12 text-[14px] font-bold text-malon-dark">
                      <a href="#" className="hover:text-malon-gold transition-colors tracking-widest uppercase">Facebook</a>
                      <a href="#" className="hover:text-malon-gold transition-colors tracking-widest uppercase">Instagram</a>
                      <a href="#" className="hover:text-malon-gold transition-colors tracking-widest uppercase">Twitter</a>
                   </div>
                </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="bg-[#FAF9F6] p-12 md:p-16 border border-black/5 shadow-2xl relative"
            >
                <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-malon-gold/20 translate-x-4 translate-y-[-16px]"></div>
                <ContactForm />
            </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[650px] bg-gray-200 relative grayscale hover:grayscale-0 transition-all duration-1000">
         <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.2413554167527!2d-74.212!3d40.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c176378e859b7b%3A0xe960205dfb158087!2s129%20Miller%20Rd%2C%20Lakewood%2C%20NJ%2008701!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter saturate-50"
         />
      </section>
    </div>
  )
}

export default ContactUs
