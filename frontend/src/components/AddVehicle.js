import React, { useState } from 'react';
import vehicleAPI from '../services/vehicleAPI';
import '../styles/AddVehicle.css';

const AddVehicle = ({ onVehicleAdded }) => {
  const [formData, setFormData] = useState({
    vehicleName: '',
    vehicleType: 'Car',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    color: '',
    mileage: '',
    fuelType: 'Petrol',
    engineCapacity: '',
    transmissionType: 'Manual',
    seatingCapacity: '',
    price: '',
    description: '',
    owner: '',
    contactNumber: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'year' || name === 'mileage' || name === 'seatingCapacity' || name === 'price' 
        ? parseInt(value) || '' 
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await vehicleAPI.createVehicle(formData);
      setMessage({ type: 'success', text: 'Vehicle added successfully!' });
      
      // Reset form
      setFormData({
        vehicleName: '',
        vehicleType: 'Car',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        licensePlate: '',
        color: '',
        mileage: '',
        fuelType: 'Petrol',
        engineCapacity: '',
        transmissionType: 'Manual',
        seatingCapacity: '',
        price: '',
        description: '',
        owner: '',
        contactNumber: '',
        imageUrl: '',
      });

      // Callback to parent component
      if (onVehicleAdded) {
        onVehicleAdded(response.data.vehicle);
      }

      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error adding vehicle. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-vehicle-container">
      <div className="form-wrapper">
        <h2>Add New Vehicle</h2>
        
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <fieldset>
            <legend>Basic Information</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="vehicleName">Vehicle Name *</label>
                <input
                  type="text"
                  id="vehicleName"
                  name="vehicleName"
                  value={formData.vehicleName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Honda Civic 2023"
                />
              </div>

              <div className="form-group">
                <label htmlFor="vehicleType">Vehicle Type *</label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                >
                  <option value="Car">Car</option>
                  <option value="Truck">Truck</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                  <option value="Bus">Bus</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Brand *</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Honda"
                />
              </div>

              <div className="form-group">
                <label htmlFor="model">Model *</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Civic"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="year">Year *</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
              </div>

              <div className="form-group">
                <label htmlFor="color">Color *</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Red"
                />
              </div>
            </div>
          </fieldset>

          {/* Registration & Technical Details */}
          <fieldset>
            <legend>Registration & Technical Details</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="licensePlate">License Plate *</label>
                <input
                  type="text"
                  id="licensePlate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleChange}
                  required
                  placeholder="e.g., ABC-1234"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mileage">Mileage (km) *</label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="e.g., 50000"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fuelType">Fuel Type *</label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  required
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">CNG</option>
                  <option value="LPG">LPG</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="engineCapacity">Engine Capacity *</label>
                <input
                  type="text"
                  id="engineCapacity"
                  name="engineCapacity"
                  value={formData.engineCapacity}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 2.0L"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="transmissionType">Transmission Type *</label>
                <select
                  id="transmissionType"
                  name="transmissionType"
                  value={formData.transmissionType}
                  onChange={handleChange}
                  required
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="seatingCapacity">Seating Capacity *</label>
                <input
                  type="number"
                  id="seatingCapacity"
                  name="seatingCapacity"
                  value={formData.seatingCapacity}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="e.g., 5"
                />
              </div>
            </div>
          </fieldset>

          {/* Pricing & Owner Information */}
          <fieldset>
            <legend>Pricing & Owner Information</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="e.g., 25000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="owner">Owner Name *</label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  required
                  placeholder="e.g., John Doe"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="e.g., +1-234-567-8900"
              />
            </div>
          </fieldset>

          {/* Additional Information */}
          <fieldset>
            <legend>Additional Information</legend>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Additional details about the vehicle..."
                rows="4"
                maxLength="500"
              />
              <small>{formData.description.length}/500</small>
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </fieldset>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Adding Vehicle...' : 'Add Vehicle'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
