# Frontend Deployment Guide

## Hosting Frontend on Vercel

### Step 1: Update API Endpoint

Update `src/services/vehicleAPI.js` to use the Render backend URL:

```javascript
const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
```

Replace `your-backend-url` with your actual Render backend URL.

### Step 2: Push Code to GitHub

```bash
# From frontend directory
git init

# Add all files
git add .

# Commit
git commit -m "Initial frontend commit"

# Add remote (replace YOUR_GITHUB_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/vehicle-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to [Vercel](https://vercel.com) and sign up
2. Click "Add New +" → "Project"
3. Select "Import Git Repository"
4. Connect your GitHub account and select your frontend repository
5. Configure project:
   - **Framework Preset**: React
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

6. Add Environment Variables:
   ```
   REACT_APP_API_URL = https://your-backend-url.onrender.com
   ```

7. Click "Deploy"
8. Wait for deployment (1-2 minutes)
9. You'll get a URL like: `https://vehicle-frontend.vercel.app`

### Optional: Custom Domain

In Vercel project settings, you can add your custom domain for free.

---

## Testing the Full Application

1. **Backend API**: https://your-backend-url.onrender.com/api/health
2. **Frontend**: https://your-frontend-url.vercel.app
3. Try adding a vehicle to ensure frontend and backend are connected

---

## Troubleshooting

### CORS Issues
If you get CORS errors, update backend `index.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

### Environment Variables Not Working
- Make sure you use `REACT_APP_` prefix for frontend environment variables
- Restart deployment after adding environment variables

### MongoDB Connection Errors
- Check MONGODB_URI in Render environment variables
- Whitelist your Render server IP in MongoDB Atlas (Security → Network Access)

---

## Summary

- **Backend URL**: https://vehicle-backend.onrender.com
- **Frontend URL**: https://vehicle-frontend.vercel.app
- **MongoDB**: Hosted on Atlas
- **Total Setup Time**: ~30 minutes
