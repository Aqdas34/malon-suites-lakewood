import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Suites from './pages/Suites'
import ContactUs from './pages/ContactUs'
import SuiteDetail from './pages/SuiteDetail'

function App() {
  return (
    <div className="min-h-screen bg-malon-cream overflow-x-hidden font-poppins">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/suites" element={<Suites />} />
        <Route path="/suites/:id" element={<SuiteDetail />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
