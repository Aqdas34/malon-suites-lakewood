import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Youtube, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer 
      className="relative text-white pt-[180px] pb-10 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, #000000 100%), url("/assets/images/melon-footer.jpg")`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img 
            src="/assets/footer-logo.png" 
            alt="Malon Luxury Suites" 
            className="h-44 w-auto object-contain brightness-0 invert opacity-90"
          />
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <p className="font-lora text-2xl md:text-[28px] leading-relaxed text-[#B5B5B5] italic">
            Experience luxury and comfort at Malon Luxury Suites, offering boutique hotel-style <br className="hidden md:block" />
            suites with modern amenities, gourmet breakfasts, and centrally located.
          </p>
        </div>

        {/* Action Buttons / Contacts */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-20">
          <a 
            href="tel:+9089462566" 
            className="flex items-center gap-4 bg-[#9b804e] hover:bg-[#856d42] px-10 py-5 transition-all duration-300 group shadow-lg"
          >
            <Phone size={22} className="text-white" />
            <span className="font-forum text-2xl tracking-widest uppercase">908 - 94- MALON (62566)</span>
          </a>

          <a 
            href="https://www.google.com/maps?ll=40.093332,-74.24363&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=4040040483677373582"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#9b804e] hover:bg-[#856d42] px-10 py-5 transition-all duration-300 group shadow-lg"
          >
            <MapPin size={22} className="text-white" />
            <span className="font-forum text-2xl tracking-widest uppercase">129 Miller Road, Lakewood, NJ 08701</span>
          </a>
        </div>

        {/* Social Icons with Separators */}
        <div className="flex justify-center items-center gap-0 mb-16 border-t border-b border-white/5 py-8 max-w-2xl mx-auto">
          {[
            { Icon: Facebook, label: 'Fb', url: 'https://www.facebook.com/' },
            { Icon: Linkedin, label: 'In', url: 'https://www.linkedin.com/' },
            { Icon: Twitter, label: 'Tw', url: 'https://twitter.com/' },
            { Icon: Youtube, label: 'Yt', url: 'https://www.youtube.com/' }
          ].map((social, index) => (
            <React.Fragment key={index}>
              <a 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 text-[#B5B5B5] hover:text-[#9b804e] transition-colors font-forum text-xl uppercase tracking-widest"
              >
                {social.label}
              </a>
              {index < 3 && <div className="h-6 w-[1px] bg-[#AFAFAF]/30" />}
            </React.Fragment>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[#B5B5B5] font-lora text-sm gap-4 border-t border-white/5">
          <p>Copyright © 2025 Malon Lakewood - All Rights Reserved.</p>
          <div className="flex gap-10">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
