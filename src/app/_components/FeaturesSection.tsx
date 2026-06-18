"use client";

import { FEATURES } from "~/lib/constants"

export default function FeaturesSection() {
    return (
        <section id="features" className="relative py-28">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-xl">
                    Capabilities
                    <h2 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight text-black leading-[1.05]">
                        Built to handle
                        <br />
                        <span className="italic font-serif">your busywork</span>
                    </h2>
                </div>

                <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="group rounded-3xl border border-gray-100 bg-white p-8 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="h-11 w-11 rounded-2xl   bg-emerald-600 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-black">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}