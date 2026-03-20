import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PromoPopup from './components/PromoPopup'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Suites from './pages/Suites'
import ContactUs from './pages/ContactUs'
import SuiteDetail from './pages/SuiteDetail'

function App() {
  return (
    <div className="min-h-screen bg-malon-cream overflow-x-hidden font-poppins">
      <PromoPopup />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/hotel-search" element={<Suites />} />
        <Route path="/hotel-search/:id" element={<SuiteDetail />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
