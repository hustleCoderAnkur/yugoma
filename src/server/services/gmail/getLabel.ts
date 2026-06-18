import { getGmailClient } from "../../lib/getGmailClient";

export async function getLabel(
    tenantId: string,
    labelId: string,
) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.labels.get({
        id: labelId,
    });
}