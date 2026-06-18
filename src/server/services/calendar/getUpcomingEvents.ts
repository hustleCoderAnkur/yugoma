import { getCalendarClient } from "../../lib/getCalendarClient";

export async function getUpcomingEvents(
    tenantId: string,
    limit = 10,
) {
    const calendar = getCalendarClient(tenantId);

    const events = await calendar.db.events.list({});

    const now = new Date();

    return events
        .filter((event) => {
            const start =
                event.data.start?.dateTime;

            return (
                start &&
                new Date(start) > now
            );
        })
        .sort((a, b) => {
            const aStart = new Date(
                a.data.start?.dateTime ?? "",
            ).getTime();

            const bStart = new Date(
                b.data.start?.dateTime ?? "",
            ).getTime();

            return aStart - bStart;
        })
        .slice(0, limit)
        .map((event) => ({
            id: event.data.id,
            summary: event.data.summary,
            start: event.data.start,
            end: event.data.end,
            location: event.data.location,
        }));
}