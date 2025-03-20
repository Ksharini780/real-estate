import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

// ✅ Load environment variables correctly
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory path for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Ensure dotenv is loaded properly
dotenv.config({ path: path.resolve(__dirname, '.env') });

// ✅ Check if MONGO URI is loading
if (!process.env.MONGO) {
  console.error("❌ MONGO URI is missing. Check your .env file.");
  process.exit(1);
}

console.log("✅ MongoDB URI Loaded:", process.env.MONGO);

const app = express();

// ✅ Connect to MongoDB with proper error handling
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Stop the server if MongoDB connection fails
  });

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Serve static files from React frontend (if applicable)
app.use(express.static(path.join(__dirname, '../client/dist')));

// ✅ API Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// ✅ Handle React frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, statusCode, message });
});

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!`);
});

//MONGO=mongodb+srv://ksharini780:svh%401212@mern-estate.6yhy4.mongodb.net/mern-estate?retryWrites=true&w=majority&appName=mern-estate
//JWT_SECRET='po0i2394jfe9fick2e'