const express = require('express');
const router = express.Router();
const {
  getTasks, getTaskStats, createTask, updateTask, updateTaskStatus, deleteTask
} = require('../controllers/taskController');

router.get('/stats', getTaskStats);
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/status', updateTaskStatus);
router.delete('/:id', deleteTask);

module.exports = router;
