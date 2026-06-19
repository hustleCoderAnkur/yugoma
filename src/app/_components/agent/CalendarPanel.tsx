"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
    CalendarDays,
    Loader2,
    Clock3,
} from "lucide-react";

import { api } from "@/trpc/react";

type CalendarEvent = {
    id?: string;
    data?: {
        summary?: string;
        start?: {
            dateTime?: string;
            date?: string;
        };
    };
};

export default function CalendarPanel() {
    const [selectedDate, setSelectedDate] = useState<Date>(
        new Date(),
    );

    const tenantId =
        typeof window !== "undefined"
            ? localStorage.getItem("tenantId") ?? ""
            : "";

    const { data, isLoading, error } =
        api.calendar.listEvents.useQuery(
            { tenantId },
            { enabled: !!tenantId },
        );

    const events = (data as CalendarEvent[]) ?? [];

    return (
        <div className="flex h-full gap-6 bg-slate-50 p-6">
            {/* LEFT SIDE */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-32px border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                        Upcoming Events
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Review your Google Calendar schedule
                    </p>
                </div>

                {isLoading && (
                    <div className="flex flex-1 items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                    </div>
                )}

                {!isLoading && events.length === 0 && (
                    <div className="flex flex-1 items-center justify-center px-6">
                        <div className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100">
                                <CalendarDays className="h-7 w-7 text-slate-700" />
                            </div>

                            <h2 className="mt-6 text-xl font-semibold text-slate-900">
                                {error
                                    ? "Couldn't load events"
                                    : "No events found"}
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Your Google Calendar events will appear here.
                            </p>
                        </div>
                    </div>
                )}

                {!isLoading && !error && events.length > 0 && (
                    <div className="flex-1 overflow-y-auto px-5 py-5">
                        <div className="space-y-3">
                            {events.map((event) => {
                                const rawDate =
                                    event.data?.start?.dateTime ??
                                    event.data?.start?.date;

                                const date = rawDate
                                    ? new Date(rawDate)
                                    : null;

                                return (
                                    <div
                                        key={event.id}
                                        className="rounded-[28px] border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
                                    >
                                        <div className="flex gap-4">
                                            {/* Date Badge */}
                                            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-3xl bg-slate-100">
                                                <span className="text-xs font-medium text-slate-500">
                                                    {date?.toLocaleString(
                                                        "default",
                                                        {
                                                            month: "short",
                                                        },
                                                    )}
                                                </span>

                                                <span className="text-xl font-bold text-slate-900">
                                                    {date?.getDate()}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h3 className="text-sm font-semibold text-slate-900">
                                                    {event.data?.summary ??
                                                        "(No title)"}
                                                </h3>

                                                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                                                    <Clock3 className="h-4 w-4" />

                                                    {date?.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT SIDE */}
            <div className="w-380px">
                <div className="rounded-32px border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Calendar
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Quick monthly reference
                    </p>

                    <div className="mt-6">
                        <Calendar
                            value={selectedDate}
                            onChange={(value) =>
                                setSelectedDate(value as Date)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}