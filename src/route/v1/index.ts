/**
 * @copyright 2025 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */

import { Router } from 'express';
import { timeStamp } from 'node:console';
const router = Router();

/**
 * Routes
 */
import authRoutes from '@/route/v1/auth';

/**
 * Root route
 */
router.get('/',(req,res)=>{
    res.status(200).json({
        messsage: 'API is live',
        status: 'ok',
        version: '1.0.0',
        docs: "https://docs.blog-api.codewithsadee.com",
        timeStamp: new Date().toISOString()
    })
});

router.use('/auth', authRoutes);

export default router;