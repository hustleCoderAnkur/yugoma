import { getCalendarClient } from "../../lib/getCalendarClient";

export async function listEvents(tenantId: string) {
    const calendar = getCalendarClient(tenantId)

    const cachedEvents = await calendar.db.events.list({})

    if (cachedEvents.length > 0) {
        return cachedEvents
    }

    const response = await calendar.api.events.getMany({})

    const events = response.items ?? []

    for (const event of events) {
        if (!event.id) continue

        await calendar.db.events.upsertByEntityId(
            event.id,
            {
                ...event,
                id: event.id,
            },
        )
    }

    return events
}