"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const moduleRoutes = [
    {
        path: '/auth',
        routes: auth_routes_1.authRouter,
    },
];
const router = (0, express_1.Router)();
moduleRoutes === null || moduleRoutes === void 0 ? void 0 : moduleRoutes.map(({ path, routes }) => router.use(path, routes));
exports.appRoutes = router;
