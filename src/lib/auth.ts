import { SignJWT, jwtVerify } from "jose";

/**
 * Admin session handling with signed JWTs in httpOnly cookies.
 * Secret comes from env — never from frontend code.
 */
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-insecure-secret-change-me"
);

export const SESSION_COOKIE = "rynevo_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: string;
};

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.userId || !payload.email) return null;
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}
