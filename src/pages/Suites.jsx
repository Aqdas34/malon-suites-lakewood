import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BookingBar from '../components/BookingBar'

const Suites = () => {
  const suites = [
    {
      id: 'bellinger',
      name: "Bellinger Street Suites",
      price: "$350.00",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 'laurel',
      name: "Laurel Ave. Suite",
      price: "$295.00",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 'miller',
      name: "Miller Rd. Suite",
      price: "$375.00",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div className="pt-[150px]">
      <section className="bg-malon-dark text-white py-[180px] text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-[60px] md:text-[90px] font-forum mb-6">Our Suites</h1>
          <div className="text-[12px] uppercase tracking-[.45em] font-bold text-malon-gold">Malon Luxury Suites</div>
        </motion.div>
        
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 z-[-1] opacity-60"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
      </section>

      <div className="sticky top-[150px] z-40 bg-white">
          <BookingBar />
      </div>

      <section className="py-[120px] bg-malon-cream/30 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {suites.map((suite, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-10 flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-black/5 transition-all transform hover:-translate-y-2 hover:shadow-2xl group"
              >
                <div className="relative aspect-[1.2] mb-12 overflow-hidden shadow-lg">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={suite.image} 
                    alt={suite.name} 
                    className="w-full h-full object-cover cursor-pointer" 
                  />
                </div>
                <h3 className="text-[32px] font-forum text-malon-dark mb-6">{suite.name}</h3>
                <p className="text-malon-gray/60 font-medium mb-12 flex items-center">
                  Starting at: <span className="text-malon-dark ml-3 text-[24px] font-bold tracking-tight">{suite.price}</span>
                  <span className="text-[12px] ml-2 text-malon-gray/40">/ NIGHT</span>
                </p>
                <Link to={`/suites/${suite.id}`} className="w-full bg-[#8E7047] text-white py-5 px-10 text-[12px] uppercase tracking-[.3em] font-bold hover:bg-malon-dark transition-all text-center shadow-md">
                  Select This Room
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Suites
