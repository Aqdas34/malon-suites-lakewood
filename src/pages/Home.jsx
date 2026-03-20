import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import BookingBar from '../components/BookingBar'
import ImageStrip from '../components/ImageStrip'
import Testimonials from '../components/Testimonials'
import PricingSection from '../components/PricingSection'
import ConnectSection from '../components/ConnectSection'

const Home = () => {
  const suites = [
    {
      id: "bellinger-st-suites",
      name: "Bellinger Street Suites",
      image: "/assets/images/SEV05322.jpg",
    },
    {
      id: "laurel-ave-suite",
      name: "Laurel Avenue Suite",
      image: "/assets/images/SEV05327.jpg",
    },
    {
      id: "miller-rd-suite",
      name: "Miller Rd. Suite",
      image: "/assets/images/SEV05337-1.jpg",
    }
  ];

  return (
    <>
      <Hero />
      <BookingBar />
      
      {/* KNOW US Section */}
      <section className="py-[150px] max-w-[1400px] mx-auto px-10 text-center relative overflow-hidden">
        {/* Background Art Icon Mask */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-[0.03] z-0 pointer-events-none"
          style={{
            backgroundImage: 'url("/assets/images/bg-art-icon-1.svg")',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-malon-gold uppercase tracking-[.45em] text-[12px] font-bold mb-8"
        >
          KNOW US
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[50px] md:text-[70px] font-forum leading-tight text-malon-dark mb-12"
        >
          Hotel Comfort. Local Living.
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-[900px] mx-auto space-y-8 text-malon-gray/80 text-[16px] leading-[1.8] font-medium"
        >
          <p>
            Malon Luxury Suites brings the elevated feel of a modern hotel suite into the heart of Lakewood, NJ. Thoughtfully designed with 
            upscale finishes, refined furnishings, and curated amenities, each suite offers a seamless, comfortable stay—without the excess space 
            or inconsistency of a traditional rental.
          </p>
          <p>
            Created for singles and couples who want to stay local without compromising on style or convenience, Malon Luxury Suites blends 
            sophisticated design with prime residential locations close to everything that matters. Ideal for getaways, simcha guests, sheva 
            brachos, or business travel.
          </p>
          <p className="italic font-lora text-[20px] text-malon-gold pt-4">Experience the perfect balance of luxury and locality.</p>
        </motion.div>
      </section>

      <ImageStrip />

      {/* Featured Suites Section - Reserve Your Suite */}
      <section className="py-[150px] bg-white">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="text-center mb-24 max-w-[850px] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[50px] md:text-[70px] font-forum leading-tight text-malon-dark mb-8"
            >
              Reserve Your Suite
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-malon-gray/60 text-[15px] leading-loose font-medium"
            >
              Booking your stay at Malon Luxury Suites is effortless. Choose from our three beautifully appointed suites, each designed for comfort, 
              privacy, and style. Whether it’s a short getaway, a business trip, or a simcha stay, our team is ready to ensure your experience is seamless.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {suites.map((suite, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group bg-[#FAF9F6] border border-black/5 p-10 transition-all hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] hover:-translate-y-2"
              >
                <div className="relative overflow-hidden aspect-[1.2] mb-10 shadow-lg">
                   <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={suite.image}
                    alt={suite.name}
                    className="object-cover w-full h-full cursor-pointer"
                  />
                </div>
                <h3 className="text-[32px] font-forum mb-10 text-malon-dark">{suite.name}</h3>
                <div className="flex space-x-4">
                  <Link to={`/hotel-search/${suite.id}`} className="flex-1 bg-malon-primary/80 text-white text-[11px] uppercase tracking-[.25em] font-bold py-4 hover:bg-malon-primary transition-all text-center">
                    View Details
                  </Link>
                  <Link to="/hotel-search" className="flex-1 bg-malon-primary/80 text-white text-[11px] uppercase tracking-[.25em] font-bold py-4 hover:bg-malon-primary transition-all text-center">
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ConnectSection />
      <PricingSection />
      <Testimonials />
    </>
  )
}

export default Home
