/**
 * @copyright 2025 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    WHITELIST_ORIGINS: ['https://docs.blog-api.codewithsadee.com'],
    MONGO_URI: process.env.MONGO_URI,
    LOG_LEVEL: process.env.LOG_LEVEL
}

export default config;