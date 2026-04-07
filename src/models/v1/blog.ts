/**
 * @copyright 2025 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Schema, model, Model, Types } from "mongoose";

/**
 * Blog interface
 */
export interface IBlog {
  title: string;
  slug: string;
  content: string;
  banner: {
    url: string;
    public_id?: string;
  };
  author: Types.ObjectId;
  tags: string[];
  isPublished: boolean;
}

/**
 * Blog schema
 */
const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },

    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },

    content: {
      type: String,
      required: [true, 'Content is required']
    },

    banner: {
      url: {
        type: String,
        required: [true, 'Banner image URL is required']
      },
      public_id: {
        type: String
      }
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required']
    },

    tags: {
      type: [String],
      default: []
    },

    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

/**
 * Mongoose model
 */
const Blog: Model<IBlog> = model<IBlog>('Blog', blogSchema);

export default Blog;
