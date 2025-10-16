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
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
   
// ✅ Import student routes
const studentRoutes = require('./Routes/studentRoutes');

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Gur Academy Admin API');
});
  
// ✅ Use student routes under /api/student
app.use('/api/student', studentRoutes);




// Export app for testing
module.exports = app;
