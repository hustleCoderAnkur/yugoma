import { getGmailClient } from "../../lib/getGmailClient";

export async function getDraft(
    tenantId: string,
    draftId: string,
) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.drafts.get({
        id: draftId,
    });
}