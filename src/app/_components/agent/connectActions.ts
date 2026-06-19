"use client";

export function connectGmail() {
    const tenantId =
        typeof window !== "undefined"
            ? localStorage.getItem("tenantId") ?? ""
            : "";

    if (!tenantId) return;

    window.location.href = `/api/connect?plugin=gmail&tenantId=${encodeURIComponent(
        tenantId,
    )}`;
}

export function connectGoogleCalendar() {
    const tenantId =
        typeof window !== "undefined"
            ? localStorage.getItem("tenantId") ?? ""
            : "";

    if (!tenantId) return;

    window.location.href = `/api/connect?plugin=googlecalendar&tenantId=${encodeURIComponent(
        tenantId,
    )}`;
}