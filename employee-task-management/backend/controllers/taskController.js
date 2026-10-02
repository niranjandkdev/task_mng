const Task = require('../models/Task');

const normalizeDate = (date) => {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? null : d;
};

exports.getTasks = async (req, res) => {
  try {
    const { search = '', status, priority } = req.query;
    const filter = {};
    if (search.trim()) filter.title = { $regex: search.trim(), $options: 'i' };
    if (status && status !== 'All') filter.status = status;
    if (priority && priority !== 'All') filter.priority = priority;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

exports.getTaskStats = async (req, res) => {
  try {
    const [total, pending, inProgress, completed] = await Promise.all([
      Task.countDocuments(),
      Task.countDocuments({ status: 'Pending' }),
      Task.countDocuments({ status: 'In Progress' }),
      Task.countDocuments({ status: 'Completed' })
    ]);
    res.json({ total, pending, inProgress, completed });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    const parsedDate = normalizeDate(dueDate);
    if (!title?.trim() || !description?.trim() || !priority || !status || !dueDate) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (!parsedDate) return res.status(400).json({ message: 'Please provide a valid due date.' });
    const task = await Task.create({ title, description, priority, status, dueDate: parsedDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    if (!title?.trim() || !description?.trim() || !priority || !status || !dueDate) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const parsedDate = normalizeDate(dueDate);
    if (!parsedDate) return res.status(400).json({ message: 'Please provide a valid due date.' });
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, status, dueDate: parsedDate },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update task' });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update status' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};
