import authSchema from "../validation/auth.schema";
import ValidationMiddleware from "middleware/validation.middleware";
import BaseRouter, { RouteConfig } from "./router";
import AuthController from "@controllers/auth.controllers";
import AuthMiddleware from "middleware/auth.middleware";

class AuthRouter extends BaseRouter {
  protected routes(): RouteConfig[] {
    return [
      {
        //Login
        method: "post",
        path: "/login",
        middlewares: [ValidationMiddleware.validateBody(authSchema.login)],
        handler: AuthController.login,
      },
      {
        //Register
        method: "post",
        path: "/register",
        middlewares: [ValidationMiddleware.validateBody(authSchema.register)],
        handler: AuthController.register,
      },
      {
        //Update Profile
        method: "put",
        path: "/update-profile",
        middlewares: [
          AuthMiddleware.authenticateUser,
          ValidationMiddleware.validateBody(authSchema.updateProfile),
        ],
        handler: AuthController.updateProfile,
      },
      {
        //Logout
        method: "post",
        path: "/logout",
        middlewares: [],
        handler: AuthController.logout,
      },

      {
        //Refresh Token
        method: "post",
        path: "/refresh-token",
        middlewares: [],
        handler: AuthController.refreshToken,
      },
    ];
  }
}

export default new AuthRouter().router;
