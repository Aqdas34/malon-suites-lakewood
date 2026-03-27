import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Coffee, Shield, Utensils, Zap, Wifi, MapPin, Check, Waves, ShieldCheck, Heart, User } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: "easeOut" }
};

const AboutUs = () => {
  return (
    <div className="font-forum bg-white">
      {/* Hero Section / Breadcrumb */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center pt-[120px] pb-[100px] overflow-hidden">
        {/* Background Image with Cream Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/SEV05322.jpg" 
            alt="Malon Suite" 
            className="w-full h-full object-cover"
          />
          {/* Multi-layer overlay for 1:1 parity */}
          <div className="absolute inset-0 bg-[#fcf9f2]/70"></div> {/* Base cream tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fcf9f2] via-[#fcf9f2]/40 to-transparent opacity-80"></div> {/* Top-heavy gradient */}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-10"
        >
          <h1 className="text-[55px] md:text-[75px] font-forum mb-6 tracking-tight text-[#333333]">About Us</h1>
          <div className="flex justify-center items-center text-[12px] uppercase tracking-[.45em] font-bold text-[#c5a977]">
            <Link to="/" className="hover:text-[#333333] transition-colors">Home</Link>
            <span className="mx-4 text-[#333333] opacity-20">/</span>
            <span className="text-[#333333]/60">About Us</span>
          </div>
        </motion.div>
      </section>




      {/* About Section - "KNOW US" */}
      <section className="py-[120px] bg-white overflow-hidden relative">
         <div className="max-w-[1400px] mx-auto px-10 relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               {/* Left Image */}
               <motion.div 
                  {...fadeInLeft}
                  className="w-full lg:w-1/2 min-h-[550px] bg-cover bg-center rounded-sm shadow-xl"
                  style={{ backgroundImage: 'url("/assets/images/SEV05322.jpg")' }}
               />

               {/* Right Text */}
               <motion.div 
                  {...fadeInRight}
                  className="w-full lg:w-1/2 py-6"
               >
                  <div className="mb-8">
                     <p className="text-[#c5a977] uppercase tracking-[.6em] text-[12px] font-bold mb-4">KNOW US</p>
                     <h2 className="text-[48px] md:text-[56px] font-forum leading-tight text-[#3D3931]">About Malon</h2>
                  </div>
                  
                  <div className="space-y-6 text-[#333333] text-[16px] leading-[1.8] font-poppins">
                     <p>You know what a hotel suite feels like—modern, refined, and thoughtfully designed. Every detail, from the furniture to the amenities, is curated for comfort and ease. It’s the kind of space you choose for a getaway, a business trip, or anytime you want your stay to feel effortless and upscale.</p>
                     
                     <p>You also know an Airbnb. Typically a full-size home, each one reflects the character of a standard residence—sometimes charming, sometimes basic, always varied. They’re often tucked into local neighborhoods, close to shopping, shuls, and community attractions. But what if you want to stay local and enjoy the elevated comfort of a hotel? And what if you’re a couple or single guest, and the available options feel oversized, impractical, or overpriced?</p>
                     
                     <p className="font-bold text-[18px] text-[#3D3931]">Welcome to Malon Luxury Suites.</p>
                     
                     <p>Introduced to the Lakewood market in early 2025, Malon Luxury Suites reimagined short-term stays with a fresh concept: hotel-style suites thoughtfully designed for a residential setting. Upscale finishes, modern design, and carefully selected amenities—paired with the convenience of staying exactly where you want to be. Truly, the best of both worlds.</p>
                     
                     <p>Now featuring three prime Lakewood locations, Malon Luxury Suites continues to grow in response to strong demand and growing interest, with plans to expand further. Each suite offers the same elevated experience, making Malon a preferred choice for singles and couples seeking a stay that feels refined, comfortable, and seamless.</p>
                     
                     <p>Perfect for getaways, simcha guests, chosson and kallah during sheva brachos, or business travel, Malon Luxury Suites delivers a stay that feels both luxurious and local.</p>
                     
                     <p className="font-bold text-[#3D3931]">Book your stay at Malon Luxury Suites—and experience Lakewood, elevated.</p>
                  </div>
               </motion.div>
            </div>
         </div>
         {/* Background Watermark */}
         <div className="absolute top-1/2 right-[-100px] transform -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
            <img src="/assets/images/Centered.png" alt="" className="w-[600px] h-[600px] object-contain rotate-12" />
         </div>
      </section>

      {/* Features Section - "BEST AMENITIES" */}
      <section className="py-[120px] bg-[#F4F1EA] relative overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-10 relative z-10">
            <div className="flex flex-col lg:flex-row gap-20">
               {/* Left Content */}
               <motion.div 
                  {...fadeInLeft}
                  className="w-full lg:w-3/5"
               >
                  <div className="mb-12">
                     <p className="text-[#c5a977] uppercase tracking-[.6em] text-[12px] font-bold mb-4">BEST AMENITIES</p>
                     <h2 className="text-[48px] md:text-[56px] font-forum leading-tight text-[#3D3931] mb-8">
                        Features of a Malon <span className="text-[#c5a977]">Suite</span>
                     </h2>
                     <p className="text-[#333333] text-[16px] leading-relaxed max-w-2xl font-poppins mb-10">
                        Upgrade your stay with The Malon Elite Package, a curated collection of gourmet offerings designed to bring luxury dining right to your suite. Whether it’s a weekday breakfast or a Shabbos Oneg, enjoy handcrafted dishes and beautiful presentation — all delivered to your door for the ultimate convenience and extravagance.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                     {[
                        { icon: Shield, title: "Upscale Design", text: "Feel pampered. Elegant, luxurious suites with stylish furniture and thoughtful upgrades designed for comfort and relaxation." },
                        { icon: Coffee, title: "Coffee Brewer", text: "Your morning, elevated. Enjoy a full coffee machine with fresh milk and all accessories in your suite—hotel-style convenience at your fingertips." },
                        { icon: Utensils, title: "Modern Bathrooms", text: "Refresh and renew. Spacious, modern bathrooms with premium toiletries and soft towels for a spa-like experience." },
                        { icon: Zap, title: "In-Suite Tech", text: "Stay connected. High-speed internet and modern tech for all your communication and entertainment needs." },
                        { icon: Wifi, title: "Complimentary WiFi", text: "Work and play. Free WiFi throughout the suite to keep you connected during your stay." },
                        { icon: MapPin, title: "Close to Shuls", text: "Daven without compromise. Located near multiple shuls with a range of nuschaos and davening times, so you never miss a Minyan." }
                     ].map((item, i) => (
                        <div key={i} className="group flex items-start">
                           <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100 group-hover:bg-[#c5a977] transition-all duration-500">
                              <item.icon size={22} className="text-[#c5a977] group-hover:text-white transition-colors" />
                           </div>
                           <div className="ml-6 pt-1">
                              <h4 className="text-[17px] uppercase font-forum tracking-wider mb-2 group-hover:text-[#c5a977] transition-colors">{item.title}</h4>
                              <p className="text-[13px] text-gray-500 leading-relaxed font-poppins">{item.text}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>

               {/* Right Image Block */}
               <motion.div 
                  {...fadeInRight}
                  className="w-full lg:w-2/5"
               >
                  <div className="relative h-full min-h-[600px] overflow-hidden group shadow-2xl rounded-sm">
                     <img src="/assets/images/ElitePackage.webp" alt="Dining Features" className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" />
                     <div className="absolute inset-6 border border-white/20 pointer-events-none"></div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Connect Section */}
      <section className="bg-[#F4F1EA] py-[120px] px-10 relative overflow-hidden">
        <motion.div 
          {...fadeInUp}
          className="max-w-[1100px] mx-auto text-center mb-16"
        >
          <p className="text-[#c5a977] uppercase tracking-[.6em] text-[12px] font-bold mb-4">REACH US</p>
          <h2 className="text-[55px] md:text-[72px] font-forum leading-tight mb-8 text-[#3D3931]">Connect With Malon</h2>
          <p className="text-[#333333] text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto font-poppins opacity-80">
            Have a question or want to book your stay? Contact Malon for quick assistance with availability, pricing, or custom packages. Your comfort is our priority.
          </p>
        </motion.div>

        <motion.div 
          {...fadeInUp}
          className="max-w-[1100px] mx-auto"
        >
          <ContactForm />
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;


