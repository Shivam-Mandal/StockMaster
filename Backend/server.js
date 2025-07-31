// server.js or index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import healthCheckRoute from './src/routes/healthCheckRoute.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Define all routes here
app.get('/', healthCheckRoute);
app.use('/health', healthCheckRoute);
app.use('/api/auth', authRoutes);

// Port
const PORT = process.env.PORT || 3001;

// MongoDB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
