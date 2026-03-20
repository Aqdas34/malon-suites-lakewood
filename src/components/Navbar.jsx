import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Phone, Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner - Slides up when scrolled */}
      <div 
        className={`bg-malon-cream text-malon-gray h-[30px] flex items-center border-b border-black/5 fixed left-0 w-full z-[60] transition-transform duration-500 ${
          isScrolled ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-10 w-full flex justify-between items-center text-[11px] font-poppins font-medium tracking-wide">
          <div className="flex items-center space-x-2">
            <Phone size={12} className="text-malon-primary" />
            <a href="tel:908-946-2566" className="hover:text-malon-primary transition-colors">
              908 - 94- MALON (62566)
            </a>
          </div>
          <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 text-[10px]">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-malon-gold transition-colors">Fb</a>
                <span>-</span>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-malon-gold transition-colors">In</a>
                <span>-</span>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-malon-gold transition-colors">Tw</a>
                <span>-</span>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-malon-gold transition-colors">Yt</a>
              </div>
          </div>
        </div>
      </div>

      <nav 
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'top-0 bg-white shadow-md h-[90px]' 
            : 'top-[30px] bg-malon-cream/90 backdrop-blur-md h-[120px]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-10 h-full flex justify-between items-center transition-all duration-500">
          {/* Logo Section - Scales down slightly when scrolled */}
          <div className="flex-1 flex justify-start">
             <Link to="/" className="cursor-pointer group">
                <img 
                  src="/assets/logo.png" 
                  alt="Malon Luxury Suites" 
                  className={`transition-all duration-500 object-contain ${
                    isScrolled ? 'h-[60px]' : 'h-[80px]'
                  }`} 
                />
             </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center space-x-10 text-[11px] uppercase tracking-[.3em] font-poppins font-bold text-malon-dark/80">
            <Link to="/" className="hover:text-malon-gold transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-malon-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about-us" className="hover:text-malon-gold transition-colors relative group whitespace-nowrap">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-malon-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/hotel-search" className="hover:text-malon-gold transition-colors relative group whitespace-nowrap">
              Malon Suites
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-malon-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact-us" className="hover:text-malon-gold transition-colors relative group whitespace-nowrap">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-malon-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right: Search & Mobile Menu */}
          <div className="flex-1 flex justify-end items-center">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-malon-dark hover:text-malon-gold transition-colors p-2"
            >
              <Search size={20} strokeWidth={2} />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-6 lg:hidden flex items-center group"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-[2px] w-full bg-malon-dark transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                <span className={`h-[2px] w-full bg-malon-dark transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-[2px] w-full bg-malon-dark transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-malon-cream z-40 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } pt-[150px] lg:hidden`}>
          <div className="max-w-[1240px] mx-auto px-10 flex flex-col items-center space-y-8 uppercase tracking-[.3em] font-forum text-3xl">
            <Link to="/" className="hover:text-malon-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about-us" className="hover:text-malon-gold transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/hotel-search" className="hover:text-malon-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Malon Suites</Link>
            <Link to="/contact-us" className="hover:text-malon-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
          </div>
        </div>
      </nav>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Navbar;
