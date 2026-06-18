"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                /*
                 Future:
                 - Read auth code from URL
                 - Exchange code for session
                 - Store tokens/session
                 - Fetch user profile
                */

                // Temporary simulation
                await new Promise((resolve) => setTimeout(resolve, 1500));

                router.replace("/agent");
            } catch (error) {
                console.error("Authentication failed:", error);
                router.replace("/auth/login");
            }
        };

        void handleCallback();
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-slate-950" />

                <h1 className="mt-6 text-2xl font-semibold text-black">
                    Completing Sign In
                </h1>

                <p className="mt-2 text-gray-500">
                    Please wait while we authenticate your account...
                </p>
            </div>
        </div>
    );
}