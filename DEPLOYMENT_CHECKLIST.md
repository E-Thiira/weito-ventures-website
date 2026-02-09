# Pre-Deployment Checklist

## Backend Readiness ✓

- [x] server.js configured with MongoDB connection
- [x] CORS enabled for frontend requests
- [x] Error handling and logging in place
- [x] Contact model with validation
- [x] Contact controller with database save
- [x] Routes properly mapped
- [x] Environment variables documented

## Database Readiness

- [ ] MongoDB Atlas account created
- [ ] Free M0 cluster deployed
- [ ] Database user created (username: weito_admin)
- [ ] IP whitelist configured (0.0.0.0/0 for dev)
- [ ] Connection string copied to .env.example

## Deployment Platform Selection

Choose ONE:

- [ ] **Render** (Recommended) — Free tier, auto-deploy from GitHub
- [ ] **Railway** — Free tier, simple UI
- [ ] **Heroku** — Paid only (free tier ended)

## Deployment Steps (Render Example)

### Step 1: Configure Render Account

```bash
# Visit https://render.com
# Sign in with GitHub
# Grant repository access to weito-ventures-website
```

### Step 2: Create Web Service

- [ ] Click "New +" → "Web Service"
- [ ] Connect weito-ventures-website repository
- [ ] Set build command: `npm install`
- [ ] Set start command: `node server.js`
- [ ] Add environment variables:
  - `NODE_ENV` = `production`
  - `MONGODB_URI` = your MongoDB Atlas connection string

### Step 3: Deploy

- [ ] Click "Create Web Service"
- [ ] Wait for deployment (2-3 min)
- [ ] Copy your Render URL from dashboard

### Step 4: Test Live Backend

```bash
# Test health endpoint
curl https://your-render-url.onrender.com/api/health

# Test contact submission
curl -X POST https://your-render-url.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"This is a test message for Weito Ventures contact form."}'
```

## Frontend Updates

### Update contact.html

- [ ] Change fetch URL from `/api/contact` to `https://your-render-url.onrender.com/api/contact`
- [ ] Test form submission
- [ ] Verify success message displays

### Deploy Frontend to Netlify

```bash
# Visit https://netlify.com
# Connect GitHub repository
# Set publish directory: . (root)
# Deploy
```

## Verification

### MongoDB Atlas

- [ ] Visit MongoDB Atlas dashboard
- [ ] Verify contacts appear in: Database → Collections → contacts
- [ ] Check contact has: name, email, message, createdAt

### Render Dashboard

- [ ] Service status shows "Live"
- [ ] Environment variables are set
- [ ] Recent deploy succeeded
- [ ] Logs show "Connected to MongoDB"

### Live Application

- [ ] Frontend loads from Netlify
- [ ] Contact form submits successfully
- [ ] Success message displays
- [ ] Contact appears in MongoDB

## Post-Deployment

- [ ] Set up monitoring (Sentry, DataDog, or Render's built-in)
- [ ] Enable auto-restart on failure
- [ ] Configure backups for MongoDB
- [ ] Add custom domain (optional)
- [ ] Set up email notifications for contacts
- [ ] Add rate limiting to prevent spam

## Troubleshooting

| Issue                        | Solution                                                  |
| ---------------------------- | --------------------------------------------------------- |
| "Cannot connect to MongoDB"  | Check IP whitelist in MongoDB Atlas Network Access        |
| Endpoint returns 404         | Verify backend deployed and health check works            |
| CORS error in frontend       | Ensure backend has `cors()` middleware                    |
| Service won't start          | Check server.js syntax and environment variables          |
| Logs show connection timeout | Verify MONGODB_URI is correct and password is URL-encoded |

## Support Links

- Render Docs: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Express.js: https://expressjs.com/
- Mongoose: https://mongoosejs.com/

---

**Once all checks are complete, your Weito Ventures backend is live! 🚀**
