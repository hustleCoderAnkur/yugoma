import { getGmailClient } from "../../lib/getGmailClient";

export async function deleteDraft(
    tenantId: string,
    draftId: string,
) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.drafts.delete({
        id: draftId,
    });
}