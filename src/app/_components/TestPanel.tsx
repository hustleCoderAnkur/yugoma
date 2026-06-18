"use client";

import { Check } from "lucide-react";
import { PROGRESS_STEPS, SIDEBAR } from "../../lib/constants";
import { useState, useEffect } from "react";
import GradientBlob from "@/components/ui/GradientBlob";

function DashboardMockup() {
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setVisible((v) => (v >= PROGRESS_STEPS.length ? 0 : v + 1));
        }, 900);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-slate-100 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                <span className="ml-3 text-xs text-gray-400">yugoma.ai</span>
            </div>

            <div className="flex">
                <div className="hidden sm:flex w-48 flex-col gap-1 border-r border-gray-100 p-4">
                    {SIDEBAR.map(({ icon: Icon, label, active }) => (
                        <div
                            key={label}
                            className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm ${active
                                ? "bg-linear-to-r from-slate-50 to-emerald-50 text-black font-medium"
                                : "text-gray-400"
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </div>
                    ))}
                </div>

                <div className="flex-1 p-6 sm:p-8 space-y-5">
                    <div className="flex justify-end">
                        <div className="max-w-sm rounded-2xl rounded-tr-sm bg-black text-white text-sm px-4 py-3 leading-relaxed">
                            Schedule a team meeting tomorrow at 5 PM and send invites.
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <div className="max-w-sm rounded-2xl rounded-tl-sm border border-gray-100 bg-gray-50 px-5 py-4 space-y-3">
                            {PROGRESS_STEPS.map((step, i) => (
                                <div
                                    key={step}
                                    className={`flex items-center gap-2.5 text-sm transition-opacity duration-500 ${i < visible ? "opacity-100" : "opacity-20"
                                        }`}
                                >
                                    <span
                                        className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${i < visible
                                            ? "bg-emerald-500"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {i < visible && <Check className="h-2.5 w-2.5 text-white" />}
                                    </span>
                                    <span className={i < visible ? "text-gray-700" : "text-gray-400"}>
                                        {step}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShowcaseSection() {
    return (
        <section className="relative py-28 overflow-hidden">
            <GradientBlob className="bottom-0 right-0 h-96 w-96 bg-emerald-100 opacity-50" />

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-black leading-[1.05]">
                        Everything you need
                        <br />
                        <span className="italic font-serif bg-emerald-600 bg-clip-text text-transparent">
                            Handled by Yugoma
                        </span>
                    </h2>
                </div>

                <div className="mt-16">
                    <DashboardMockup />
                </div>
            </div>
        </section>
    );
}

export {
    DashboardMockup,
    ShowcaseSection
}