"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authConfig = {
    secret: process.env.AUTH_SECRET,
    secret_expiresIn: process.env.AUTH_SECRET_EXPIRES_IN,
    refresh_secret: process.env.AUTH_REFRESH_SECRET,
    refresh_secret_expiresIn: process.env.AUTH_REFRESH_SECRET_EXPIRES_IN,
};
exports.default = authConfig;
//# sourceMappingURL=auth.config.js.map