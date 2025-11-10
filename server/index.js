// Simple Express server to fully simulate REST backend
// Provides CRUD for /api/users with in-memory storage and realistic delays/status codes

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Simulated latency
const API_DELAY = Number(process.env.API_DELAY || 500);
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// In-memory store
/** @type {Array<{id:string,name:string,email:string,role:string}>} */
let users = [];

// Helpers
const notFound = (res, entity = 'Resource') => res.status(404).json({ error: `${entity} not found` });
const badRequest = (res, message) => res.status(400).json({ error: message });

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/api/users', async (req, res) => {
  await delay(API_DELAY);
  res.setHeader('X-Powered-By', 'Express REST API');
  res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
  await delay(API_DELAY);
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return notFound(res, 'User');
  res.setHeader('X-Powered-By', 'Express REST API');
  res.json(user);
});

app.post('/api/users', async (req, res) => {
  await delay(API_DELAY);
  const { name, email, role } = req.body || {};
  if (!name || !email) return badRequest(res, 'Name and email are required');
  const newUser = { id: Date.now().toString(), name, email, role: role || 'User' };
  users.push(newUser);
  res.setHeader('Location', `/api/users/${newUser.id}`);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', async (req, res) => {
  await delay(API_DELAY);
  const { name, email, role } = req.body || {};
  const idx = users.findIndex((u) => u.id === req.params.id);
  if (idx === -1) return notFound(res, 'User');
  if (!name || !email) return badRequest(res, 'Name and email are required');
  const updated = { id: req.params.id, name, email, role: role || users[idx].role || 'User' };
  users[idx] = updated;
  res.json(updated);
});

app.delete('/api/users/:id', async (req, res) => {
  await delay(API_DELAY);
  const exists = users.some((u) => u.id === req.params.id);
  if (!exists) return notFound(res, 'User');
  users = users.filter((u) => u.id !== req.params.id);
  res.status(204).end();
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`REST API server listening on http://localhost:${PORT}`);
});
