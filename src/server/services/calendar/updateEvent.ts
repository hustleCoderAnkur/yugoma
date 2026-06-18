import { getCalendarClient } from "../../lib/getCalendarClient";

type UpdateEventInput = {
    eventId: string;
    summary?: string;
    description?: string;
    location?: string;
    start?: {
        dateTime: string;
        timeZone?: string;
    }
    end?: {
        dateTime: string;
        timeZone?: string;
    }
}

export async function updateEvent(
    tenantId: string,
    input: UpdateEventInput
) {
    const calendar = getCalendarClient(tenantId)

    return await calendar.api.events.update({
        id: input.eventId,
        event: {
            summary: input.summary,
            description: input.description,
            location: input.location,
            start: input.start,
            end: input.end,
        },
    })
}