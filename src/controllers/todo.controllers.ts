import Send from "@utils/response.utils";
import { prisma } from "db";
import { Request, Response } from "express";
import { todoSchema } from "validation/todo.schema";

class TodoController {
  static create = async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    const parse = todoSchema.create.safeParse(req.body);
    if (!parse.success) {
      return Send.validationErrors(res, parse.error.flatten().fieldErrors);
    }

    const { title, description, priority, completed = false } = parse.data;

    try {
      const todo = await prisma.todo.create({
        data: {
          title,
          description: description === undefined ? null : description,
          priority,
          user: { connect: { id: userId } },
        },
      });

      return Send.success(res, todo, "Todo created successfully");
    } catch (error) {
      console.error("Todo creation failed:", error);
      return Send.error(res, null, "Todo creation failed");
    }
  };

  static getAll = async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    try {
      const todos = await prisma.todo.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      return Send.success(res, todos);
    } catch (error) {
      console.error("Fetching todos failed:", error);
      return Send.error(res, null, "Fetching todos failed");
    }
  };

  static update = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { id } = req.params;

    const parse = todoSchema.update.safeParse(req.body);
    if (!parse.success) {
      return Send.validationErrors(res, parse.error.flatten().fieldErrors);
    }

    try {
      const existingTodo = await prisma.todo.findUnique({
        where: { id: Number(id) },
      });

      if (!existingTodo || existingTodo.userId !== userId) {
        return Send.notFound(res, "Todo not found or unauthorized");
      }

      const filteredData = Object.fromEntries(
        Object.entries(parse.data).filter(([_, v]) => v !== undefined)
      );

      const updated = await prisma.todo.update({
        where: { id: Number(id) },
        data: filteredData,
      });

      return Send.success(res, updated, "Todo updated");
    } catch (error) {
      console.error("Todo update failed:", error);
      return Send.error(res, null, "Todo update failed");
    }
  };

  static delete = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { id } = req.params;

    try {
      const existingTodo = await prisma.todo.findUnique({
        where: { id: Number(id) },
      });

      if (!existingTodo || existingTodo.userId !== userId) {
        return Send.notFound(res, "Todo not found or unauthorized");
      }

      await prisma.todo.delete({ where: { id: Number(id) } });

      return Send.success(res, null, "Todo deleted");
    } catch (error) {
      console.error("Todo delete failed:", error);
      return Send.error(res, null, "Todo delete failed");
    }
  };
}

export default TodoController;
