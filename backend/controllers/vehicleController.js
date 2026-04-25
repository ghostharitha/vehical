const Vehicle = require('../models/Vehicle');

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const {
      vehicleName,
      vehicleType,
      brand,
      model,
      year,
      licensePlate,
      color,
      mileage,
      fuelType,
      engineCapacity,
      transmissionType,
      seatingCapacity,
      price,
      description,
      owner,
      contactNumber,
      imageUrl,
    } = req.body;

    // Validate required fields
    if (
      !vehicleName ||
      !vehicleType ||
      !brand ||
      !model ||
      !year ||
      !licensePlate ||
      !color ||
      !fuelType ||
      !engineCapacity ||
      !transmissionType ||
      !seatingCapacity ||
      !price ||
      !owner ||
      !contactNumber
    ) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    // Check if license plate already exists
    const existingVehicle = await Vehicle.findOne({ licensePlate });
    if (existingVehicle) {
      return res.status(400).json({ error: 'A vehicle with this license plate already exists' });
    }

    const newVehicle = new Vehicle({
      vehicleName,
      vehicleType,
      brand,
      model,
      year,
      licensePlate,
      color,
      mileage,
      fuelType,
      engineCapacity,
      transmissionType,
      seatingCapacity,
      price,
      description,
      owner,
      contactNumber,
      imageUrl,
    });

    const savedVehicle = await newVehicle.save();
    res.status(201).json({
      message: 'Vehicle added successfully',
      vehicle: savedVehicle,
    });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ error: error.message || 'Error creating vehicle' });
  }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const { vehicleType, fuelType, status, sortBy } = req.query;
    let filter = {};

    if (vehicleType) filter.vehicleType = vehicleType;
    if (fuelType) filter.fuelType = fuelType;
    if (status) filter.status = status;

    let query = Vehicle.find(filter);

    if (sortBy === 'price-asc') {
      query = query.sort({ price: 1 });
    } else if (sortBy === 'price-desc') {
      query = query.sort({ price: -1 });
    } else if (sortBy === 'newest') {
      query = query.sort({ createdAt: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const vehicles = await query;
    res.json({
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Error fetching vehicles' });
  }
};

// Get vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ error: 'Error fetching vehicle' });
  }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if license plate is being updated and if it already exists
    if (updates.licensePlate) {
      const existingVehicle = await Vehicle.findOne({
        licensePlate: updates.licensePlate,
        _id: { $ne: id },
      });
      if (existingVehicle) {
        return res.status(400).json({ error: 'This license plate is already in use' });
      }
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.json({
      message: 'Vehicle updated successfully',
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ error: error.message || 'Error updating vehicle' });
  }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.json({
      message: 'Vehicle deleted successfully',
      vehicle: deletedVehicle,
    });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ error: 'Error deleting vehicle' });
  }
};

// Search vehicles
exports.searchVehicles = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Please provide a search query' });
    }

    const results = await Vehicle.find({
      $or: [
        { vehicleName: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { model: { $regex: query, $options: 'i' } },
        { licensePlate: { $regex: query, $options: 'i' } },
        { owner: { $regex: query, $options: 'i' } },
      ],
    });

    res.json({
      count: results.length,
      vehicles: results,
    });
  } catch (error) {
    console.error('Error searching vehicles:', error);
    res.status(500).json({ error: 'Error searching vehicles' });
  }
};
