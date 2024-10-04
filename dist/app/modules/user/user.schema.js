"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
const registerUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(), // Example: Minimum 6 characters
    name: zod_1.z.string().min(1),
    bio: zod_1.z.string().optional(),
    profilePicture: zod_1.z.string().optional(),
    role: zod_1.z.enum(['user', 'admin']),
    isVerified: zod_1.z.boolean().default(false),
    isBlocked: zod_1.z.boolean().default(false),
    socialLinks: zod_1.z.record(zod_1.z.string()).optional(),
    dateOfBirth: zod_1.z.string().optional(),
    interests: zod_1.z.array(zod_1.z.string()).optional(),
    isDeleted: zod_1.z.boolean().default(false),
});
const fileSchema = zod_1.z.object({
    fieldname: zod_1.z.string(), // The name of the form field
    originalname: zod_1.z.string(), // The original name of the file
    encoding: zod_1.z.string(), // The encoding type of the file
    mimetype: zod_1.z.enum(['image/jpeg', 'image/png']), // Ensure the file is an image (JPG or PNG)
    size: zod_1.z.number().max(5 * 1024 * 1024), // Max size of 5MB
    buffer: zod_1.z.instanceof(Buffer), // The file content
});
const updateUserSchema = zod_1.z.object({
    data: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        bio: zod_1.z.string().optional().optional(),
        profilePicture: zod_1.z.string().optional(),
        role: zod_1.z.enum(['user', 'admin']).optional(),
        isVerified: zod_1.z.boolean().default(false).optional(),
        isBlocked: zod_1.z.boolean().default(false).optional(),
        socialLinks: zod_1.z.record(zod_1.z.string()).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        interests: zod_1.z.array(zod_1.z.string()).optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
    image: fileSchema,
});
const loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.userSchema = { registerUserSchema, loginUserSchema, updateUserSchema };
