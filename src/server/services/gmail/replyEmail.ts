import { sendEmail } from "./sendEmail";

export async function replyEmail(
    tenantId: string,
    to: string,
    subject: string,
    body: string,
    threadId: string,
) {
    return sendEmail(tenantId, {
        to,
        subject,
        body,
        threadId,
    });
}