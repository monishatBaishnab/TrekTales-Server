"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
const createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6), // Example: Minimum 6 characters
    name: zod_1.z.string().min(1),
    bio: zod_1.z.string().optional(),
    profilePicture: zod_1.z.string().optional(),
    role: zod_1.z.enum(['user', 'admin']),
    isVerified: zod_1.z.boolean().default(false),
    isBlocked: zod_1.z.boolean().default(false),
    socialLinks: zod_1.z.record(zod_1.z.string()).optional(),
    dateOfBirth: zod_1.z.date().optional(),
    interests: zod_1.z.array(zod_1.z.string()).optional(),
    isDeleted: zod_1.z.boolean().default(false),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.userSchema = { createUserSchema };
