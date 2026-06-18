import { getCalendarClient } from "../../lib/getCalendarClient";

export async function getEvent(
    tenantId: string,
    eventId: string,
) {
    const calendar = getCalendarClient(tenantId);

    const cachedEvent = await calendar.db.events.findByEntityId(eventId);

    if (cachedEvent) {
        return cachedEvent
    }

    const event = await calendar.api.events.get({
        id: eventId
    });

    if (event.id) {
        await calendar.db.events.upsertByEntityId(
            event.id,
            {
                ...event,
                id: event.id,
            },
        );
    }

    return event;
}