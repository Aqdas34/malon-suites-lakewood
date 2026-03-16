import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-malon-dark text-white py-[120px]">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="flex flex-col items-center mb-24">
           <Link to="/" className="cursor-pointer group">
              <img 
                src={logo} 
                alt="Malon Luxury Suites" 
                className="h-[100px] w-auto object-contain brightness-0 invert" 
              />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div>
            <h4 className="text-[12px] uppercase tracking-[.4em] font-bold mb-10 text-malon-gold">Discovery</h4>
            <ul className="space-y-5 text-[14px] text-gray-400 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/suites" className="hover:text-white transition-colors">Malon Suites</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] uppercase tracking-[.4em] font-bold mb-10 text-malon-gold">Connect</h4>
            <ul className="space-y-5 text-[14px] text-gray-400 font-medium">
              <li>908 - 94- MALON (62566)</li>
              <li>reservation@malonluxurysuites.com</li>
              <li className="flex justify-center space-x-6 pt-4">
                <a href="#" className="hover:text-white transition-colors">Fb</a>
                <a href="#" className="hover:text-white transition-colors">In</a>
                <a href="#" className="hover:text-white transition-colors">Tw</a>
                <a href="#" className="hover:text-white transition-colors">Yt</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] uppercase tracking-[.4em] font-bold mb-10 text-malon-gold">Location</h4>
            <p className="text-gray-400 text-[14px] leading-loose font-medium">
              129 Miller Road, <br />
              Lakewood, New Jersey 08701, <br />
              United States
            </p>
          </div>
        </div>
        
        <div className="mt-32 pt-10 border-t border-white/5 text-center text-[10px] text-gray-600 uppercase tracking-[.4em] font-bold">
          © 2026 Malon Luxury Suites. All Rights Reserved. | <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
