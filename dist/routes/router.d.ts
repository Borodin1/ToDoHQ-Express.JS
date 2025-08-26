import { Router as ExpressRouter, RequestHandler } from 'express';
type RouteMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export interface RouteConfig {
    method: RouteMethod;
    path: string;
    handler: RequestHandler;
    middlewares?: RequestHandler[];
}
export default abstract class BaseRouter {
    router: ExpressRouter;
    constructor();
    protected abstract routes(): RouteConfig[];
    private registerRoutes;
}
export {};
//# sourceMappingURL=router.d.ts.map