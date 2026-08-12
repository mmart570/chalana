const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST create invoice from a job
router.post('/', async (req, res) => {
  const { job_id } = req.body;
  try {
    // Calculate total from job_costs
    const costsResult = await pool.query(
      'SELECT COALESCE(SUM(amount), 0) AS total FROM job_costs WHERE job_id = $1',
      [job_id]
    );
    const total = costsResult.rows[0].total;

    // Create the invoice
    const result = await pool.query(
      'INSERT INTO invoices (job_id, total_amount) VALUES ($1, $2) RETURNING *',
      [job_id, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// GET invoice by job
router.get('/:jobId', async (req, res) => {
  const { jobId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM invoices WHERE job_id = $1',
      [jobId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch invoice' });
  }
});
// PATCH update payment status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { payment_status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE invoices SET payment_status = $1 WHERE id = $2 RETURNING *',
      [payment_status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update invoice' });
  }
});
module.exports = router;