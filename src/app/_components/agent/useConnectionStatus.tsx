"use client";

import { api } from "@/trpc/react";

export function useConnectionStatus() {
    const tenantId =
        typeof window !== "undefined"
            ? localStorage.getItem("tenantId") ?? ""
            : "";

    const gmail = api.gmail.listThreads.useQuery(
        { tenantId },
        { enabled: !!tenantId, retry: false }
    );

    const calendar = api.calendar.listEvents.useQuery(
        { tenantId },
        { enabled: !!tenantId, retry: false }
    );

    return {
        gmailConnected:
            !gmail.isError &&
            Array.isArray(gmail.data) &&
            gmail.data.length > 0,

        calendarConnected:
            !calendar.isError &&
            Array.isArray(calendar.data) &&
            calendar.data.length > 0,
    };
}