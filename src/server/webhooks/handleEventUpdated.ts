import { getCalendarClient } from "../lib/getCalendarClient";

type HandleEventUpdatedInput = {
    tenantId: string;
    eventId: string;
};

export async function handleEventUpdated({
    tenantId,
    eventId,
}: HandleEventUpdatedInput) {
    try {
        const calendar = getCalendarClient(tenantId);

        const event = await calendar.api.events.get({
            id: eventId,
        });

        if (!event.id) {
            console.warn("[handleEventUpdated] event has no id", eventId);
            return { success: false };
        }

        await calendar.db.events.upsertByEntityId(event.id, {
            ...event,
            id: event.id,
            calendarId: "primary",
        });

        return { success: true, eventId: event.id };
    } catch (error) {
        console.error("[handleEventUpdated]", eventId, error);
        return { success: false };
    }
}