"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const posts_model_1 = __importDefault(require("../post/posts.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const comment_model_1 = __importDefault(require("./comment.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const getAllCommentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const commentQuery = new QueryBuilder_1.default(comment_model_1.default.find()
        .populate('author')
        .populate({
        path: 'replies',
        match: { isDeleted: { $ne: true } },
        populate: { path: 'author' },
    }), query)
        .sort()
        .filter();
    const result = yield commentQuery.modelQuery;
    return result;
});
const getCommentsByPostFromDB = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comment_model_1.default.find({
        post: postId,
        isDeleted: { $ne: true },
    })
        .populate('author')
        .populate('replies.author'); // Populate the author of each reply
    // Filter out replies that are marked as deleted
    const filteredComments = comments.map((comment) => {
        var _a;
        comment.replies = (_a = comment === null || comment === void 0 ? void 0 : comment.replies) === null || _a === void 0 ? void 0 : _a.filter((reply) => reply.isDeleted !== true);
        return comment;
    });
    return filteredComments;
});
const createCommentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findPost = yield posts_model_1.default.findById({ _id: payload === null || payload === void 0 ? void 0 : payload.post });
    if (!findPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Post not found.');
    }
    const findAuthor = yield user_model_1.default.findById({ _id: payload.author });
    if (!findAuthor) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Author not found.');
    }
    const result = yield comment_model_1.default.create(payload);
    return result;
});
const updateCommentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findComment = yield comment_model_1.default.findById({ _id: id });
    if (!findComment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found.');
    }
    const result = yield comment_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteCommentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findComment = yield comment_model_1.default.findById({ _id: id });
    if (!findComment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found.');
    }
    yield comment_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return {};
});
const createReplyIntoDB = (commentId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const findComment = yield comment_model_1.default.findById({ _id: commentId });
    if (!findComment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
    }
    // Create a new reply object
    const newReply = {
        author: payload.author,
        content: payload.content,
        isDeleted: false,
    };
    // Push the new reply to the replies array of the found comment
    (_a = findComment === null || findComment === void 0 ? void 0 : findComment.replies) === null || _a === void 0 ? void 0 : _a.push(newReply);
    // Save the updated comment back to the database
    yield findComment.save();
});
const updateReplyIntoDB = (commentId, replyId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the comment by ID
    var _a, _b, _c;
    const findComment = yield comment_model_1.default.findById({ _id: commentId });
    // Check if the comment exists
    if (!findComment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
    }
    // Find the index of the reply to update
    const replyIndex = (_a = findComment === null || findComment === void 0 ? void 0 : findComment.replies) === null || _a === void 0 ? void 0 : _a.findIndex((reply) => { var _a; return ((_a = reply === null || reply === void 0 ? void 0 : reply._id) === null || _a === void 0 ? void 0 : _a.toString()) === replyId; });
    if (replyIndex == -1) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Reply not found');
    }
    if (findComment && (findComment === null || findComment === void 0 ? void 0 : findComment.replies) !== undefined) {
        findComment.replies[replyIndex].content =
            (_b = payload.content) !== null && _b !== void 0 ? _b : findComment.replies[replyIndex].content;
        findComment.replies[replyIndex].isDeleted =
            (_c = payload.isDeleted) !== null && _c !== void 0 ? _c : false;
    }
    yield findComment.save();
    return findComment;
});
exports.commentServices = {
    getAllCommentsFromDB,
    getCommentsByPostFromDB,
    createCommentIntoDB,
    updateCommentFromDB,
    deleteCommentFromDB,
    createReplyIntoDB,
    updateReplyIntoDB,
};
