const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all costs for a job
router.get('/:jobId', async (req, res) => {
  const { jobId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM job_costs WHERE job_id = $1 ORDER BY created_at DESC',
      [jobId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch costs' });
  }
});

// POST add a cost to a job
router.post('/', async (req, res) => {
  const { job_id, type, description, amount } = req.body;
  if (!job_id || !amount || parseFloat(amount) <= 0) {
    return res.status(400).json({ error: 'job_id and a valid amount are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO job_costs (job_id, type, description, amount) VALUES ($1, $2, $3, $4) RETURNING *',
      [job_id, type, description, amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add cost' });
  }
});

module.exports = router;