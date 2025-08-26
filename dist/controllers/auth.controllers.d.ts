import { Request, Response } from "express";
declare class AuthController {
    static login: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    static register: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    static logout: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    static updateProfile: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    static refreshToken: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
}
export default AuthController;
//# sourceMappingURL=auth.controllers.d.ts.map