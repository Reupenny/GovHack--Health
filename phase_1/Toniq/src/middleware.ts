import type { MiddlewareHandler } from 'hono';
import type { ErrorResponse } from './types.js';

export const validateNHI: MiddlewareHandler = async (c, next) => {
  const nhi = c.req.param('nhi');
  const nhiPattern = /^[A-Z]{3}\d{4}$/;
  
  if (!nhi || !nhiPattern.test(nhi)) {
    const error: ErrorResponse = {
      error: 'INVALID_NHI',
      message: 'Invalid NHI format. Must be 3 letters followed by 4 digits (e.g., ABC1234).',
      timestamp: new Date().toISOString()
    };
    return c.json(error, 400);
  }
  
  await next();
};

export const errorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error('API Error:', error);
    const errorResponse: ErrorResponse = {
      error: 'INTERNAL_ERROR',
      message: 'An internal server error occurred',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
    return c.json(errorResponse, 500);
  }
};

export const corsMiddleware: MiddlewareHandler = async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (c.req.method === 'OPTIONS') {
    return new Response('', { status: 204 });
  }
  
  await next();
};

export const validateQueryParams = (c: any) => {
  const limit = c.req.query('limit');
  const from = c.req.query('from');
  const to = c.req.query('to');
  
  const parsedLimit = limit ? parseInt(limit) : 20;
  if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    const error: ErrorResponse = {
      error: 'INVALID_LIMIT',
      message: 'Limit must be a number between 1 and 100',
      timestamp: new Date().toISOString()
    };
    return { error, parsedLimit: null };
  }
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (from && !dateRegex.test(from)) {
    const error: ErrorResponse = {
      error: 'INVALID_FROM_DATE',
      message: 'From date must be in YYYY-MM-DD format',
      timestamp: new Date().toISOString()
    };
    return { error, parsedLimit: null };
  }
  
  if (to && !dateRegex.test(to)) {
    const error: ErrorResponse = {
      error: 'INVALID_TO_DATE',
      message: 'To date must be in YYYY-MM-DD format',
      timestamp: new Date().toISOString()
    };
    return { error, parsedLimit: null };
  }
  
  if (from && to && from > to) {
    const error: ErrorResponse = {
      error: 'INVALID_DATE_RANGE',
      message: 'From date must be before or equal to to date',
      timestamp: new Date().toISOString()
    };
    return { error, parsedLimit: null };
  }
  
  return { error: null, parsedLimit };
};