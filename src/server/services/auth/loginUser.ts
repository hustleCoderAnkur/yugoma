
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";

import { comparePassword } from "@/server/utils/comparePassword";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/server/utils/jwt";

type LoginUserInput = {
  email: string;
  password: string;
};

export async function loginUser({
  email,
  password,
}: LoginUserInput) {
  // Find user
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Verify password
  const isPasswordValid = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
    },
  };
}
