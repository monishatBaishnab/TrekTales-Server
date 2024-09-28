"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    post: { type: mongoose_1.Types.ObjectId, ref: 'Post', required: true },
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const Comment = (0, mongoose_1.model)('Comment', CommentSchema);
exports.default = Comment;
