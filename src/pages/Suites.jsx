import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';

const Suites = () => {
  const suites = [
    {
      id: "bellinger-st-suites",
      name: "Bellinger Street Suites",
      price: "400.00",
      image: "/assets/images/SEV05322.jpg"
    },
    {
      id: "laurel-ave-suite",
      name: "Laurel Ave. Suite",
      price: "375.00",
      image: "/assets/images/SEV05327.jpg"
    },
    {
      id: "miller-rd-suite",
      name: "Miller Rd. Suite",
      price: "425.00",
      image: "/assets/images/SEV05337-1.jpg"
    }
  ];

  return (
    <div className="pt-[110px] bg-[#fbf8f3] min-h-screen font-forum">
      {/* Hero Section */}
      <section className="relative py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-[48px] md:text-[60px] text-[#333333] tracking-widest uppercase font-forum">
            Check Availability
          </h1>
        </motion.div>
      </section>

      {/* Horizontal Search Bar */}
      <div className="max-w-[1240px] mx-auto px-6 mb-20">
        <div className="bg-white p-10 shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-[#f3eee4] rounded-sm flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {/* Check In */}
            <div className="flex flex-col gap-3 group cursor-pointer">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#967D52] font-black">Check In</span>
              <div className="border-b border-[#f3eee4] pb-3 flex justify-between items-center text-[#333333] group-hover:border-[#967D52] transition-colors">
                <span className="text-[15px] font-sans font-medium">March 20, 2026</span>
                <Calendar className="w-4 h-4 text-[#967D52]" />
              </div>
            </div>
            {/* Check Out */}
            <div className="flex flex-col gap-3 group cursor-pointer">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#967D52] font-black">Check Out</span>
              <div className="border-b border-[#f3eee4] pb-3 flex justify-between items-center text-[#333333] group-hover:border-[#967D52] transition-colors">
                <span className="text-[15px] font-sans font-medium">March 21, 2026</span>
                <Calendar className="w-4 h-4 text-[#967D52]" />
              </div>
            </div>
            {/* Adults */}
            <div className="flex flex-col gap-3 group cursor-pointer">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#967D52] font-black">Adults</span>
              <div className="border-b border-[#f3eee4] pb-3 flex justify-between items-center text-[#333333] group-hover:border-[#967D52] transition-colors">
                <span className="text-[15px] font-sans font-medium">2</span>
                <ChevronDown className="w-4 h-4 text-[#967D52]" />
              </div>
            </div>
            {/* Children */}
            <div className="flex flex-col gap-3 group cursor-pointer">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#967D52] font-black">Children</span>
              <div className="border-b border-[#f3eee4] pb-3 flex justify-between items-center text-[#333333] group-hover:border-[#967D52] transition-colors">
                <span className="text-[15px] font-sans font-medium">0</span>
                <ChevronDown className="w-4 h-4 text-[#967D52]" />
              </div>
            </div>
          </div>
          <button className="bg-[#967D52] text-white px-12 py-5 uppercase tracking-[0.25em] font-black text-[12px] hover:bg-[#836c46] transition-all whitespace-nowrap self-stretch lg:self-end shadow-lg active:scale-[0.98]">
            Check Availability
          </button>
        </div>
      </div>

      {/* Suites Grid */}
      <section className="max-w-[1440px] mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {suites.map((suite) => (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white border border-[#f3eee4] group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)]"
            >
              <div className="aspect-[1.3] overflow-hidden relative">
                <img 
                  src={suite.image} 
                  alt={suite.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
              </div>
              <div className="p-10 text-center flex flex-col items-center">
                <h3 className="text-[30px] md:text-[34px] text-[#333333] mb-4 font-forum tracking-tight group-hover:text-[#967D52] transition-colors">
                  {suite.name}
                </h3>
                <p className="text-[#967D52] text-[18px] mb-10 font-forum font-bold tracking-widest">
                  Starting at: <span className="text-[22px]">${suite.price}</span> / NIGHT
                </p>
                <Link 
                  to={`/hotel-search/${suite.id}`}
                  className="w-full bg-[#967D52] text-white py-5 uppercase tracking-[0.2em] font-black text-[11px] hover:bg-[#333333] transition-all duration-300 shadow-md transform hover:-translate-y-1 text-center"
                >
                  Select This Room
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Suites;
