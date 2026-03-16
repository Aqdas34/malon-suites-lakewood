import React from 'react';
import { motion } from 'framer-motion';

const PricingSection = () => {
  const pricingData = [
    {
      location: "Miller Rd. Suite",
      weekdayOne: "$375",
      weekdayMulti: "$325",
      shabbos: "$425",
      motzeiShabbos: "$275",
      fullWeek: "$2,092.50",
      fullMonth: "$7,440"
    },
    {
      location: "Laurel Ave. Suite",
      weekdayOne: "$295",
      weekdayMulti: "$275",
      shabbos: "$375",
      motzeiShabbos: "$175",
      fullWeek: "$1,732.50",
      fullMonth: "$6,160"
    },
    {
      location: "Bellinger St. Suite A",
      weekdayOne: "$325",
      weekdayMulti: "$300",
      shabbos: "$400",
      motzeiShabbos: "$250",
      fullWeek: "$1,935",
      fullMonth: "$6,880"
    },
    {
      location: "Bellinger St. Suite B",
      weekdayOne: "$350",
      weekdayMulti: "$300",
      shabbos: "$400",
      motzeiShabbos: "$250",
      fullWeek: "$1,935",
      fullMonth: "$6,880"
    }
  ];

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
          <table className="w-full text-center border-collapse bg-white">
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
              {pricingData.map((row, index) => (
                <tr key={index} className="transition-colors hover:bg-malon-cream/30">
                  <td className="py-6 px-4 border border-black/5 font-bold text-[15px]">{row.location}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{row.weekdayOne}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{row.weekdayMulti}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{row.shabbos}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{row.motzeiShabbos}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{row.fullWeek}</td>
                  <td className="py-6 px-4 border border-black/5 text-[15px]">{row.fullMonth}</td>
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
