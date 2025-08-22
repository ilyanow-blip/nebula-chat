# NebulaChat (Render Deployment)

## Deploy Backend (API)
1. In Render, create **New → Web Service**.
2. Root Directory: `api`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Environment: Node 20
6. Port: use `$PORT` (already in code).

## Deploy Frontend (Web)
1. In Render, create **New → Static Site**.
2. Root Directory: `web`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `dist`
5. Add environment variable:
   ```
   VITE_API_URL=https://<your-backend-service>.onrender.com
   ```

Done! Your NebulaChat will be online 🚀
