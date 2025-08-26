"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
class UserRoutes extends router_1.default {
    routes() {
        return [
            {
                method: "get",
                path: "/info",
                middlewares: [
                    auth_middleware_1.default.authenticateUser
                ],
                handler: user_controller_1.default.getUser
            },
        ];
    }
}
exports.default = new UserRoutes().router;
//# sourceMappingURL=user.routes.js.map