import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Wifi, Coffee, Wind, Car, Calendar as CalendarIcon } from 'lucide-react'
import { format, addDays, eachDayOfInterval } from 'date-fns'
import api from '../services/api'
import { calculateTotal } from '../utils/pricing'

const SuiteDetail = () => {
  const { id } = useParams();
  const [suite, setSuite] = React.useState(null);
  const [discounts, setDiscounts] = React.useState([]);
  const [blockedDates, setBlockedDates] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  // Booking State
  const [checkIn, setCheckIn] = React.useState('');
  const [checkOut, setCheckOut] = React.useState('');
  const [breakfastDates, setBreakfastDates] = React.useState([]);
  const [guestName, setGuestName] = React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const suitesList = await api.getSuites();
        const found = suitesList.find(s => s.id === id);
        setSuite(found);
        
        const discountsList = await api.getDiscounts();
        setDiscounts(discountsList);

        const blockedList = await api.getBlockedDates(id);
        setBlockedDates(blockedList);
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading suite detail:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const pricing = React.useMemo(() => {
    if (!suite || !checkIn || !checkOut) return null;
    return calculateTotal(suite.base_price, checkIn, checkOut, discounts, breakfastDates);
  }, [suite, checkIn, checkOut, discounts, breakfastDates]);

  const isRangeBlocked = React.useMemo(() => {
    if (!checkIn || !checkOut) return false;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const days = eachDayOfInterval({ start, end });
    return days.some(day => blockedDates.includes(format(day, 'yyyy-MM-dd')));
  }, [checkIn, checkOut, blockedDates]);

  const toggleBreakfast = (date) => {
    setBreakfastDates(prev => 
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  const handleBooking = async () => {
    if (isRangeBlocked) {
      alert("Some of the selected dates are no longer available.");
      return;
    }
    if (!pricing || !guestName || !email) {
      alert("Please fill in all details");
      return;
    }
    
    try {
      await api.createBooking({
        first_name: guestName.split(' ')[0],
        last_name: guestName.split(' ').slice(1).join(' ') || 'Guest',
        email,
        mobile: 'N/A', // Expand later
        suite_id: id,
        check_in: checkIn,
        check_out: checkOut,
        breakfast_dates: breakfastDates,
        total_cost: pricing.total
      });
      alert("Booking successful!");
    } catch (err) {
      alert("Booking failed: " + err.message);
    }
  };

  if (loading) return <div className="pt-[200px] text-center font-forum text-2xl">Refining your Malon stay...</div>;

  if (!suite) {
    return (
      <div className="pt-[150px] text-center">
        <h2 className="text-3xl font-forum">Suite Not Found</h2>
        <Link to="/hotel-search" className="text-malon-gold mt-4 inline-block">Back to Suites</Link>
      </div>
    );
  }

  const images = typeof suite.images === 'string' ? JSON.parse(suite.images) : (suite.images || []);
  const amenities = typeof suite.amenities === 'string' ? JSON.parse(suite.amenities) : (suite.amenities || []);

  return (
    <div className="pt-[150px]">
      <section className="h-[75vh] w-full relative overflow-hidden bg-malon-dark">
         <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src={images[0]?.startsWith('http') ? images[0] : `/${images[0]}`} 
            className="w-full h-full object-cover opacity-60" 
            alt={suite.title} 
         />
         <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[60px] md:text-[90px] font-forum leading-tight mb-4"
            >
              {suite.title}
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
                    {amenities.map((item, index) => (
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

            {/* Right Sidebar - Booking Form */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="lg:col-span-4"
            >
               <div className="bg-[#FAF9F6] p-12 border border-black/5 sticky top-[100px] shadow-2xl">
                  <div className="mb-10">
                     <p className="text-malon-gold uppercase tracking-[.4em] text-[11px] font-bold mb-4">STARTING FROM</p>
                     <p className="text-[45px] font-forum text-malon-dark leading-none font-bold">${suite.base_price}<span className="text-[14px] text-malon-gray/40 ml-3 uppercase tracking-widest">/ night</span></p>
                  </div>
                  
                  {/* Reservation Form */}
                  <div className="space-y-6 mb-12 py-8 border-y border-black/5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Check In</label>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-white border border-black/10 p-3 text-[13px] outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Check Out</label>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-white border border-black/10 p-3 text-[13px] outline-none" />
                      </div>
                    </div>
                    
                    {checkIn && checkOut && (
                      <div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-500">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-4">Add Breakfast ($25/day)</label>
                        <div className="flex flex-wrap gap-2">
                          {Array.from({ length: pricing?.nights || 0 }).map((_, i) => {
                            const date = format(addDays(new Date(checkIn), i), 'yyyy-MM-dd');
                            return (
                              <button 
                                key={date}
                                onClick={() => toggleBreakfast(date)}
                                className={`px-3 py-2 text-[10px] border transition-all ${breakfastDates.includes(date) ? 'bg-malon-gold text-white border-malon-gold' : 'bg-white text-malon-gray border-black/10 hover:border-malon-gold'}`}
                              >
                                {format(new Date(date), 'MMM dd')}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  {isRangeBlocked && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-[12px] font-bold uppercase tracking-widest animate-pulse">
                      ⚠️ Selected dates are unavailable
                    </div>
                  )}

                  {pricing && !isRangeBlocked && (
                    <div className="mb-12 space-y-4 animate-in fade-in duration-500">
                      <div className="flex justify-between text-[14px] text-malon-gray">
                        <span>{pricing.nights} Nights x ${suite.base_price}</span>
                        <span>${pricing.subtotal.toFixed(2)}</span>
                      </div>
                      {pricing.discount && (
                        <div className="flex justify-between text-[14px] text-green-600 font-bold">
                          <span>{pricing.discount.name} (-{pricing.discount.percentage}%)</span>
                          <span>-${pricing.discount.amount.toFixed(2)}</span>
                        </div>
                      )}
                      {pricing.breakfastCost > 0 && (
                        <div className="flex justify-between text-[14px] text-malon-gray">
                          <span>Breakfast ({breakfastDates.length} Days)</span>
                          <span>+${pricing.breakfastCost.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[24px] font-forum text-malon-dark border-t border-black/10 pt-4 mt-4">
                        <span>Total Due</span>
                        <span>${pricing.total.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <input type="text" placeholder="Your Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full bg-white border border-black/10 p-4 text-[13px] outline-none" />
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-black/10 p-4 text-[13px] outline-none" />
                    <button 
                      onClick={handleBooking}
                      className="w-full bg-malon-primary text-white py-6 px-10 text-[13px] uppercase tracking-[.4em] font-bold hover:bg-malon-dark transition-all duration-500 shadow-lg"
                    >
                      Process Reservation
                    </button>
                  </div>
                  
                  <p className="mt-8 text-[10px] text-malon-gray/40 text-center leading-relaxed uppercase font-bold tracking-[.25em]">
                     Experience the highest standard of Lakewood hospitality.
                  </p>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  )
}

export default SuiteDetail
