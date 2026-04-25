import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://vehical-ok8v.onrender.com/api/v1';

const vehicleAPI = {
  // Create a new vehicle
  createVehicle: (vehicleData) => {
    return axios.post(`${API_BASE_URL}/vehicles`, vehicleData);
  },

  // Get all vehicles with optional filters
  getAllVehicles: (filters = {}) => {
    return axios.get(`${API_BASE_URL}/vehicles`, { params: filters });
  },

  // Get single vehicle by ID
  getVehicleById: (id) => {
    return axios.get(`${API_BASE_URL}/vehicles/${id}`);
  },

  // Update vehicle
  updateVehicle: (id, vehicleData) => {
    return axios.put(`${API_BASE_URL}/vehicles/${id}`, vehicleData);
  },

  // Delete vehicle
  deleteVehicle: (id) => {
    return axios.delete(`${API_BASE_URL}/vehicles/${id}`);
  },

  // Search vehicles
  searchVehicles: (query) => {
    return axios.get(`${API_BASE_URL}/vehicles/search`, { params: { query } });
  },
};

export default vehicleAPI;
