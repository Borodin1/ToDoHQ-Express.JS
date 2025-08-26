import { Response } from "express";
declare class Send {
    static success(res: Response, data: any, message?: string): Response<any, Record<string, any>> | undefined;
    static error(res: Response, data: any, error: any, message?: string): void;
    static notFound(res: Response, data: any, message?: string): void;
    static unauthorized(res: Response, data: any, message?: string): void;
    static forbidden(res: Response, data: any, message?: string): void;
    static validationErrors(res: Response, errors: Record<string, string[]>): void;
    static badRequest(res: Response, data: any, message?: string): void;
}
export default Send;
//# sourceMappingURL=response.utils.d.ts.map