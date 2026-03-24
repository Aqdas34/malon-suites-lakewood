import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../services/api';

const ContactUs = () => {
  const [formData, setFormData] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [status, setStatus] = React.useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.createContact(formData);
      setStatus('success');
      setFormData({ first_name: '', last_name: '', email: '', mobile: '', message: '' });
    } catch (err) {
      console.error("Contact submission failed", err);
      setStatus('error');
    }
  };

  return (
    <div className="pt-[110px] bg-[#fdfbf7] min-h-screen font-forum">
      {/* Main Content Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-20 items-stretch">
            
            {/* Left Column: Featured Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[45%] relative min-h-[500px] lg:min-h-full overflow-hidden shadow-2xl group border-[12px] border-white"
            >
              {/* Background with darker overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: 'url("/assets/images/SEV05322.jpg")' }}
              />
              <div className="absolute inset-0 bg-black/50" />
              
              {/* Card Content */}
              <div className="relative h-full z-10 p-12 flex flex-col items-center justify-center text-center text-white space-y-8">
                <img 
                  src="/assets/logo.png" 
                  alt="Malon Logo" 
                  className="w-32 brightness-0 invert opacity-90"
                />
                <h2 className="text-[36px] md:text-[45px] font-forum leading-tight tracking-tight">
                  Discover The Hotel Of Your Choice
                </h2>
                <Link 
                  to="/hotel-search" 
                  className="bg-[#967D52] hover:bg-[#836c46] text-white px-10 py-4 uppercase tracking-[.2em] font-bold text-[13px] transition-all transform hover:-translate-y-1 shadow-lg text-center"
                >
                  Make A Reservation
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[55%] py-4"
            >
              <span className="text-[12px] uppercase tracking-[.4em] text-[#967D52] font-black block mb-6">Reach Us</span>
              <h1 className="text-[45px] md:text-[55px] text-[#333333] mb-8 font-forum leading-none">
                Connect With Malon
              </h1>
              <p className="text-[16px] text-[#333333]/70 font-sans leading-relaxed mb-12 max-w-[550px]">
                Have a question or want to book your stay? Contact Malon for quick assistance with availability, pricing, or custom packages. Your comfort is our priority.
              </p>

              {/* Form Grid */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      required
                      placeholder="First Name*" 
                      value={formData.first_name}
                      onChange={e => setFormData({...formData, first_name: e.target.value})}
                      className="w-full bg-[#f6f3ed] border border-[#e5e0d4] p-4 font-sans text-[14px] outline-none focus:border-[#967D52] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      required
                      placeholder="Last Name*" 
                      value={formData.last_name}
                      onChange={e => setFormData({...formData, last_name: e.target.value})}
                      className="w-full bg-[#f6f3ed] border border-[#e5e0d4] p-4 font-sans text-[14px] outline-none focus:border-[#967D52] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <input 
                      type="email" 
                      required
                      placeholder="Email Address*" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#f6f3ed] border border-[#e5e0d4] p-4 font-sans text-[14px] outline-none focus:border-[#967D52] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <input 
                      type="tel" 
                      required
                      placeholder="Mobile Number*" 
                      value={formData.mobile}
                      onChange={e => setFormData({...formData, mobile: e.target.value})}
                      className="w-full bg-[#f6f3ed] border border-[#e5e0d4] p-4 font-sans text-[14px] outline-none focus:border-[#967D52] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <textarea 
                    placeholder="Additional Message*" 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#f6f3ed] border border-[#e5e0d4] p-4 font-sans text-[14px] outline-none focus:border-[#967D52] transition-colors resize-none"
                  />
                </div>

                {/* SMS Consent Checkbox */}
                <div className="flex gap-4 items-start">
                  <input type="checkbox" required className="mt-1 accent-[#967D52] w-4 h-4" />
                  <p className="text-[12px] text-[#333333]/60 font-sans leading-relaxed">
                    By submitting this form, you consent to receive text messages from **Malon Luxury Suites** about your inquiry, booking updates, or customer support. Message frequency varies. Msg & data rates may apply. You can reply STOP at any time to unsubscribe or HELP for assistance. Your information is protected and used according to our Privacy Policy.
                  </p>
                </div>

                {status === 'success' && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-sm flex items-center shadow-inner">
                    <CheckCircle size={20} className="mr-3 flex-shrink-0" />
                    <span className="text-[13px] font-sans font-medium">Thank you! Your message has been sent to our desk. We will reach out shortly.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-sm flex items-center shadow-inner">
                    <AlertCircle size={20} className="mr-3 flex-shrink-0" />
                    <span className="text-[13px] font-sans font-medium">Something went wrong. Please try again or call us directly.</span>
                  </div>
                )}

                <button 
                  disabled={status === 'loading'}
                  className="bg-[#967D52] hover:bg-[#333333] text-white px-12 py-5 uppercase tracking-[0.25em] font-black text-[12px] transition-all shadow-md disabled:opacity-50 flex items-center justify-center min-w-[150px]"
                >
                  {status === 'loading' ? 'Sending...' : 'Send'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-white relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.4168050965743!2d-74.2257216!3d40.0984918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c177579c09623d%3A0xc6657cca07a6f233!2s129%20Miller%20Rd%2C%20Lakewood%2C%20NJ%2008701%2C%20USA!5e0!3m2!1sen!2sin!4v1710920000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </section>
    </div>
  );
};

export default ContactUs;
