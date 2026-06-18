
import { corsair } from "../corsair";

export function getCalendarClient(tenantId: string) {
    return corsair.withTenant(tenantId).googlecalendar;
}

