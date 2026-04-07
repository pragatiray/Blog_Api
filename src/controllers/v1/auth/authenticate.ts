/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */

import { JsonWebTokenError , TokenExpiredError } from "jsonwebtoken";

/**
 * Custom modules
 */

import { verifyAccessToken } from "@/lib/jwt";
import { logger } from '@/lib/winston';
/**
 * Types
 */
import type { Request, Response, NextFunction} from 'express';
import type { Types } from 'mongoose';

/**
 * @function authenticate
 * @description Middleware to verify the user's access token from the Authorization header.
 *              If the token is valid, the user's ID is attached to the request object.
 *              Otherwise, it returns an appropriate error response.
 * 
 * @param { Request} req - Express request object. Expects a Bearer token in the Authorization header.
 * @param { Response} res - Express response object used to send error response if authentication fails.
 * @param {NextFunction} next - Express next function to pass control to the next  middleware.
 * 
 * @returns {void}
 */

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ code: 'Authentication Error', message: 'No token provided' });
    return;
  }

  const [_, token] = authHeader.split(' ');

  try {
    const jwtPayload = verifyAccessToken(token) as { userId: Types.ObjectId };
    req.userId = jwtPayload.userId; 
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ code: 'Authentication error', message: 'Access token expired' });
    }
    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ code: 'Authentication error', message: 'Invalid access token' });
    }
    logger.error('Error during authentication', err);
    return res.status(500).json({ code: 'ServerError', message: 'Internal server error', error: err });
  }
};

export default authenticate;