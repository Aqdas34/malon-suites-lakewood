import React from 'react';

const ContactForm = () => {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          placeholder="First Name*" 
          className="w-full bg-transparent border border-malon-gold/30 p-4 text-[14px] font-poppins focus:border-malon-gold outline-none transition-colors"
          required 
        />
        <input 
          type="text" 
          placeholder="Last Name*" 
          className="w-full bg-transparent border border-malon-gold/30 p-4 text-[14px] font-poppins focus:border-malon-gold outline-none transition-colors"
          required 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="email" 
          placeholder="Email Address*" 
          className="w-full bg-transparent border border-malon-gold/30 p-4 text-[14px] font-poppins focus:border-malon-gold outline-none transition-colors"
          required 
        />
        <input 
          type="tel" 
          placeholder="Mobile Number*" 
          className="w-full bg-transparent border border-malon-gold/30 p-4 text-[14px] font-poppins focus:border-malon-gold outline-none transition-colors"
          required 
        />
      </div>

      <textarea 
        rows="5" 
        placeholder="Additional Message*" 
        className="w-full bg-transparent border border-malon-gold/30 p-4 text-[14px] font-poppins focus:border-malon-gold outline-none transition-colors resize-none"
        required
      ></textarea>

      <div className="flex items-start space-x-3 mt-6">
        <input type="checkbox" id="consent" className="mt-1 accent-malon-gold cursor-pointer" required />
        <label htmlFor="consent" className="text-[11px] font-poppins text-malon-gray/80 leading-relaxed cursor-pointer">
          By submitting this form, you consent to receive text messages from <strong>Malon Luxury Suites</strong> about your inquiry, booking updates, or customer support. Message frequency varies. Msg & data rates may apply. You can reply STOP at any time to unsubscribe or HELP for assistance. Your information is protected and used according to our <strong>Privacy Policy</strong>.
        </label>
      </div>

      <button className="bg-malon-accent text-white px-12 py-3 uppercase tracking-[.3em] text-[13px] font-bold mt-8 hover:bg-malon-dark transition-all duration-500 shadow-md">
        Send
      </button>
    </form>
  );
};

export default ContactForm;
