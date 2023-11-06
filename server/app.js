const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MONGODB_URI = 'mongodb://127.0.0.1:27017/wovnn';
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const userRoutes = require('./routes/user');
app.use('/frames', express.static(path.join(__dirname, '/data/frames')));

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Routes
app.use(userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch((err) => {
    console.log(err);
  });
