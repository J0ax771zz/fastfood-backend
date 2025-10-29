# fastfood-backend

Node.js + Express + Prisma + SQLite backend for the FastBite app.

## Setup

1. Install deps:
   ```
   npm install
   ```

2. Generate Prisma client and run migrations:
   ```
   npx prisma generate
   npx prisma migrate dev --name init
   ```

3. Seed:
   ```
   npm run prisma:seed
   ```

4. Run:
   ```
   npm run dev
   ```

API runs on http://localhost:4000
