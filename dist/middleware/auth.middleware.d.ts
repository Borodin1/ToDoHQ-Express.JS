import { NextFunction, Request, Response } from 'express';
export interface DecodedToken {
    userId: number;
}
declare class AuthMiddleware {
    static authenticateUser: (req: Request, res: Response, next: NextFunction) => void;
    static refreshTokenValidation: (req: Request, res: Response, next: NextFunction) => void;
}
export default AuthMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map