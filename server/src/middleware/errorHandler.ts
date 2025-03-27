import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction // Must include next for Express error handling signature
) => {
  // Determine status code: use error's status code or default to 500
  // If res.statusCode was set before error (e.g. 404), use that, otherwise use err or 500.
  const statusCode = res.statusCode && res.statusCode >= 400
    ? res.statusCode
    : err.statusCode || 500;

  console.error(`Error: ${err.message} \nStack: ${process.env.NODE_ENV === 'production' ? '🥞' : err.stack}`);

  res.status(statusCode).json({
    status: 'error',
    message: err.message,
    // Optionally include stack trace in development mode
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};