"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const comment_schema_1 = require("./comment.schema");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN), comment_controller_1.commentController.getALlComments);
router.get('/posts/:postId', comment_controller_1.commentController.getCommentsByPost);
router.post('/', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.USER), (0, validateRequest_1.default)(comment_schema_1.commentSchemas.createCommentSchema), comment_controller_1.commentController.createComment);
router.put('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.USER), (0, validateRequest_1.default)(comment_schema_1.commentSchemas.updateCommentSchema), comment_controller_1.commentController.updateComment);
router.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN), comment_controller_1.commentController.deleteComment);
exports.commentRoutes = router;
