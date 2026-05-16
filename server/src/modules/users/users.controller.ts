// src/modules/users/users.controller.ts

import { Request, Response, NextFunction } from "express";
import usersService from "./users.service";
import { UserRole } from "./users.type";

class UsersController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await usersService.createUser(req.body);

			return res.status(201).json({
				success: true,
				message: "User created successfully",
				data: user,
			});
		} catch (error) {
			next(error);
		}
	}

	async findAll(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await usersService.getUsers(req.query);

			return res.status(200).json({
				success: true,
				message: "Users fetched successfully",
				data: users,
			});
		} catch (error) {
			next(error);
		}
	}

	async countAll(req: Request, res: Response, next: NextFunction) {
		try {
			const total = await usersService.countAll(req.query);

			return res.status(200).json({
				success: true,
				message: "Users counted successfully",
				data: {
					total,
				},
			});
		} catch (error) {
			next(error);
		}
	}

  async countByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const total = await usersService.countByEmail(String(req.params.email));

      return res.status(200).json({
        success: true,
        message: "Users counted by email successfully",
        data: { total },
      });
    } catch (error) {
      next(error);
    }
  }

  async countByRole(req: Request, res: Response, next: NextFunction) {
    try {
      const total = await usersService.countByRole(req.params.role as UserRole);

      return res.status(200).json({
        success: true,
        message: "Users counted by role successfully",
        data: { total },
      });
    } catch (error) {
      next(error);
    }
  }

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await usersService.getUserById(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "User fetched successfully",
				data: user,
			});
		} catch (error) {
			next(error);
		}
	}

	async findByEmail(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await usersService.getUserByEmail(String(req.params.email));

			return res.status(200).json({
				success: true,
				message: "User fetched successfully",
				data: user,
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await usersService.updateUser(String(req.params.id), req.body);

			return res.status(200).json({
				success: true,
				message: "User updated successfully",
				data: user,
			});
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			await usersService.deleteUser(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "User deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new UsersController();
