import React from 'react'
import { X, Upload, Check, AlertCircle } from 'lucide-react'
import api from '../services/api'

const AddSuiteModal = ({ isOpen, onClose, onRefresh, initialData = null }) => {
  const [formData, setFormData] = React.useState({
    id: '',
    title: '',
    description: '',
    base_price: '',
    amenities: '',
    images: '',
    address: '',
    location_info: '',
    map_embed: '',
    price_weekday_one: '',
    price_weekday_multiple: '',
    price_shabbos: '',
    price_motzei_shabbos: '',
    price_weekly: '',
    price_monthly: '',
    check_in_info: '',
    check_out_info: '',
    house_rules: '',
    cancellation_policy: ''
  });
  
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title,
        description: initialData.description,
        base_price: initialData.base_price,
        amenities: Array.isArray(initialData.amenities) ? initialData.amenities.join(', ') : 
                   (typeof initialData.amenities === 'string' ? JSON.parse(initialData.amenities).join(', ') : ''),
        images: Array.isArray(initialData.images) ? initialData.images.join(', ') : 
                (typeof initialData.images === 'string' ? JSON.parse(initialData.images).join(', ') : ''),
        address: initialData.address || '',
        location_info: initialData.location_info || '',
        map_embed: initialData.map_embed || '',
        price_weekday_one: initialData.price_weekday_one || '',
        price_weekday_multiple: initialData.price_weekday_multiple || '',
        price_shabbos: initialData.price_shabbos || '',
        price_motzei_shabbos: initialData.price_motzei_shabbos || '',
        price_weekly: initialData.price_weekly || '',
        price_monthly: initialData.price_monthly || '',
        check_in_info: initialData.check_in_info || '',
        check_out_info: initialData.check_out_info || '',
        house_rules: initialData.house_rules || '',
        cancellation_policy: initialData.cancellation_policy || ''
      });
    } else {
      setFormData({ 
        id: '', title: '', description: '', base_price: '', amenities: '', images: '', 
        address: '', location_info: '', map_embed: '',
        price_weekday_one: '', price_weekday_multiple: '', price_shabbos: '', 
        price_motzei_shabbos: '', price_weekly: '', price_monthly: '',
        check_in_info: '', check_out_info: '', house_rules: '', cancellation_policy: '' 
      });
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Explicit client-side validation before sending request
    if (!formData.id || !formData.title || !formData.base_price || formData.base_price === '') {
      return alert("Missing compulsory fields: Please ensure Suite ID, Title, and Base Price are all filled out correctly.");
    }

    setIsUploading(true);
    try {
      let finalImages = formData.images.split(',').map(s => s.trim()).filter(s => s !== '');
      
      // Upload file if selected
      if (selectedFile) {
        const { url } = await api.uploadImage(selectedFile);
        finalImages.push(url);
      }

      const payload = {
        ...formData,
        amenities: formData.amenities.split(',').map(s => s.trim()),
        images: finalImages
      };

      if (initialData) {
        await api.updateSuite(initialData.id, payload);
      } else {
        await api.createSuite(payload);
      }
      onRefresh();
      onClose();
    } catch (err) {
      // Decode server error message gracefully
      const errorMessage = err.response?.data?.error || err.message;
      alert("Failed to save suite: " + errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl p-10 border border-black/5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-malon-gray hover:text-malon-dark transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-[40px] font-forum uppercase tracking-[0.2em] text-malon-dark mb-10 pb-6 border-b border-malon-gold/20">
          {initialData ? 'Update Listing' : 'Create New Listing'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Suite ID (slug)</label>
              <input type="text" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none" placeholder="e.g. miller-rd-suite" required />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Base Price ($)</label>
              <input type="number" value={formData.base_price} onChange={e => setFormData({...formData, base_price: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none" placeholder="400" required />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Address (Generates Map)</label>
              <input type="text" value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none" placeholder="123 Bellinger St, Lakewood, NJ" />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Title</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 outline-none" placeholder="The Penthouse Suite" required />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 outline-none h-20" placeholder="Brief metadata about the suite..." required />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Neighborhood & Community Info (Text Only)</label>
            <textarea value={formData.location_info || ''} onChange={e => setFormData({...formData, location_info: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-4 outline-none h-24" placeholder="e.g. Chassidish Shuls: [Checkmark] Or Elimelech... Litvish Shuls: [Checkmark]..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed HTML (Overrides Address Map)</label>
            <textarea
              name="map_embed"
              value={formData.map_embed}
              onChange={e => setFormData({...formData, map_embed: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-malon-gold focus:border-transparent outline-none transition-all h-24"
              placeholder="Paste <iframe> here..."
            />
            <p className="text-xs text-gray-400 mt-1 italic">
              * If left blank, a map will be automatically generated from the address above.
            </p>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-4 pb-2 border-b border-black/5">Pricing Tiers ($)</label>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-[9px] uppercase tracking-tighter text-malon-gray/60 mb-2 font-bold">Weekday (1 Night)</label>
                <input type="number" value={formData.price_weekday_one} onChange={e => setFormData({...formData, price_weekday_one: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none" placeholder="375" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-tighter text-malon-gray/60 mb-2 font-bold">Weekday (Multiple)</label>
                <input type="number" value={formData.price_weekday_multiple} onChange={e => setFormData({...formData, price_weekday_multiple: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none" placeholder="325" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-tighter text-malon-gray/60 mb-2 font-bold">Shabbos</label>
                <input type="number" value={formData.price_shabbos} onChange={e => setFormData({...formData, price_shabbos: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none" placeholder="425" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-tighter text-malon-gray/60 mb-2 font-bold">Motzei Shabbos</label>
                <input type="number" value={formData.price_motzei_shabbos} onChange={e => setFormData({...formData, price_motzei_shabbos: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none" placeholder="275" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-tighter text-malon-gray/60 mb-2 font-bold">Full Week</label>
                <input type="number" value={formData.price_weekly} onChange={e => setFormData({...formData, price_weekly: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none" placeholder="2092" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-tighter text-malon-gray/60 mb-2 font-bold">Full Month</label>
                <input type="number" value={formData.price_monthly} onChange={e => setFormData({...formData, price_monthly: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none" placeholder="7440" />
              </div>
            </div>
          </div>


          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Amenities (comma separated)</label>
            <input type="text" value={formData.amenities} onChange={e => setFormData({...formData, amenities: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none" placeholder="Wifi, Pool, Kitchen" />
          </div>

          <div className="space-y-4">
             <label className="block text-[10px] uppercase tracking-widest font-bold text-malon-gray mb-2">Suite Media</label>
             <div className="flex items-start space-x-6">
                <div className="flex-1">
                   <div className={`relative border-2 border-dashed ${previewUrl ? 'border-malon-gold' : 'border-black/10'} p-8 text-center transition-all hover:border-malon-gold group`}>
                      <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                      {previewUrl ? (
                         <div className="relative aspect-video">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-sm" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <Upload size={24} className="text-white" />
                            </div>
                         </div>
                      ) : (
                         <div className="py-4">
                            <Upload size={32} className="mx-auto mb-4 text-malon-gray group-hover:text-malon-gold transition-colors" />
                            <p className="text-[10px] uppercase tracking-widest font-bold text-malon-gray group-hover:text-malon-dark">Click or Drag Image to Upload</p>
                         </div>
                      )}
                   </div>
                </div>
                <div className="w-1/3">
                   <label className="block text-[9px] uppercase tracking-widest font-bold text-malon-gray/60 mb-2">Or Image URLs</label>
                   <textarea value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} className="w-full bg-[#FAF9F6] border border-black/10 p-3 outline-none text-[12px] h-[100px]" placeholder="assets/suite1.jpg, https://..." />
                </div>
             </div>
          </div>

          <button 
            disabled={isUploading}
            className={`w-full bg-malon-dark text-white py-6 uppercase tracking-[0.4em] text-[13px] font-bold hover:bg-malon-gold transition-all duration-500 shadow-xl mt-8 flex items-center justify-center space-x-3 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading ? (
               <>
                 <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full" />
                 <span>Processing Media...</span>
               </>
            ) : (
               <span>{initialData ? 'Update System Master' : 'Deploy Listing to System'}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddSuiteModal
