import { getGmailClient } from "../lib/getGmailClient";

type Input = {
    tenantId: string;
    messageId: string;
};

export async function handleMessageChanged({ tenantId, messageId }: Input) {
    try {
        const gmail = getGmailClient(tenantId);

        const message = await gmail.api.messages.get({
            id: messageId,
        });

        if (!message.id) {
            console.warn("[handleMessageChanged] message has no id", messageId);
            return { success: false };
        }

        await gmail.db.messages.upsertByEntityId(message.id, {
            ...message,
            id: message.id,
        });

        return { success: true, messageId: message.id };
    } catch (error) {
        console.error("[handleMessageChanged]", messageId, error);
        return { success: false };
    }
}