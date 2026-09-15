// server.js
// File gốc để chạy server backend (Node.js + Express).

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares chung
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route test cho biết server sống hay chết
app.get('/', (req, res) => {
  res.json({ message: 'Quan Ly Phong Kham API is running...' });
});

// Gắn toàn bộ route API vào prefix /api
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server dang chay tai http://localhost:${PORT}`);
});
