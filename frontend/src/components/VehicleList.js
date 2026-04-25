import React, { useState, useEffect, useCallback } from 'react';
import vehicleAPI from '../services/vehicleAPI';
import '../styles/VehicleList.css';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    vehicleType: '',
    fuelType: '',
    status: '',
    sortBy: 'newest',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value)
      );
      const response = await vehicleAPI.getAllVehicles(activeFilters);
      setVehicles(response.data.vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      alert('Error fetching vehicles');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchVehicles();
      return;
    }

    setLoading(true);
    try {
      const response = await vehicleAPI.searchVehicles(searchQuery);
      setVehicles(response.data.vehicles);
    } catch (error) {
      console.error('Error searching vehicles:', error);
      alert('Error searching vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    fetchVehicles();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehicleAPI.deleteVehicle(id);
        setVehicles(vehicles.filter((v) => v._id !== id));
        alert('Vehicle deleted successfully');
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        alert('Error deleting vehicle');
      }
    }
  };

  return (
    <div className="vehicle-list-container">
      <h2>Vehicle Listing</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by name, brand, model, license plate, or owner..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="vehicleType">Vehicle Type:</label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={filters.vehicleType}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Car">Car</option>
            <option value="Truck">Truck</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Bus">Bus</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="fuelType">Fuel Type:</label>
          <select
            id="fuelType"
            name="fuelType"
            value={filters.fuelType}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="CNG">CNG</option>
            <option value="LPG">LPG</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortBy">Sort By:</label>
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <button onClick={handleApplyFilters} className="btn-filter">
          Apply Filters
        </button>
      </div>

      {/* Vehicle List */}
      {loading ? (
        <p className="loading">Loading vehicles...</p>
      ) : vehicles.length === 0 ? (
        <p className="no-vehicles">No vehicles found.</p>
      ) : (
        <div className="vehicles-grid">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="vehicle-card">
              {vehicle.imageUrl && (
                <div className="vehicle-image">
                  <img src={vehicle.imageUrl} alt={vehicle.vehicleName} />
                </div>
              )}
              <div className="vehicle-info">
                <h3>{vehicle.vehicleName}</h3>
                <p className="brand-model">
                  {vehicle.brand} {vehicle.model} ({vehicle.year})
                </p>
                
                <div className="vehicle-details">
                  <p><strong>Type:</strong> {vehicle.vehicleType}</p>
                  <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>
                  <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
                  <p><strong>Transmission:</strong> {vehicle.transmissionType}</p>
                  <p><strong>Mileage:</strong> {vehicle.mileage} km</p>
                  <p><strong>Engine:</strong> {vehicle.engineCapacity}</p>
                  <p><strong>Seats:</strong> {vehicle.seatingCapacity}</p>
                  <p><strong>Owner:</strong> {vehicle.owner}</p>
                  <p><strong>Contact:</strong> {vehicle.contactNumber}</p>
                </div>

                <div className="vehicle-footer">
                  <p className="price">${vehicle.price.toLocaleString()}</p>
                  <span className={`status status-${vehicle.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {vehicle.status}
                  </span>
                </div>

                {vehicle.description && (
                  <p className="description">{vehicle.description}</p>
                )}

                <div className="vehicle-actions">
                  <button className="btn-edit">Edit</button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(vehicle._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleList;
