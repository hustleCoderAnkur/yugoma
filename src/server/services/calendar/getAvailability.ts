import { getCalendarClient } from "../../lib/getCalendarClient";

type GetAvailabilityInput = {
    timeMin: string;
    timeMax: string;
    timeZone?: string;
    items?: { id: string }[];
};

export async function getAvailability(
    tenantId: string,
    input: GetAvailabilityInput,
) {
    const calendar = getCalendarClient(tenantId);

    return await calendar.api.calendar.getAvailability({
        timeMin: input.timeMin,
        timeMax: input.timeMax,
        timeZone: input.timeZone,
        items: input.items,
    });
}