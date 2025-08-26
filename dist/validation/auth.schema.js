"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const passwordSchema = zod_1.z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[@$!%*?&]/, "Password must include at least one special character");
const usernameSchema = zod_1.z
    .string()
    .min(6, "Username must be at least 6 characters long")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores")
    .refine((value) => !/^\d+$/.test(value), {
    message: "Username cannot be only numbers",
})
    .refine((value) => !/[@$!%*?&]/.test(value), {
    message: "Username cannot contain special characters like @$!%*?&",
});
const login = zod_1.z.object({
    email: zod_1.z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password is required"),
});
const register = zod_1.z
    .object({
    username: usernameSchema,
    email: zod_1.z.string().email("Invalid email format"),
    password: passwordSchema,
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    password_confirmation: zod_1.z
        .string()
        .min(1, "Password confirmation is required"),
})
    .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
});
const updateProfile = zod_1.z.object({
    username: usernameSchema.optional(),
    email: zod_1.z.string().email("Invalid email format").optional(),
    firstName: zod_1.z.string().min(1, "First name is required").optional(),
    lastName: zod_1.z.string().min(1, "Last name is required").optional(),
});
const authSchema = {
    login,
    register,
    updateProfile,
};
exports.default = authSchema;
//# sourceMappingURL=auth.schema.js.map