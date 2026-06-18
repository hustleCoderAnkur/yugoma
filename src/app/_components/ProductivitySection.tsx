"use client";

import { Sparkles } from "lucide-react";

export default function ProductivitySection() {
    return (
        <section className="relative py-28">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-black leading-[1.05]">
                        Focus on work
                        <br />
                        <span className="italic font-serif">Not on busywork</span>
                    </h2>
                    <p className="mt-6 text-lg text-gray-500 max-w-md leading-relaxed">
                        Yugoma becomes your AI executive assistant, helping you stay
                        organized without switching between apps
                    </p>
                </div>

                <div className="relative rounded-3xl bg-linear-to-br from-slate-700 to-emerald-400 p-10 sm:p-12 text-white shadow-2xl shadow-slate-200 overflow-hidden">
                    <Sparkles className="h-8 w-8 text-white/80" />
                    <p className="mt-8 text-2xl font-semibold leading-snug">
                        “One assistant for every inbox, every calendar, every
                        follow-up”
                    </p>
                    <div className="mt-10 grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-3xl font-bold">6+ hrs</p>
                            <p className="text-sm text-white/80 mt-1">Saved weekly</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">0</p>
                            <p className="text-sm text-white/80 mt-1">Missed meetings</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 