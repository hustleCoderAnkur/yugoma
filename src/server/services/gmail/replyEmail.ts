import { sendEmail } from "./sendEmail";

export async function replyEmail(
    tenantId: string,
    raw: string,
    threadId: string,
) {
    return sendEmail(tenantId, {
        raw,
        threadId,
    });
}