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
import User from '@/models/v1/user';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * @function updateBlog
 * @description Controller for updating an existing blog post.
 */
const updateBlog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content, banner, tags, isPublished, slug: customSlug } = req.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found'
      });
      return;
    }

    // Check permissions: Author or Admin
    const user = await User.findById(req.userId);
    const isAuthor = blog.author.toString() === req.userId?.toString();
    const isAdmin = user?.role === 'admin';

    if (!isAuthor && !isAdmin) {
      res.status(403).json({
        code: 'Forbidden',
        message: 'You do not have permission to update this blog'
      });
      return;
    }

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (banner) blog.banner = banner;
    if (tags) blog.tags = tags;
    if (typeof isPublished !== 'undefined') blog.isPublished = isPublished;
    if (customSlug) {
        blog.slug = customSlug;
    } else if (title) {
        blog.slug = slugify(title);
    }

    await blog.save();

    res.status(200).json(blog);

    logger.info('Blog updated successfully', {
      blogId: blog._id,
      userId: req.userId
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err
    });
    logger.error('Error during blog update', err);
  }
};

export default updateBlog;
