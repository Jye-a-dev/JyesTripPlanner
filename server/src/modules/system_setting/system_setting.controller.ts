import { Request, Response, NextFunction } from "express";
import systemSettingsService from "./system_setting.service";

class SystemSettingsController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const setting = await systemSettingsService.createSystemSetting(req.body);

			return res.status(201).json({
				success: true,
				message: "System setting created successfully",
				data: setting,
			});
		} catch (error) {
			next(error);
		}
	}

	async findAll(req: Request, res: Response, next: NextFunction) {
		try {
			const settings = await systemSettingsService.getSystemSettings(req.query);

			return res.status(200).json({
				success: true,
				message: "System settings fetched successfully",
				data: settings,
			});
		} catch (error) {
			next(error);
		}
	}

	async countAll(req: Request, res: Response, next: NextFunction) {
		try {
			const total = await systemSettingsService.countAll(req.query);

			return res.status(200).json({
				success: true,
				message: "System settings counted successfully",
				data: { total },
			});
		} catch (error) {
			next(error);
		}
	}

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const setting = await systemSettingsService.getSystemSettingById(
				String(req.params.id)
			);

			return res.status(200).json({
				success: true,
				message: "System setting fetched successfully",
				data: setting,
			});
		} catch (error) {
			next(error);
		}
	}

	async findByKey(req: Request, res: Response, next: NextFunction) {
		try {
			const setting = await systemSettingsService.getSystemSettingByKey(
				String(req.params.key)
			);

			return res.status(200).json({
				success: true,
				message: "System setting fetched successfully",
				data: setting,
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const setting = await systemSettingsService.updateSystemSetting(
				String(req.params.id),
				req.body
			);

			return res.status(200).json({
				success: true,
				message: "System setting updated successfully",
				data: setting,
			});
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			await systemSettingsService.deleteSystemSetting(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "System setting deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new SystemSettingsController();