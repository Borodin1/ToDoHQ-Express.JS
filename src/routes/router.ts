import { Router as ExpressRouter, RequestHandler } from 'express';

type RouteMethod = 'get'| 'post' | 'put' | 'delete'| 'patch';

export interface RouteConfig {
    method: RouteMethod;
    path:string;
    handler:RequestHandler;
    middlewares?:RequestHandler[];
}

export default abstract class BaseRouter {
    public router: ExpressRouter;

    constructor(){
        this.router = ExpressRouter();
        this.registerRoutes();
    }

    protected abstract routes():RouteConfig[];

    private registerRoutes(){
        this.routes().forEach(({method,path,handler,middlewares=[]})=>{
            this.router[method](path,...middlewares,handler)
        })
    }
}
