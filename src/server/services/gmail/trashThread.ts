import { getGmailClient } from "../../lib/getGmailClient";
import { deleteEmail } from "./deleteEmail";

export async function trashThread(
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
                deleteEmail(tenantId, message.id!),
            ),
    );

    return await gmail.api.threads.get({
        id: threadId,
    });
}

export async function untrashThread(
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
                gmail.api.messages.untrash({
                    id: message.id!,
                }),
            ),
    );

    return await gmail.api.threads.get({
        id: threadId,
    });
}