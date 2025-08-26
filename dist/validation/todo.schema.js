"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.todoSchema = {
    create: zod_1.default.object({
        title: zod_1.default.string().min(1),
        description: zod_1.default.string().optional(),
        priority: zod_1.default.enum(["extreme", "moderate", "low"]),
        completed: zod_1.default.boolean().optional(),
    }),
    update: zod_1.default.object({
        title: zod_1.default.string().optional(),
        description: zod_1.default.string().optional(),
        priority: zod_1.default.enum(["extreme", "moderate", "low"]).optional(),
        completed: zod_1.default.boolean().optional(),
    }),
};
//# sourceMappingURL=todo.schema.js.map