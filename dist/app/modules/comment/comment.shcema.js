"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchemas = void 0;
const zod_1 = require("zod");
const createCommentSchema = zod_1.z.object({
    post: zod_1.z.string().uuid(), // Ensure this is a valid ObjectId
    author: zod_1.z.string().uuid(), // Ensure this is a valid ObjectId
    content: zod_1.z.string().min(1),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.commentSchemas = {
    createCommentSchema,
};
