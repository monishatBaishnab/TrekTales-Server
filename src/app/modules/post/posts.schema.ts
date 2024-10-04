import { Types } from 'mongoose';
import { z } from 'zod';

const VoteSchema = z.object({
  vote: z.enum(['up', 'down']),
  user: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID format',
  }),
});

const createPostSchema = z.object({
  author: z.string(),
  title: z.string().min(1),
  images: z.array(z.string()),
  content: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  isPremium: z.boolean().default(false),
  votes: z.array(VoteSchema).optional(),
  isDeleted: z.boolean().default(false),
});

const updatePostSchema = z.object({
  author: z.string().optional(),
  title: z.string().min(1).optional(),
  images: z.array(z.string()).optional(),
  content: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  isPremium: z.boolean().default(false).optional(),
  votes: z.array(VoteSchema).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export const postSchemas = { createPostSchema, updatePostSchema };
