require('dotenv').config();
const express = require('express');
const jobsRouter = require('./routes/jobs');
const jobCostsRouter = require('./routes/jobCosts');
const toolsRouter = require('./routes/tools');
const invoicesRouter = require('./routes/invoices');
const pool = require('./db');
const cors = require('cors');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected at:', res.rows[0].now);
  }
});
const app = express();

app.use(express.json());
app.use(cors({
  origin: ['https://chalana-j7wxc74yp-mmart570s-projects.vercel.app', 'http://localhost:5173']
}));

// Protected routes — add authMiddleware to all of these
app.use('/auth', authRouter);
app.use('/jobs', authMiddleware, jobsRouter);
app.use('/job-costs', authMiddleware, jobCostsRouter);
app.use('/tools', authMiddleware, toolsRouter);
app.use('/invoices', authMiddleware, invoicesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'CHALANA API running' });
});

app.listen(process.env.PORT || 3000, () => {  console.log('Server running on port 3000');
});