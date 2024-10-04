"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchemas = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const VoteSchema = zod_1.z.object({
    vote: zod_1.z.enum(['up', 'down']),
    user: zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
        message: 'Invalid user ID format',
    }),
});
const createPostSchema = zod_1.z.object({
    author: zod_1.z.string(),
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    isPremium: zod_1.z.boolean().default(false).optional(),
    votes: zod_1.z.array(VoteSchema).optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
const updatePostSchema = zod_1.z.object({
    author: zod_1.z.string().optional(),
    title: zod_1.z.string().min(1).optional(),
    content: zod_1.z.string().min(1).optional(),
    category: zod_1.z.string().min(1).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    isPremium: zod_1.z.boolean().default(false).optional(),
    votes: zod_1.z.array(VoteSchema).optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
exports.postSchemas = { createPostSchema, updatePostSchema };
