import { getCalendarClient } from "../lib/getCalendarClient";

type HandleEventCreatedInput = {
    tenantId: string;
    eventId: string;
};

export async function handleEventCreated({
    tenantId,
    eventId,
}: HandleEventCreatedInput) {
    try {
        const calendar = getCalendarClient(tenantId);

        const event = await calendar.api.events.get({
            id: eventId,
        });

        if (!event.id) {
            console.warn("[handleEventCreated] event has no id", eventId);
            return { success: false };
        }

        await calendar.db.events.upsertByEntityId(event.id, {
            ...event,
            id: event.id,
            calendarId: "primary",
        });

        return { success: true, eventId: event.id };
    } catch (error) {
        console.error("[handleEventCreated]", eventId, error);
        return { success: false };
    }
}