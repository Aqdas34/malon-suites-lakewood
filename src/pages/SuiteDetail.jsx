import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BookingBar from '../components/BookingBar'
import { Check, Wind, Coffee, Wifi, Car } from 'lucide-react'

const SuiteDetail = () => {
  const { id } = useParams();
  
  const suitesData = {
    'bellinger-st-suites': {
      name: "Bellinger Street Suites",
      price: "$400.00",
      description: "Experience refined comfort in the heart of Lakewood with this private hotel-style suite, designed for relaxation, convenience, and privacy.",
      images: [
        "/assets/images/SEV05322.jpg",
        "/assets/images/SEV05372.jpg",
        "/assets/images/Room-1@2x.jpg"
      ],
      amenities: ["Kitchenette", "Wi-Fi", "Coffee Machine", "Private Bath"]
    },
    'laurel-ave-suite': {
        name: "Laurel Ave. Suite",
        price: "$375.00",
        description: "A beautifully appointed suite with a modern touch. Perfectly situated for local living with all the comforts of a hotel.",
        images: [
          "/assets/images/SEV05327.jpg", 
          "/assets/images/SEV05377.jpg",
          "/assets/images/Room-3@2x.jpg"
        ],
        amenities: ["Kitchenette", "Wi-Fi", "Coffee Machine", "Private Bath"]
    },
    'miller-rd-suite': {
        name: "Miller Rd. Suite",
        price: "$425.00",
        description: "Our signature suite offering the ultimate in space and luxury. Designed for guests who demand the very best.",
        images: [
          "/assets/images/SEV05337-1.jpg", 
          "/assets/images/SEV05387.jpg",
          "/assets/images/Room-4@2x.jpg"
        ],
        amenities: ["Full Kitchen", "Wi-Fi", "Lounge Area", "Free Parking"]
    }
  };

  const suite = suitesData[id] || suitesData['bellinger-st-suites'];

  if (!suite) {
    return (
      <div className="pt-[150px] text-center">
        <h2 className="text-3xl font-forum">Suite Not Found</h2>
        <Link to="/hotel-search" className="text-malon-gold mt-4 inline-block">Back to Suites</Link>
      </div>
    );
  }

  return (
    <div className="pt-[150px]">
      <section className="h-[75vh] w-full relative overflow-hidden bg-malon-dark">
         <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src={suite.images[0]} 
            className="w-full h-full object-cover opacity-60" 
            alt={suite.name} 
         />
         <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[60px] md:text-[90px] font-forum leading-tight mb-4"
            >
              {suite.name}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-malon-gold tracking-[.5em] uppercase text-[13px] font-bold"
            >
              Suite Details
            </motion.div>
         </div>
         <div className="absolute inset-0 bg-black/40 z-0"></div>
      </section>

      <div className="sticky top-[150px] z-40 bg-white">
          <BookingBar />
      </div>

      <div className="max-w-[1400px] mx-auto px-10 py-[150px]">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            {/* Left Content */}
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="lg:col-span-8 space-y-20"
            >
               <div>
                  <h2 className="text-[55px] font-forum text-malon-dark mb-12 leading-tight">
                    Premium Living. <br />
                    Unmatched Service.
                  </h2>
                  <div className="space-y-10 text-malon-gray/80 text-[16px] leading-[1.8] font-medium">
                     <p>{suite.description}</p>
                     <p>
                        Enjoy plush bedding, tasteful décor, a private kitchenette, modern bathroom, high-speed WiFi, and ground-level private entry. 
                        Conveniently located near shuls, shopping, dining, and event venues, this suite delivers the perfect balance of comfort, 
                        accessibility, and tranquility.
                     </p>
                  </div>
               </div>

               <div>
                 <h3 className="text-[32px] font-forum text-malon-dark mb-12 uppercase tracking-wide border-b border-black/5 pb-6">
                    Amenities & Features
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    {suite.amenities.map((item, index) => (
                       <div key={index} className="flex items-center text-malon-gray font-semibold group">
                          <div className="w-6 h-6 rounded-full bg-malon-gold/10 border border-malon-gold/20 flex items-center justify-center mr-5 group-hover:bg-malon-gold transition-colors duration-500">
                             <Check size={14} className="text-malon-gold group-hover:text-white" />
                          </div>
                          <span className="tracking-wide">{item}</span>
                       </div>
                    ))}
                 </div>
               </div>
            </motion.div>

            {/* Right Sidebar - Booking Info */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="lg:col-span-4"
            >
               <div className="bg-[#FAF9F6] p-12 border border-black/5 sticky top-[250px] shadow-2xl">
                  <div className="mb-12">
                     <p className="text-malon-gold uppercase tracking-[.4em] text-[11px] font-bold mb-4">STARTING FROM</p>
                     <p className="text-[45px] font-forum text-malon-dark leading-none font-bold">{suite.price}<span className="text-[14px] text-malon-gray/40 ml-3 uppercase tracking-widest">/ night</span></p>
                  </div>
                  
                  <div className="py-12 border-y border-black/5 mb-12 space-y-8">
                     <div className="flex items-center text-malon-gray/70 text-[15px] font-bold tracking-wide">
                        <Wind size={20} className="mr-8 text-malon-gold" />
                        <span>Air conditioning</span>
                     </div>
                     <div className="flex items-center text-malon-gray/70 text-[15px] font-bold tracking-wide">
                        <Coffee size={20} className="mr-8 text-malon-gold" />
                        <span>Private Kitchenette</span>
                     </div>
                     <div className="flex items-center text-malon-gray/70 text-[15px] font-bold tracking-wide">
                        <Wifi size={20} className="mr-8 text-malon-gold" />
                        <span>High-speed Wi-Fi</span>
                     </div>
                     <div className="flex items-center text-malon-gray/70 text-[15px] font-bold tracking-wide">
                        <Car size={20} className="mr-8 text-malon-gold" />
                        <span>Free Private Parking</span>
                     </div>
                  </div>

                  <button className="w-full bg-malon-primary text-white py-6 px-10 text-[13px] uppercase tracking-[.4em] font-bold hover:bg-malon-dark transition-all duration-500 shadow-lg">
                     Check Availability
                  </button>
                  
                  <p className="mt-10 text-[11px] text-malon-gray/40 flex items-start leading-relaxed uppercase font-bold tracking-[.25em] text-center">
                     💡 Extra blow-up mattress available for children upon request.
                  </p>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  )
}

export default SuiteDetail
