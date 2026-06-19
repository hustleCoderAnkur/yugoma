import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";

type DeleteUserInput = {
    userId: string;
};

export async function deleteUser({
    userId,
}: DeleteUserInput) {
    const existingUser = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });

    if (!existingUser) {
        throw new Error("User not found");
    }

    await db
        .delete(users)
        .where(eq(users.id, userId));

    return {
        success: true,
    };
}