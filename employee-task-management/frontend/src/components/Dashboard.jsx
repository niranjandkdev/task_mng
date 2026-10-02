import { CheckCircle2, CircleDashed, Clock3, ListTodo } from 'lucide-react';

export default function Dashboard({ stats }) {
  const cards = [
    ['Total Tasks', stats.total, ListTodo, 'total'],
    ['Pending', stats.pending, CircleDashed, 'pending'],
    ['In Progress', stats.inProgress, Clock3, 'progress'],
    ['Completed', stats.completed, CheckCircle2, 'completed']
  ];
  return <section className="dashboard">{cards.map(([label, value, Icon, type]) => <div className={`stat-card ${type}`} key={label}><div className="stat-icon"><Icon size={21}/></div><div><span>{label}</span><strong>{value}</strong></div></div>)}</section>;
}
