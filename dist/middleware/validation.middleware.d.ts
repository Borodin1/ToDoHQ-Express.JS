import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
declare class ValidationMiddleware {
    static validateBody(schema: ZodSchema): (req: Request, res: Response, next: NextFunction) => void;
}
export default ValidationMiddleware;
//# sourceMappingURL=validation.middleware.d.ts.map