import { processWebhook } from "corsair";
import { NextResponse } from "next/server";

import { corsair } from "~/server/corsair";
import { handleEventCreated } from "~/server/webhooks/handleEventCreated";
import { handleEventDeleted } from "~/server/webhooks/handleEventDeleted";
import { handleEventUpdated } from "~/server/webhooks/handleEventUpdated";
import { handleMessageChanged } from "~/server/webhooks/handleMessageChanged";
import { handleMessageCreated } from "~/server/webhooks/handleMessageCreated";
import { handleThreadDeleted } from "~/server/webhooks/handleThreadDeleted";
import { handleThreadUpdated } from "~/server/webhooks/handleThreadUpdated";

type WebhookPayload = Parameters<typeof processWebhook>[2];

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const body = (await req.json()) as WebhookPayload;
        const tenantId = url.searchParams.get("tenantId") ?? undefined;

        const result = await processWebhook(
            corsair,
            Object.fromEntries(req.headers),
            body,
            { tenantId },
        );

        console.dir(result, { depth: null });
        console.dir(body, { depth: null });

        if (!tenantId) {
            console.warn("[webhook] tenantId missing, skipping handler");
            return NextResponse.json(result.response);
        }


        if (result.plugin === "gmail") {
            const gmailBody = body as {
                message?: { messageId?: string };
                thread?: { threadId?: string };
            };

            if (result.action === "messageChanged") {
                const messageId = gmailBody.message?.messageId;
                if (messageId) {
                    await handleMessageChanged({ tenantId, messageId });
                }
            }

            if (result.action === "messageCreated") {
                const messageId = gmailBody.message?.messageId;
                if (messageId) {
                    await handleMessageCreated({ tenantId, messageId });
                }
            }

            if (result.action === "threadUpdated") {
                const threadId = gmailBody.thread?.threadId;
                if (threadId) {
                    await handleThreadUpdated({ tenantId, threadId });
                }
            }

            if (result.action === "threadDeleted") {
                const threadId = gmailBody.thread?.threadId;
                if (threadId) {
                    await handleThreadDeleted({ tenantId, threadId });
                }
            }
        }


        if (result.plugin === "googlecalendar") {
            const calBody = body as {
                event?: { eventId?: string };
            };

            const eventId = calBody.event?.eventId;

            if (result.action === "eventCreated" && eventId) {
                await handleEventCreated({ tenantId, eventId });
            }

            if (result.action === "eventUpdated" && eventId) {
                await handleEventUpdated({ tenantId, eventId });
            }

            if (result.action === "eventDeleted" && eventId) {
                await handleEventDeleted({ tenantId, eventId });
            }
        }

        return NextResponse.json(result.response);
    } catch (error) {
        console.error("[webhook] error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}