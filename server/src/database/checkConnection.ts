import pool from "../config/database";

export const checkDatabaseConnection = async () => {
	try {
		const client = await pool.connect();

		const result = await client.query(`
			SELECT 
				current_database() AS database_name,
				current_user AS username,
				inet_server_addr() AS host,
				inet_server_port() AS port,
				NOW() AS server_time
		`);

		console.log("=================================");
		console.log("🗄️ Database connected successfully");
		console.log(`📦 Database   : ${result.rows[0].database_name}`);
		console.log(`👤 User       : ${result.rows[0].username}`);
		console.log(`🌐 Host       : ${result.rows[0].host}`);
		console.log(`🔌 Port       : ${result.rows[0].port}`);
		console.log(`🕒 Server Time: ${result.rows[0].server_time}`);
		console.log("=================================");

		client.release();
	} catch (error) {
		console.error("=================================");
		console.error("❌ Database connection failed");
		console.error(error);
		console.error("=================================");
		process.exit(1);
	}
};