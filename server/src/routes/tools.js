const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all tools
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tools ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

// GET single tool
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tools WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tool' });
  }
});

// POST create a tool
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tools (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create tool' });
  }
});

// DELETE tool
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tools WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    res.json({ message: 'Tool deleted', tool: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tool' });
  }
});
// PATCH assign tool to a job
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { job_id } = req.body;
  try {
    const status = job_id ? 'in_use' : 'available';
    const result = await pool.query(
      'UPDATE tools SET job_id = $1, status = $2 WHERE id = $3 RETURNING *',
      [job_id, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tool' });
  }
});
module.exports = router;