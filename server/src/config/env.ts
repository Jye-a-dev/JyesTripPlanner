import dotenv from "dotenv";

dotenv.config();

export const env = {
	// App
	nodeEnv: process.env.NODE_ENV ?? "development",
	port: Number(process.env.PORT ?? 3000),
	apiPrefix: process.env.API_PREFIX ?? "/api/v1",

	// Swagger
	swaggerRoute: process.env.SWAGGER_ROUTE ?? "/docs",
	swaggerTitle:
		process.env.SWAGGER_TITLE ?? "Template Node Server API",
	swaggerVersion: process.env.SWAGGER_VERSION ?? "1.0.0",
	swaggerDescription:
		process.env.SWAGGER_DESCRIPTION ??
		"Express TypeScript API template",

	// PostgreSQL
	databaseUrl: process.env.DATABASE_URL,
	authSecret: process.env.AUTH_SECRET ?? "change-me-auth-secret",

	dbHost: process.env.DB_HOST ?? "localhost",
	dbPort: Number(process.env.DB_PORT ?? 5432),
	dbUser: process.env.DB_USER ?? "postgres",
	dbPassword: process.env.DB_PASSWORD ?? "",
	dbName: process.env.DB_NAME ?? "postgres",
};
