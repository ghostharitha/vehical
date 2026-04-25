const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  searchVehicles,
} = require('../controllers/vehicleController');

// Create a new vehicle
router.post('/', createVehicle);

// Get all vehicles with filters
router.get('/', getAllVehicles);

// Search vehicles
router.get('/search', searchVehicles);

// Get vehicle by ID
router.get('/:id', getVehicleById);

// Update vehicle
router.put('/:id', updateVehicle);

// Delete vehicle
router.delete('/:id', deleteVehicle);

module.exports = router;
