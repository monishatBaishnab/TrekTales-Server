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
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("./user.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const posts_model_1 = __importDefault(require("../post/posts.model"));
const updateUserDB = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, 'from user service');
    const findUser = yield user_model_1.default.findById(id);
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    if ((findUser === null || findUser === void 0 ? void 0 : findUser.isBlocked) || (findUser === null || findUser === void 0 ? void 0 : findUser.isDeleted)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    const deleteAbleFields = [
        'isVerified',
        'isBlocked',
        'isDeleted',
        'role',
    ];
    deleteAbleFields === null || deleteAbleFields === void 0 ? void 0 : deleteAbleFields.map((field) => payload === null || payload === void 0 ? true : delete payload[field]);
    const userData = Object.assign(Object.assign({}, payload), { profilePicture: file ? file.path : findUser === null || findUser === void 0 ? void 0 : findUser.profilePicture });
    const result = yield user_model_1.default.findByIdAndUpdate({ _id: id }, userData, {
        new: true,
    });
    return result;
});
const getAllUsersDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.default.find().select('-password'), query);
    const result = yield userQuery.modelQuery;
    return result;
});
const getAllAuthorsDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.default.find({ role: { $ne: 'admin' } }).select('-role -isDeleted -password -isBlocked'), query);
    const authors = yield userQuery.modelQuery;
    const meta = yield userQuery.countTotal();
    return { authors, meta };
});
const getSingleAuthorDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield user_model_1.default.findById(id).select('-role -isDeleted -password -isBlocked');
    const posts = yield posts_model_1.default.find({ author: id });
    return { author, posts };
});
const getPopularUsersDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.aggregate([
        {
            $match: {
                role: { $ne: 'admin' },
            },
        },
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'author',
                as: 'posts',
            },
        },
        {
            $addFields: {
                totalUpvotes: { $sum: '$posts.upvotes' },
            },
        },
        {
            $sort: { totalUpvotes: -1 },
        },
        {
            $limit: 3,
        },
        {
            $project: {
                posts: 0,
                role: 0,
                isDeleted: 0,
                password: 0,
                isBlocked: 0,
            },
        },
    ]);
    return result;
});
const getSingleUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield user_model_1.default.findById(id)
        .populate({ path: 'followers', select: '-password' })
        .select('-password');
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    if ((result === null || result === void 0 ? void 0 : result.isBlocked) || (result === null || result === void 0 ? void 0 : result.isDeleted)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    return result;
});
const followAuthorInDB = (authorId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield user_model_1.default.findByIdAndUpdate(authorId, { $addToSet: { followers: followerId } }, // Add follower only if not already present
    { new: true });
    if (!author) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Author not found.');
    }
    return { author: author === null || author === void 0 ? void 0 : author._id };
});
exports.userServices = {
    updateUserDB,
    getAllUsersDB,
    getAllAuthorsDB,
    getPopularUsersDB,
    getSingleUserDB,
    getSingleAuthorDB,
    followAuthorInDB,
};
