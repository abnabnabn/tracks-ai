import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import trackRoutes from './routes/trackRoutes';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app: Express = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' })); // Allow requests from client origin
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Music Tracker API Running');
});

app.use('/api/tracks', trackRoutes);

// Error Handler Middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));