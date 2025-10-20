require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const supabase = require('./config/supabase');
const app = express();

// Middleware
// CORS configuration
const corsOptions = {
  // Use comma-separated CORS_ORIGIN or reflect request origin if not provided
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});

app.use(express.json());
   
// ✅ Import student routes
const studentRoutes = require('./routes/studentRoutes');

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Gur Academy Admin API');
});
  
// ✅ Use student routes under /api/student
app.use('/api/student', studentRoutes);




// Export app for testing
module.exports = app;
