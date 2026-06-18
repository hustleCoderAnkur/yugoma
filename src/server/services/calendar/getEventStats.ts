import { getCalendarClient } from "../../lib/getCalendarClient";

export async function getEventStats(
    tenantId: string,
) {
    const calendar = getCalendarClient(tenantId);

    const events = await calendar.db.events.list({});

    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(now);
    startOfWeek.setDate(
        now.getDate() - now.getDay(),
    );
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
    );

    let eventsToday = 0;
    let eventsThisWeek = 0;
    let eventsThisMonth = 0;
    let hoursBooked = 0;

    for (const event of events) {
        const start = event.data.start?.dateTime;
        const end = event.data.end?.dateTime;

        if (!start || !end) continue;

        const startDate = new Date(start);
        const endDate = new Date(end);

        if (startDate >= startOfToday) {
            eventsToday++;
        }

        if (startDate >= startOfWeek) {
            eventsThisWeek++;
        }

        if (startDate >= startOfMonth) {
            eventsThisMonth++;
        }

        hoursBooked +=
            (endDate.getTime() -
                startDate.getTime()) /
            (1000 * 60 * 60);
    }

    return {
        totalEvents: events.length,
        eventsToday,
        eventsThisWeek,
        eventsThisMonth,
        hoursBooked,
    };
}