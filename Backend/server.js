// server.js or index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import healthCheckRoute from './src/routes/healthCheckRoute.js';
import authRoute from './src/routes/authRoute.js';
import adminRoute from './src/routes/adminRoute.js'
import cookieParser from 'cookie-parser';



dotenv.config();

const app = express();
app.use(cookieParser())
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
app.use('/api/auth', authRoute);
app.use('/api/admin',adminRoute)

// Port
const PORT = process.env.PORT || 3001;

// MongoDB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
