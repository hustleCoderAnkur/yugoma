import { getGmailClient } from "../../lib/getGmailClient";

export async function getThread(
    tenantId: string,
    threadId: string,
) {
    const gmail = getGmailClient(tenantId);

    const thread =
        await gmail.db.threads.findByEntityId(
            threadId,
        );

    const cachedMessages = thread
        ? await gmail.db.messages.search({
            data: {
                threadId: {
                    contains: threadId,
                },
            },
        })
        : [];

    // Cache hit
    if (
        thread &&
        cachedMessages.length > 0
    ) {
        return {
            id: thread.data.id,
            historyId: thread.data.historyId,
            messages: cachedMessages.map(
                (message) => message.data,
            ),
        };
    }

    // Cache miss → fetch live thread
    const apiThread =
        await gmail.api.threads.get({
            id: threadId,
        });

    console.log(
        "LIVE THREAD:",
        JSON.stringify(apiThread, null, 2),
    );

    return apiThread;
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