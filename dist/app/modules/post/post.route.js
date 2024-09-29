"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const posts_schema_1 = require("./posts.schema");
const router = (0, express_1.Router)();
router.get('/', post_controller_1.postController.getAllPost);
router.get('/:id', post_controller_1.postController.getSinglePost);
router.post('/', (0, validateRequest_1.default)(posts_schema_1.postSchemas.createPostSchema), post_controller_1.postController.createPost);
router.put('/:id', (0, validateRequest_1.default)(posts_schema_1.postSchemas.updatePostSchema), post_controller_1.postController.updatePost);
router.delete('/:id', post_controller_1.postController.deletePost);
exports.postRoutes = router;