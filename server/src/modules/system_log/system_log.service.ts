import systemLogsModel from "./system_logs.model";

import {
	ISystemLogQuery,
	ICreateSystemLogPayload,
} from "./system_log.type";

class SystemLogsService {
	async createSystemLog(payload: ICreateSystemLogPayload) {
		return systemLogsModel.create({
			user_id: payload.user_id ?? null,
			action: payload.action,
			target_table: payload.target_table ?? null,
			target_id: payload.target_id ?? null,
			description: payload.description ?? null,
		});
	}

	async getSystemLogs(query: ISystemLogQuery) {
		return systemLogsModel.findAll(query);
	}

	async getSystemLogById(id: string) {
		const log = await systemLogsModel.findById(id);
		if (!log) throw new Error("System log not found");

		return log;
	}

	async deleteSystemLog(id: string) {
		const log = await systemLogsModel.findById(id);
		if (!log) throw new Error("System log not found");

		return systemLogsModel.delete(id);
	}

	async countAll(query: ISystemLogQuery) {
		return systemLogsModel.countAll(query);
	}
}

export default new SystemLogsService();