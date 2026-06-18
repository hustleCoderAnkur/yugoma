"use client";

import { BookOpen, Lock } from "lucide-react";

export default function Footer() {
    const columns = [
        { title: "Product", links: ["Features", "Docs"] },
        { title: "Company", links: ["Security", "Blog"] },
        { title: "Legal", links: ["Privacy"] },
    ];

    return (
        <footer className="relative bg-black text-white pt-20 pb-10 overflow-hidden">

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-xl bg-emerald-600" />
                            <span className="text-lg font-semibold tracking-tight">
                                Yugoma
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-gray-400 max-w-xs leading-relaxed">
                            Your AI Executive Assistant
                        </p>
                    </div>

                    {columns.map((col) => (
                        <div key={col.title}>
                            <p className="text-sm font-medium text-gray-300">
                                {col.title}
                            </p>
                            <ul className="mt-4 space-y-2.5">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-gray-500 hover:text-white transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Yugoma. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5 text-gray-500">
                        <Lock className="h-4 w-4" />
                        <BookOpen className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </footer>
    );
}