const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../middleware/connectDB');

//Import all Routes
const healthCheckRoute = require("./Routes/healthCheckRoute");

dotenv.config();
const app = express();

// Allow all HTTP methods from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}));

// Middleware
app.use(express.json());

// define all Routes here
app.get('/', healthCheckRoute);
app.use('/health', healthCheckRoute);


const PORT = process.env.PORT || 3001
// MongoDB Connection
connectDB();

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
