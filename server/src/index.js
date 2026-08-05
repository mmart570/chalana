const express = require('express');
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

app.get('/', (req, res) => {
  res.json({ message: 'CHALANA API running' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});