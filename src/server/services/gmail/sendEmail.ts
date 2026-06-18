import { getGmailClient } from "../../lib/getGmailClient";

type SendEmailInput = {
    to: string;
    subject: string;
    body: string;
    threadId?: string;
};

export async function sendEmail(
    tenantId: string,
    input: SendEmailInput,
) {
    const gmail = getGmailClient(tenantId);

    const email = [
        `To: ${input.to}`,
        `Subject: ${input.subject}`,
        "",
        input.body,
    ].join("\r\n");

    const raw = Buffer.from(email)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    return await gmail.api.messages.send({
        raw,
        threadId: input.threadId,
    });
}