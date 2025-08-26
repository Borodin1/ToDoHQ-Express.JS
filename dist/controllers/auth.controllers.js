"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_utils_1 = __importDefault(require("../utils/response.utils"));
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth.config"));
const auth_schema_1 = __importDefault(require("../validation/auth.schema"));
class AuthController {
    static login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await db_1.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return response_utils_1.default.error(res, null, "Invalid credentials");
            }
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return response_utils_1.default.error(res, null, "Invalid credentials");
            }
            const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, auth_config_1.default.secret, {
                expiresIn: auth_config_1.default.secret_expiresIn,
            });
            const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, auth_config_1.default.refresh_secret, { expiresIn: auth_config_1.default.refresh_secret_expiresIn });
            await db_1.prisma.user.update({
                where: { email },
                data: { refreshToken },
            });
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 15 * 60 * 1000,
                sameSite: "strict",
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: "strict",
            });
            return response_utils_1.default.success(res, {
                id: user.id,
                username: user.username,
                email: user.email,
            });
        }
        catch (error) {
            console.error("Login failed:", error);
            return response_utils_1.default.error(res, null, "Login failed");
        }
    };
    static register = async (req, res) => {
        const { username, email, password, firstName, lastName, password_confirmation, } = req.body;
        try {
            const existingUser = await db_1.prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                return response_utils_1.default.error(res, null, "Email already exists");
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const newUser = await db_1.prisma.user.create({
                data: {
                    username,
                    email,
                    firstName,
                    lastName,
                    password: hashedPassword,
                },
            });
            return response_utils_1.default.success(res, {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            }, "User registered successfully");
        }
        catch (error) {
            console.error("Registration failed:", error);
            return response_utils_1.default.error(res, null, "Registration failed");
        }
    };
    static logout = async (req, res) => {
        try {
            const userId = req.userId;
            const refreshToken = req.cookies.refreshToken;
            const user = await db_1.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user || !user.refreshToken) {
                return response_utils_1.default.unauthorized(res, "Refresh token not found");
            }
            if (user.refreshToken !== refreshToken) {
                return response_utils_1.default.unauthorized(res, { message: "Invalid refresh token" });
            }
            const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.id }, auth_config_1.default.secret, {
                expiresIn: auth_config_1.default.secret_expiresIn,
            });
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 15 * 60 * 1000,
                sameSite: "strict",
            });
            return response_utils_1.default.success(res, {
                message: "Access token refreshed successfully",
            });
        }
        catch (error) {
            console.error("Refresh token failed:", error);
            return response_utils_1.default.error(res, null, "Failed to refresh token");
        }
    };
    static updateProfile = async (req, res) => {
        const userId = req.userId;
        try {
            const parse = auth_schema_1.default.updateProfile.safeParse(req.body);
            if (!parse.success) {
                return response_utils_1.default.validationErrors(res, parse.error.flatten().fieldErrors);
            }
            const filteredUser = Object.fromEntries(Object.entries(parse.data).filter(([_, v]) => v !== undefined));
            if (Object.keys(filteredUser).length === 0) {
                return response_utils_1.default.validationErrors(res, {
                    general: ["At least one field must be provided for update"],
                });
            }
            const existingUser = await db_1.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!existingUser) {
                return response_utils_1.default.notFound(res, "User not found");
            }
            const updateUser = await db_1.prisma.user.update({
                where: { id: userId },
                data: filteredUser,
            });
            return response_utils_1.default.success(res, updateUser, "Profile updated successfully");
        }
        catch (error) {
            console.error("Profile updated failed:", error);
            return response_utils_1.default.error(res, null, "Profile update failed");
        }
    };
    static refreshToken = async (req, res) => {
        try {
            const userId = req.userId;
            const refreshToken = req.cookies.refreshToken;
            const user = await db_1.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user || !user.refreshToken) {
                return response_utils_1.default.unauthorized(res, "Refresh token not found");
            }
            if (user.refreshToken !== refreshToken) {
                return response_utils_1.default.unauthorized(res, { message: "Invalid refresh token" });
            }
            // Generate a new access token
            const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.id }, auth_config_1.default.secret, {
                expiresIn: auth_config_1.default.secret_expiresIn,
            });
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 15 * 60 * 1000,
                sameSite: "strict",
            });
            return response_utils_1.default.success(res, {
                message: "Access token refreshed successfully",
            });
        }
        catch (error) {
            console.error("Refresh Token failed:", error);
            return response_utils_1.default.error(res, null, "Failed to refresh token");
        }
    };
}
exports.default = AuthController;
//# sourceMappingURL=auth.controllers.js.map