"use client";

import Sidebar from "@/app/_components/agent/Sidebar";
import ProfileDropdown from "@/app/_components/agent/ProfileDropdown";
import CalendarPanel from "@/app/_components/agent/CalendarPanel";
import { useConnectionStatus } from "@/app/_components/agent/useConnectionStatus";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function CalendarPage() {
    const { gmailConnected, calendarConnected } = useConnectionStatus();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar
                gmailConnected={gmailConnected}
                calendarConnected={calendarConnected}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="
                flex h-11 w-11 items-center justify-center
                rounded-2xl border border-slate-200
                bg-white
                transition
                hover:bg-slate-50
            "
                        >
                            <Menu className="h-5 w-5 text-slate-700" />
                        </button>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Calendar
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage your schedule and events
                            </p>
                        </div>

                    </div>

                    <ProfileDropdown />
                </div>

                <div className="flex-1 overflow-y-auto">
                    <CalendarPanel />
                </div>
            </div>
        </div>
    );
}