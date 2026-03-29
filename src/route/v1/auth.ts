/**
 * @copyright 2025 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controller
 */
import register  from '@/controllers/v1/auth/register';
/**
 * Middlewares
 */

/**
 * Models
 */

const router = Router();

router.post('/register',register);

export default router;