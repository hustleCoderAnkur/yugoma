import { getGmailClient } from "../../lib/getGmailClient";

export async function listDrafts(tenantId: string) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.drafts.list({});
}