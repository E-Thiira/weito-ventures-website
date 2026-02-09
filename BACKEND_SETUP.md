# Weito Ventures Backend — Quick Start for Local Testing

## Install Dependencies

```bash
npm install
```

## Set Up Local MongoDB (Optional)

```bash
# If you have MongoDB installed locally:
mongod

# Or use MongoDB Atlas connection string in .env
```

## Configure Environment

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/weito_ventures
```

For MongoDB Atlas:

```env
MONGODB_URI=mongodb+srv://weito_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Run Server

```bash
npm start
```

Expected output:

```
Connected to MongoDB
Server is running on http://localhost:5000
Environment: development
```

## Test Endpoints

### Health Check

```bash
curl http://localhost:5000/api/health
```

Response:

```json
{ "status": "Server is running", "timestamp": "2026-02-09T..." }
```

### Submit Contact (Test)

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a test message for Weito Ventures."
  }'
```

Response:

```json
{
  "success": true,
  "message": "Thank you for contacting Weito Ventures. We will get back to you soon."
}
```

## Verify in MongoDB

1. Open MongoDB Atlas dashboard
2. Navigate to: **Database** → **Collections** → **weito_ventures** → **contacts**
3. View your submitted contact

## Deploy to Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions on:

- Setting up MongoDB Atlas
- Deploying to Render, Railway, or Heroku
- Configuring frontend to use live backend

## Development with Nodemon (Auto-reload)

```bash
npm run dev
```

Requires `nodemon` in devDependencies (already configured in package.json).

## Troubleshooting

**Port already in use:**

```bash
# Find and kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

**MongoDB connection error:**

- Verify MONGODB_URI in .env
- Check MongoDB Atlas Network Access (IP whitelist)
- Ensure database user password doesn't contain special characters (URL-encode if needed)

**CORS errors:**

- Backend already has `cors()` enabled
- If frontend is on different domain, verify Render URL in frontend

## Next Steps

1. Deploy to production using DEPLOYMENT.md
2. Update frontend contact form to use live backend URL
3. Monitor logs in Render/Railway dashboard
4. Set up email notifications for contacts
