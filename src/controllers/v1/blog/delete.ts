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
import User from '@/models/v1/user';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * @function deleteBlog
 * @description Controller for deleting a blog post.
 */
const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

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
        message: 'You do not have permission to delete this blog'
      });
      return;
    }

    await blog.deleteOne();

    res.status(204).send();

    logger.info('Blog deleted successfully', {
      blogId: id,
      userId: req.userId
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err
    });
    logger.error('Error during blog deletion', err);
  }
};

export default deleteBlog;
