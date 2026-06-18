import { getCalendarClient } from "../../lib/getCalendarClient";

type CreateEventInput = {
    summary: string;
    description?: string;
    location?: string;
    start: {
        dateTime: string;
        timeZone?: string;
    };
    end: {
        dateTime: string;
        timeZone?: string;
    };
};

export async function createEvent(
    tenantId: string,
    input: CreateEventInput,
) {
    const calendar = getCalendarClient(tenantId);

    const event = {
        summary: input.summary,
        start: {
            dateTime: input.start.dateTime,
            timeZone: input.start.timeZone ?? "Asia/Kolkata",
        },
        end: {
            dateTime: input.end.dateTime,
            timeZone: input.end.timeZone ?? "Asia/Kolkata",
        },
        ...(input.description ? { description: input.description } : {}),
        ...(input.location ? { location: input.location } : {}),
    };

    return await calendar.api.events.create({ event });
}