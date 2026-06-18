import { getGmailClient } from "../../lib/getGmailClient";

export async function archiveThread(
    tenantId: string,
    threadId: string,
) {
    const gmail = getGmailClient(tenantId);

    const thread = await gmail.api.threads.get({
        id: threadId,
    });

    for (const message of thread.messages ?? []) {
        if (!message.id) continue;

        await gmail.api.messages.modify({
            id: message.id,
            removeLabelIds: ["INBOX"],
        });
    }

    return await gmail.api.threads.get({
        id: threadId,
    });
}

export async function archiveManyThreads(
    tenantId: string,
    threadIds: string[],
) {
    return await Promise.all(
        threadIds.map((threadId) =>
            archiveThread(tenantId, threadId),
        ),
    );
}