const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Task title is required'], trim: true, maxlength: 120 },
    description: { type: String, required: [true, 'Description is required'], trim: true, maxlength: 1000 },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending', required: true },
    dueDate: { type: Date, required: [true, 'Due date is required'] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
