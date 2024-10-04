"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const VoteSchema = new mongoose_1.Schema({
    vote: { type: String, enum: ['up', 'down'], required: true },
    user: { type: String, required: true },
}, { _id: false });
const PostSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPremium: { type: Boolean, default: false },
    votes: { type: [VoteSchema], required: false },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const Post = mongoose_1.default.model('Post', PostSchema);
exports.default = Post;
