const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    vehicleName: {
      type: String,
      required: [true, 'Please provide a vehicle name'],
      trim: true,
      maxlength: [100, 'Vehicle name cannot be more than 100 characters'],
    },
    vehicleType: {
      type: String,
      required: [true, 'Please provide a vehicle type'],
      enum: ['Car', 'Truck', 'Motorcycle', 'SUV', 'Van', 'Bus', 'Other'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide the vehicle brand'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Please provide the vehicle model'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Please provide the year of manufacture'],
      min: [1900, 'Year cannot be before 1900'],
      max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
    },
    licensePlate: {
      type: String,
      required: [true, 'Please provide the license plate'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    color: {
      type: String,
      required: [true, 'Please provide the vehicle color'],
      trim: true,
    },
    mileage: {
      type: Number,
      required: [true, 'Please provide the mileage'],
      min: [0, 'Mileage cannot be negative'],
    },
    fuelType: {
      type: String,
      required: [true, 'Please provide the fuel type'],
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG'],
    },
    engineCapacity: {
      type: String,
      required: [true, 'Please provide the engine capacity'],
      trim: true,
    },
    transmissionType: {
      type: String,
      required: [true, 'Please provide the transmission type'],
      enum: ['Manual', 'Automatic'],
    },
    seatingCapacity: {
      type: Number,
      required: [true, 'Please provide the seating capacity'],
      min: [1, 'Seating capacity must be at least 1'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide the vehicle price'],
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Under Maintenance'],
      default: 'Available',
    },
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, 'Please provide a contact number'],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
