import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import { getTokenCookieOptions } from "./auth.token";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await authService.register(req.body);
      res.cookie("access_token", token, getTokenCookieOptions());

      return res.status(201).json({
        success: true,
        message: "Register successful",
        data: { user, access_token: token },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await authService.login(req.body);
      res.cookie("access_token", token, getTokenCookieOptions());

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: { user, access_token: token },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response) {
    res.clearCookie("access_token", {
      ...getTokenCookieOptions(),
      maxAge: 0,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.me(String(req.user?.id));

      return res.status(200).json({
        success: true,
        message: "Current user fetched successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
