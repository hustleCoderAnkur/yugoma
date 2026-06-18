import { getCalendarClient } from "../../lib/getCalendarClient";

export async function searchEvents(
    tenantId: string,
    query: string,
) {
    const calendar = getCalendarClient(tenantId);

    const events = await calendar.db.events.list({});

    const lowerQuery = query.toLowerCase();

    return events.filter((event) => {
        const summary =
            event.data.summary?.toLowerCase() ?? "";

        const description =
            event.data.description?.toLowerCase() ?? "";

        return (
            summary.includes(lowerQuery) ||
            description.includes(lowerQuery)
        );
    });
}