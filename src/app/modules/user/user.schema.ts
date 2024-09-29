import { z } from 'zod';

const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string(), // Example: Minimum 6 characters
  name: z.string().min(1),
  bio: z.string().optional(),
  profilePicture: z.string().optional(),
  role: z.enum(['user', 'admin']),
  isVerified: z.boolean().default(false),
  isBlocked: z.boolean().default(false),
  socialLinks: z.record(z.string()).optional(),
  dateOfBirth: z.string().optional(),
  interests: z.array(z.string()).optional(),
  isDeleted: z.boolean().default(false),
});
const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userSchema = { registerUserSchema, loginUserSchema };
