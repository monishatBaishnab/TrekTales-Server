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
const updateUserDB = (id, payload, file, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
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
    for (const field of deleteAbleFields) {
        if (field in payload) {
            if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) !== 'admin') {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Your have no access in this operation.');
            }
        }
    }
    const userData = Object.assign(Object.assign({}, payload), { profilePicture: file ? file.path : findUser === null || findUser === void 0 ? void 0 : findUser.profilePicture });
    const result = yield user_model_1.default.findByIdAndUpdate({ _id: id }, userData, {
        new: true,
    });
    return result;
});
const getAllUsersDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.default.find().select('-password'), query).paginate();
    const users = yield userQuery.modelQuery;
    const meta = yield userQuery.countTotal();
    return { users, meta };
});
const getAllAuthorsDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.default.find().select('-role -isDeleted -password -isBlocked'), query)
        .paginate()
        .fields();
    console.log(query);
    const authors = yield userQuery.modelQuery;
    const meta = yield userQuery.countTotal();
    return { authors, meta };
});
const getSingleAuthorDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield user_model_1.default.findById(id).select('-password');
    const posts = yield posts_model_1.default.find({ author: id });
    return { author, posts };
});
const getPopularUsersDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.aggregate([
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
    const user = yield user_model_1.default.findById(id)
        .populate({
        path: 'followers',
        select: 'profilePicture name email isVerified role dateOfBirth',
    })
        .select('-password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    if ((user === null || user === void 0 ? void 0 : user.isBlocked) || (user === null || user === void 0 ? void 0 : user.isDeleted)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    const followedUsers = yield user_model_1.default.find({
        followers: { $in: [id] },
    }).select('profilePicture name email isVerified role dateOfBirth');
    return { user, followedUsers: (followedUsers === null || followedUsers === void 0 ? void 0 : followedUsers.length) ? followedUsers : [] };
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
