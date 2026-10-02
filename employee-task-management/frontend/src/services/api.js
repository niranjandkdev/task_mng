const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

export const getTasks = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => { if (value && value !== 'All') query.set(key, value); });
  return request(`/tasks${query.toString() ? `?${query}` : ''}`);
};
export const getStats = () => request('/tasks/stats');
export const createTask = (task) => request('/tasks', { method: 'POST', body: JSON.stringify(task) });
export const updateTask = (id, task) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(task) });
export const updateTaskStatus = (id, status) => request(`/tasks/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });
