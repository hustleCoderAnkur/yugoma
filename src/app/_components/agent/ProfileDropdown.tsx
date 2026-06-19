"use client";

import {
    User,
    Settings,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileDropdown() {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tenantId");
        localStorage.removeItem("googleAccessToken");
        localStorage.removeItem("googleRefreshToken");

        router.push("/auth/login");
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm hover:bg-gray-50"
            >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                    <User className="h-4 w-4" />
                </div>

                <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {open && (
                <div className="absolute right-0 top-14 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                    <button
                        onClick={() =>
                            router.push("/profile")
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm hover:bg-gray-50"
                    >
                        <User className="h-4 w-4" />
                        Profile
                    </button>

                    <button
                        onClick={() =>
                            router.push("/settings")
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm hover:bg-gray-50"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}