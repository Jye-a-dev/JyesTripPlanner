import crypto from "crypto";
import { env } from "../../config/env";
import { UserRole } from "../users/users.type";

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  exp: number;
}

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

function getSecret() {
  return env.authSecret;
}

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(data: string) {
  return crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function createAuthToken(user: { id: string; email: string; role: UserRole }) {
  const payload: AuthTokenPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };

  const payloadStr = JSON.stringify(payload);
  const encodedPayload = toBase64Url(payloadStr);
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expectedBuffer.length) return null;

  const isValid = crypto.timingSafeEqual(sigBuffer, expectedBuffer);
  if (!isValid) return null;

  const payload = JSON.parse(fromBase64Url(encodedPayload)) as AuthTokenPayload;
  if (payload.exp <= Math.floor(Date.now() / 1000)) return null;

  return payload;
}

export function getTokenCookieOptions() {
  const secure = env.nodeEnv === "production";

  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    maxAge: TOKEN_TTL_SECONDS * 1000,
    path: "/",
  };
}
