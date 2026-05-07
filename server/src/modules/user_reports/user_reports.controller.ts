import { Request, Response, NextFunction } from "express";
import userReportsService from "./user_reports.service";

class UserReportsController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const report = await userReportsService.createUserReport(req.body);

			return res.status(201).json({
				success: true,
				message: "User report created successfully",
				data: report,
			});
		} catch (error) {
			next(error);
		}
	}

	async findAll(req: Request, res: Response, next: NextFunction) {
		try {
			const reports = await userReportsService.getUserReports(req.query);

			return res.status(200).json({
				success: true,
				message: "User reports fetched successfully",
				data: reports,
			});
		} catch (error) {
			next(error);
		}
	}

	async countAll(req: Request, res: Response, next: NextFunction) {
		try {
			const total = await userReportsService.countAll(req.query);

			return res.status(200).json({
				success: true,
				message: "User reports counted successfully",
				data: { total },
			});
		} catch (error) {
			next(error);
		}
	}

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const report = await userReportsService.getUserReportById(
				String(req.params.id)
			);

			return res.status(200).json({
				success: true,
				message: "User report fetched successfully",
				data: report,
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const report = await userReportsService.updateUserReport(
				String(req.params.id),
				req.body
			);

			return res.status(200).json({
				success: true,
				message: "User report updated successfully",
				data: report,
			});
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			await userReportsService.deleteUserReport(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "User report deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new UserReportsController();