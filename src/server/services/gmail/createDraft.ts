import { getGmailClient } from "../../lib/getGmailClient";

type CreateDraftInput = {
    raw: string;
};

export async function createDraft(
    tenantId: string,
    input: CreateDraftInput,
) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.drafts.create({
        draft: {
            message: {
                raw: input.raw,
            },
        },
    });
}