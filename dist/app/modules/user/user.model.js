"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String },
    profilePicture: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    socialLinks: { type: Map, of: String },
    dateOfBirth: { type: Date },
    interests: { type: [String] },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
