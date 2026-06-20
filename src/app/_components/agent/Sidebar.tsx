"use client";

import {
    Bot,
    Mail,
    Calendar,
    X,
} from "lucide-react";
import {
    useRouter,
    usePathname,
} from "next/navigation";
import { Switch } from "@headlessui/react";
import { api } from "@/trpc/react";

type SidebarProps = {
    gmailConnected: boolean;
    calendarConnected: boolean;
    isOpen: boolean;
    onClose: () => void;
};

const navItems = [
    {
        label: "Agent",
        href: "/agent",
        icon: Bot,
    },
    {
        label: "Emails",
        href: "/agent/Email",
        icon: Mail,
    },
    {
        label: "Calendar",
        href: "/agent/Calendar",
        icon: Calendar,
    },
];

export default function Sidebar({
    gmailConnected,
    calendarConnected,
    isOpen,
    onClose,
}: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const tenantId =
        typeof window !== "undefined"
            ? localStorage.getItem("tenantId")
            : "";

    const disconnectGmail = api.gmail.disconnectGmail.useMutation();

    const disconnectCalendar = api.calendar.disconnectCalendar.useMutation();

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed left-0 top-0 z-50
                    h-screen w-72
                    border-r border-gray-100
                    bg-white p-5
                    transition-transform duration-300
                    ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black">
                            <Bot className="h-5 w-5 text-white" />
                        </div>

                        <span className="text-lg font-semibold tracking-tight">
                            Yugoma
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 transition hover:bg-gray-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="space-y-1.5">
                    {navItems.map(
                        ({ label, href, icon: Icon }) => {
                            const isActive =
                                href === "/agent"
                                    ? pathname === "/agent"
                                    : pathname?.startsWith(
                                        href,
                                    );

                            return (
                                <button
                                    key={href}
                                    onClick={() => {
                                        router.push(href);
                                        onClose();
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${isActive
                                            ? "bg-black text-white"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {label}
                                </button>
                            );
                        },
                    )}
                </div>

                <div className="flex-1" />

                <div className="absolute bottom-5 left-5 right-5 space-y-3 border-t border-gray-100 pt-4">

                    <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                Gmail
                            </p>

                            <p
                                className={`text-xs ${gmailConnected
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                            >
                                {gmailConnected
                                    ? "Connected"
                                    : "Not Connected"}
                            </p>
                        </div>

                        
                        <Switch
                            checked={gmailConnected}
                            onChange={async (checked) => {
                                if (checked) {
                                    router.push(
                                        `/api/connect?plugin=gmail&tenantId=${encodeURIComponent(
                                            tenantId ?? ""
                                        )}`
                                    );
                                } else {
                                    await disconnectGmail.mutateAsync({
                                        tenantId: tenantId ?? "",
                                    });

                                    router.refresh();
                                }
                            }}
                            className={`${gmailConnected
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                } relative inline-flex h-7 w-12 items-center rounded-full transition`}
                        >
                            <span
                                className={`${gmailConnected
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                    } inline-block h-5 w-5 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>

                    {/* Calendar */}
                    <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                Calendar
                            </p>

                            <p
                                className={`text-xs ${calendarConnected
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                            >
                                {calendarConnected
                                    ? "Connected"
                                    : "Not Connected"}
                            </p>
                        </div>

                        <Switch
                            checked={calendarConnected}
                            onChange={async (checked) => {
                                if (checked) {
                                    router.push(
                                        `/api/connect?plugin=googlecalendar&tenantId=${encodeURIComponent(
                                            tenantId ?? ""
                                        )}`
                                    );
                                } else {
                                    await disconnectCalendar.mutateAsync({
                                        tenantId: tenantId ?? "",
                                    });

                                    router.refresh();
                                }
                            }}
                            className={`${calendarConnected
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                } relative inline-flex h-7 w-12 items-center rounded-full transition`}
                        >
                            <span
                                className={`${calendarConnected
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                    } inline-block h-5 w-5 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    );
}