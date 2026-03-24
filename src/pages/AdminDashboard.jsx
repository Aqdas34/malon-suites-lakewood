import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { motion } from 'framer-motion'
import { Calendar, Layout, Users, Plus, X, Check, ArrowLeft, ArrowRight, Tag, Coffee, Settings } from 'lucide-react'
import AddSuiteModal from '../components/AddSuiteModal'
import AddDiscountModal from '../components/AddDiscountModal'
import ManualBookingModal from '../components/ManualBookingModal'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('bookings');
  const [bookings, setBookings] = React.useState([]);
  const [suites, setSuites] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = React.useState(false);
  const [isManualBookingOpen, setIsManualBookingOpen] = React.useState(false);
  const [editingSuite, setEditingSuite] = React.useState(null);
  const [discounts, setDiscounts] = React.useState([]);
  const [editingDiscount, setEditingDiscount] = React.useState(null);
  const [selectedSuiteForBooking, setSelectedSuiteForBooking] = React.useState(null);
  const [contacts, setContacts] = React.useState([]);
  const [globalSettings, setGlobalSettings] = React.useState({
    check_in_time: '',
    check_out_time: '',
    house_rules: '',
    refund_policy: ''
  });

  // Availability View State
  const [selectedSuite, setSelectedSuite] = React.useState(null);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [blockedDates, setBlockedDates] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
      return;
    }

    const loadData = async () => {
      try {
        const [b, s, d, c, st] = await Promise.all([
          api.getBookings(), 
          api.getSuites(), 
          api.getDiscounts(),
          api.getContacts(),
          api.getSettings()
        ]);
        setBookings(b);
        setSuites(s);
        setDiscounts(d);
        setContacts(c);
        setGlobalSettings(st);
        if (s.length > 0 && !selectedSuite) setSelectedSuite(s[0]);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard load failed", err);
        setLoading(false);
      }
    };
    loadData();
  }, [navigate]); // Removed selectedSuite from deps to avoid loop

  const handleDeleteSuite = async (id) => {
    if (!window.confirm("Are you certain? This will remove all associated blocked dates and bookings.")) return;
    try {
      await api.deleteSuite(id);
      setSuites(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const openEditModal = (suite) => {
    setEditingSuite(suite);
    setIsAddModalOpen(true);
  };

  React.useEffect(() => {
    if (activeTab === 'availability' && selectedSuite) {
      api.getBlockedDates(selectedSuite.id).then(setBlockedDates);
    }
  }, [activeTab, selectedSuite]);

  const toggleDateBlock = async (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    try {
      if (blockedDates.includes(dateStr)) {
        await api.unblockDate(selectedSuite.id, dateStr);
      } else {
        await api.blockDate(selectedSuite.id, dateStr, "Manual Block");
      }
      // RE-FETCH TRUTH FROM SERVER
      const fresh = await api.getBlockedDates(selectedSuite.id);
      setBlockedDates(fresh);
    } catch (err) {
      alert("Action failed: " + err.message);
    }
  };

  if (loading) return <div className="p-20 text-center font-forum text-2xl">Accessing Ledger...</div>;

  return (
    <div className="flex font-poppins text-malon-dark min-h-screen bg-[#FAF9F6]">
      {/* Sidebar */}
      <div className="w-64 bg-malon-dark text-white p-8 flex flex-col pt-12">
        <h2 className="text-2xl font-forum mb-12 tracking-widest text-[#9A8050]">MALON ADMIN</h2>
        <nav className="space-y-4 flex-1">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all ${activeTab === 'bookings' ? 'bg-[#9A8050] text-white' : 'hover:bg-white/10 text-white/60'}`}
          >
            <Users size={20} />
            <span className="text-[12px] uppercase tracking-widest font-bold">Bookings</span>
          </button>
          <button
            onClick={() => setActiveTab('suites')}
            className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all ${activeTab === 'suites' ? 'bg-[#9A8050] text-white' : 'hover:bg-white/10 text-white/60'}`}
          >
            <Layout size={20} />
            <span className="text-[12px] uppercase tracking-widest font-bold">Listings</span>
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all ${activeTab === 'availability' ? 'bg-[#9A8050] text-white' : 'hover:bg-white/10 text-white/60'}`}
          >
            <Calendar size={20} />
            <span className="text-[12px] uppercase tracking-widest font-bold">Availability</span>
          </button>
          <button
            onClick={() => setActiveTab('discounts')}
            className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all ${activeTab === 'discounts' ? 'bg-[#9A8050] text-white' : 'hover:bg-white/10 text-white/60'}`}
          >
            <Tag size={20} />
            <span className="text-[12px] uppercase tracking-widest font-bold">Discounts</span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all ${activeTab === 'inquiries' ? 'bg-[#9A8050] text-white' : 'hover:bg-white/10 text-white/60'}`}
          >
            <Users size={20} />
            <span className="text-[12px] uppercase tracking-widest font-bold">Inquiries</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-[#9A8050] text-white' : 'hover:bg-white/10 text-white/60'}`}
          >
            <Settings size={20} />
            <span className="text-[12px] uppercase tracking-widest font-bold">Settings</span>
          </button>
        </nav>
        <button
          onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin/login'); }}
          className="text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white pt-8 border-t border-white/10"
        >
          Logout System
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-16 overflow-y-auto">
        <header className="flex justify-between items-end mb-16 pb-10 border-b border-malon-gold/20">
          <div>
            <p className="text-malon-gold text-[11px] uppercase tracking-[.4em] font-bold mb-3">Management Console</p>
            <h1 className="text-6xl font-forum uppercase tracking-widest text-malon-dark">
              {activeTab}
            </h1>
          </div>
          <div className="flex space-x-6 pb-2">
            <button
              onClick={() => { setEditingSuite(null); setIsAddModalOpen(true); }}
              className="bg-malon-dark text-white px-8 py-4 text-[11px] uppercase tracking-[.3em] font-bold hover:bg-malon-gold transition-all flex items-center space-x-3 shadow-lg"
            >
              <Plus size={16} />
              <span>Add Listing</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-white border border-black/10 px-8 py-4 text-[11px] uppercase tracking-[.3em] font-bold hover:bg-black/5 transition-all"
            >
              Sync System
            </button>
          </div>
        </header>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-black/5 shadow-xl rounded-sm overflow-hidden"
        >
          {activeTab === 'bookings' && (
            <div className="p-2 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#FAF9F6] border-b border-black/5">
                  <tr>
                    <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Guest Identity</th>
                    <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Target Suite</th>
                    <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Reservation Period</th>
                    <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Add-ons</th>
                    <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Financials</th>
                    <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(book => (
                    <tr key={book.id} className="border-b border-black/[0.03] hover:bg-[#FAF9F6] transition-all duration-300">
                      <td className="p-8">
                        <div className="font-bold text-malon-dark text-lg">{book.first_name} {book.last_name}</div>
                        <div className="text-[12px] text-malon-gray/60 tracking-wider pt-1">{book.email}</div>
                      </td>
                      <td className="p-8">
                        <span className="font-forum text-xl uppercase tracking-widest text-[#9A8050] bg-[#9A8050]/5 px-4 py-2 rounded-sm border border-[#9A8050]/10">
                          {book.suite_id}
                        </span>
                      </td>
                      <td className="p-8 text-[14px] text-malon-gray font-medium">
                        <div className="flex items-center space-x-3">
                          <Calendar size={14} className="text-malon-gold" />
                          <span>{format(new Date(book.check_in), 'MMM dd, yyyy')}</span>
                          <span className="text-malon-gold/30">—</span>
                          <span>{format(new Date(book.check_out), 'MMM dd, yyyy')}</span>
                        </div>
                      </td>
                      <td className="p-8">
                        {book.breakfast_dates && JSON.parse(typeof book.breakfast_dates === 'string' ? book.breakfast_dates : JSON.stringify(book.breakfast_dates)).length > 0 ? (
                          <div className="space-y-1">
                            <div className="text-[10px] uppercase font-bold text-malon-gold tracking-widest flex items-center">
                              <Coffee size={12} className="mr-2" />
                              Breakfast Required
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {JSON.parse(typeof book.breakfast_dates === 'string' ? book.breakfast_dates : JSON.stringify(book.breakfast_dates)).map(date => (
                                <span key={date} className="bg-malon-gold/10 text-malon-gold text-[9px] px-2 py-1 rounded-sm border border-malon-gold/20 font-bold">
                                  {format(new Date(date), 'MMM dd')}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span className="text-malon-gray/30 text-[10px] uppercase font-bold tracking-widest italic pt-1">None Requested</span>
                        )}
                      </td>
                      <td className="p-8">
                        <div className="text-[12px] text-malon-gray/40 uppercase font-bold tracking-widest mb-1">Total Paid</div>
                        <div className="font-forum text-2xl text-malon-dark">${book.total_cost}</div>
                      </td>
                      <td className="p-8">
                        <span className="bg-[#9A8050] text-white px-5 py-2 rounded-sm text-[10px] uppercase font-bold tracking-[.2em] shadow-sm">
                          {book.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'suites' && (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suites.map(suite => (
                <div key={suite.id} className="border border-black/5 p-6 bg-[#FAF9F6]">
                  <div className="aspect-video mb-6 overflow-hidden">
                    <img src={typeof suite.images === 'string' ? JSON.parse(suite.images)[0] : suite.images[0]} alt={suite.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xl font-forum mb-2">{suite.title}</h4>
                  <p className="text-malon-gold font-bold mb-4">${suite.base_price} / night</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => { setSelectedSuiteForBooking(suite); setIsManualBookingOpen(true); }}
                      className="flex-1 bg-malon-gold text-white text-[10px] uppercase tracking-widest font-bold py-3 hover:bg-malon-dark"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => openEditModal(suite)}
                      className="flex-1 bg-white border border-black/10 text-[10px] uppercase tracking-widest font-bold py-3 hover:bg-black/5"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSuite(suite.id)}
                      className="flex-1 bg-black text-white text-[10px] uppercase tracking-widest font-bold py-3 hover:bg-black/80"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="p-12">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Suite Selector */}
                <div className="w-full lg:w-1/3 space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-6">Select Suite</h3>
                  {suites.map(suite => (
                    <button
                      key={suite.id}
                      onClick={() => setSelectedSuite(suite)}
                      className={`w-full text-left p-6 border transition-all ${selectedSuite?.id === suite.id ? 'bg-malon-gold text-white border-malon-gold' : 'bg-white border-black/5 hover:border-malon-gold'}`}
                    >
                      <div className="font-forum text-xl">{suite.title}</div>
                      <div className="text-[10px] uppercase tracking-widest opacity-60">${suite.base_price}/ngt</div>
                    </button>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="flex-1 bg-white p-10 border border-black/5 rounded-sm">
                  <div className="flex justify-between items-center mb-10">
                    <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}><ArrowLeft size={20} /></button>
                    <h3 className="text-2xl font-forum uppercase tracking-widest">{format(currentMonth, 'MMMM yyyy')}</h3>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><ArrowRight size={20} /></button>
                  </div>

                  <div className="grid grid-cols-7 gap-px bg-black/5 border border-black/5">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                      <div key={d} className="bg-[#FAF9F6] p-4 text-center text-[10px] uppercase tracking-widest font-bold text-malon-gray">{d}</div>
                    ))}
                    {eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) }).map(day => {
                      const isBlocked = blockedDates.includes(format(day, 'yyyy-MM-dd'));
                      return (
                        <button
                          key={day.toString()}
                          onClick={() => toggleDateBlock(day)}
                          className={`p-6 h-24 bg-white hover:bg-malon-gold/5 flex flex-col items-center justify-between transition-all ${isBlocked ? 'bg-red-50' : ''}`}
                        >
                          <span className="text-xl font-forum">{format(day, 'd')}</span>
                          {isBlocked && <span className="text-[9px] uppercase font-bold text-red-600 tracking-tighter">Blocked</span>}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-8 text-[11px] text-malon-gray/60 italic">Click a date to Block/Unblock it for guests.</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'discounts' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-forum uppercase tracking-widest text-malon-dark">Pricing Rules</h3>
                 <button 
                  onClick={() => { setEditingDiscount(null); setIsDiscountModalOpen(true); }}
                  className="bg-malon-gold text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-malon-dark transition-all"
                 >
                   Add Discount Rule
                 </button>
              </div>
              <div className="overflow-hidden border border-black/5">
                <table className="w-full text-left">
                  <thead className="bg-[#FAF9F6]">
                    <tr>
                      <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-malon-gray/60">Rule Type</th>
                      <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-malon-gray/60">Threshold</th>
                      <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-malon-gray/60">Percentage</th>
                      <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-malon-gray/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discounts.map(discount => (
                      <tr key={discount.id} className="border-t border-black/[0.03] hover:bg-[#FAF9F6] transition-all">
                        <td className="p-6 capitalize font-bold text-malon-dark">{discount.type}</td>
                        <td className="p-6">{discount.threshold} Nights</td>
                        <td className="p-6 text-green-600 font-bold">{discount.percentage}%</td>
                        <td className="p-6 flex space-x-4">
                          <button onClick={() => { setEditingDiscount(discount); setIsDiscountModalOpen(true); }} className="text-[10px] uppercase tracking-widest font-bold text-malon-gold hover:text-malon-dark">Edit</button>
                          <button onClick={async () => { if(window.confirm("Remove this rule?")) { await api.deleteDiscount(discount.id); api.getDiscounts().then(setDiscounts); } }} className="text-[10px] uppercase tracking-widest font-bold text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'inquiries' && (
            <div className="p-2 overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-[#FAF9F6] border-b border-black/5">
                    <tr>
                      <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Sender</th>
                      <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Contact Info</th>
                      <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Message</th>
                      <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Received</th>
                      <th className="p-8 text-[11px] uppercase tracking-[.25em] font-bold text-malon-gray/60">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map(contact => (
                      <tr key={contact.id} className={`border-b border-black/[0.03] hover:bg-[#FAF9F6] transition-all ${contact.status === 'pending' ? 'bg-malon-gold/[0.02]' : ''}`}>
                        <td className="p-8">
                          <div className="font-bold text-malon-dark text-lg">{contact.first_name} {contact.last_name}</div>
                        </td>
                        <td className="p-8">
                          <div className="text-[13px] text-malon-dark font-medium">{contact.email}</div>
                          <div className="text-[11px] text-malon-gray/60 tracking-wider pt-1">{contact.mobile}</div>
                        </td>
                        <td className="p-8">
                          <p className="text-[13px] text-malon-gray leading-relaxed max-w-md line-clamp-2 italic">"{contact.message}"</p>
                        </td>
                        <td className="p-8 text-[12px] text-malon-gray font-medium">
                          {format(new Date(contact.created_at), 'MMM dd, yyyy HH:mm')}
                        </td>
                        <td className="p-8">
                          {contact.status === 'pending' ? (
                            <button 
                              onClick={async () => {
                                await api.updateContactStatus(contact.id, 'read');
                                api.getContacts().then(setContacts);
                              }}
                              className="bg-malon-gold text-white px-4 py-2 rounded-sm text-[9px] uppercase font-bold tracking-widest hover:bg-malon-dark transition-all"
                            >
                              Mark as Read
                            </button>
                          ) : (
                            <span className="text-malon-gray/40 text-[9px] uppercase font-bold tracking-widest flex items-center">
                              <Check size={12} className="mr-2" />
                              Handled
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="p-12 max-w-2xl">
              <h3 className="text-2xl font-forum uppercase tracking-widest mb-10">Global Policy Management</h3>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Check-In Time</label>
                    <input 
                      type="text" 
                      value={globalSettings.check_in_time} 
                      onChange={e => setGlobalSettings({...globalSettings, check_in_time: e.target.value})}
                      className="w-full bg-[#FAF9F6] border border-black/10 p-4 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Check-Out Time</label>
                    <input 
                      type="text" 
                      value={globalSettings.check_out_time} 
                      onChange={e => setGlobalSettings({...globalSettings, check_out_time: e.target.value})}
                      className="w-full bg-[#FAF9F6] border border-black/10 p-4 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Global House Rules</label>
                  <textarea 
                    value={globalSettings.house_rules} 
                    onChange={e => setGlobalSettings({...globalSettings, house_rules: e.target.value})}
                    className="w-full bg-[#FAF9F6] border border-black/10 p-4 outline-none h-32"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Global Refund Policy</label>
                  <textarea 
                    value={globalSettings.refund_policy} 
                    onChange={e => setGlobalSettings({...globalSettings, refund_policy: e.target.value})}
                    className="w-full bg-[#FAF9F6] border border-black/10 p-4 outline-none h-32"
                  />
                </div>
                <button 
                  onClick={async () => {
                    try {
                      await api.updateSettings(globalSettings);
                      alert("Policies updated successfully.");
                    } catch (err) {
                      alert("Update failed: " + err.message);
                    }
                  }}
                  className="bg-malon-gold text-white px-10 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-malon-dark transition-all"
                >
                  Save Global Policies
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AddSuiteModal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setEditingSuite(null); }}
        onRefresh={() => {
          api.getSuites().then(setSuites); // Efficient refresh
        }}
        initialData={editingSuite}
      />
      <AddDiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => { setIsDiscountModalOpen(false); setEditingDiscount(null); }}
        onRefresh={() => {
          api.getDiscounts().then(setDiscounts);
        }}
        initialData={editingDiscount}
      />
      <ManualBookingModal
        isOpen={isManualBookingOpen}
        onClose={() => { setIsManualBookingOpen(false); setSelectedSuiteForBooking(null); }}
        suite={selectedSuiteForBooking}
        discounts={discounts}
        onRefresh={() => {
          api.getBookings().then(setBookings);
        }}
      />
    </div>
  )
}

export default AdminDashboard
