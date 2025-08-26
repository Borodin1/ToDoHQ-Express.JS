"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_utils_1 = __importDefault(require("../utils/response.utils"));
const db_1 = require("../db");
const todo_schema_1 = require("../validation/todo.schema");
class TodoController {
    static create = async (req, res) => {
        const userId = req.userId;
        const parse = todo_schema_1.todoSchema.create.safeParse(req.body);
        if (!parse.success) {
            return response_utils_1.default.validationErrors(res, parse.error.flatten().fieldErrors);
        }
        const { title, description, priority, completed = false } = parse.data;
        try {
            const todo = await db_1.prisma.todo.create({
                data: {
                    title,
                    description: description === undefined ? null : description,
                    priority,
                    user: { connect: { id: userId } },
                },
            });
            return response_utils_1.default.success(res, todo, "Todo created successfully");
        }
        catch (error) {
            console.error("Todo creation failed:", error);
            return response_utils_1.default.error(res, null, "Todo creation failed");
        }
    };
    static getAll = async (req, res) => {
        const userId = req.userId;
        try {
            const todos = await db_1.prisma.todo.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
            });
            return response_utils_1.default.success(res, todos);
        }
        catch (error) {
            console.error("Fetching todos failed:", error);
            return response_utils_1.default.error(res, null, "Fetching todos failed");
        }
    };
    static update = async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;
        const parse = todo_schema_1.todoSchema.update.safeParse(req.body);
        if (!parse.success) {
            return response_utils_1.default.validationErrors(res, parse.error.flatten().fieldErrors);
        }
        try {
            const existingTodo = await db_1.prisma.todo.findUnique({
                where: { id: Number(id) },
            });
            if (!existingTodo || existingTodo.userId !== userId) {
                return response_utils_1.default.notFound(res, "Todo not found or unauthorized");
            }
            const filteredData = Object.fromEntries(Object.entries(parse.data).filter(([_, v]) => v !== undefined));
            const updated = await db_1.prisma.todo.update({
                where: { id: Number(id) },
                data: filteredData,
            });
            return response_utils_1.default.success(res, updated, "Todo updated");
        }
        catch (error) {
            console.error("Todo update failed:", error);
            return response_utils_1.default.error(res, null, "Todo update failed");
        }
    };
    static delete = async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;
        try {
            const existingTodo = await db_1.prisma.todo.findUnique({
                where: { id: Number(id) },
            });
            if (!existingTodo || existingTodo.userId !== userId) {
                return response_utils_1.default.notFound(res, "Todo not found or unauthorized");
            }
            await db_1.prisma.todo.delete({ where: { id: Number(id) } });
            return response_utils_1.default.success(res, null, "Todo deleted");
        }
        catch (error) {
            console.error("Todo delete failed:", error);
            return response_utils_1.default.error(res, null, "Todo delete failed");
        }
    };
}
exports.default = TodoController;
//# sourceMappingURL=todo.controllers.js.map