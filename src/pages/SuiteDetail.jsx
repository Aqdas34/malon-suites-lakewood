import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Wifi, Coffee, Wind, Car, MapPin, Compass, X, Calendar as CalendarIcon, Clock, ShieldCheck, Info } from 'lucide-react'
import { format, addDays, eachDayOfInterval } from 'date-fns'
import api from '../services/api'
import { calculateTotal } from '../utils/pricing'

const SuiteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [suite, setSuite] = React.useState(null);
  const [discounts, setDiscounts] = React.useState([]);
  const [blockedDates, setBlockedDates] = React.useState([]);
  const [globalSettings, setGlobalSettings] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  // Booking State
  const [checkIn, setCheckIn] = React.useState('');
  const [checkOut, setCheckOut] = React.useState('');
  const [breakfastDates, setBreakfastDates] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const suitesList = await api.getSuites();
        const found = suitesList.find(s => s.id === id);
        setSuite(found || null);
        
        const discountsList = await api.getDiscounts();
        setDiscounts(discountsList || []);

        const blockedList = await api.getBlockedDates(id);
        setBlockedDates(blockedList || []);
        
        try {
          const st = await api.getSettings();
          setGlobalSettings(st);
        } catch (e) {
          console.error("Failed to load global settings", e);
        }
        
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

  const specificBlockedDates = React.useMemo(() => {
    if (!checkIn || !checkOut) return [];
    try {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return [];
      
      const days = eachDayOfInterval({ start, end });
      return days
        .map(day => format(day, 'yyyy-MM-dd'))
        .filter(dateStr => blockedDates.includes(dateStr));
    } catch (e) {
      return [];
    }
  }, [checkIn, checkOut, blockedDates]);

  const isRangeBlocked = specificBlockedDates.length > 0;

  const toggleBreakfast = (date) => {
    setBreakfastDates(prev => 
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  const handleBooking = () => {
    if (isRangeBlocked) {
      alert("Some of the selected dates are no longer available.");
      return;
    }
    if (!pricing || !checkIn || !checkOut) {
      alert("Please select your dates first");
      return;
    }
    
    navigate('/checkout', { 
      state: { 
        suite, 
        checkIn, 
        checkOut, 
        pricing, 
        breakfastDates 
      } 
    });
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
    <div className="pt-[150px] bg-[#FAF9F6]">
      {/* Hero Section */}
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
              className="text-[60px] md:text-[90px] font-forum leading-tight mb-4 text-white"
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

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-10 py-[100px]">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            
            {/* Left Column: Information */}
            <div className="lg:col-span-8 space-y-20">
               <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
               >
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
               </motion.div>

                {/* Amenities */}
                <div className="pt-12">
                  <h3 className="text-[32px] font-forum text-malon-dark mb-12 uppercase tracking-wide border-b border-black/5 pb-6">
                     Amenities & Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                     {amenities.map((item, index) => {
                        const isExcluded = item.toLowerCase().includes('no ') || item.toLowerCase().includes('restricted');
                        return (
                          <div key={index} className="flex items-center text-malon-gray font-semibold group">
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-5 transition-colors duration-500 ${isExcluded ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200 group-hover:bg-green-600'}`}>
                                {isExcluded ? <X size={14} className="text-red-600" /> : <Check size={14} className="text-green-600 group-hover:text-white" />}
                             </div>
                             <span className={`tracking-wide ${isExcluded ? 'text-malon-gray/40' : ''}`}>{item}</span>
                          </div>
                        );
                     })}
                  </div>
                </div>

                {/* Dynamic Pricing Table */}
                <div className="pt-24">
                  <h3 className="text-[32px] font-forum text-malon-dark mb-10 pb-6 border-b border-black/5">
                    Pricing for {suite.title}
                  </h3>
                  <div className="overflow-x-auto border border-black/5 shadow-sm bg-white">
                    <table className="w-full text-center border-collapse">
                       <thead className="bg-[#9A8050] text-white">
                         <tr>
                           <th className="p-5 text-[10px] uppercase tracking-widest border border-white/10">Location</th>
                           <th className="p-5 text-[10px] uppercase tracking-widest border border-white/10">Weekday <br/>One Night</th>
                           <th className="p-5 text-[10px] uppercase tracking-widest border border-white/10">Weekday <br/>Multiple Nights</th>
                           <th className="p-5 text-[10px] uppercase tracking-widest border border-white/10">Shabbos</th>
                           <th className="p-5 text-[10px] uppercase tracking-widest border border-white/10">Motzei Shabbos</th>
                           <th className="p-5 text-[10px] uppercase tracking-widest border border-white/10">Full Week <br/><span className="text-[8px] opacity-70">(10% Off)</span></th>
                           <th className="p-5 text-[10px] uppercase tracking-widest border border-white/10">Full Month <br/><span className="text-[8px] opacity-70">(20% Off)</span></th>
                         </tr>
                       </thead>
                        <tbody className="text-malon-dark">
                          <tr className="hover:bg-[#FAF9F6] transition-colors">
                            <td className="p-6 font-bold border border-black/5">{suite.title}</td>
                            <td className="p-6 border border-black/5 font-medium">${suite.price_weekday_one || parseFloat(suite.base_price).toFixed(0)}</td>
                            <td className="p-6 border border-black/5 font-medium">${suite.price_weekday_multiple || (parseFloat(suite.base_price) * 0.9).toFixed(0)}</td>
                            <td className="p-6 border border-black/5 font-medium">${suite.price_shabbos || (parseFloat(suite.base_price) * 1.3).toFixed(0)}</td>
                            <td className="p-6 border border-black/5 font-medium">${suite.price_motzei_shabbos || (parseFloat(suite.base_price) * 0.8).toFixed(0)}</td>
                            <td className="p-6 border border-black/5 font-medium">${suite.price_weekly || (parseFloat(suite.base_price) * 7 * 0.9).toFixed(0)}</td>
                            <td className="p-6 border border-black/5 font-medium">${suite.price_monthly || (parseFloat(suite.base_price) * 28 * 0.8).toFixed(0)}</td>
                          </tr>
                        </tbody>
                    </table>
                  </div>
                </div>

                {/* Check In / Out Section */}
                <div className="pt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="flex items-start">
                      <div className="w-12 h-12 bg-white border border-black/10 rounded-sm flex items-center justify-center mr-6 flex-shrink-0">
                         <Clock className="text-malon-gold" size={24} />
                      </div>
                      <div>
                         <h4 className="font-forum text-2xl text-malon-dark mb-4 capitalize">Check In</h4>
                         <p className="text-malon-gray/80 leading-relaxed text-[15px] font-medium">
                            {suite.check_in_info || globalSettings?.check_in_time || "Check-in is at 5:00 PM for weekday stays and two hours before candle lighting for Shabbos."}
                         </p>
                      </div>
                   </div>
                   <div className="flex items-start">
                      <div className="w-12 h-12 bg-white border border-black/10 rounded-sm flex items-center justify-center mr-6 flex-shrink-0">
                         <Clock className="text-malon-gold" size={24} />
                      </div>
                      <div>
                         <h4 className="font-forum text-2xl text-malon-dark mb-4 capitalize">Check Out</h4>
                         <p className="text-malon-gray/80 leading-relaxed text-[15px] font-medium">
                            {suite.check_out_info || globalSettings?.check_out_time || "Check-out is at 11:00 AM for weekday stays and one hour after 72 for Motzei Shabbos."}
                         </p>
                      </div>
                   </div>
                </div>

                {/* House Rules */}
                <div className="pt-24">
                   <h3 className="text-[18px] font-bold text-malon-dark mb-6 uppercase tracking-widest flex items-center">
                      House Rules
                   </h3>
                    <div className="bg-white p-8 border border-black/5 text-malon-gray/80 leading-relaxed font-semibold italic text-[15px]">
                       {suite.house_rules || globalSettings?.house_rules || "Respectful stay policy — No smoking, no pets, quiet hours after 10 PM, and please care for the suite as your own."}
                    </div>
                </div>

                {/* Map Section - Focused/Smaller */}
                <div className="pt-12">
                  <div className="w-full h-[400px] bg-white border border-black/5 overflow-hidden shadow-lg relative group">
                    {(suite.map_embed?.trim() && suite.map_embed !== "null" || suite.address?.trim() && suite.address !== "null") ? (
                      <div className="w-full h-full">
                        {suite.map_embed?.trim() && suite.map_embed !== "null" ? (
                          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: suite.map_embed.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"') }} />
                        ) : (
                          <iframe 
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(suite.address || '')}&output=embed`}
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                            title="Location Map"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-malon-gray/40 italic">
                        No map data provided
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/95 px-6 py-3 border border-malon-gold/20 shadow-xl z-20">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-malon-dark flex items-center">
                        <MapPin size={14} className="mr-3 text-malon-gold" />
                        {suite.address || 'Suite Location'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cancellation Section */}
                <div className="pt-24 space-y-10">
                   <h3 className="text-[18px] font-bold text-malon-dark uppercase tracking-widest">
                      Cancellation
                   </h3>
                    <div className="space-y-8 text-malon-gray text-[16px] leading-[1.8] font-medium bg-white p-12 border border-black/5">
                      {suite.cancellation_policy || globalSettings?.refund_policy ? (
                        <p className="whitespace-pre-line">{suite.cancellation_policy || globalSettings?.refund_policy}</p>
                      ) : (
                        <>
                          <p className="text-malon-dark font-bold mb-4">We understand that plans can change. Please review our policy before booking:</p>
                          <ul className="space-y-6 list-none">
                             <li className="flex items-start">
                                <Check size={18} className="text-malon-gold mt-1.5 mr-4 flex-shrink-0" />
                                <span><strong>Full Refund:</strong> Cancellations made <strong>at least 72 hours</strong> before check-in will receive a full refund.</span>
                             </li>
                             <li className="flex items-start">
                                <Check size={18} className="text-malon-gold mt-1.5 mr-4 flex-shrink-0" />
                                <span><strong>Partial Refund:</strong> Cancellations made <strong>within 48–72 hours</strong> before check-in will receive a <strong>50% refund</strong>.</span>
                             </li>
                             <li className="flex items-start">
                                <Check size={18} className="text-malon-gold mt-1.5 mr-4 flex-shrink-0" />
                                <span><strong>No Refund:</strong> Cancellations made <strong>within 48 hours</strong> of check-in, or no-shows, are non-refundable.</span>
                             </li>
                             <li className="flex items-start">
                                <Check size={18} className="text-malon-gold mt-1.5 mr-4 flex-shrink-0" />
                                <span><strong>Shabbos & Yom Tov Bookings:</strong> Due to high demand, all Shabbos and Yom Tov reservations are <strong>non-refundable within 7 days</strong> of check-in.</span>
                             </li>
                             <li className="flex items-start">
                                <Check size={18} className="text-malon-gold mt-1.5 mr-4 flex-shrink-0" />
                                <span><strong>Modifications:</strong> Date changes or upgrades are subject to availability and must be requested via email or phone.</span>
                             </li>
                          </ul>
                        </>
                      )}
                    </div>
                </div>
            </div>

            {/* Right Column: Reservation Sidebar */}
            <div className="lg:col-span-4">
               <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="sticky top-[150px]"
               >
                  <div className="bg-white p-12 shadow-2xl border border-black/5 relative overflow-hidden">
                     {/* Essential Amenities Grid */}
                     <div className="mb-12 grid grid-cols-2 gap-4 pb-12 border-b border-black/5">
                        <div className="text-center p-4 border border-black/5 rounded-sm">
                           <Wind size={24} className="mx-auto mb-2 text-malon-gold/40" />
                           <span className="text-[9px] uppercase font-bold tracking-widest text-malon-gray/60">Air Conditioned</span>
                        </div>
                        <div className="text-center p-4 border border-black/5 rounded-sm">
                           <Coffee size={24} className="mx-auto mb-2 text-malon-gold/40" />
                           <span className="text-[9px] uppercase font-bold tracking-widest text-malon-gray/60">Private Kitchenette</span>
                        </div>
                        <div className="text-center p-4 border border-black/5 rounded-sm">
                           <Car size={24} className="mx-auto mb-2 text-malon-gold/40" />
                           <span className="text-[9px] uppercase font-bold tracking-widest text-malon-gray/60">Free Parking</span>
                        </div>
                        <div className="text-center p-4 border border-black/5 rounded-sm">
                           <Wifi size={24} className="mx-auto mb-2 text-malon-gold/40" />
                           <span className="text-[9px] uppercase font-bold tracking-widest text-malon-gray/60">High Speed WiFi</span>
                        </div>
                     </div>

                     {/* Price Section */}
                     <div className="mb-10">
                        <p className="text-malon-gold uppercase tracking-[.4em] text-[11px] font-bold mb-4">Starting From</p>
                        <p className="text-[45px] font-forum text-malon-dark leading-none font-bold">${suite.base_price}<span className="text-[14px] text-malon-gray/40 ml-3 uppercase tracking-widest">/ night</span></p>
                     </div>
                    
                    {/* Booking Form */}
                    <div className="space-y-6 mb-12 py-8 border-y border-black/5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Check In</label>
                          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-[13px] outline-none focus:border-malon-gold transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Check Out</label>
                          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-[13px] outline-none focus:border-malon-gold transition-colors" />
                        </div>
                      </div>
                      
                      {checkIn && checkOut && pricing && (
                        <div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-500">
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-4">Add Breakfast ($25/day)</label>
                          <div className="flex flex-wrap gap-2">
                             {Array.from({ length: pricing.nights }).map((_, i) => {
                               const d = addDays(new Date(checkIn), i);
                               const dateStr = format(d, 'yyyy-MM-dd');
                               const isSelected = breakfastDates.includes(dateStr);
                               return (
                                 <button 
                                   key={dateStr}
                                   onClick={() => toggleBreakfast(dateStr)}
                                   className={`px-3 py-2 text-[10px] border transition-all ${isSelected ? 'bg-malon-gold text-white border-malon-gold' : 'bg-white text-malon-gray border-black/10 hover:border-malon-gold'}`}
                                 >
                                   {format(d, 'MMM dd')}
                                 </button>
                               );
                             })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Conflicts & Pricing */}
                    {isRangeBlocked && (
                      <div className="mb-8 p-6 bg-red-50 border border-red-100">
                        <p className="text-red-600 text-[11px] font-bold uppercase tracking-[.2em] mb-3">Availability Conflict</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {specificBlockedDates.map(date => (
                            <span key={date} className="bg-red-600 text-white text-[9px] px-2 py-1 font-bold rounded-sm">{format(new Date(date + 'T12:00:00'), 'MMM dd')}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {pricing && !isRangeBlocked && (
                      <div className="mb-12 space-y-4">
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
                            <span>Breakfast Add-on</span>
                            <span>+${pricing.breakfastCost.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-[22px] font-forum text-malon-dark border-t border-black/10 pt-4 mt-4">
                          <span>Total</span>
                          <span>${pricing.total.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={handleBooking}
                      disabled={isRangeBlocked || !checkIn || !checkOut}
                      className="w-full bg-malon-dark text-white py-6 text-[13px] uppercase tracking-[.4em] font-bold hover:bg-malon-gold transition-all duration-500 shadow-xl disabled:opacity-50"
                    >
                      {isRangeBlocked ? 'Dates Unavailable' : (pricing ? 'Process Booking' : 'Select Dates')}
                    </button>
                    
                    <p className="mt-8 text-[10px] text-malon-gray/40 text-center uppercase font-bold tracking-[.25em]">
                       Lakewood's Premier Suite Experience
                    </p>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default SuiteDetail;
