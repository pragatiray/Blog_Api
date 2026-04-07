/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Blog from '@/models/v1/blog';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * @function getBlogs
 * @description Controller for fetching a list of published blogs.
 */
const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const blogs = await Blog.find({ isPublished: true })
      .populate('author', 'username firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalBlogs = await Blog.countDocuments({ isPublished: true });

    res.status(200).json({
      blogs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBlogs / Number(limit)),
      totalBlogs
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err
    });
    logger.error('Error while fetching blogs', err);
  }
};

export default getBlogs;
