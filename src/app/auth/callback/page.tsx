"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type GoogleTokenResponse = {
    access_token: string;
    refresh_token?: string;
};

type GoogleCallbackResponse = {
    success: boolean;
    message?: string;
    tokens?: GoogleTokenResponse;
};

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const code = searchParams.get("code");

                if (!code) {
                    throw new Error("Missing authorization code");
                }

                const response = await fetch(
                    `/api/auth/google/callback?code=${code}`,
                );

                const data =
                    (await response.json()) as GoogleCallbackResponse;

                if (!data.success || !data.tokens) {
                    throw new Error(
                        data.message ?? "Authentication failed",
                    );
                }

                const tokens = data.tokens;

                localStorage.setItem(
                    "googleAccessToken",
                    tokens.access_token,
                );

                if (tokens.refresh_token) {
                    localStorage.setItem(
                        "googleRefreshToken",
                        tokens.refresh_token,
                    );
                }

                router.replace("/agent");
            } catch (error) {
                console.error(
                    "Google authentication failed:",
                    error,
                );

                router.replace("/auth/login");
            }
        };

        void handleCallback();
    }, [router, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="text-center">
                <h1 className="text-2xl font-semibold">
                    Connecting Google...
                </h1>

                <p className="mt-3 text-sm text-gray-500">
                    Please wait while we complete authentication.
                </p>
            </div>
        </div>
    );
}

export default function CallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    Loading...
                </div>
            }
        >
            <CallbackContent />
        </Suspense>
    );
}