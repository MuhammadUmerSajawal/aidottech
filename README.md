# .dot

Marketing website for **.dot** — vertical AI products and industry-specific AI solutions.

**Live repo:** [github.com/MuhammadUmerSajawal/aidottech](https://github.com/MuhammadUmerSajawal/aidottech)

## Stack

- **Client:** React, Vite, Tailwind CSS, React Router
- **Server:** Node.js, Express, MongoDB (Mongoose)

## Project structure

```
client/   # Frontend (homepage, about, contact)
server/   # Backend API
```

## Getting started

### Client

```bash
cd client
npm install
npm run dev
```

Runs at `http://localhost:3000`

### Server

Create `server/.env` (see your local config), then:

```bash
cd server
npm install
npm run dev
```

Runs at `http://localhost:5000`

## Pages

| Route     | Description        |
|-----------|--------------------|
| `/`       | Homepage           |
| `/about`  | About .dot         |
| `/contact`| Contact & form     |

## Scripts

**Client:** `npm run dev` · `npm run build` · `npm run preview`

**Server:** `npm run dev` · `npm start`

---

© .dot — Vertical AI solutions
