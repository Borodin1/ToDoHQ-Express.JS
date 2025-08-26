import Send from "@utils/response.utils";
import { prisma } from "db";
import { Request, Response } from "express";

class UserController {
  static getUser = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return Send.notFound(res, null, "User not found");
      }

      return Send.success(res, user, "User retrieved successfully");
    } catch (error) {
      console.error("Error fetching user info:", error);
      return Send.error(res, null, "Internal server error");
    }
  };
}

export default UserController;
