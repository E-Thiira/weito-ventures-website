# Weito Ventures Backend Deployment Guide

## Step 1: Set Up MongoDB Atlas (Free Tier)

### Create a MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **Sign Up** (use email or Google/GitHub)
3. Create a free cluster:
   - Choose **M0 Sandbox** (free)
   - Select your region (closest to your users)
   - Click **Create Deployment**

### Create Database User

1. In the **Security** menu, click **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `weito_admin`
5. Password: Generate a strong password (copy it)
6. Database User Privileges: **Atlas admin**
7. Click **Add User**

### Whitelist IP / Configure Network

1. Go to **Network Access** in Security
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0) for development
4. Click **Confirm**

### Get Connection String

1. Click **Connect** on your cluster
2. Choose **Drivers** → **Node.js**
3. Copy the connection string: `mongodb+srv://weito_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
4. Replace `<password>` with your actual password

---

## Step 2: Deploy Backend to Render (Free Tier)

### Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended for auto-deploys)
3. Connect your GitHub repository

### Deploy Backend

1. In Render dashboard, click **New +** → **Web Service**
2. Select your **weito-ventures-website** repository
3. Configure:
   - **Name**: `weito-ventures-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Region**: Choose closest to you

### Set Environment Variables

1. Scroll to **Environment Variables**
2. Add:
   ```
   MONGODB_URI = mongodb+srv://weito_admin:<PASSWORD>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   NODE_ENV = production
   PORT = (leave blank, Render assigns it)
   ```
3. Click **Create Web Service**

### Verify Deployment

- Render will build and deploy (takes ~2 min)
- Check the live URL once status is **Live**
- Test health: `https://your-render-url.onrender.com/api/health`

---

## Step 3: Update Frontend to Use Live Backend

### Update Contact Form

In `contact.html`, change the fetch URL from `/api/contact` to your Render URL:

```javascript
const res = await fetch("https://your-render-url.onrender.com/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
```

Or use environment variables with a build step (optional for Netlify).

---

## Step 4: Deploy Frontend to Netlify

1. Go to https://netlify.com
2. Connect your GitHub repo
3. Deploy settings:
   - **Base**: `.` (root)
   - **Build command**: (leave empty)
   - **Publish directory**: `.`
4. Add environment variable `REACT_APP_BACKEND_URL` = your Render URL (optional)
5. Deploy

---

## Alternative: Deploy to Railway or Heroku

### Railway (Recommended)

1. Go to https://railway.app
2. Click **New Project** → **Deploy from GitHub**
3. Select your repo
4. Add `MONGODB_URI` and `NODE_ENV` in variables
5. Deploy (auto-starts)

### Heroku (Free tier ending)

1. Create account at https://heroku.com
2. Install Heroku CLI
3. Run: `heroku create weito-ventures-backend`
4. Run: `heroku config:set MONGODB_URI="your_connection_string"`
5. Deploy: `git push heroku main`

---

## Testing Your Live Setup

### Test Backend Health

```bash
curl https://your-render-url.onrender.com/api/health
```

### Test Contact Form

1. Open your Netlify frontend
2. Fill contact form and submit
3. Check MongoDB Atlas **Database** → **Collections** → see saved contact

### Troubleshooting

- **"Cannot connect to MongoDB"**: Verify IP whitelist in MongoDB Atlas Network Access
- **"Endpoint not found"**: Ensure server.js routes are correct
- **CORS issues**: Check `cors()` middleware in server.js

---

## Next Steps

1. Set up automatic deploys on both platforms (GitHub integration)
2. Add email notifications (Nodemailer/SendGrid)
3. Add admin dashboard for viewing contacts
4. Set up monitoring and logging (Sentry, LogDNA)
5. Configure custom domain (optional)

---

## Environment Variables Reference

```env
# .env (local development)
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/weito_ventures

# Render/Railway (production)
PORT=(auto-assigned)
NODE_ENV=production
MONGODB_URI=mongodb+srv://weito_admin:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**⚠️ Never commit .env to GitHub. Use platform-specific secrets instead.**
