import { useCallback, useEffect, useState } from 'react';
import { ClipboardList, Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import { createTask, deleteTask, getStats, getTasks, updateTask, updateTaskStatus } from './services/api';
import './styles.css';

const initialStats = { total: 0, pending: 0, inProgress: 0, completed: 0 };

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try { setLoading(true); setError(''); const [taskData, statData] = await Promise.all([getTasks({ search, status, priority }), getStats()]); setTasks(taskData); setStats(statData); }
    catch (e) { setError(e.message); } finally { setLoading(false); }
  }, [search, status, priority]);

  useEffect(() => { const timer = setTimeout(load, 250); return () => clearTimeout(timer); }, [load]);

  const saveTask = async (data) => { try { if (editingTask) await updateTask(editingTask._id, data); else await createTask(data); setShowForm(false); setEditingTask(null); await load(); } catch (e) { setError(e.message); } };
  const removeTask = async (task) => { if (!window.confirm(`Delete "${task.title}"? This action cannot be undone.`)) return; try { await deleteTask(task._id); await load(); } catch (e) { setError(e.message); } };
  const changeStatus = async (id, nextStatus) => { try { await updateTaskStatus(id, nextStatus); await load(); } catch (e) { setError(e.message); } };
  const clearFilters = () => { setSearch(''); setStatus('All'); setPriority('All'); };

  return <div className="app-shell">
    <header className="topbar"><div className="brand"><div className="brand-mark"><ClipboardList size={22}/></div><div><h1>TaskFlow</h1><span>Employee Task Management</span></div></div><button className="btn primary" onClick={() => { setEditingTask(null); setShowForm(true); }}><Plus size={18}/> Add Task</button></header>
    <main className="container">
      <div className="page-heading"><div><p className="eyebrow">WORKSPACE</p><h2>Task Dashboard</h2><p>Manage employee work, priorities, deadlines, and progress.</p></div></div>
      <Dashboard stats={stats}/>
      {error && <div className="error-box page-error">{error}<button onClick={() => setError('')}><X size={15}/></button></div>}
      <section className="task-section">
        <div className="section-heading"><div><h3>All Tasks</h3><span>{tasks.length} task{tasks.length !== 1 ? 's' : ''} matching current view</span></div></div>
        <div className="filters"><div className="search"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by task title..." /></div><div className="filter-control"><SlidersHorizontal size={16}/><select value={status} onChange={e => setStatus(e.target.value)}><option>All</option><option>Pending</option><option>In Progress</option><option>Completed</option></select></div><div className="filter-control"><select value={priority} onChange={e => setPriority(e.target.value)}><option>All</option><option>Low</option><option>Medium</option><option>High</option></select></div><button className="clear-btn" onClick={clearFilters}>Clear</button></div>
        {loading ? <div className="loading">Loading tasks...</div> : <TaskTable tasks={tasks} onEdit={task => { setEditingTask(task); setShowForm(true); }} onDelete={removeTask} onStatus={changeStatus}/>} 
      </section>
    </main>
    <footer>TaskFlow • MERN Stack Employee Task Management System</footer>
    {showForm && <TaskForm editingTask={editingTask} onClose={() => { setShowForm(false); setEditingTask(null); }} onSubmit={saveTask}/>} 
  </div>;
}
