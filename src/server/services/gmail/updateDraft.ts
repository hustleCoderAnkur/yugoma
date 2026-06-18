import { getGmailClient } from "../../lib/getGmailClient";

type UpdateDraftInput = {
    draftId: string;
    raw: string;
    threadId?: string;
};

export async function updateDraft(
    tenantId: string,
    input: UpdateDraftInput,
) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.drafts.update({
        id: input.draftId,
        draft: {
            message: {
                raw: input.raw,
                threadId: input.threadId,
            },
        },
    });
}