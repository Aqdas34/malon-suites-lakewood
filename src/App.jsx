import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PromoPopup from './components/PromoPopup'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Suites from './pages/Suites'
import ContactUs from './pages/ContactUs'
import SuiteDetail from './pages/SuiteDetail'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import Checkout from './pages/Checkout'

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-malon-cream overflow-x-hidden font-poppins">
      {!isAdmin && <PromoPopup />}
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/hotel-search" element={<Suites />} />
        <Route path="/hotel-search/:id" element={<SuiteDetail />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  )
}

export default App
