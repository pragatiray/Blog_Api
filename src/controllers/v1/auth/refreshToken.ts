/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

/**
 * Custom modules
 */
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from "@/lib/jwt";
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Token from '@/models/v1/token'

/**
 * Types
 */
import type { Request, Response } from 'express';
import { Types } from 'mongoose';

const refreshToken = async (req: Request, res: Response) => {
    const refreshTokenValue = req.cookies.refreshToken as string;

    try {
        if (!refreshTokenValue) {
            return res.status(401).json({
                code: 'AuthenticationError',
                message: 'Refresh token missing'
            });
        }

        const tokenExists = await Token.exists({ token: refreshTokenValue });

        if (!tokenExists) {
            return res.status(401).json({
                code: 'AuthenticationError',
                message: 'Invalid refresh token'
            });
        }

        const jwtPayload = verifyRefreshToken(refreshTokenValue) as { userId: Types.ObjectId };
        const accessToken = generateAccessToken(jwtPayload.userId);

        return res.status(200).json({ accessToken });

    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res.status(401).json({
                code: 'AuthenticationError',
                message: 'Refresh token expired, please login again'
            });
        } 
        else if (err instanceof JsonWebTokenError) {
            return res.status(401).json({
                code: 'AuthenticationError',
                message: 'Invalid refresh token'
            });
        }

        return res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
            error: err
        });
    }
};

export default refreshToken;