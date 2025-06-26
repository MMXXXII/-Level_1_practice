// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware для JSON
app.use(express.json());

// Роутинг
app.get('/static', (req, res) => {
  res.json({ header: 'Hello', body: 'Octagon NodeJS Test' });
});

app.get('/dynamic', (req, res) => {
  const { a, b, c } = req.query;

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const numC = parseFloat(c);

  if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
    return res.status(400).json({ header: 'Error', message: 'Invalid numbers' });
  }

  const result = (numA * numB * numC) / 3;
  res.json({ header: 'Calculated', body: result.toString() });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ header: 'Error', message: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
