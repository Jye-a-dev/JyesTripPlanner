export enum ReportStatus {
	PENDING = "pending",
	REVIEWING = "reviewing",
	RESOLVED = "resolved",
	REJECTED = "rejected",
}

export interface IUserReport {
	id: string;
	user_id: string;
	trip_id?: string | null;
	title: string;
	content: string;
	status: ReportStatus;
	handled_by?: string | null;
	handled_note?: string | null;
	handled_at?: Date | null;

	created_at: Date;
	updated_at: Date;
}

export interface ICreateUserReportPayload {
	user_id: string;
	trip_id?: string | null;

	title: string;
	content: string;

	status?: ReportStatus;
}

export interface IUpdateUserReportPayload {
	title?: string;
	content?: string;
	status?: ReportStatus;

	handled_by?: string | null;
	handled_note?: string | null;
	handled_at?: Date | null;
}

export interface IUserReportQuery {
	page?: number;
	limit?: number;
	search?: string;
	user_id?: string;
	trip_id?: string;
	status?: ReportStatus;
	handled_by?: string;
	sort_by?: string;
	sort_order?: "ASC" | "DESC";
}
