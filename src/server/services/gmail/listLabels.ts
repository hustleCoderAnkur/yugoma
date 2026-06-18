import { getGmailClient } from "../../lib/getGmailClient";

export async function listLabels(tenantId: string) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.labels.list({});
}