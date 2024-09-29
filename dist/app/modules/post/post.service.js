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
exports.postService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const posts_model_1 = __importDefault(require("./posts.model"));
const getAllPostFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const postQuery = new QueryBuilder_1.default(posts_model_1.default.find().populate('author'), query)
        .search(['title', 'category'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield postQuery.modelQuery;
    return result;
});
const getSinglePostFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_model_1.default.findById(id).populate('author');
    return result;
});
const createPostIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findAuthor = yield user_model_1.default.findById({ _id: payload === null || payload === void 0 ? void 0 : payload.author });
    if (!findAuthor) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Author not found.');
    }
    const postData = Object.assign(Object.assign({}, payload), { upvotes: 0, downvotes: 0, isDeleted: false });
    const result = yield posts_model_1.default.create(postData);
    return result;
});
const updatePostFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findPost = yield posts_model_1.default.findById(id);
    if (!findPost) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Post not found.');
    }
    if (findPost.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Post not found.');
    }
    const result = yield posts_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deletePostsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findPost = yield posts_model_1.default.findById(id);
    if (!findPost) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Post not found.');
    }
    if (findPost.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Post not found.');
    }
    yield posts_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return {};
});
exports.postService = {
    getAllPostFromDB,
    getSinglePostFromDB,
    createPostIntoDB,
    updatePostFromDB,
    deletePostsFromDB,
};
