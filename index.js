const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

app.get('/getAllItems', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Items');
    res.json(rows);
  } catch (err) {
    res.status(500).json(null);
  }
});

app.post('/addItem', async (req, res) => {
  const { name, desc } = req.query;
  if (!name || !desc) return res.json(null);
  try {
    const [result] = await db.query('INSERT INTO Items (name, `desc`) VALUES (?, ?)', [name, desc]);
    const [item] = await db.query('SELECT * FROM Items WHERE id = ?', [result.insertId]);
    res.json(item[0] || {});
  } catch {
    res.json(null);
  }
});

app.post('/deleteItem', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.json(null);
  try {
    const [item] = await db.query('SELECT * FROM Items WHERE id = ?', [id]);
    if (item.length === 0) return res.json({});
    await db.query('DELETE FROM Items WHERE id = ?', [id]);
    res.json(item[0]);
  } catch {
    res.json(null);
  }
});

app.post('/updateItem', async (req, res) => {
  const { id, name, desc } = req.query;
  if (!id || !name || !desc) return res.json(null);
  try {
    const [item] = await db.query('SELECT * FROM Items WHERE id = ?', [id]);
    if (item.length === 0) return res.json({});
    await db.query('UPDATE Items SET name = ?, `desc` = ? WHERE id = ?', [name, desc, id]);
    const [updated] = await db.query('SELECT * FROM Items WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch {
    res.json(null);
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
