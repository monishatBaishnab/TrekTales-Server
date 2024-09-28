import { z } from 'zod';

const createPostSchema = z.object({
  author: z.string().uuid(),
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

export const postSchemas = { createPostSchema };
