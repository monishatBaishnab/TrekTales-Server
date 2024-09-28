import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), // Example: Minimum 6 characters
  name: z.string().min(1),
  bio: z.string().optional(),
  profilePicture: z.string().optional(),
  role: z.enum(['user', 'admin']),
  isVerified: z.boolean().default(false),
  isBlocked: z.boolean().default(false),
  socialLinks: z.record(z.string()).optional(),
  dateOfBirth: z.date().optional(),
  interests: z.array(z.string()).optional(),
  isDeleted: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userSchema = { createUserSchema };
