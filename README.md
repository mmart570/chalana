# CHALANA
The Chalana Suite is a software program that helps small businesses transition from paper-based methods to digital management systems. Chalana helps business owners track invoices, manage inventory, assess operational costs, and assign invoices and employees to work orders. Over time, businesses will be able to analyze what works for them and what aspects of their business help maximize profits.

**Live app:** https://chalana-xi.vercel.app/

**Version:** 1.1.0 - added auth landing page

<img width="2056" height="1329" alt="Screenshot 2026-08-31 at 10 32 26 PM" src="https://github.com/user-attachments/assets/1e81b57d-57ed-4581-9b15-f00faf0d3560" />

<img width="2056" height="1072" alt="Screenshot 2026-08-24 at 9 51 01 PM" src="https://github.com/user-attachments/assets/d146e15b-ab1c-46e4-948a-41b825b716d1" />

<img width="2056" height="1073" alt="Screenshot 2026-08-24 at 9 48 57 PM" src="https://github.com/user-attachments/assets/4aa7f6dc-ede5-4c22-b47a-8ddabf520eaf" />



---

## What it does

- Create and track jobs with client names and descriptions
- Log labor and material costs per job
- Manage tool inventory and availability
- Generate invoices automatically calculated from job costs
- Mark invoices as paid

## Tech stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express, PostgreSQL  
**Deployed:** Vercel (frontend), Railway (backend + database)

## Local development

### Prerequisites
- Node.js
- PostgreSQL

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Environment variables

**server/.env**

DATABASE_URL=your_postgres_connection_string

**client/.env**

VITE_API_URL=http://localhost:3000

## Database schema

Four tables: `jobs`, `job_costs`, `tools`, `invoices`  
See `server/src/db/schema.sql` for the full schema.

## Background

The name is inspired by the Spanish word  *chalán* (helper), with the suffix -a added in honor of my sister. Built in one month, 30 minutes a day, while working full-time at a family business. Designed to replace a paper-based workflow with a real product my dad can use daily.

---

*Built by Matthew Martinez*
