"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const post_route_1 = require("../modules/post/post.route");
const comment_route_1 = require("../modules/comment/comment.route");
const payment_route_1 = require("../modules/payment/payment.route");
const moduleRoutes = [
    {
        path: '/auth',
        routes: auth_routes_1.authRouter,
    },
    {
        path: '/posts',
        routes: post_route_1.postRoutes,
    },
    {
        path: '/comments',
        routes: comment_route_1.commentRoutes,
    },
    {
        path: '/payments',
        routes: payment_route_1.paymentRoutes,
    },
];
const router = (0, express_1.Router)();
moduleRoutes === null || moduleRoutes === void 0 ? void 0 : moduleRoutes.map(({ path, routes }) => router.use(path, routes));
exports.appRoutes = router;
