import { getGmailClient } from "../lib/getGmailClient";

type HandleThreadDeletedInput = {
    tenantId: string;
    threadId: string;
};

export async function handleThreadDeleted({
    tenantId,
    threadId,
}: HandleThreadDeletedInput) {
    try {
        await getGmailClient(tenantId).db.threads.deleteByEntityId(threadId);

        return { success: true, threadId };
    } catch (error) {
        console.error("[handleThreadDeleted]", threadId, error);
        return { success: false };
    }
}