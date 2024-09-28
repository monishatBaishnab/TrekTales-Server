import { z } from 'zod';

const createCommentSchema = z.object({
  post: z.string().uuid(), // Ensure this is a valid ObjectId
  author: z.string().uuid(), // Ensure this is a valid ObjectId
  content: z.string().min(1),
  isDeleted: z.boolean().default(false),
});

export const commentSchemas = {
  createCommentSchema,
};
