/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston'
/**
 * Models
 */
import Token from '@/models/v1/token';
/**
 * Types
 */
import type { Request, Response } from 'express';

const logout = async ( req:Request, res:Response): Promise<void> => {
    try{
        res.status(204).json({
            message: 'sucess'
        })
    } catch(err){
        res.status(500).json({
            code: ' ServerError',
            message: 'Internal server error',
            error: err
        })
    }
}
export default logout;