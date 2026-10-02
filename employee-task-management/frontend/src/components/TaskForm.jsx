import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const emptyTask = { title: '', description: '', priority: 'Medium', status: 'Pending', dueDate: '' };

export default function TaskForm({ editingTask, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyTask);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(editingTask ? { ...editingTask, dueDate: editingTask.dueDate?.slice(0, 10) || '' } : emptyTask);
    setError('');
  }, [editingTask]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.dueDate) return setError('Please fill in all mandatory fields.');
    const selected = new Date(`${form.dueDate}T23:59:59`);
    if (Number.isNaN(selected.getTime())) return setError('Please enter a valid due date.');
    setError('');
    await onSubmit(form);
  };

  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="modal" onMouseDown={e => e.stopPropagation()}>
      <div className="modal-header"><div><p className="eyebrow">TASK MANAGEMENT</p><h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2></div><button className="icon-btn" onClick={onClose}><X size={20}/></button></div>
      {error && <div className="error-box">{error}</div>}
      <form onSubmit={submit}>
        <label>Task Title *<input name="title" value={form.title} onChange={change} placeholder="e.g. Prepare monthly report" maxLength="120" /></label>
        <label>Description *<textarea name="description" value={form.description} onChange={change} placeholder="Describe the task..." rows="4" maxLength="1000" /></label>
        <div className="form-grid">
          <label>Priority *<select name="priority" value={form.priority} onChange={change}><option>Low</option><option>Medium</option><option>High</option></select></label>
          <label>Status *<select name="status" value={form.status} onChange={change}><option>Pending</option><option>In Progress</option><option>Completed</option></select></label>
        </div>
        <label>Due Date *<input type="date" name="dueDate" value={form.dueDate} onChange={change} /></label>
        <div className="modal-actions"><button type="button" className="btn secondary" onClick={onClose}>Cancel</button><button className="btn primary">{editingTask ? 'Save Changes' : 'Create Task'}</button></div>
      </form>
    </div>
  </div>;
}
