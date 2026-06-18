
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";

import { comparePassword } from "@/server/utils/comparePassword";
import { hashPassword } from "@/server/utils/hashPassword";

type ChangePasswordInput = {
  userId: string;
  currentPassword: string;
  newPassword: string;
};

export async function changePassword({
  userId,
  currentPassword,
  newPassword,
}: ChangePasswordInput) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(
    currentPassword,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await hashPassword(newPassword);

  await db
    .update(users)
    .set({
      password: hashedPassword,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  return {
    success: true,
    message: "Password changed successfully",
  };
}
