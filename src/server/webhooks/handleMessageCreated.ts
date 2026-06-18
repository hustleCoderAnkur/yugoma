import { getGmailClient } from "../lib/getGmailClient";

type HandleMessageCreatedInput = {
    tenantId: string;
    messageId: string;
};

export async function handleMessageCreated({
    tenantId,
    messageId,
}: HandleMessageCreatedInput) {
    try {
        const gmail = getGmailClient(tenantId);

        const message = await gmail.api.messages.get({
            id: messageId,
        });

        if (!message.id) {
            console.warn("[handleMessageCreated] message has no id", messageId);
            return { success: false };
        }

        await gmail.db.messages.upsertByEntityId(message.id, {
            ...message,
            id: message.id,
        });

        return { success: true, messageId: message.id };
    } catch (error) {
        console.error("[handleMessageCreated]", messageId, error);
        return { success: false };
    }
}