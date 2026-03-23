import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  // Suites
  getSuites: () => axios.get(`${API_BASE_URL}/suites`).then(res => res.data),
  createSuite: (data) => axios.post(`${API_BASE_URL}/suites`, data).then(res => res.data),
  updateSuite: (id, data) => axios.put(`${API_BASE_URL}/suites/${id}`, data).then(res => res.data),
  deleteSuite: (id) => axios.delete(`${API_BASE_URL}/suites/${id}`).then(res => res.data),

  // Upload API
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },
  
  // Discounts
  getDiscounts: () => axios.get(`${API_BASE_URL}/discounts`).then(res => res.data),

  // Bookings
  getBookings: () => axios.get(`${API_BASE_URL}/bookings`).then(res => res.data),
  createBooking: (data) => axios.post(`${API_BASE_URL}/bookings`, data).then(res => res.data),

  // Availability
  getBlockedDates: (suiteId) => axios.get(`${API_BASE_URL}/blocked-dates/${suiteId}`).then(res => res.data),
  blockDate: (suiteId, date, reason) => axios.post(`${API_BASE_URL}/blocked-dates`, { suite_id: suiteId, blocked_date: date, reason }).then(res => res.data),
  unblockDate: (suiteId, date) => axios.delete(`${API_BASE_URL}/blocked-dates`, { data: { suite_id: suiteId, blocked_date: date } }).then(res => res.data),
};

export default api;
