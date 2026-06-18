import { getGmailClient } from "../../lib/getGmailClient";

type UpdateLabelInput = {
    labelId: string;
    name?: string;
    messageListVisibility?: "show" | "hide";
    labelListVisibility?: "labelShow" | "labelShowIfUnread" | "labelHide";
};

export async function updateLabel(
    tenantId: string,
    input: UpdateLabelInput,
) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.labels.update({
        id: input.labelId,
        label: {
            name: input.name,
            messageListVisibility: input.messageListVisibility,
            labelListVisibility: input.labelListVisibility,
        },
    });
}