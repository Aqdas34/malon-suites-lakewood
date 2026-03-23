import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const AdminLogin = () => {
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock auth
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Invalid Password');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-malon-dark relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("/assets/images/bg-art-icon-1.svg")',
          backgroundSize: '1000px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-16 border border-malon-gold/10 shadow-[0_50px_100px_rgba(0,0,0,0.3)] max-w-md w-full relative z-10"
      >
        <div className="text-center mb-12">
          <p className="text-malon-gold text-[10px] uppercase tracking-[.5em] font-bold mb-4 italic">Security Portal</p>
          <h1 className="text-4xl font-forum text-malon-dark uppercase tracking-widest">Administrative Access</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-[10px] uppercase tracking-[.3em] font-bold text-malon-gray/60 mb-3">System Key</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-black/5 p-5 outline-none focus:border-malon-gold transition-all font-sans text-center tracking-[.8em] text-lg"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-malon-dark text-white py-5 uppercase tracking-[.5em] font-bold text-[12px] hover:bg-malon-gold transition-all duration-500 shadow-xl group flex items-center justify-center space-x-3">
            <span>Unlock Console</span>
          </button>
        </form>
        
        <div className="mt-12 pt-8 border-t border-black/[0.03] text-center">
           <Link to="/" className="text-[10px] uppercase tracking-widest text-malon-gray hover:text-malon-gold transition-all font-bold">← Return to Guest Site</Link>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
