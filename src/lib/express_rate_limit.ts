/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */

import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 60000, // 1-minute time window for request limiting
    limit: 60, // Allow a maximum of 60 request per window per IP
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message:{
        error:
        'You have sent too many request in a given amount of time. Please try again later.'
    }
});
export default limiter;