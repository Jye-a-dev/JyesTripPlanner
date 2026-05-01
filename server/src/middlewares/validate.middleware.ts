// src/middlewares/validate.middleware.ts

import { Request, Response, NextFunction } from "express"
import { ZodSchema } from "zod"

const validateMiddleware =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        ...req.body,
        ...req.params,
        ...req.query,
      })

      next()
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors || [],
      })
    }
  }

export default validateMiddleware