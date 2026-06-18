"use client";

import GradientBlob from "@/components/ui/GradientBlob";
import { STEPS } from "../../lib/constants";


export default function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-28 overflow-hidden">
            <GradientBlob className="top-0 left-1/2 -translate-x-1/2 h-72 w-72 bg-slate-100 opacity-60" />

            <div className="relative max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-black leading-[1.05]">
                    One command
                    <br />
                    <span className="italic font-serif bg-linear-to-r from-slate-900 to-emerald-500 bg-clip-text text-transparent">
                        Many actions
                    </span>
                </h2>

                <div className="mt-16 grid sm:grid-cols-3 gap-8 text-left">
                    {STEPS.map((s) => (
                        <div
                            key={s.n}
                            className="rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-xl p-8 shadow-sm"
                        >
                            <span className="text-sm font-semibold text-slate-400">
                                {s.n}
                            </span>
                            <h3 className="mt-4 text-xl font-semibold text-black">
                                {s.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}