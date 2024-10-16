import { Types } from 'mongoose';
import { z } from 'zod';

const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string(), // Example: Minimum 6 characters
  name: z.string().min(1),
  bio: z.string().optional(),
  profilePicture: z.string().optional(),
  role: z.enum(['user']).optional(),
  isVerified: z.boolean().default(false).optional(),
  isBlocked: z.boolean().default(false).optional(),
  socialLinks: z.record(z.string()).optional(),
  dateOfBirth: z.string().optional(),
  followers: z.array(z.instanceof(Types.ObjectId)).optional(),
  isDeleted: z.boolean().default(false),
});


const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  bio: z.string().optional().optional(),
  role: z.enum(['user', 'admin']).optional(),
  isVerified: z.boolean().default(false).optional(),
  isBlocked: z.boolean().default(false).optional(),
  socialLinks: z.record(z.string()).optional(),
  dateOfBirth: z.string().optional(),
  followers: z.array(z.instanceof(Types.ObjectId)).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userSchema = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
};
