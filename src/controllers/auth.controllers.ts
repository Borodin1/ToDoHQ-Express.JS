import Send from "@utils/response.utils";
import { prisma } from "db";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import authConfig from "@config/auth.config";
import authSchema from "validation/auth.schema";

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body as z.infer<typeof authSchema.login>;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return Send.error(res, null, "Invalid credentials");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return Send.error(res, null, "Invalid credentials");
      }

      const accessToken = jwt.sign({ userId: user.id }, authConfig.secret, {
        expiresIn: authConfig.secret_expiresIn as any,
      });

      const refreshToken = jwt.sign(
        { userId: user.id },
        authConfig.refresh_secret,
        { expiresIn: authConfig.refresh_secret_expiresIn as any }
      );

      await prisma.user.update({
        where: { email },
        data: { refreshToken },
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
        sameSite: "strict",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      return Send.success(res, {
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Login failed:", error);
      return Send.error(res, null, "Login failed");
    }
  };
  static register = async (req: Request, res: Response) => {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      password_confirmation,
    } = req.body as z.infer<typeof authSchema.register>;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return Send.error(res, null, "Email already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });

      return Send.success(
        res,
        {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
        "User registered successfully"
      );
    } catch (error) {
      console.error("Registration failed:", error);
      return Send.error(res, null, "Registration failed");
    }
  };

  static logout = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const refreshToken = req.cookies.refreshToken;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || !user.refreshToken) {
        return Send.unauthorized(res, "Refresh token not found");
      }

      if (user.refreshToken !== refreshToken) {
        return Send.unauthorized(res, { message: "Invalid refresh token" });
      }

      const newAccessToken = jwt.sign({ userId: user.id }, authConfig.secret, {
        expiresIn: authConfig.secret_expiresIn as any,
      });

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
        sameSite: "strict",
      });
      return Send.success(res, {
        message: "Access token refreshed successfully",
      });
    } catch (error) {
      console.error("Refresh token failed:", error);
      return Send.error(res, null, "Failed to refresh token");
    }
  };

  static updateProfile = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    try {
      const parse = authSchema.updateProfile.safeParse(req.body);
      if (!parse.success) {
        return Send.validationErrors(res, parse.error.flatten().fieldErrors);
      }
      const filteredUser = Object.fromEntries(
        Object.entries(parse.data).filter(([_, v]) => v !== undefined)
      );

      if (Object.keys(filteredUser).length === 0) {
        return Send.validationErrors(res, {
          general: ["At least one field must be provided for update"],
        });
      }
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return Send.notFound(res, "User not found");
      }

      const updateUser = await prisma.user.update({
        where: { id: userId },
        data: filteredUser,
      });
      return Send.success(res, updateUser, "Profile updated successfully");
    } catch (error) {
      console.error("Profile updated failed:", error);
      return Send.error(res, null, "Profile update failed");
    }
  };

  static refreshToken = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const refreshToken = req.cookies.refreshToken;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || !user.refreshToken) {
        return Send.unauthorized(res, "Refresh token not found");
      }

      if (user.refreshToken !== refreshToken) {
        return Send.unauthorized(res, { message: "Invalid refresh token" });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign({ userId: user.id }, authConfig.secret, {
        expiresIn: authConfig.secret_expiresIn as any,
      });

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
        sameSite: "strict",
      });

      return Send.success(res, {
        message: "Access token refreshed successfully",
      });
    } catch (error) {
      console.error("Refresh Token failed:", error);
      return Send.error(res, null, "Failed to refresh token");
    }
  };
}

export default AuthController;
