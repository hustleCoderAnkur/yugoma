import { getGmailClient } from "../../lib/getGmailClient";

export async function markAsSpam(
    tenantId: string,
    threadId: string,
) {
    const gmail = getGmailClient(tenantId);

    const thread = await gmail.api.threads.get({
        id: threadId,
    });

    await Promise.all(
        (thread.messages ?? [])
            .filter((message) => message.id)
            .map((message) =>
                gmail.api.messages.modify({
                    id: message.id!,
                    addLabelIds: ["SPAM"],
                }),
            ),
    );

    return await gmail.api.threads.get({
        id: threadId,
    });
}

export async function removeFromSpam(
    tenantId: string,
    threadId: string,
) {
    const gmail = getGmailClient(tenantId);

    const thread = await gmail.api.threads.get({
        id: threadId,
    });

    await Promise.all(
        (thread.messages ?? [])
            .filter((message) => message.id)
            .map((message) =>
                gmail.api.messages.modify({
                    id: message.id!,
                    removeLabelIds: ["SPAM"],
                }),
            ),
    );

    return await gmail.api.threads.get({
        id: threadId,
    });
}