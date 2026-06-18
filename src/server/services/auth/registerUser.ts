
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { hashPassword } from "@/server/utils/hashPassword";
import { generateAccessToken, generateRefreshToken } from "@/server/utils/jwt";

type RegisterUserInput = {
  username: string;
  email: string;
  password: string;
};

export async function registerUser({
  username,
  email,
  password,
}: RegisterUserInput) {

  // Check existing email
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  
  if (existingUser) {
    throw new Error("Email already exists");
  }
  
  // Check existing username
  const existingUsername = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  
  if (existingUsername) {
    throw new Error("Username already exists");
  }
  
  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const [newUser] = await db
  .insert(users)
  .values({
    id: crypto.randomUUID(),
    username,
    email,
    password: hashedPassword,
  })
  .returning();
  
  if (!newUser) {
    throw new Error("Failed to create user");
  }
  
  const accessToken = generateAccessToken({
    id: newUser.id,
    email: newUser.email,
  });
  
  const refreshToken = generateRefreshToken({
    id: newUser.id,
    email: newUser.email,
  });
  
  return {
    accessToken,
    refreshToken,
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
  };
}