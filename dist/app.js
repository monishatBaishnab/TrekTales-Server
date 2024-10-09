"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = require("./app/routes");
const http_status_1 = require("http-status");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: [
        'https://trek-tales-client.vercel.app',
        'http://localhost:3000',
        'https://trek-tales-client-h1lo9spxj-monishats-projects.vercel.app',
    ],
}));
app.get('/', (req, res) => {
    res.json({
        success: true,
        status: http_status_1.OK,
        message: 'TrekTales Server Running Smoothly !',
    });
});
app.use('/api/v1', routes_1.appRoutes);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
