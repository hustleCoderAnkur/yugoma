import { getGmailClient } from "../../lib/getGmailClient";

export async function sendDraft(
    tenantId: string,
    draftId: string,
) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.drafts.send({
        id: draftId,
    });
}