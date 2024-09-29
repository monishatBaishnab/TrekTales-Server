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
    const commentQuery = new QueryBuilder_1.default(comment_model_1.default.find().populate('author'), query)
        .sort()
        .filter();
    const result = yield commentQuery.modelQuery;
    return result;
});
const getCommentsByPostFromDB = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.default.find({ post: postId });
    return result;
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
exports.commentServices = {
    getAllCommentsFromDB,
    getCommentsByPostFromDB,
    createCommentIntoDB,
    updateCommentFromDB,
    deleteCommentFromDB,
};
