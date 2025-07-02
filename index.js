require('dotenv').config();
const express = require('express');
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');
const userModel = require('./models/user');
const todoModel = require('./models/todo');

const app = express();
const port = process.env.PORT || 3000;

async function initializeDatabase() {
  try {
    await userModel.createTable();
    await todoModel.createTable();
    console.log('Database tables checked/created successfully.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1); // Exit if DB initialization fails
  }
}

app.use(express.json());

app.use('/auth', authRoutes);
// app.use('/todos', authMiddleware, todoRoutes);

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`To-do list API listening at http://localhost:${port}`);
  });
});