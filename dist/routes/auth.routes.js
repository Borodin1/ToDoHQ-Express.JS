"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_schema_1 = __importDefault(require("../validation/auth.schema"));
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const router_1 = __importDefault(require("./router"));
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
class AuthRouter extends router_1.default {
    routes() {
        return [
            {
                //Login
                method: "post",
                path: "/login",
                middlewares: [validation_middleware_1.default.validateBody(auth_schema_1.default.login)],
                handler: auth_controllers_1.default.login,
            },
            {
                //Register
                method: "post",
                path: "/register",
                middlewares: [validation_middleware_1.default.validateBody(auth_schema_1.default.register)],
                handler: auth_controllers_1.default.register,
            },
            {
                //Update Profile
                method: "put",
                path: "/update-profile",
                middlewares: [
                    auth_middleware_1.default.authenticateUser,
                    validation_middleware_1.default.validateBody(auth_schema_1.default.updateProfile),
                ],
                handler: auth_controllers_1.default.updateProfile,
            },
            {
                //Logout
                method: "post",
                path: "/logout",
                middlewares: [],
                handler: auth_controllers_1.default.logout,
            },
            {
                //Refresh Token
                method: "post",
                path: "/refresh-token",
                middlewares: [],
                handler: auth_controllers_1.default.refreshToken,
            },
        ];
    }
}
exports.default = new AuthRouter().router;
//# sourceMappingURL=auth.routes.js.map