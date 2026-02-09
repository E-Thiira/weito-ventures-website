# 🚀 Weito Ventures — Deployment Quick Start

Your backend is ready for live deployment! Follow this 10-minute guide.

## What You Have

✅ Node.js + Express backend with MongoDB integration
✅ Contact form with validation and database storage
✅ CORS enabled for frontend communication
✅ Production-ready server configuration

## Quick Deploy (Render + MongoDB Atlas)

### 1️⃣ Create MongoDB Database (5 min)

Visit: https://www.mongodb.com/cloud/atlas

1. Sign up (free)
2. Create **M0 Sandbox** cluster
3. Create user: `weito_admin` with strong password
4. Get connection string: `mongodb+srv://weito_admin:PASSWORD@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority`

### 2️⃣ Deploy Backend (3 min)

Visit: https://render.com

1. Sign in with GitHub
2. Click **New Web Service**
3. Select your repo: `weito-ventures-website`
4. Configuration:
   - Build: `npm install`
   - Start: `node server.js`
   - Add env vars:
     - `MONGODB_URI` = your connection string from step 1
     - `NODE_ENV` = `production`
5. Deploy (auto-starts in 2 min)
6. Copy your Render URL (e.g., `https://weito-ventures-backend-abc123.onrender.com`)

### 3️⃣ Update Frontend (2 min)

In `contact.html`, line ~60, update the fetch URL:

```javascript
const res = await fetch('https://YOUR-RENDER-URL.onrender.com/api/contact', {
```

Deploy to Netlify as usual.

### ✅ Test Live

```bash
# Test backend health
curl https://YOUR-RENDER-URL.onrender.com/api/health

# Test contact form submission
curl -X POST https://YOUR-RENDER-URL.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"This is a test message for Weito Ventures."}'
```

Check MongoDB Atlas dashboard → Collections → See your contact saved!

---

## Files Created

| File                      | Purpose                                       |
| ------------------------- | --------------------------------------------- |
| `DEPLOYMENT.md`           | Detailed step-by-step guide for all platforms |
| `DEPLOYMENT_CHECKLIST.md` | Pre & post-deployment verification tasks      |
| `BACKEND_SETUP.md`        | Local development & testing instructions      |
| `render.yaml`             | Render deployment configuration               |
| `.env.example`            | Updated with MONGODB_URI template             |

---

## Architecture

```
Frontend (Netlify)
    ↓ HTTPS POST /api/contact
Backend (Render)
    ↓ Mongoose ORM
MongoDB Atlas (Cloud)
```

---

## Next Steps

1. **Email Notifications** → Add Nodemailer or SendGrid to controllers/contactController.js
2. **Rate Limiting** → Add express-rate-limit to server.js
3. **Admin Dashboard** → Create /admin routes to view contacts
4. **Custom Domain** → Point your domain to Netlify & Render

---

## Support

- **Backend Issues**: Check `BACKEND_SETUP.md` troubleshooting
- **Deployment Issues**: See `DEPLOYMENT.md` alternative platforms
- **MongoDB Issues**: See MongoDB Atlas docs at https://www.mongodb.com/docs/
- **Render Issues**: See Render docs at https://render.com/docs

---

**Your live Weito Ventures platform is ready! 🎉**

Questions? Check the markdown files in your repo or contact Render/Netlify support.
