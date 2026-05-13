import { NextFunction, Request, Response } from "express";
import usersModel from "../users/users.model";
import { UserRole } from "../users/users.type";
import { verifyAuthToken } from "./auth.token";

function parseCookieValue(cookieHeader: string | undefined, key: string) {
  if (!cookieHeader) return null;

  const parts = cookieHeader.split(";").map((part) => part.trim());
  const found = parts.find((part) => part.startsWith(`${key}=`));
  if (!found) return null;

  return decodeURIComponent(found.slice(key.length + 1));
}

function extractAccessToken(req: Request) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }

  return parseCookieValue(req.headers.cookie, "access_token");
}

export async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = extractAccessToken(req);
    if (!token) throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });

    const payload = verifyAuthToken(token);
    if (!payload) throw Object.assign(new Error("Invalid or expired token"), { statusCode: 401 });

    const user = await usersModel.findById(payload.sub);
    if (!user) throw Object.assign(new Error("User not found"), { statusCode: 401 });
    if (!user.is_active) throw Object.assign(new Error("User account is inactive"), { statusCode: 403 });
    if (user.is_banned) throw Object.assign(new Error("User account is banned"), { statusCode: 403 });

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    next();
  } catch (error) {
    next(error);
  }
}
