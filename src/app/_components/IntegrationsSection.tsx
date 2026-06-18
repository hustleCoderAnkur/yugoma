"use client";

import { INTEGRATIONS } from "../../lib/constants";

export default function IntegrationsSection() {
    return (
        <section className="relative py-24">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
                    Works with the tools you already use
                </h2>

                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    {INTEGRATIONS.map(({ icon: Icon, name }) => (
                        <div
                            key={name}
                            className="flex items-center gap-2.5 rounded-full border border-gray-100 bg-white px-5 py-3 shadow-sm"
                        >
                            <Icon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">
                                {name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
