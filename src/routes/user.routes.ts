import BaseRouter, { RouteConfig } from "./router";
import AuthMiddleware from "../middleware/auth.middleware";
import UserController from "@controllers/user.controller";

class UserRoutes extends BaseRouter {
    protected routes(): RouteConfig[] {
        return [
            {
                method: "get",
                path: "/info",
                middlewares: [
                    AuthMiddleware.authenticateUser
                ],
                handler: UserController.getUser
            },
        ]
    }
}

export default new UserRoutes().router;