import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ValidationError } from "../utils/errors";

export const validate = (schema: ZodSchema) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const result = await schema.safeParseAsync(req.body);
    if (result.success) {
      next();
      return;
    }

    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".") || "root";
      if (!errors[path]) errors[path] = [];
      errors[path].push(issue.message);
    }

    next(new ValidationError("Validation failed", errors));
  };
};
