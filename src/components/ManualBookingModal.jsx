import React from 'react'
import { X, Calendar, Coffee } from 'lucide-react'
import { format, addDays } from 'date-fns'
import { calculateTotal } from '../utils/pricing'
import api from '../services/api'

const ManualBookingModal = ({ isOpen, onClose, suite, discounts, onRefresh }) => {
  const [checkIn, setCheckIn] = React.useState('')
  const [checkOut, setCheckOut] = React.useState('')
  const [breakfastDates, setBreakfastDates] = React.useState([])
  const [guestName, setGuestName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const pricing = React.useMemo(() => {
    if (!suite || !checkIn || !checkOut) return null
    return calculateTotal(suite.base_price, checkIn, checkOut, discounts, breakfastDates)
  }, [suite, checkIn, checkOut, discounts, breakfastDates])

  const toggleBreakfast = (date) => {
    setBreakfastDates(prev => 
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!pricing || !guestName || !email) return alert("Please fill all details")
    
    setLoading(true)
    try {
      await api.createBooking({
        first_name: guestName.split(' ')[0],
        last_name: guestName.split(' ').slice(1).join(' ') || 'Manual',
        email,
        mobile: 'Manual',
        suite_id: suite.id,
        check_in: checkIn,
        check_out: checkOut,
        breakfast_dates: breakfastDates,
        total_cost: pricing.total
      })
      alert("Manual Booking Successful!")
      onRefresh()
      onClose()
    } catch (err) {
      alert("Booking failed: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-black/5 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-forum text-malon-dark uppercase tracking-widest">Manual Reservation</h2>
            <p className="text-[10px] uppercase tracking-[.3em] font-bold text-malon-gold mt-1">Direct Entry System</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-all"><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto max-h-[70vh]">
          <div className="bg-[#FAF9F6] p-6 border border-black/5">
            <h3 className="text-[11px] uppercase tracking-widest font-bold text-malon-gray/60 mb-4 flex items-center">
              <span className="w-2 h-2 bg-malon-gold rounded-full mr-3"></span>
              Suite Identity
            </h3>
            <div className="font-forum text-2xl text-malon-dark">{suite?.title}</div>
            <div className="text-[13px] text-malon-gold font-bold tracking-widest mt-1">${suite?.base_price} <span className="text-black/20 text-[10px]">/ NIGHT</span></div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-malon-gray">Check In</label>
              <input 
                type="date" 
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-[13px] outline-none hover:border-malon-gold transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-malon-gray">Check Out</label>
              <input 
                type="date" 
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-[13px] outline-none hover:border-malon-gold transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest font-bold text-malon-gray flex items-center">
              <Coffee size={14} className="mr-3 text-malon-gold" />
              Add Breakfast Selection ($25/day)
            </label>
            {checkIn && checkOut && pricing?.nights > 0 ? (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: pricing.nights }).map((_, i) => {
                  const date = format(addDays(new Date(checkIn), i), 'yyyy-MM-dd')
                  const isSelected = breakfastDates.includes(date)
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => toggleBreakfast(date)}
                      className={`px-4 py-2 text-[10px] font-bold border transition-all ${isSelected ? 'bg-malon-gold text-white border-malon-gold shadow-lg scale-105' : 'bg-white text-malon-gray border-black/10 hover:border-malon-gold'}`}
                    >
                      {format(new Date(date), 'MMM dd')}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="p-4 bg-black/5 text-[11px] text-malon-gray text-center border border-dashed border-black/10">
                Select dates to see breakfast options
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-malon-gray">Guest Full Name</label>
              <input 
                type="text" 
                required
                placeholder="Ex: Mordechai B."
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-[13px] outline-none hover:border-malon-gold transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-malon-gray">Email Account</label>
              <input 
                type="email" 
                required
                placeholder="guest@malon.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-[13px] outline-none hover:border-malon-gold transition-all"
              />
            </div>
          </div>

          {pricing && (
            <div className="border-t border-black/10 pt-8 space-y-4">
              <div className="flex justify-between items-center bg-[#FAF9F6] p-6 rounded-sm">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-widest font-bold text-malon-gray/60">Final Calculation</div>
                  <div className="font-forum text-3xl text-malon-dark">${pricing.total.toFixed(2)}</div>
                </div>
                <div className="text-right text-[12px] font-medium text-malon-gray">
                  <div>{pricing.nights} Nights x ${suite.base_price}</div>
                  {pricing.discount && <div className="text-green-600">-{pricing.discount.percentage}% Rule Applied</div>}
                  {pricing.breakfastCost > 0 && <div>+${pricing.breakfastCost} Breakfast</div>}
                </div>
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-malon-dark text-white py-6 uppercase tracking-[.5em] font-bold text-[12px] hover:bg-malon-gold transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? 'Processing Ledger...' : 'Authorize Manual Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ManualBookingModal
