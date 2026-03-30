/**
 * @copyright 2025 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Schema, model, Model } from "mongoose";
/**
 * Custom modules
 */
import bcrypt from "bcrypt";

/**
 * User interface
 */
export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
  };
}

/**
 * User schema
 */
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      maxLength: [20, 'Username must be less than 20 characters'],
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      maxLength: [50, 'Email must be less than 50 characters'],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },

    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not supported'
      },
      default: 'user'
    },

    firstName: {
      type: String,
      maxLength: [20, 'First name must be less than 20 characters'],
      trim: true
    },

    lastName: {
      type: String,
      maxLength: [20, 'Last name must be less than 20 characters'],
      trim: true
    },

    socialLinks: {
      type: {
        website: { type: String, maxLength: [100, 'Website URL must be below 100 characters'] },
        facebook: { type: String, maxLength: [100, 'Facebook URL must be below 100 characters'] },
        instagram: { type: String, maxLength: [100, 'Instagram URL must be below 100 characters'] },
        linkedin: { type: String, maxLength: [100, 'LinkedIn URL must be below 100 characters'] },
        x: { type: String, maxLength: [100, 'X URL must be below 100 characters'] },
        youtube: { type: String, maxLength: [100, 'YouTube URL must be below 100 characters'] },
      },
      default: {}
    }
  },
  {
    timestamps: true
  }
);

/**
 * Pre-save hook: hash password before saving
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Mongoose model
 */
const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;