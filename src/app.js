const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const directsRoutes = require('./routes/directsRoutes');
const verifyIdToken = require('./middlewares/verifyToken');

// Middleware
app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
  };

app.use(cors(corsOptions));

// Routes
app.use('/api/employees', verifyIdToken, employeeRoutes);
app.use('/api/directs', verifyIdToken, directsRoutes);

module.exports = app;
