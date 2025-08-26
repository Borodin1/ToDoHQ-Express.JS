import { todoSchema } from "../validation/todo.schema";
import ValidationMiddleware from "middleware/validation.middleware";
import AuthMiddleware from "../middleware/auth.middleware";
import BaseRouter, { RouteConfig } from "./router";
import TodoController from "@controllers/todo.controllers";

class TodoRouter extends BaseRouter {
  protected routes(): RouteConfig[] {
    return [
      {
        method: "post",
        path: "/",
        middlewares: [
          AuthMiddleware.authenticateUser,
          ValidationMiddleware.validateBody(todoSchema.create),
        ],
        handler: TodoController.create,
      },
      {
        method: "get",
        path: "/",
        middlewares: [AuthMiddleware.authenticateUser],
        handler: TodoController.getAll,
      },
      {
        method: "put",
        path: "/:id",
        middlewares: [
          AuthMiddleware.authenticateUser,
          ValidationMiddleware.validateBody(todoSchema.update),
        ],
        handler: TodoController.update,
      },
      {
        method: "delete",
        path: "/:id",
        middlewares: [AuthMiddleware.authenticateUser],
        handler: TodoController.delete,
      },
    ];
  }
}

export default new TodoRouter().router;
