/**
 * @copyright 2025 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Router } from 'express';
import { body,cookie } from  'express-validator';
/**
 * Controller
 */
import register  from '@/controllers/v1/auth/register';
import login from '@/controllers/v1/auth/login';
import refreshToken from '@/controllers/v1/auth/refreshToken';
import logout from '@/controllers/v1/auth/logout';
/**
 * Middlewares
 */
import validationError from '@/middlewares/validationError';

/**
 * Models
 */
import User from '@/models/v1/user'; 
import authenticate from '@/controllers/v1/auth/authenticate';

const router = Router();

router.post(
  '/register',
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 characters')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });
      if (userExists) {
        throw new Error('User email or password is invalid');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .optional()
    .isString()
    .withMessage('Role must be string')
    .isIn(['admin', 'user'])
    .withMessage('Role must be either admin or user'),
  validationError,
  register
);
router.post('/login',login);

router.post('/refresh-token',
    cookie('refreshToken')
    .notEmpty()
    .withMessage('Refresh token required')
    .isJWT()
    .withMessage('Invalid refresh token'),
    validationError,  
    refreshToken);
router.post('/logout',
    authenticate,
    logout);
export default router;