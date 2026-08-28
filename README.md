# CHALANA
The Chalana Suite is a software program that helps small businesses track invoices, manage inventory, assess operational costs, and assign invoices and employees to work orders. Chalana utilizes a client-based organization system to make paper-based methods more efficient and speed up job workflow. Over time, businesses will be able to analyze what consistently works for them and what aspects of their business help maximize profits. The name is inspired by the Spanish word  *chalán* (helper), with the suffix -a added in honor of my sister.

**Live app:** https://chalana-xi.vercel.app/

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

Built in one month, 30 minutes a day, while working full-time at a family business. Designed to replace a paper-based workflow with a real product my dad can use daily.

---

*Built by Matthew Martinez*
