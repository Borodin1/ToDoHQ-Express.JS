import { Request, Response } from "express";
declare class TodoController {
    static create: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    static getAll: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    static update: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    static delete: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
}
export default TodoController;
//# sourceMappingURL=todo.controllers.d.ts.map