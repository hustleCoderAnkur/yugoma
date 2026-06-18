import { getGmailClient } from "../../lib/getGmailClient";

export async function listThreads(tenantId: string) {
    const gmail = getGmailClient(tenantId);

    const cachedThreads = await gmail.db.threads.list();

    if (cachedThreads.length > 0) {
        return cachedThreads;
    }

    const response = await gmail.api.threads.list({});

    return response.threads ?? [];
}