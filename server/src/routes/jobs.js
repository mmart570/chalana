const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// POST create a job
router.post('/', async (req, res) => {
  const { client_name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO jobs (client_name, description) VALUES ($1, $2) RETURNING *',
      [client_name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

module.exports = router;