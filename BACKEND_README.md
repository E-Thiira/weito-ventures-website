# Weito Ventures Backend

A lightweight Node.js + Express backend for the Weito Ventures microfinance platform.

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create environment file:**

   ```bash
   cp .env.example .env
   ```

3. **Start the server:**

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Health Check

- **GET** `/api/health` - Verify server is running

### Contact Form

- **POST** `/api/contact` - Submit contact form
  - **Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "message": "I'm interested in your services"
    }
    ```
  - **Success Response (200):**
    ```json
    {
      "success": true,
      "message": "Thank you for contacting Weito Ventures. We will get back to you soon."
    }
    ```

## Future Enhancements

### Email Integration

- Connect to SendGrid, Nodemailer, or AWS SES
- Send confirmation emails to users
- Notify admins of new contact requests

### Database Integration

- Store contact requests in MongoDB or PostgreSQL
- Track inquiry status and follow-ups
- User account and loan application management

### Authentication

- JWT-based user authentication
- Role-based access control (user, admin, lender)

### Additional Features

- Loan application endpoint
- User profile management
- Application status tracking
- Payment processing integration

## Project Structure

```
.
├── server.js          # Main server file
├── routes/
│   └── contact.js     # Contact form endpoint
├── package.json       # Dependencies
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Environment Variables

Create a `.env` file based on `.env.example`. Key variables:

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Technologies

- **Express.js** - Web framework
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment configuration
- **Nodemon** - Development auto-reload (dev dependency)

## Deployment

The backend is ready for deployment to services like:

- Heroku
- Vercel
- AWS EC2
- DigitalOcean
- Railway

Set appropriate environment variables on your hosting platform before deploying.
