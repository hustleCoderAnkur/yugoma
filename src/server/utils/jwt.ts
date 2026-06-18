
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
  email: string;
};

export function generateAccessToken(payload: JwtPayload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );
}

export function generateRefreshToken(payload: JwtPayload) {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyAccessToken(
  token: string
): JwtPayload | null {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(
  token: string
): JwtPayload | null {
  try {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload;
  } catch {
    return null;
  }
}
