import { z } from "zod";
import { run } from "@openai/agents";
import { eq } from "drizzle-orm";

import { createAgent } from "~/ai/agent";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const agentRouter = createTRPCRouter({
    chat: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                query: z.string(),
                username: z.string().optional(),
                email: z.string().optional(),
            }),
        )
        .mutation(async ({ input }) => {
            const {
                tenantId,
                query,
                username,
                email,
            } = input;

            console.log(
                "[agent] Received query:",
                query,
                "for tenant:",
                tenantId,
            );

            try {
                const user = await db.query.users.findFirst({
                    where: eq(users.email, tenantId),
                });

                const finalUsername =
                    user?.username ??
                    username ??
                    "User";

                const finalEmail =
                    user?.email ??
                    email ??
                    tenantId;

                console.log(
                    "[agent] Using user:",
                    finalUsername,
                    finalEmail,
                );

                const userAgent = createAgent(
                    finalUsername,
                    finalEmail,
                );

                const result = await run(userAgent, query, {
                    context: {
                        tenantId,
                    },
                });

                console.log("FINAL OUTPUT:");
                console.log(result.finalOutput);

                const response =
                    typeof result.finalOutput === "string"
                        ? result.finalOutput
                        : JSON.stringify(result.finalOutput);

                console.log(
                    "[agent] Final response:",
                    response,
                );

                return {
                    success: true,
                    response,
                };
            } catch (error) {
                console.error(
                    "[agent] Error:",
                    error instanceof Error
                        ? error.stack
                        : error,
                );

                return {
                    success: false,
                    response:
                        error instanceof Error
                            ? error.message
                            : "Something went wrong.",
                };
            }
        }),
});