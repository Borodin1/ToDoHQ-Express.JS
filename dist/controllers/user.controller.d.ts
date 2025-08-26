import { Request, Response } from "express";
declare class UserController {
    static getUser: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
}
export default UserController;
//# sourceMappingURL=user.controller.d.ts.map