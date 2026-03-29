/**
 * @copyright 2025 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Schema, model } from "mongoose";
import { timeStamp } from "node:console";

export interface IUser{
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    firstName ?: string;
    lastName ?: string;
    socialLinks?: {
        website?: string;
        facebook?: string;
        instagram?: string;
        linkedin?: string
        x?: string;
        youtube?: string;
    }
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
      website: {
        type: String,
        maxLength: [100, 'Website url must be below 100 characters']
      },
      facebook: {
        type: String,
        maxLength: [100, 'Facebook profile url must be below 100 characters']
      },
      instagram: {
        type: String,
        maxLength: [100, 'Instagram profile url must be below 100 characters']
      },
      linkedin: {
        type: String,
        maxLength: [100, 'LinkedIn profile url must be below 100 characters']
      },
      x: {
        type: String,
        maxLength: [100, 'X profile url must be below 100 characters']
      },
      youtube: {
        type: String,
        maxLength: [100, 'Youtube channel url must be below 100 characters']
      }
    }
  },
  {
    timestamps: true
  }
);


export default model <IUser>('User', userSchema);