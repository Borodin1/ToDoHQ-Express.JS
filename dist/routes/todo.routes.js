"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_schema_1 = require("../validation/todo.schema");
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router_1 = __importDefault(require("./router"));
const todo_controllers_1 = __importDefault(require("../controllers/todo.controllers"));
class TodoRouter extends router_1.default {
    routes() {
        return [
            {
                method: "post",
                path: "/",
                middlewares: [
                    auth_middleware_1.default.authenticateUser,
                    validation_middleware_1.default.validateBody(todo_schema_1.todoSchema.create),
                ],
                handler: todo_controllers_1.default.create,
            },
            {
                method: "get",
                path: "/",
                middlewares: [auth_middleware_1.default.authenticateUser],
                handler: todo_controllers_1.default.getAll,
            },
            {
                method: "put",
                path: "/:id",
                middlewares: [
                    auth_middleware_1.default.authenticateUser,
                    validation_middleware_1.default.validateBody(todo_schema_1.todoSchema.update),
                ],
                handler: todo_controllers_1.default.update,
            },
            {
                method: "delete",
                path: "/:id",
                middlewares: [auth_middleware_1.default.authenticateUser],
                handler: todo_controllers_1.default.delete,
            },
        ];
    }
}
exports.default = new TodoRouter().router;
//# sourceMappingURL=todo.routes.js.map