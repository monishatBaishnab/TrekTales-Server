"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchemas = void 0;
const zod_1 = require("zod");
const createCommentSchema = zod_1.z.object({
    post: zod_1.z.string(),
    author: zod_1.z.string(),
    content: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
const updateCommentSchema = zod_1.z.object({
    post: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
exports.commentSchemas = {
    createCommentSchema,
    updateCommentSchema
};
