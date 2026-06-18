"use client";

import { ArrowLeft, Construction, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b border-gray-100 bg-white px-6 py-5">
                <div className="mx-auto flex max-w-2xl items-center justify-between">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <span className="text-sm font-medium text-black">Settings</span>
                    <div className="w-16" />
                </div>
            </div>

            <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
                <div className="mx-auto max-w-md text-center">

                    <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
                        <div className="absolute inset-0 rounded-3xl bg-amber-100 opacity-60 blur-xl" />
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-amber-100 bg-amber-50 shadow-sm">
                            <Construction className="h-10 w-10 text-amber-500" />
                        </div>
                    </div>

                    <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1">
                        <Sparkles className="h-3 w-3 text-amber-500" />
                        <span className="text-xs font-medium text-amber-600">Coming Soon</span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-black">
                        We are building
                        <br />
                        <span className="italic font-serif bg-emerald-500 bg-clip-text text-transparent">
                            something great
                        </span>
                    </h1>

                    <p className="mt-4 text-sm leading-relaxed text-gray-500">
                        Settings are currently under construction. Notifications, appearance, privacy controls and more all on the way.
                    </p>

                    {/* Upcoming features */}
                    <div className="mt-8 space-y-2 text-left">
                        {[
                            "Notification preferences",
                            "Theme & appearance",
                            "Privacy & security",
                            "Connected accounts",
                            "Activity log",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3"
                            >
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                <span className="text-sm text-gray-400">{item}</span>
                                <div className="ml-auto rounded-full bg-gray-100 px-2 py-0.5">
                                    <span className="text-xs text-gray-400">Soon</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}