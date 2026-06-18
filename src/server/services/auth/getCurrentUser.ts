
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { verifyAccessToken } from "@/server/utils/jwt";

type GetCurrentUserInput = {
  accessToken: string;
};

export async function getCurrentUser({
  accessToken,
}: GetCurrentUserInput) {
  const decoded = verifyAccessToken(accessToken);

  if (!decoded) {
    throw new Error("Invalid access token");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, decoded.id),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    image: user.image,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };
}
