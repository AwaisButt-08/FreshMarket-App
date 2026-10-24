# GreenBasket
 
Multi-vendor local grocery marketplace — MERN stack.
 
## Structure
 
The repo is split into two top-level folders, one per process — each with its own dependencies, config, and lifecycle:
 
- `server/` — Express API
- `client/` — React (Vite) frontend
 
## Run locally
 
(Completed in Chapter 2 — fill in after sub-chapter 2.16)
 
### API
```bash
cd server && npm install && npm run dev

## Run locally
 
Terminal 1 — API (port 5000):
cd server && npm install && npm run dev
 
Terminal 2 — Client (port 5173):
cd client && npm install && npm run dev
 
Open http://localhost:5173 — Home page should show API status ok.

## Environment setup
 
### Server
 
cp server/.env.example server/.env
# Edit server/.env — set MONGODB_URI to your local or Atlas connection string
 
### Client
 
cp client/.env.example client/.env
# Default VITE_API_URL=http://localhost:5000