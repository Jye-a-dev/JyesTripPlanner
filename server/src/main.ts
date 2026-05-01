import app from "./app";
import { env } from "./config/env";
import { checkDatabaseConnection } from "./database/checkConnection";

const PORT = env.port;

const startServer = async () => {
	await checkDatabaseConnection();

	const server = app.listen(PORT, () => {
		console.log("=================================");
		console.log("🚀 Server started successfully");
		console.log(`📍 Environment : ${env.nodeEnv}`);
		console.log(`🌐 Base URL    : http://localhost:${PORT}`);
		console.log(`📚 Swagger     : http://localhost:${PORT}${env.swaggerRoute}`);
		console.log("=================================");
	});

	process.on("unhandledRejection", (reason: any) => {
		console.error("❌ Unhandled Rejection:", reason);

		server.close(() => {
			process.exit(1);
		});
	});

	process.on("uncaughtException", (error: Error) => {
		console.error("❌ Uncaught Exception:", error);
		process.exit(1);
	});

	process.on("SIGTERM", () => {
		console.log("⚠️ SIGTERM received. Shutting down gracefully...");
		server.close(() => {
			console.log("💤 Process terminated");
		});
	});

	process.on("SIGINT", () => {
		console.log("\n⚠️ SIGINT received. Shutting down gracefully...");
		server.close(() => {
			console.log("💤 Server stopped");
			process.exit(0);
		});
	});
};

startServer();