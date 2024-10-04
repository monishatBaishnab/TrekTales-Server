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

const fileSchema = z.object({
  fieldname: z.string(), // The name of the form field
  originalname: z.string(), // The original name of the file
  encoding: z.string(), // The encoding type of the file
  mimetype: z.enum(['image/jpeg', 'image/png']), // Ensure the file is an image (JPG or PNG)
  size: z.number().max(5 * 1024 * 1024), // Max size of 5MB
  buffer: z.instanceof(Buffer), // The file content
});

const updateUserSchema = z.object({
  data: z.object({
    name: z.string().min(1).optional(),
    bio: z.string().optional().optional(),
    profilePicture: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
    isVerified: z.boolean().default(false).optional(),
    isBlocked: z.boolean().default(false).optional(),
    socialLinks: z.record(z.string()).optional(),
    dateOfBirth: z.string().optional(),
    interests: z.array(z.string()).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
  image: fileSchema,
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userSchema = { registerUserSchema, loginUserSchema, updateUserSchema };
