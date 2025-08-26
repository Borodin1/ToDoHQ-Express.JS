"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseRouter {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.registerRoutes();
    }
    registerRoutes() {
        this.routes().forEach(({ method, path, handler, middlewares = [] }) => {
            this.router[method](path, ...middlewares, handler);
        });
    }
}
exports.default = BaseRouter;
//# sourceMappingURL=router.js.map