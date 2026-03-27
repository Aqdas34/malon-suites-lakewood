import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, Coffee, Clock, CreditCard } from 'lucide-react'
import { format } from 'date-fns'
import api from '../services/api'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY || 'pk_test_sample');

const CheckoutContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { suite, checkIn, checkOut, pricing } = location.state || {};

  const [formData, setFormData] = React.useState({
    email: '',
    first_name: '',
    last_name: '',
    country: 'United States (US)',
    street_address: '',
    apartment: '',
    city: '',
    state: 'New Jersey',
    zip: '',
    phone: '',
    order_notes: '',
    payment_method: 'cash'
  });

  const [extras, setExtras] = React.useState({
    basic_breakfast: false,
    deluxe_breakfast: false,
    shabbos_package: false,
    full_shabbos: false,
    late_checkout_1: false,
    late_checkout_2: false,
  });

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  if (!suite || !checkIn || !checkOut || !pricing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center bg-[#FDFBF7]">
        <h2 className="text-3xl font-serif text-[#333] mb-4">Your Session Expired</h2>
        <p className="text-gray-600 mb-8">Please select your dates and room again to continue.</p>
        <button onClick={() => navigate('/hotel-search')} className="bg-[#A68A57] text-white px-8 py-4 uppercase text-sm font-bold hover:bg-[#8e7345]">
          Back to Listings
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setExtras(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nights = pricing.nights || 1;
  let extrasTotal = 0;
  if (extras.basic_breakfast) extrasTotal += 60 * nights;
  if (extras.deluxe_breakfast) extrasTotal += 100 * nights;
  if (extras.shabbos_package) extrasTotal += 195;
  if (extras.full_shabbos) extrasTotal += 295;
  if (extras.late_checkout_1) extrasTotal += 50;
  if (extras.late_checkout_2) extrasTotal += 75;

  const finalTotal = pricing.total + extrasTotal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return; // Stripe.js has not loaded yet
    
    setIsProcessing(true);

    try {
      // 1. CREATE A PENDING BOOKING IN THE DATABASE FIRST
      // This ensures we have a record even if the payment fails or the browser closes!
      const initialPayload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        mobile: formData.phone,
        suite_id: suite.id,
        check_in: checkIn,
        check_out: checkOut,
        breakfast_dates: [],
        total_cost: finalTotal,
        notes: formData.order_notes,
        extras: JSON.stringify(extras),
        status: 'pending' // Initially pending
      };
        
      const booking = await api.createBooking(initialPayload);
      const bookingId = booking.id;

      // 2. RUN PAYMENT FLOW
      if (formData.payment_method === 'credit_card') {
        const { clientSecret, error: backendError } = await api.createPaymentIntent({
          total_cost: finalTotal,
          suite_id: suite.id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          check_in: checkIn,
          check_out: checkOut,
          booking_id: bookingId // Pass the ID so the Webhook knows which row to update!
        });

        if (backendError) throw new Error(backendError);

        const cardElement = elements.getElement(CardElement);
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${formData.first_name} ${formData.last_name}`,
              email: formData.email,
              phone: formData.phone,
              address: { line1: formData.street_address, city: formData.city, postal_code: formData.zip, state: formData.state, country: 'US' }
            },
          },
        });

        if (stripeError) throw new Error(stripeError.message);
        if (paymentIntent.status !== 'succeeded') throw new Error("Payment was not successful.");
      } else {
        // If Cash on delivery, no need to confirm Stripe, booking stays 'pending' as requested by user
      }

      setIsSuccess(true);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      alert("Transaction Failed: " + errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#FDFBF7] min-h-screen font-sans text-[#333]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="bg-[#A68A57] bg-opacity-[0.08] p-4 text-[14px] mb-8 flex items-center border-t-2 border-[#A68A57]">
          <span className="text-gray-600 mr-2">Have a coupon?</span> 
          <button className="bg-[#A68A57] text-white px-5 py-2 text-xs font-bold hover:bg-[#8e7345] transition-colors rounded-sm shadow-sm">
            Click Here To Enter Your Code
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT COLUMN: Billing Details */}
            <div>
              <h3 className="text-[22px] font-serif font-bold text-[#333] mb-6 tracking-wide">Billing details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] text-gray-700 font-semibold mb-2">Email address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[10px] outline-none focus:border-[#A68A57]" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] text-gray-700 font-semibold mb-2">First name <span className="text-red-500">*</span></label>
                    <input type="text" name="first_name" required value={formData.first_name} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[10px] outline-none focus:border-[#A68A57]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-gray-700 font-semibold mb-2">Last name <span className="text-red-500">*</span></label>
                    <input type="text" name="last_name" required value={formData.last_name} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[10px] outline-none focus:border-[#A68A57]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 font-semibold mb-2">Country / Region <span className="text-red-500">*</span></label>
                  <select name="country" required value={formData.country} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[10px] outline-none focus:border-[#A68A57]">
                    <option>United States (US)</option>
                    <option>Canada</option>
                    <option>Israel</option>
                    <option>United Kingdom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 font-semibold mb-2">Street address <span className="text-red-500">*</span></label>
                  <input type="text" name="street_address" required value={formData.street_address} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[10px] mb-2 outline-none focus:border-[#A68A57]" placeholder="House number and street name" />
                  <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[10px] outline-none focus:border-[#A68A57]" placeholder="Apartment, suite, unit, etc. (optional)" />
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 font-semibold mb-2">Town / City <span className="text-red-500">*</span></label>
                  <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[10px] outline-none focus:border-[#A68A57]" />
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 font-semibold mb-2">State <span className="text-red-500">*</span></label>
                  <select name="state" required value={formData.state} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[10px] outline-none focus:border-[#A68A57]">
                    <option>New Jersey</option>
                    <option>New York</option>
                    <option>Pennsylvania</option>
                    <option>Connecticut</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 font-semibold mb-2">ZIP Code <span className="text-red-500">*</span></label>
                  <input type="text" name="zip" required value={formData.zip} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[10px] outline-none focus:border-[#A68A57]" />
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 font-semibold mb-2">Phone (optional)</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[10px] outline-none focus:border-[#A68A57]" />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Additional info + Extras */}
            <div>
              <h3 className="text-[22px] font-serif font-bold text-[#333] mb-6 tracking-wide">Additional information</h3>
              <div className="mb-8">
                <label className="block text-[13px] text-gray-700 font-semibold mb-2">Order notes (optional)</label>
                <textarea name="order_notes" value={formData.order_notes} onChange={handleInputChange} className="w-full bg-white border border-[#D9D9D9] p-[12px] outline-none focus:border-[#A68A57] h-20 text-[13px]" placeholder="Notes about your order, e.g. special notes for delivery." />
              </div>

              <div className="bg-[#FAF9F6] border border-[#E5E5E5] p-6 shadow-sm rounded-sm">
                 <h3 className="text-[20px] font-serif mb-6 flex items-center gap-2 text-[#444] border-b pb-4"><Search size={20} className="text-[#a1a1a1]"/> Optional Extras</h3>
                 
                 <h4 className="font-serif text-[16px] mb-4 flex items-center gap-2 text-[#444]"><Coffee size={16}/> Breakfast & Shabbos Options</h4>
                 <div className="space-y-3 mb-8">
                    <label className="flex items-start bg-white border border-[#E5E5E5] p-4 cursor-pointer hover:border-[#A68A57] transition-colors rounded-sm">
                      <input type="checkbox" name="basic_breakfast" checked={extras.basic_breakfast} onChange={handleInputChange} className="mt-1 mr-4 accent-[#A68A57] h-4 w-4" />
                      <div>
                         <p className="font-semibold text-[#444] text-[13px]">Elite - Basic Breakfast for Two ($60/day) <span className="font-normal text-gray-400 text-[11px]">(optional)</span></p>
                         <p className="text-gray-500 text-[12px] mt-1">Two bagels with tuna & cream cheese, two muffins, two iced coffees.</p>
                         <p className="text-[#A68A57] font-bold mt-2 text-[13px]">${(60 * nights).toFixed(2)}</p>
                      </div>
                    </label>

                    <label className="flex items-start bg-white border border-[#E5E5E5] p-4 cursor-pointer hover:border-[#A68A57] transition-colors rounded-sm">
                      <input type="checkbox" name="deluxe_breakfast" checked={extras.deluxe_breakfast} onChange={handleInputChange} className="mt-1 mr-4 accent-[#A68A57] h-4 w-4" />
                      <div>
                         <p className="font-semibold text-[#444] text-[13px]">Elite Plus - Deluxe Breakfast for Two ($100/day) <span className="font-normal text-gray-400 text-[11px]">(optional)</span></p>
                         <p className="text-gray-500 text-[12px] mt-1">Includes bagels, muffins, iced coffees, scrambled eggs, pancakes.</p>
                         <p className="text-[#A68A57] font-bold mt-2 text-[13px]">${(100 * nights).toFixed(2)}</p>
                      </div>
                    </label>

                    <label className="flex items-start bg-white border border-[#E5E5E5] p-4 cursor-pointer hover:border-[#A68A57] transition-colors rounded-sm">
                      <input type="checkbox" name="shabbos_package" checked={extras.shabbos_package} onChange={handleInputChange} className="mt-1 mr-4 accent-[#A68A57] h-4 w-4" />
                      <div>
                         <p className="font-semibold text-[#444] text-[13px]">Elite - Shabbos Package <span className="font-normal text-gray-400 text-[11px]">(optional)</span></p>
                         <p className="text-gray-500 text-[12px] mt-1">Includes: Exquisite meat board, chocolate & nut platter.</p>
                         <p className="text-[#A68A57] font-bold mt-2 text-[13px]">$195.00</p>
                      </div>
                    </label>

                    <label className="flex items-start bg-white border border-[#E5E5E5] p-4 cursor-pointer hover:border-[#A68A57] transition-colors rounded-sm">
                      <input type="checkbox" name="full_shabbos" checked={extras.full_shabbos} onChange={handleInputChange} className="mt-1 mr-4 accent-[#A68A57] h-4 w-4" />
                      <div>
                         <p className="font-semibold text-[#444] text-[13px]">Elite Plus - Full Shabbos Catering <span className="font-normal text-gray-400 text-[11px]">(optional)</span></p>
                         <p className="text-gray-500 text-[12px] mt-1">Includes: Complete Shabbos meal catering.</p>
                         <p className="text-[#A68A57] font-bold mt-2 text-[13px]">$295.00</p>
                      </div>
                    </label>
                 </div>

                 <h4 className="font-serif text-[16px] mb-4 flex items-center gap-2 text-[#444]"><Clock size={16}/> Late Checkout Options</h4>
                 <div className="space-y-3 mb-6">
                    <label className="flex items-start bg-white border border-[#E5E5E5] p-4 cursor-pointer hover:border-[#A68A57] transition-colors rounded-sm">
                      <input type="checkbox" name="late_checkout_1" checked={extras.late_checkout_1} onChange={handleInputChange} className="mt-1 mr-4 accent-[#A68A57] h-4 w-4" />
                      <div>
                         <p className="font-semibold text-[#444] text-[13px]">Late Checkout - Extra Hour (until 12:00 PM) <span className="font-normal text-gray-400 text-[11px]">(optional)</span></p>
                         <p className="text-gray-500 text-[12px] mt-1">Extend your checkout by 1 hour until 12:00 PM.</p>
                         <p className="text-[#A68A57] font-bold mt-2 text-[13px]">$50.00</p>
                      </div>
                    </label>

                    <label className="flex items-start bg-white border border-[#E5E5E5] p-4 cursor-pointer hover:border-[#A68A57] transition-colors rounded-sm">
                      <input type="checkbox" name="late_checkout_2" checked={extras.late_checkout_2} onChange={handleInputChange} className="mt-1 mr-4 accent-[#A68A57] h-4 w-4" />
                      <div>
                         <p className="font-semibold text-[#444] text-[13px]">Late Checkout - Extra 2 Hours (until 1:00 PM) <span className="font-normal text-gray-400 text-[11px]">(optional)</span></p>
                         <p className="text-gray-500 text-[12px] mt-1">Extend your checkout by 2 hours until 1:00 PM.</p>
                         <p className="text-[#A68A57] font-bold mt-2 text-[13px]">$75.00</p>
                      </div>
                    </label>
                 </div>

                 <p className="text-[#a05252] text-[11px] italic font-semibold border-t pt-4 border-[#E5E5E5]">
                    Note for Chosson & Kallah: On the night of the Chasuna, checkout is extended until 12:00 PM at no extra charge.
                 </p>
              </div>
            </div>
          </div>

          {/* BOTTOM FULL WIDTH: Your Order */}
          <div className="mt-8 shadow-sm">
            <div className="bg-white p-10 border border-[#E5E5E5] rounded-sm">
              <h3 className="text-[24px] font-serif font-bold text-[#333] mb-6">Your order</h3>
              
              <table className="w-full text-left border-collapse mb-8 text-[14px]">
                 <thead>
                    <tr>
                       <th className="border-b border-[#E5E5E5] py-4 text-gray-800 font-bold uppercase text-[12px] tracking-wider">Product</th>
                       <th className="border-b border-[#E5E5E5] py-4 text-right text-gray-800 font-bold uppercase text-[12px] tracking-wider w-32">Total</th>
                    </tr>
                 </thead>
                 <tbody className="text-[#666]">
                    <tr>
                       <td className="py-6 border-b border-[#E5E5E5]">
                          <p className="text-[#444] font-semibold mb-2">{suite.title} × 1</p>
                          {pricing.discount && (
                            <p className="text-[12px] mb-2 font-bold text-[#444]">
                               Malon Pricing Applied:<br/>
                               {pricing.nights} night(s) — {pricing.discount.name}
                            </p>
                          )}
                          <p className="text-[12px] mb-1">Date: {format(new Date(checkIn + 'T12:00:00'), 'MMMM dd, yyyy')} - {format(new Date(checkOut + 'T12:00:00'), 'MMMM dd, yyyy')}</p>
                          <p className="text-[12px]">Adults: 1 | Child: 0</p>

                          {extrasTotal > 0 && (
                            <div className="mt-4 bg-[#FAF9F6] p-3 border border-[#E5E5E5] inline-block text-[11px]">
                               <strong className="block mb-1 text-[#444]">Selected Extras:</strong>
                               {extras.basic_breakfast && <div className="text-gray-600">• Basic Breakfast (${60*nights})</div>}
                               {extras.deluxe_breakfast && <div className="text-gray-600">• Deluxe Breakfast (${100*nights})</div>}
                               {extras.shabbos_package && <div className="text-gray-600">• Shabbos Package ($195)</div>}
                               {extras.full_shabbos && <div className="text-gray-600">• Full Shabbos Catering ($295)</div>}
                               {extras.late_checkout_1 && <div className="text-gray-600">• Late Checkout 12PM ($50)</div>}
                               {extras.late_checkout_2 && <div className="text-gray-600">• Late Checkout 1PM ($75)</div>}
                            </div>
                          )}
                       </td>
                       <td className="py-6 border-b border-[#E5E5E5] text-right align-top font-bold text-[#444]">${pricing.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                       <td className="py-4 border-b border-[#E5E5E5] font-semibold text-[#444]">Subtotal</td>
                       <td className="py-4 border-b border-[#E5E5E5] text-right font-bold text-[#444]">${(pricing.subtotal + extrasTotal).toFixed(2)}</td>
                    </tr>
                    {pricing.discount && (
                      <tr>
                         <td className="py-4 border-b border-[#E5E5E5] font-semibold text-[#444]">Malon Pricing Adjustment</td>
                         <td className="py-4 border-b border-[#E5E5E5] text-right font-bold text-[#444]">-${pricing.discount.amount.toFixed(2)}</td>
                      </tr>
                    )}
                    <tr>
                       <td className="py-6 font-bold text-[#333] text-[18px]">Total</td>
                       <td className="py-6 text-right font-bold text-[#333] text-[18px]">${finalTotal.toFixed(2)}</td>
                    </tr>
                 </tbody>
              </table>

              <div className="bg-[#FAF9F6] border border-[#E5E5E5] p-6 mb-8">
                <div className="space-y-4">
                  <label className="flex items-center cursor-pointer group">
                     <input type="radio" name="payment_method" value="cash" checked={formData.payment_method === 'cash'} onChange={handleInputChange} className="mr-3 accent-[#A68A57]" />
                     <span className={`font-bold ${formData.payment_method === 'cash' ? 'text-[#333]' : 'text-gray-500'} group-hover:text-[#333] transition-colors`}>Cash on delivery</span>
                  </label>
                  {formData.payment_method === 'cash' && (
                     <div className="ml-7 text-[13px] text-gray-500 bg-[#EFEFEF]/50 p-4 border-l-2 border-[#A68A57]">
                        Pay with cash upon delivery.
                     </div>
                  )}

                  <label className="flex items-center cursor-pointer group mt-4">
                     <input type="radio" name="payment_method" value="credit_card" checked={formData.payment_method === 'credit_card'} onChange={handleInputChange} className="mr-3 accent-[#A68A57]" />
                     <span className={`font-bold ${formData.payment_method === 'credit_card' ? 'text-[#333]' : 'text-gray-500'} group-hover:text-[#333] transition-colors flex items-center gap-2`}>
                        Credit/Debit Cards
                        <div className="flex gap-1 ml-2">
                           <div className="bg-[#142C8E] text-white text-[8px] px-1 font-bold rounded">VISA</div>
                           <div className="bg-[#FF5F00] text-white text-[8px] px-1 font-bold rounded">MASTERCARD</div>
                        </div>
                     </span>
                  </label>
                  
                  {formData.payment_method === 'credit_card' && (
                     <div className="ml-7 mt-4 p-6 bg-white border border-[#E5E5E5] shadow-inner space-y-4 relative">
                        <div>
                           <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-500 mb-4">Secure Credit Card Transaction</label>
                           <div className="p-4 border border-[#D9D9D9] bg-white rounded-sm focus-within:border-[#A68A57] transition-colors">
                              <CardElement options={{
                                style: {
                                  base: {
                                    fontSize: '15px',
                                    color: '#333',
                                    '::placeholder': { color: '#aab7c4' },
                                    fontFamily: 'monospace',
                                  },
                                  invalid: { color: '#fa755a' },
                                }
                              }} />
                           </div>
                        </div>
                     </div>
                  )}
                </div>
              </div>

              <div className="text-[13px] text-gray-600 mb-8 leading-relaxed">
                 Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#" className="font-bold border-b border-black text-[#333] hover:text-[#A68A57] hover:border-[#A68A57] transition-colors">privacy policy</a>.
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="bg-[#A68A57] text-white px-10 py-5 uppercase text-[15px] font-bold tracking-widest hover:bg-[#8e7345] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-wait"
              >
                {isProcessing ? 'Processing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* PREMIUM SUCCESS MODAL */}
      {isSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white max-w-md w-full p-8 text-center shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-[#A68A57] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h2 className="text-3xl font-serif font-bold text-[#333] mb-4">Reservations Confirmed</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your luxury stay at <strong>{suite.title}</strong> has been secured! A confirmation receipt has been dispatched to your email and our staff has been notified.
            </p>
            
            <div className="bg-[#FAF9F6] p-4 border border-[#E5E5E5] rounded-sm mb-8 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Booking ID</span>
                <span className="text-[#333] font-mono">#MALON-{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Total Charged</span>
                <span className="text-[#A68A57] font-bold">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/')}
              className="w-full bg-[#A68A57] text-white py-4 uppercase text-sm font-bold tracking-widest hover:bg-[#8e7345] transition-all shadow-lg hover:shadow-xl"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutContent />
    </Elements>
  )
}

export default Checkout
