import { z } from 'zod';

const createCommentSchema = z.object({
  post: z.string(), 
  author: z.string(), 
  content: z.string(),
  isDeleted: z.boolean().default(false).optional(),
});
const updateCommentSchema = z.object({
  post: z.string().optional(),
  author: z.string().optional(),
  content: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export const commentSchemas = {
  createCommentSchema,
  updateCommentSchema
};
