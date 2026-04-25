# Vehicle Management System Frontend

React-based frontend for the Vehicle Management System MERN application.

## Features

- ✨ Add new vehicles with detailed information
- 📋 View all vehicles with real-time filtering
- 🔍 Search vehicles by name, brand, model, license plate, or owner
- 🎯 Filter by vehicle type, fuel type, and status
- 💰 Sort by price and date
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Start the development server (runs on http://localhost:3000)
npm start
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AddVehicle.js      # Add vehicle form
│   │   └── VehicleList.js     # View & manage vehicles
│   ├── services/
│   │   └── vehicleAPI.js      # API calls to backend
│   ├── styles/
│   │   ├── AddVehicle.css     # Form styling
│   │   └── VehicleList.css    # List styling
│   ├── App.js                 # Main app component
│   ├── index.js               # React entry point
│   └── index.css              # Global styles
├── public/
│   └── index.html             # HTML template
├── package.json               # Dependencies
└── README.md                  # This file
```

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`.

### Available Endpoints:

- `POST /api/vehicles` - Add new vehicle
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get single vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle
- `GET /api/vehicles/search?query=` - Search vehicles

## Technologies Used

- React 18
- React Router DOM
- Axios (HTTP client)
- CSS3
- React Scripts

## Notes

- Make sure the backend server is running before starting the frontend
- The proxy in `package.json` is set to `http://localhost:5000` for API calls
