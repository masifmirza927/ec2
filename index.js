// index.js
const express = require('express');
const app = express();
const port = 3030;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' },
  { id: 3, name: 'Item Three' }
];

// GET route to fetch all items
app.get('/', (req, res) => {
  res.send('<h1>Hello from ec2</h1>')
});

// GET route to fetch all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET route to fetch a single item by ID
app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(i => i.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// POST route to create a new item
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT route to update an existing item
app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(i => i.id === itemId);
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// DELETE route to delete an item by ID
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(i => i.id !== itemId);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});