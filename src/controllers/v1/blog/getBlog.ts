/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { isValidObjectId } from 'mongoose';

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
 * @function getBlog
 * @description Controller for fetching a single blog post by slug or ID.
 */
const getBlog = async (req: Request, res: Response): Promise<void> => {
  const { idOrSlug } = req.params;

  try {
    let query = {};
    if (isValidObjectId(idOrSlug)) {
      query = { _id: idOrSlug };
    } else {
      query = { slug: idOrSlug };
    }

    const blog = await Blog.findOne(query).populate('author', 'username firstName lastName email');

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found'
      });
      return;
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err
    });
    logger.error('Error while fetching blog', err);
  }
};

export default getBlog;
