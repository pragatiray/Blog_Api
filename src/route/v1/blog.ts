/**
 * @copyright 2025 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Router } from 'express';
import { body } from 'express-validator';

/**
 * Controllers
 */
import createBlog from '@/controllers/v1/blog/create';
import getBlogs from '@/controllers/v1/blog/getBlogs';
import getBlog from '@/controllers/v1/blog/getBlog';
import updateBlog from '@/controllers/v1/blog/update';
import deleteBlog from '@/controllers/v1/blog/delete';

/**
 * Middlewares
 */
import authenticate from '@/controllers/v1/auth/authenticate';
import validationError from '@/middlewares/validationError';

const router = Router();

/**
 * Public routes
 */
router.get('/', getBlogs);
router.get('/:idOrSlug', getBlog);

/**
 * Protected routes
 */
router.post(
  '/',
  authenticate,
  [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title too long'),
    body('content').notEmpty().withMessage('Content is required'),
    body('banner.url').notEmpty().withMessage('Banner image URL is required'),
    validationError
  ],
  createBlog
);

router.patch(
  '/:id',
  authenticate,
  [
    body('title').optional().trim().isLength({ max: 100 }).withMessage('Title too long'),
    validationError
  ],
  updateBlog
);

router.delete('/:id', authenticate, deleteBlog);

export default router;
