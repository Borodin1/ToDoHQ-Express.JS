"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_utils_1 = __importDefault(require("../utils/response.utils"));
const db_1 = require("../db");
class UserController {
    static getUser = async (req, res) => {
        try {
            const userId = req.userId;
            const user = await db_1.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            if (!user) {
                return response_utils_1.default.notFound(res, null, "User not found");
            }
            return response_utils_1.default.success(res, user, "User retrieved successfully");
        }
        catch (error) {
            console.error("Error fetching user info:", error);
            return response_utils_1.default.error(res, null, "Internal server error");
        }
    };
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map