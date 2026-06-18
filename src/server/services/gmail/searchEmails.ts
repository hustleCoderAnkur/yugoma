import { getGmailClient } from "../../lib/getGmailClient";

type SearchEmailsInput = {
    query?: string;
    from?: string;
    to?: string;
    label?: string;
    unread?: boolean;
    hasAttachment?: boolean;
    newerThan?: string;
    olderThan?: string;
};

export async function searchEmails(
    tenantId: string,
    input: SearchEmailsInput,
) {
    const gmail = getGmailClient(tenantId);

    const filters: string[] = [];

    if (input.query) filters.push(input.query);
    if (input.from) filters.push(`from:${input.from}`);
    if (input.to) filters.push(`to:${input.to}`);
    if (input.label) filters.push(`label:${input.label}`);
    if (input.unread) filters.push("is:unread");
    if (input.hasAttachment) filters.push("has:attachment");
    if (input.newerThan) filters.push(`newer_than:${input.newerThan}`);
    if (input.olderThan) filters.push(`older_than:${input.olderThan}`);

    return await gmail.api.messages.list({
        q: filters.join(" "),
    });
}

export async function getUnreadCount(
    tenantId: string,
) {
    const gmail = getGmailClient(tenantId);

    const result = await gmail.api.messages.list({
        q: "is:unread",
    });

    return {
        unread: result.resultSizeEstimate ?? 0,
    };
}