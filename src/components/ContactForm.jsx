import React from 'react';

const ContactForm = () => {
  return (
    <form className="max-w-[1000px] mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input 
          type="text" 
          placeholder="First Name*" 
          className="w-full bg-[#fcfaf5]/50 border border-gray-200 p-4 text-[14px] font-poppins focus:border-[#c5a977] outline-none transition-all placeholder:text-gray-400"
          required 
        />
        <input 
          type="text" 
          placeholder="Last Name*" 
          className="w-full bg-[#fcfaf5]/50 border border-gray-200 p-4 text-[14px] font-poppins focus:border-[#c5a977] outline-none transition-all placeholder:text-gray-400"
          required 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input 
          type="email" 
          placeholder="Email Address*" 
          className="w-full bg-[#fcfaf5]/50 border border-gray-200 p-4 text-[14px] font-poppins focus:border-[#c5a977] outline-none transition-all placeholder:text-gray-400"
          required 
        />
        <input 
          type="tel" 
          placeholder="Mobile Number*" 
          className="w-full bg-[#fcfaf5]/50 border border-gray-200 p-4 text-[14px] font-poppins focus:border-[#c5a977] outline-none transition-all placeholder:text-gray-400"
          required 
        />
      </div>

      <textarea 
        rows="6" 
        placeholder="Additional Message*" 
        className="w-full bg-[#fcfaf5]/50 border border-gray-200 p-4 text-[14px] font-poppins focus:border-[#c5a977] outline-none transition-all placeholder:text-gray-400 resize-none"
        required
      ></textarea>

      <div className="flex items-start space-x-3 pt-2">
        <input type="checkbox" id="consent" className="mt-1 w-4 h-4 accent-[#c5a977] cursor-pointer" required />
        <label htmlFor="consent" className="text-[12px] font-poppins text-gray-500 leading-relaxed cursor-pointer select-none">
          By submitting this form, you consent to receive text messages from <strong>Malon Luxury Suites</strong> about your inquiry, booking updates, or customer support. Message frequency varies. Msg & data rates may apply. You can reply STOP at any time to unsubscribe or HELP for assistance. Your information is protected and used according to our <strong>Privacy Policy</strong>.
        </label>
      </div>

      <div className="pt-4 text-left">
        <button className="bg-[#9B804E] text-white px-12 py-3 uppercase tracking-[.25em] text-[14px] font-forum hover:brightness-105 transition-all duration-300">
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactForm;


