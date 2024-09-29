"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchemas = void 0;
const zod_1 = require("zod");
const createPostSchema = zod_1.z.object({
    author: zod_1.z.string(),
    title: zod_1.z.string().min(1),
    images: zod_1.z.array(zod_1.z.string()),
    content: zod_1.z.string().min(1),
    category: zod_1.z.string().min(1),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    isPremium: zod_1.z.boolean().default(false),
    upvotes: zod_1.z.number().default(0),
    downvotes: zod_1.z.number().default(0),
    isDeleted: zod_1.z.boolean().default(false),
});
const updatePostSchema = zod_1.z.object({
    author: zod_1.z.string().optional(),
    title: zod_1.z.string().min(1).optional(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    content: zod_1.z.string().min(1).optional(),
    category: zod_1.z.string().min(1).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    isPremium: zod_1.z.boolean().default(false).optional(),
    upvotes: zod_1.z.number().default(0).optional(),
    downvotes: zod_1.z.number().default(0).optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
exports.postSchemas = { createPostSchema, updatePostSchema };
