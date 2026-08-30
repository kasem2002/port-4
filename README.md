# PORT-4

The website, client-discovery system and admin dashboard for PORT-4 — a
multidisciplinary software development team.

## Stack

- **Client** — React 18, TypeScript, Vite, Tailwind CSS, Redux Toolkit +
  RTK Query, Framer Motion. Bilingual EN/AR with RTL-aware layout.
- **Server** — Node.js, Express, TypeScript, Prisma, JWT auth, Zod validation,
  Helmet / CORS / rate limiting, multer + sharp for uploads.
- **Database** — SQLite by default (`server/prisma/dev.db`). Point
  `DATABASE_URL` at MySQL or Postgres and change `provider` in
  `prisma/schema.prisma` — no application code changes needed.

## Structure

```
port-4/
├── server/                 Express API
│   ├── prisma/             schema, migrations, seed
│   └── src/
│       ├── config/         validated environment
│       ├── routes/         URL + middleware
│       ├── validators/     zod schema per route
│       ├── controllers/    Prisma calls, wrapped in asyncHandler
│       ├── middleware/     auth · validate · upload · errorHandler
│       └── utils/          ApiError · asyncHandler · jwt · json · CRUD factory
└── client/                 React app
    └── src/
        ├── pages/          PublicSite · Dashboard · Discovery
        ├── components/     public site sections
        ├── discovery/      the five-step client brief
        ├── dashboard/      admin editors
        ├── services/api.ts the single client/server boundary
        └── types/          mirrors the Prisma models
```

Three surfaces, one codebase:

| Route | Who it's for |
|---|---|
| `/` | The public site |
| `/discovery` (or `/brief`) | Clients filling in a project brief |
| `/dashboard` | You — content editing and incoming briefs |

## Getting started

### 1. Server

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` — at minimum set `JWT_SECRET`, `SEED_ADMIN_EMAIL` and
`SEED_ADMIN_PASSWORD`. Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Then create the database and start it:

```bash
npx prisma migrate dev --name init
npm run dev
```

The API listens on **http://localhost:4000**. The seed creates your admin
account and loads the full bilingual site content. Re-running the seed is safe:
it skips any collection that already has rows, so your edits survive.

### 2. Client

```bash
cd client
npm install
npm run dev
```

The site runs on **http://localhost:5173** and proxies `/api` and `/uploads`
to the server.

Sign in at `http://localhost:5173/dashboard` with the seeded credentials.

## How the data flows

Nothing is stored in the browser except your login token and language
preference. Everything else lives in the database:

- The public site renders from `GET /api/content` — one request returning
  settings plus every content collection.
- Dashboard edits write immediately and publish immediately. There is no
  draft/publish step; what you save is what visitors see.
- A client submitting the discovery form `POST`s to `/api/submissions` from
  wherever they are in the world. It appears in your dashboard within 30
  seconds, or immediately on refresh.
- Uploaded files go to `POST /api/uploads`, are resized and converted to WebP,
  and are stored on disk under `server/uploads/`.

## API

Public:

```
GET  /api/health
GET  /api/content              everything the public site renders
POST /api/submissions          a client brief          (rate limited)
POST /api/inquiries            the short contact form  (rate limited)
POST /api/uploads              one file                (rate limited)
POST /api/uploads/batch        up to 20 files
```

Content collections are readable without auth and writable with it:

```
GET                    /api/settings          /api/nav       /api/social
PUT | POST | PATCH   | /api/marquee           /api/stats     /api/about-bullets
DELETE                 /api/team-roles        /api/services  /api/process
POST …/reorder         /api/projects          /api/partners  /api/project-types
                       /api/budgets
```

Admin only:

```
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/password
GET    /api/overview
GET    /api/submissions            ?status= &search=
GET    /api/submissions/stats
GET    /api/submissions/:id
PATCH  /api/submissions/:id        status, isRead
DELETE /api/submissions/:id
GET|PATCH|DELETE /api/inquiries[/:id]
```

## Environment

See `server/.env.example` for the annotated list.

| Variable | Purpose |
|---|---|
| `PORT` | API port (default 4000) |
| `NODE_ENV` | `production` also serves the built client |
| `DATABASE_URL` | SQLite file path, or a MySQL/Postgres URL |
| `JWT_SECRET` | **Required in production.** Signs admin tokens. |
| `JWT_EXPIRES_IN` | Token lifetime (default `7d`) |
| `CLIENT_ORIGIN` | Allowed CORS origin in development |
| `SEED_ADMIN_*` | Seeded administrator account |
| `MAX_UPLOAD_MB` | Per-file upload ceiling (default 16) |

## Deploying to Hostinger

In production the API also serves the built client, so it is **one Node
process on one origin** — no CORS, nothing else to keep alive.

**1. Build both halves**

```bash
cd client && npm ci && npm run build
cd ../server && npm ci && npm run build
```

**2. Upload** `server/` (including `dist/`, `prisma/` and `node_modules/`) and
`client/dist/` to your Hostinger account, preserving the folder layout.

**3. Configure the Node app** in hPanel — set the application root to
`server/`, the startup file to `dist/index.js`, and add your environment
variables. Set `NODE_ENV=production` and a real `JWT_SECRET`.

**4. Run the migration and seed once**, from the SSH terminal:

```bash
cd server && npx prisma migrate deploy && npx prisma db seed
```

**5. Sign in** at `https://yourdomain.com/dashboard` and change the admin
password immediately under the seeded account.

### Notes

- `server/prisma/dev.db` and `server/uploads/` hold all your data. Back both
  up; neither is in git.
- Enable HTTPS before sharing the discovery link — the form posts client
  contact details.
- Moving to MySQL later means changing `provider` in `prisma/schema.prisma`,
  pointing `DATABASE_URL` at the new database, and re-running
  `prisma migrate deploy`. Application code is untouched.

## Scripts

**server**

| Command | Does |
|---|---|
| `npm run dev` | Watch mode on :4000 |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server |
| `npm run prisma:migrate` | Create and apply a migration |
| `npm run prisma:seed` | Load default content (safe to re-run) |
| `npm run prisma:studio` | Browse the database |
| `npm run db:reset` | Drop, re-migrate and re-seed |

**client**

| Command | Does |
|---|---|
| `npm run dev` | Vite dev server on :5173 |
| `npm run build` | Typecheck and build to `dist/` |
| `npm run typecheck` | Types only |
