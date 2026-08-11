const express = require('express');
const jobsRouter = require('./routes/jobs');
const jobCostsRouter = require('./routes/jobCosts');
const toolsRouter = require('./routes/tools');
const invoicesRouter = require('./routes/invoices');
const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected at:', res.rows[0].now);
  }
});
const app = express();

app.use(express.json());
app.use('/jobs', jobsRouter);
app.use('/job-costs', jobCostsRouter);
app.use('/tools', toolsRouter);
app.use('/invoices', invoicesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'CHALANA API running' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});