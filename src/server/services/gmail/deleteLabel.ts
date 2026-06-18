import { getGmailClient } from "../../lib/getGmailClient";

export async function deleteLabel(
    tenantId: string,
    labelId: string,
) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.labels.delete({
        id: labelId,
    });
}