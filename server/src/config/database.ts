import { Pool } from "pg";
import { env } from "./env";

const pool = new Pool({
	host: env.dbHost,
	port: Number(env.dbPort),
	user: env.dbUser,
	password: env.dbPassword,
	database: env.dbName,
	connectionString: env.databaseUrl,

	// Production khuyên bật SSL nếu dùng Supabase/Render/Railway
	ssl:
		env.nodeEnv === "production"
			? {
					rejectUnauthorized: false,
			  }
			: false,

	max: 20, // max client trong pool
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 10000,
});

export default pool;