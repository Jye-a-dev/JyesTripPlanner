import userReportsModel from "./user_reports.model";

import { IUserReportQuery, ICreateUserReportPayload, IUpdateUserReportPayload, ReportStatus } from "./user_reports.type";

const ALLOWED_FIELDS = ["title", "content", "status", "handled_by", "handled_note", "handled_at"];

class UserReportsService {
	async createUserReport(payload: ICreateUserReportPayload) {
		return userReportsModel.create({
			user_id: payload.user_id,
			trip_id: payload.trip_id ?? null,
			title: payload.title,
			content: payload.content,
			status: payload.status ?? ReportStatus.PENDING,
		});
	}

	async getUserReports(query: IUserReportQuery) {
		return userReportsModel.findAll(query);
	}

	async getUserReportById(id: string) {
		const report = await userReportsModel.findById(id);
		if (!report) throw new Error("User report not found");

		return report;
	}

	async updateUserReport(id: string, payload: IUpdateUserReportPayload) {
		const report = await userReportsModel.findById(id);
		if (!report) throw new Error("User report not found");

		const cleanPayload = Object.fromEntries(Object.entries(payload).filter(([k]) => ALLOWED_FIELDS.includes(k)));

		return userReportsModel.update(id, cleanPayload);
	}

	async deleteUserReport(id: string) {
		const report = await userReportsModel.findById(id);
		if (!report) throw new Error("User report not found");

		return userReportsModel.delete(id);
	}

	async countAll(query: IUserReportQuery) {
		return userReportsModel.countAll(query);
	}
}

export default new UserReportsService();
