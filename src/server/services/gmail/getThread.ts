import { getGmailClient } from "../../lib/getGmailClient";

export async function getThread(
    tenantId: string,
    threadId: string,
) {
    const gmail = getGmailClient(tenantId);

    const thread =
        await gmail.db.threads.findByEntityId(threadId);

    if (!thread) {
        const apiThread = await gmail.api.threads.get({
            id: threadId,
        });

        return apiThread;
    }

    const messages = await gmail.db.messages.search({
        data: {
            threadId: {
                contains: threadId,
            },
        },
    });

    return {
        id: thread.data.id,
        historyId: thread.data.historyId,
        messages: messages.map((m) => m.data),
    };
}

export async function getThreadStats(
    tenantId: string,
    threadId: string,
) {
    const thread = await getThread(
        tenantId,
        threadId,
    );

    const messages = thread.messages ?? [];

    const participants = new Set<string>();

    for (const message of messages) {
        const payload = message.payload as {
            headers?: {
                name?: string;
                value?: string;
            }[];
        };

        const headers = payload.headers ?? [];

        const from = headers.find(
            (header) => header.name === "From",
        )?.value;

        if (typeof from === "string") {
            participants.add(from);
        }
    }

    const latestMessage = messages.at(-1);

    return {
        participants: participants.size,
        messageCount: messages.length,
        latestMessage:
            latestMessage?.snippet ?? null,
        lastUpdated:
            latestMessage?.internalDate ?? null,
    };
}