import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../utils/errors";
import { verifyAccessToken } from "../utils/jwt";
import { AuthRequest } from "../types";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError("No token provided");
    }

    const token = authHeader.substring(7);
    const payload = verifyAccessToken(token);

    // Attach user ID to request
    (req as AuthRequest).userId = payload.userId;

    next();
  } catch (error) {
    next(error);
  }
};
