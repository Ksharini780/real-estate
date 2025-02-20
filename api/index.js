import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();

// Debugging: Check if MONGO URI is loaded correctly
console.log("MongoDB URI:", process.env.MONGO);

if (!process.env.MONGO) {
  console.error("❌ MONGO URI is missing. Please check your .env file.");
  process.exit(1); // Stop the server if no MongoDB URI is found
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Stop the server if MongoDB connection fails
  });

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve static files from React frontend (if applicable)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

// API Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Handle React frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!`);
});
