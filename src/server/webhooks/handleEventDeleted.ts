import { getCalendarClient } from "../lib/getCalendarClient";

type HandleEventDeletedInput = {
    tenantId: string;
    eventId: string;
};

export async function handleEventDeleted({
    tenantId,
    eventId,
}: HandleEventDeletedInput) {
    try {
        const calendar = getCalendarClient(tenantId);

        await calendar.db.events.deleteByEntityId(eventId);

        return { success: true, eventId };
    } catch (error) {
        console.error("[handleEventDeleted]", eventId, error);
        return { success: false };
    }
}