/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import { slugify } from '@/utils/index';

/**
 * Models
 */
import Blog from '@/models/v1/blog';

/**
 * Types
 */
import type { Request, Response } from 'express';
import type { IBlog } from '@/models/v1/blog';

/**
 * @function createBlog
 * @description Controller for creating a new blog post.
 */
const createBlog = async (req: Request, res: Response): Promise<void> => {
  const { title, content, banner, tags, isPublished, slug: customSlug } = req.body;

  try {
    const slug = customSlug || slugify(title);

    // Check if slug already exists
    const slugExists = await Blog.exists({ slug });
    if (slugExists) {
      res.status(400).json({
        code: 'ValidationError',
        message: 'Blog with this title or slug already exists'
      });
      return;
    }

    const newBlog = await Blog.create({
      title,
      content,
      banner,
      tags,
      isPublished,
      slug,
      author: req.userId
    });

    res.status(201).json(newBlog);

    logger.info('Blog created successfully', {
      blogId: newBlog._id,
      authorId: req.userId
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err
    });
    logger.error('Error during blog creation', err);
  }
};

export default createBlog;
