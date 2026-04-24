import { SessionOptions } from "iron-session";
import { getIronSession } from "iron-session";

/**
 * Session user stored inside encrypted cookie
 */
export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

export type SessionData = {
  user?: SessionUser;
};

/**
 * Iron session configuration
 * - Stored in secure cookie
 * - Used for authentication state
 */
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function getSession(req: Request, res: any) {
  return getIronSession<SessionData>(req, res, sessionOptions);
}