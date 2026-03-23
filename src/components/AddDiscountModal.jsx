import React from 'react'
import { X } from 'lucide-react'
import api from '../services/api'

const AddDiscountModal = ({ isOpen, onClose, onRefresh, initialData = null }) => {
  const [formData, setFormData] = React.useState({
    type: 'multiple_nights',
    threshold: '',
    percentage: ''
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type,
        threshold: initialData.threshold,
        percentage: initialData.percentage
      });
    } else {
      setFormData({ type: 'multiple_nights', threshold: '', percentage: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await api.updateDiscount(initialData.id, formData);
      } else {
        await api.createDiscount(formData);
      }
      onRefresh();
      onClose();
    } catch (err) {
      alert("Failed to save discount: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg p-10 border border-black/5 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-malon-gray hover:text-malon-dark transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-[32px] font-forum uppercase tracking-[0.2em] text-malon-dark mb-10 pb-6 border-b border-malon-gold/20">
          {initialData ? 'Update Rule' : 'New Pricing Rule'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Discount Type</label>
            <select 
              value={formData.type} 
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="w-full bg-[#FAF9F6] border border-black/10 p-4 outline-none appearance-none"
            >
              <option value="multiple_nights">Multiple Nights (e.g. 3+)</option>
              <option value="monthly">Monthly (e.g. 28+)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Nights Threshold</label>
              <input 
                type="number" 
                value={formData.threshold} 
                onChange={e => setFormData({...formData, threshold: e.target.value})} 
                className="w-full bg-[#FAF9F6] border border-black/10 p-4 outline-none" 
                placeholder="4" 
                required 
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Percentage (%)</label>
              <input 
                type="number" 
                value={formData.percentage} 
                onChange={e => setFormData({...formData, percentage: e.target.value})} 
                className="w-full bg-[#FAF9F6] border border-black/10 p-4 outline-none" 
                placeholder="15" 
                required 
              />
            </div>
          </div>

          <button className="w-full bg-malon-dark text-white py-6 uppercase tracking-[0.4em] text-[13px] font-bold hover:bg-malon-gold transition-all duration-500 shadow-xl mt-8">
            {initialData ? 'Confirm System Update' : 'Initialize Rule'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddDiscountModal
