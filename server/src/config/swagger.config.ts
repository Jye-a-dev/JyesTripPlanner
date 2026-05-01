import type { Options } from "swagger-jsdoc"
import { env } from "./env"

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: env.swaggerTitle,
      version: env.swaggerVersion,
      description: env.swaggerDescription,
    },
    servers: [
      {
        url: `http://localhost:${env.port}${env.apiPrefix}`,
        description: "Local API server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    "src/swagger/docs/**/*.ts",
    "src/modules/**/*.route.ts",
    "dist/swagger/docs/**/*.js",
    "dist/modules/**/*.route.js",
  ],
}