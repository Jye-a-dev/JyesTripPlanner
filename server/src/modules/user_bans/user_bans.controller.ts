import { Request, Response, NextFunction } from "express";
import userBansService from "./user_bans.service";

class UserBansController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const ban = await userBansService.createUserBan(req.body);

			return res.status(201).json({
				success: true,
				message: "User ban created successfully",
				data: ban,
			});
		} catch (error) {
			next(error);
		}
	}

	async findAll(req: Request, res: Response, next: NextFunction) {
		try {
			const bans = await userBansService.getUserBans(req.query);

			return res.status(200).json({
				success: true,
				message: "User bans fetched successfully",
				data: bans,
			});
		} catch (error) {
			next(error);
		}
	}

	async countAll(req: Request, res: Response, next: NextFunction) {
		try {
			const total = await userBansService.countAll(req.query);

			return res.status(200).json({
				success: true,
				message: "User bans counted successfully",
				data: { total },
			});
		} catch (error) {
			next(error);
		}
	}

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const ban = await userBansService.getUserBanById(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "User ban fetched successfully",
				data: ban,
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const ban = await userBansService.updateUserBan(String(req.params.id), req.body);

			return res.status(200).json({
				success: true,
				message: "User ban updated successfully",
				data: ban,
			});
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			await userBansService.deleteUserBan(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "User ban deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new UserBansController();
