import { Request, Response, NextFunction } from "express";
import systemLogsService from "./system_log.service";

class SystemLogsController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const log = await systemLogsService.createSystemLog(req.body);

			return res.status(201).json({
				success: true,
				message: "System log created successfully",
				data: log,
			});
		} catch (error) {
			next(error);
		}
	}

	async findAll(req: Request, res: Response, next: NextFunction) {
		try {
			const logs = await systemLogsService.getSystemLogs(req.query);

			return res.status(200).json({
				success: true,
				message: "System logs fetched successfully",
				data: logs,
			});
		} catch (error) {
			next(error);
		}
	}

	async countAll(req: Request, res: Response, next: NextFunction) {
		try {
			const total = await systemLogsService.countAll(req.query);

			return res.status(200).json({
				success: true,
				message: "System logs counted successfully",
				data: { total },
			});
		} catch (error) {
			next(error);
		}
	}

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const log = await systemLogsService.getSystemLogById(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "System log fetched successfully",
				data: log,
			});
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			await systemLogsService.deleteSystemLog(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "System log deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new SystemLogsController();