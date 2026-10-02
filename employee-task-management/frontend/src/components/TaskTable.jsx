import { Edit3, Trash2 } from 'lucide-react';

const statuses = ['Pending', 'In Progress', 'Completed'];

export default function TaskTable({ tasks, onEdit, onDelete, onStatus }) {
  return <div className="table-wrap"><table><thead><tr><th>TASK</th><th>PRIORITY</th><th>STATUS</th><th>DUE DATE</th><th>ACTIONS</th></tr></thead><tbody>
    {tasks.length === 0 ? <tr><td colSpan="5"><div className="empty">No tasks found. Try changing your search/filter or create a new task.</div></td></tr> : tasks.map(task => <tr key={task._id}>
      <td><div className="task-title">{task.title}</div><div className="task-description">{task.description}</div></td>
      <td><span className={`badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span></td>
      <td><select className={`status-select status-${task.status.toLowerCase().replace(' ', '-')}`} value={task.status} onChange={e => onStatus(task._id, e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select></td>
      <td>{new Date(task.dueDate).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}</td>
      <td><div className="actions"><button className="table-btn" title="Edit" onClick={() => onEdit(task)}><Edit3 size={16}/></button><button className="table-btn danger" title="Delete" onClick={() => onDelete(task)}><Trash2 size={16}/></button></div></td>
    </tr>)}
  </tbody></table></div>;
}
