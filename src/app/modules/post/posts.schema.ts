import { z } from 'zod';

const createPostSchema = z.object({
  author: z.string(),
  title: z.string().min(1),
  images: z.array(z.string()),
  content: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  isPremium: z.boolean().default(false),
  upvotes: z.number().default(0),
  downvotes: z.number().default(0),
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
  upvotes: z.number().default(0).optional(),
  downvotes: z.number().default(0).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export const postSchemas = { createPostSchema, updatePostSchema };
