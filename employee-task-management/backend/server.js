require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Employee Task Management API is running' }));
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
