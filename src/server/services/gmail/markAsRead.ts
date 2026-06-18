import { getGmailClient } from "../../lib/getGmailClient";

export async function markAsRead(
    tenantId: string,
    messageId: string,
) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.messages.modify({
        id: messageId,
        removeLabelIds: ["UNREAD"],
    });
}

export async function markManyAsRead(
    tenantId: string,
    messageIds: string[],
) {
    return await Promise.all(
        messageIds.map((messageId) =>
            markAsRead(tenantId, messageId),
        ),
    );
}