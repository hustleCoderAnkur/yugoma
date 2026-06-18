import { getCalendarClient } from "../../lib/getCalendarClient";

export async function deleteEvent(
    tenantId: string,
    eventId: string,
) {
    const calendar = getCalendarClient(tenantId);

    await calendar.api.events.delete({
        id: eventId,
    });

    return {
        eventId,
        success: true,
    };
}

export async function deleteManyEvents(
    tenantId: string,
    eventIds: string[],
) {
    return await Promise.all(
        eventIds.map((eventId) =>
            deleteEvent(
                tenantId,
                eventId,
            ),
        ),
    );
}