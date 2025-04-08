const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all todos (with pagination)
router.get('/', todoController.getTodos);

// Get a single todo by id
router.get('/:id', todoController.getTodoById);

// Create a new todo
router.post('/', todoController.createTodo);

// Update a todo
router.put('/:id', todoController.updateTodo);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;