"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_config_1 = __importDefault(require("../config/auth.config"));
const response_utils_1 = __importDefault(require("../utils/response.utils"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    static authenticateUser = (req, res, next) => {
        const token = req.cookies.accessToken;
        if (!token) {
            return response_utils_1.default.unauthorized(res, null);
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, auth_config_1.default.secret);
            req.userId = decodedToken.userId;
            next();
        }
        catch (error) {
            console.error('Authentication failed:', error);
            return response_utils_1.default.unauthorized(res, null);
        }
    };
    static refreshTokenValidation = (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return response_utils_1.default.unauthorized(res, { message: 'No refresh token provided' });
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(refreshToken, auth_config_1.default.refresh_secret);
            req.userId = decodedToken.userId;
            next();
        }
        catch (error) {
            console.error('Refresh token authentication failed:', error);
            return response_utils_1.default.unauthorized(res, { message: 'Invalid or expired refresh token' });
        }
    };
}
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map