import { z } from "zod";
import { run } from "@openai/agents";

import { agent } from "~/ai/agent";
import { corsair } from "~/server/corsair";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const agentRouter = createTRPCRouter({
    chat: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                query: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            const { tenantId, query } = input;

            console.log(
                "[agent] Received query:",
                query,
                "for tenant:",
                tenantId,
            );

            try {
                const tenant = corsair.withTenant(tenantId);
                console.log("=== CORSAIR DEBUG ===");
                console.log(JSON.stringify(tenant.gmail, null, 2));
                console.log("gmail type:", typeof tenant.gmail);
                console.log("gmail own props:", Object.getOwnPropertyNames(tenant.gmail));
                console.log("gmail proto props:", Object.getOwnPropertyNames(Object.getPrototypeOf(tenant.gmail)));
                console.log("gmail.api type:", typeof tenant.gmail?.api);
                console.log("gmail.api own props:", Object.getOwnPropertyNames(tenant.gmail?.api ?? {}));

                console.log("=== CORSAIR DEBUG ===");
                console.log("tenant keys:", Object.keys(tenant));

                console.dir(tenant.gmail, { depth: null });
                console.dir(tenant.googlecalendar, { depth: null });

                console.log(
                    "gmail prototype:",
                    Object.getOwnPropertyNames(
                        Object.getPrototypeOf(tenant.gmail),
                    ),
                );

                console.log(
                    "calendar prototype:",
                    Object.getOwnPropertyNames(
                        Object.getPrototypeOf(tenant.googlecalendar),
                    ),
                );

                const result = await run(agent, query, {
                    context: {
                        tenantId,
                    },
                });

                console.dir(result, { depth: null });

                console.log("FINAL OUTPUT:");
                console.log(result.finalOutput);

                console.log("NEW ITEMS:");
                console.dir(result.newItems, { depth: null });

                console.log("LAST AGENT:");
                console.dir(result.lastAgent, { depth: null });

                const response =
                    typeof result.finalOutput === "string"
                        ? result.finalOutput
                        : JSON.stringify(result.finalOutput);

                console.log("[agent] Final response:", response);

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