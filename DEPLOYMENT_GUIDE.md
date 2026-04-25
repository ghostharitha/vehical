# Quick Start Deployment Guide

## Overview
- **Backend**: Node.js + Express on Render
- **Frontend**: React on Vercel  
- **Database**: MongoDB Atlas

---

## 🎯 QUICK STEPS (15-20 minutes)

### Phase 1: Setup Database (5 minutes)

1. **Create MongoDB Atlas Account**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up with email
   - Click "Build a Cluster"
   - Select **Free tier**
   - Wait for cluster to be created

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - **Replace `<password>` with your DB password**
   - **Replace `<dbname>` with `vehicle_db`**
   
   Example: `mongodb+srv://username:password@cluster.mongodb.net/vehicle_db?retryWrites=true&w=majority`

---

### Phase 2: Deploy Backend to Render (5-7 minutes)

1. **Push Backend to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/vehicle-backend.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Visit: https://render.com
   - Sign up → Connect GitHub
   - Click "New +" → "Web Service"
   - Select your `vehicle-backend` repo
   
   **Settings:**
   - Name: `vehicle-backend`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Instance: Free

3. **Add Environment Variables** (in Render dashboard)
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/vehicle_db?retryWrites=true&w=majority
   PORT = 10000
   NODE_ENV = production
   ```

4. **Wait for Deployment** (2-5 minutes)
   - Copy your backend URL: `https://vehicle-backend.onrender.com`

---

### Phase 3: Deploy Frontend to Vercel (5-7 minutes)

1. **Update Frontend API URL**
   
   Edit `frontend/src/services/vehicleAPI.js`:
   ```javascript
   // Change this line
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
   ```

2. **Push Frontend to GitHub**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/vehicle-frontend.git
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Visit: https://vercel.com
   - Sign up → Connect GitHub
   - Click "Add New +" → "Project"
   - Select your `vehicle-frontend` repo
   
   **Settings:**
   - Framework: React
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Add Environment Variable** (in Vercel dashboard)
   ```
   REACT_APP_API_URL = https://vehicle-backend.onrender.com
   ```

5. **Deploy** → Wait 1-2 minutes
   - Your frontend URL: `https://vehicle-frontend.vercel.app`

---

## ✅ Testing

1. **Test Backend**: https://vehicle-backend.onrender.com/api/health
2. **Test Frontend**: https://vehicle-frontend.vercel.app
3. **Try adding a vehicle** to confirm everything works

---

## 📌 Important Notes

### Render Free Tier Limitations:
- Services spin down after 15 minutes of inactivity
- First request takes 30+ seconds
- For production, upgrade to paid ($7/month minimum)

### Common Issues:

**CORS Error?**
- Backend might not be running
- Check backend URL in frontend environment variables
- Verify CORS is enabled in backend/index.js

**API Connection Failed?**
- Make sure backend is deployed first
- Update REACT_APP_API_URL with correct Render URL
- Redeploy frontend after updating URL

**MongoDB Connection Error?**
- Check MONGODB_URI format
- Verify username/password are correct
- Whitelist Render IP in MongoDB Atlas (Security → Network Access → Add 0.0.0.0)

---

## 🔧 Upgrade to Production (Optional)

### For Production Reliability:
- **Backend**: Render Paid Plan ($7-25/month)
- **Database**: MongoDB Atlas Paid Plan ($57+/month)
- **Frontend**: Vercel is free for unlimited projects

### Add Custom Domain:
- Vercel: Domain settings (free)
- Render: Add custom domain in settings

---

## 📚 Useful Links

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Render: https://render.com
- Vercel: https://vercel.com
- GitHub: https://github.com

---

## Need Help?

Run locally first to debug:
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

Then fix issues locally before deploying.
