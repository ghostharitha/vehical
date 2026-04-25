# Backend Deployment Guide

## Hosting Backend on Render

### Step 1: Prepare Your Backend Code

1. Make sure all files are committed to GitHub
2. The backend already has `Procfile` for deployment

### Step 2: Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login with your account
3. Create a new project
4. Click "Build a Cluster" → Select Free tier
5. Create a cluster (takes 2-3 minutes)
6. Go to "Database" → "Connect"
7. Create database user with username & password
8. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/vehicle_db?retryWrites=true&w=majority`)
9. Replace `username` and `password` with your credentials

### Step 3: Push Code to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial backend commit"

# Add remote (replace YOUR_GITHUB_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/vehicle-backend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy on Render

1. Go to [Render](https://render.com) and sign up
2. Click "New +" and select "Web Service"
3. Connect your GitHub account and select your backend repository
4. Fill in the details:
   - **Name**: `vehicle-backend` (or any name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free

5. Click "Advanced" and add Environment Variables:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/vehicle_db?retryWrites=true&w=majority
   PORT = 10000
   NODE_ENV = production
   ```

6. Click "Create Web Service"
7. Wait for deployment (2-5 minutes)
8. You'll get a URL like: `https://vehicle-backend.onrender.com`

### Note on Render Free Tier:
- Services spin down after 15 minutes of inactivity
- First request after inactivity takes 30+ seconds
- For production, upgrade to paid plan

---

## Next: Deploy Frontend on Vercel

See FRONTEND_DEPLOYMENT.md for frontend deployment instructions.
