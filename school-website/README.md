# =====================================================
# Pioneer Academic School Website
# HTML + CSS + React + Node.js + MySQL
# =====================================================

## Live free URL (after deploy)

`https://pioneer-academic-school.vercel.app`

---

## Quick start RIGHT NOW (no MySQL yet)

Your PC may not have MySQL. Use demo mode first:

```bash
cd school-website/backend
npm run demo
```

```bash
cd school-website/frontend
npm run dev
```

Open http://localhost:5173

Demo mode uses the **same API URLs**. When you install XAMPP later:
1. Run `database/schema.sql`
2. Stop demo server
3. Run `npm start` instead (real MySQL)

---

## How the project works (with arrows)

```
 STUDENT BROWSER
       |
       |  opens website
       v
 REACT FRONTEND  (folder: frontend/)
   pages, buttons, forms
       |
       |  fetch("http://localhost:5000/api/...")
       v
 NODE.JS BACKEND  (folder: backend/)
   Express routes
       |
       |  SQL queries
       v
 MYSQL DATABASE  (folder: database/schema.sql)
   users, notes, teachers, events...
```

### Example: Reading notes

```
Notes page  -->  GET /api/notes  -->  SELECT * FROM notes  -->  show cards
```

### Example: Login

```
Login form  -->  POST /api/auth/login  -->  check users table  -->  save user in browser
```

### Example: Admin adds a note

```
Add Note form  -->  POST /api/notes  -->  INSERT INTO notes  -->  open new note page
```

---

## Folder map

```
school-website/
├── database/
│   └── schema.sql          ← create tables + sample data
├── backend/
│   ├── server.js           ← starts API on port 5000
│   ├── config/db.js        ← MySQL connection
│   ├── routes/             ← one file per feature
│   └── .env                ← DB password / port
└── frontend/
    └── src/
        ├── pages/          ← Home, Notes, Login...
        ├── components/     ← Navbar, Footer
        └── api.js          ← backend URL
```

---

## Features included

| Feature | Page | API |
|---------|------|-----|
| Home + notice board | `/` | `GET /api/notices` |
| About school | `/about` | — |
| Teachers | `/teachers` | `GET /api/teachers` |
| Courses | `/courses` | `GET /api/courses` |
| Study notes | `/notes` | `GET /api/notes` |
| Note detail | `/notes/:id` | `GET /api/notes/:id` |
| Add note (admin) | `/notes/add` | `POST /api/notes` |
| Events | `/events` | `GET /api/events` |
| Gallery | `/gallery` | `GET /api/gallery` |
| Contact form | `/contact` | `POST /api/contact` |
| Login / Register | `/login` `/register` | `/api/auth/...` |

**Demo logins**
- Admin: `admin@school.com` / `admin123`
- Student: `riya@student.com` / `student123`

---

## Step 1 — Install tools (once)

1. [Node.js](https://nodejs.org/) (LTS)
2. MySQL (easiest: [XAMPP](https://www.apachefriends.org/) → start **MySQL**)
3. Optional: MySQL Workbench

---

## Step 2 — Create database

1. Open MySQL (XAMPP MySQL running)
2. Run the file `database/schema.sql`

In MySQL command line:

```bash
mysql -u root -p < database/schema.sql
```

Or open `schema.sql` in MySQL Workbench → Execute.

---

## Step 3 — Start backend

```bash
cd school-website/backend
```

Edit `.env` and put your MySQL password:

```
DB_PASSWORD=your_password_here
```

(If XAMPP default has empty password, leave it blank.)

```bash
npm install
npm start
```

Open http://localhost:5000 — you should see API is running.

---

## Step 4 — Start frontend

Open a **new** terminal:

```bash
cd school-website/frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## Free deploy (free subdomain — no paid domain needed)

You get free URLs like:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`

### A) Free MySQL (cloud)

Use one of these free options:
1. **[FreeSQLDatabase](https://www.freesqldatabase.com/)** — create DB, copy host/user/password
2. Or **[Aiven](https://aiven.io/)** free MySQL trial
3. Or **[Railway](https://railway.app/)** MySQL (free credits)

Then run `schema.sql` on that remote MySQL.

### B) Deploy backend (Render — free)

1. Push this project to GitHub
2. Go to [render.com](https://render.com) → New **Web Service**
3. Root directory: `school-website/backend`
4. Build: `npm install`
5. Start: `npm start`
6. Add Environment Variables:
   - `DB_HOST` = your free MySQL host
   - `DB_USER` = ...
   - `DB_PASSWORD` = ...
   - `DB_NAME` = school_db
   - `PORT` = 10000 (Render sets this often automatically)

Copy your backend URL, example: `https://school-api.onrender.com`

### C) Deploy frontend (Vercel — free)

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Root directory: `school-website/frontend`
4. Framework: Vite
5. Add Environment Variable:
   - `VITE_API_URL` = `https://school-api.onrender.com`  (your Render URL, no slash at end)

Deploy → open your free site: `https://something.vercel.app`

### Optional custom free domain

- Use the free `*.vercel.app` / `*.onrender.com` subdomains (easiest)
- Or connect a free domain from [Freenom](https://www.freenom.com/) (less reliable) in Vercel → Domains

---

## Common errors (and how to fix)

| Error | Meaning | Fix |
|-------|---------|-----|
| MySQL connection failed | DB not running / wrong password | Start XAMPP MySQL, fix `.env` |
| ER_BAD_DB_ERROR | Database missing | Run `schema.sql` |
| CORS / Failed to fetch | Backend not running | Start backend on port 5000 |
| Invalid email or password | Wrong login | Use demo accounts above |
| Blank teachers/notes | API not connected | Check http://localhost:5000 |

---

## Learning path (recommended order)

1. Read `database/schema.sql` → understand tables
2. Read `backend/server.js` → see routes
3. Open one route file like `routes/notes.js`
4. Open React page `pages/Notes.jsx` → see `fetch`
5. Change a notice text in MySQL → refresh Home page

Happy coding!
