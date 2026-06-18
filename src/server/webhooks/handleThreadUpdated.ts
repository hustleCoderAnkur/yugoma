import { getGmailClient } from "../lib/getGmailClient";

type HandleThreadUpdatedInput = {
    tenantId: string;
    threadId: string;
};

export async function handleThreadUpdated({
    tenantId,
    threadId,
}: HandleThreadUpdatedInput) {
    try {
        const gmail = getGmailClient(tenantId);

        const thread = await gmail.api.threads.get({
            id: threadId,
        });

        if (!thread.id) {
            console.warn("[handleThreadUpdated] thread has no id", threadId);
            return { success: false };
        }

        await gmail.db.threads.upsertByEntityId(thread.id, {
            ...thread,
            id: thread.id,
        });

        return { success: true, threadId: thread.id };
    } catch (error) {
        console.error("[handleThreadUpdated]", threadId, error);
        return { success: false };
    }
}