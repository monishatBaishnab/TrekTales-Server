"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const globalErrorHandler = (err, req, res, next) => {
    var _a, _b;
    const success = false;
    const statusCode = (_a = err === null || err === void 0 ? void 0 : err.statusCode) !== null && _a !== void 0 ? _a : http_status_1.INTERNAL_SERVER_ERROR;
    const message = 'Something want wrong';
    const error = (_b = err === null || err === void 0 ? void 0 : err.message) !== null && _b !== void 0 ? _b : '';
    //setting default values
    return res.status(statusCode).json({
        success,
        statusCode,
        message,
        error: error,
    });
};
exports.default = globalErrorHandler;
