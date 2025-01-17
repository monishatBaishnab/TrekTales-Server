"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const multer_config_1 = require("../../config/multer.config");
const parseBody_1 = require("../../middlewares/parseBody");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const posts_schema_1 = require("./posts.schema");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.get('/', post_controller_1.postController.getAllPost);
router.get('/:id', 
// auth(USER_ROLE.ADMIN, USER_ROLE.USER),
post_controller_1.postController.getSinglePost);
router.post('/', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.USER), multer_config_1.multerUpload.single('image'), parseBody_1.parseBody, (0, validateRequest_1.default)(posts_schema_1.postSchemas.createPostSchema), post_controller_1.postController.createPost);
router.put('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.USER), multer_config_1.multerUpload.single('image'), parseBody_1.parseBody, (0, validateRequest_1.default)(posts_schema_1.postSchemas.updatePostSchema), post_controller_1.postController.updatePost);
router.put('/:id/upvote', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.USER), post_controller_1.postController.createUpVote);
router.put('/:id/downvote', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.USER), post_controller_1.postController.createDownVote);
router.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.USER), post_controller_1.postController.deletePost);
router.get('/upvotes/:authorId', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.USER), post_controller_1.postController.getUpvotes);
router.get('/states/all', post_controller_1.postController.getStates);
exports.postRoutes = router;
