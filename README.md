# Trust TV Mounting & Home Solutions — Website

Standalone Vite + React frontend, ready to deploy on Netlify.

## Local development

```bash
npm install
npm run dev
```

## Deploying on Netlify

1. Push this folder to a GitHub repo.
2. In Netlify: "Add new site" → "Import an existing project" → pick the repo.
3. Build settings are already defined in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add the `VITE_API_URL` environment variable in Netlify's site settings (see `.env.example`).

## Important: the contact/appointment forms need a backend

This frontend calls a backend API (`/api/appointments`, `/api/contact-requests`) to send
emails through Resend. Netlify only serves static sites, so that backend must be deployed
somewhere else that can run a Node server (Render, Railway, Fly.io, Replit, etc). Once it's
deployed, set `VITE_API_URL` to that backend's URL so the forms know where to send requests.

If you don't set `VITE_API_URL`, the site will still build and display correctly, but
submitting either form will fail.
