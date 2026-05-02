import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateMiddleware =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = {
        ...(req.body ?? {}),
        ...(req.params ?? {}),
        ...(req.query ?? {}),
      };

      const parsed = schema.parse(data);

      // optional: attach cleaned data
      (req as any).validated = parsed;

      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors:
          error?.issues?.map((e: any) => ({
            field: e.path?.join(".") || "",
            message: e.message,
          })) || [],
      });
    }
  };

export default validateMiddleware;