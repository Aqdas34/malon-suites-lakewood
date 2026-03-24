import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const PricingSection = () => {
  const [suites, setSuites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSuites()
      .then(data => {
        setSuites(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching suites:", err);
        setLoading(false);
      });
  }, []);

  // Helpers for formatting
  const formatPrice = (val, round=false) => val ? `$${Number(val).toLocaleString('en-US', {minimumFractionDigits: round ? 0 : 2}).replace(/\.00$/, '')}` : '-';

  if (loading) return null;

  return (
    <section className="py-[120px] bg-malon-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-10">
        <motion.h2 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[45px] md:text-[60px] font-forum text-malon-dark mb-12"
        >
          Pricing for All Locations
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-x-auto shadow-sm"
        >
          <table className="w-full text-center border-collapse bg-white min-w-[1000px]">
            <thead>
              <tr className="bg-malon-gold text-white text-[12px] md:text-[14px] uppercase tracking-wider font-poppins font-medium">
                <th className="py-6 px-4 border border-black/5 font-medium">Location</th>
                <th className="py-6 px-4 border border-black/5 font-medium">Weekday <br/> One Night</th>
                <th className="py-6 px-4 border border-black/5 font-medium">Weekday <br/> Multiple Nights</th>
                <th className="py-6 px-4 border border-black/5 font-medium">Shabbos</th>
                <th className="py-6 px-4 border border-black/5 font-medium">Motzei Shabbos</th>
                <th className="py-6 px-4 border border-black/5 font-medium">Full Week <br/> (10% Off)</th>
                <th className="py-6 px-4 border border-black/5 font-medium">Full Month <br/> (20% Off)</th>
              </tr>
            </thead>
            <tbody className="font-poppins text-malon-gray">
              {suites.map((suite) => (
                <tr key={suite.id} className="transition-colors hover:bg-malon-cream/30">
                  <td className="py-6 px-4 border border-black/5 font-bold text-[15px]">{suite.title}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{formatPrice(suite.price_weekday_one || suite.base_price, true)}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{formatPrice(suite.price_weekday_multiple || suite.base_price, true)}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{formatPrice(suite.price_shabbos || suite.base_price, true)}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{formatPrice(suite.price_motzei_shabbos || suite.base_price, true)}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{formatPrice(suite.price_weekly)}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{formatPrice(suite.price_monthly, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
