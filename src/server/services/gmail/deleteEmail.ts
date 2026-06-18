import { getGmailClient } from "../../lib/getGmailClient";

export async function deleteEmail(
    tenantId: string,
    messageId: string
) {
    const gmail = getGmailClient(tenantId);
    return await gmail.api.messages.trash({
        id: messageId,
    });
}

export async function deleteManyEmails(
    tenantId: string,
    messageIds: string[]
) {
    return await Promise.all(
        messageIds.map((messageId) => deleteEmail(tenantId, messageId))
    );
}