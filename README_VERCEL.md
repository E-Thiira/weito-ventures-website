Deploying to Vercel (Frontend - Static site)

Quick steps (recommended):

1. Push all changes to your GitHub repository (already done):

```bash
git add .
git commit -m "Prepare for Vercel"
git push origin main
```

2. Import repo on Vercel:

- Go to https://vercel.com/dashboard
- Click "New Project" → "Import Git Repository"
- Select the `weito-ventures-website` repository
- Set the Root Directory to `/` (default). Framework Preset: "Other"
- Build & Output Settings: No build command needed (static files). Output Directory: `/`.
- Click "Deploy".

3. Using the Vercel CLI (optional):

- Install: `npm i -g vercel`
- From repo root run:

```bash
vercel login
vercel --prod
```

4. Notes:

- `vercel.json` is included to serve static files and provide SPA fallback to `index.html`.
- If you also want to host the Express backend, consider moving it to serverless functions (`/api`) or using Render for the backend and Vercel for the frontend.
- To add environment variables (e.g., API URL or MONGODB_URI), go to Project Settings → Environment Variables on Vercel.

If you want, I can also configure a basic `api/` serverless function conversion for the contact endpoint, or help import the repo on your Vercel account.
