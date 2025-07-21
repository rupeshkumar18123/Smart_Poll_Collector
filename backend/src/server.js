
const express = require('express');
const cors = require('cors');
const pollRoutes = require('./routes/pollRoutes');
const voteRoutes = require('./routes/voteRoutes');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/polls', pollRoutes);
app.use('/api/polls', voteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});