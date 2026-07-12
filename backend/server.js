import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { rateLimit } from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

// Database & Middleware Imports
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

// Route Imports
import authRoutes from './routes/authroutes.js';
import leadRoutes from './routes/leadRoutes.js';

// Load environment variables as early as possible
dotenv.config();

/**
 * Validates that all required environment variables are present before starting up.
 * Logs which ones are missing and exits with process.exit(1) to avoid silent failures.
 */
const checkRequiredEnvVars = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];
  const missing = required.filter((env) => !process.env[env]);
  if (missing.length > 0) {
    console.error(`[FATAL ERROR] Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
};

// Validate variables instantly
checkRequiredEnvVars();

// Initialize the Express app
const app = express();

// 1. HTTP Header Security Protection
app.use(helmet());

// 2. MongoDB injection protection (sanitizes req.body, req.query, and req.params)
// Workaround for express-mongo-sanitize compatibility with Express 5 where req.query is a read-only getter
app.use((req, res, next) => {
  if (req.query) {
    Object.defineProperty(req, 'query', {
      value: { ...req.query },
      writable: true,
      configurable: true,
      enumerable: true
    });
  }
  next();
});
app.use(mongoSanitize());

// 3. HTTP Request Logging (Combined format in production, concise/colorized dev format otherwise)
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// 4. Rate Limiting Configurations
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // 100 requests max per IP per window
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  },
  skip: (req) => req.method === 'OPTIONS',
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // Stricter 10 requests max per IP per window
  message: {
    success: false,
    message: 'Too many auth attempts.'
  },
  skip: (req) => req.method === 'OPTIONS',
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiters to respective sub-routes
app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);

// 5. Dynamic Whitelist CORS Configuration for Production & Development
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://startup-crm-lite-theta.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile clients, Postman, curl, or server-to-server requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 6. Parse JSON and URL-encoded bodies with payload limits for security
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 7. Health Check Endpoint
/**
 * Health Check Endpoint
 * Used to verify the status of the server and connectivity.
 * @name health
 * @path {GET} /api/health
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date()
  });
});

// 8. Register Router Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// 9. Global Centralized Error Handling Middleware (must be registered last)
app.use(errorHandler);

// Port and Mode Setup
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Initializes database connection and starts listening on the configured port.
 */
const startServer = async () => {
  try {
    // Establish MongoDB Atlas connection
    await connectDB();

    // Start Express listener
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Commences a graceful shutdown process by closing connection pools cleanly.
 *
 * @param {string} signal - System process signal name.
 */
const handleGracefulShutdown = async (signal) => {
  console.log(`\n[${signal}] received. Commencing graceful shutdown...`);
  try {
    if (mongoose.connection && mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed successfully.');
    }
    console.log('Server shutting down gracefully.');
    process.exit(0);
  } catch (error) {
    console.error(`Error during graceful shutdown: ${error.message}`);
    process.exit(1);
  }
};

// Bind system finality hooks to trigger cleanup routines
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

startServer();
