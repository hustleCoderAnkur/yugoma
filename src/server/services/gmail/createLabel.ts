import { getGmailClient } from "../../lib/getGmailClient";

type CreateLabelInput = {
    name: string;
    messageListVisibility?: "show" | "hide";
    labelListVisibility?: "labelShow" | "labelShowIfUnread" | "labelHide";
};

export async function createLabel(
    tenantId: string,
    input: CreateLabelInput,
) {
    const gmail = getGmailClient(tenantId);

    return await gmail.api.labels.create({
        label: {
            name: input.name,
            messageListVisibility:
                input.messageListVisibility ?? "show",
            labelListVisibility:
                input.labelListVisibility ?? "labelShow",
        },
    });
}