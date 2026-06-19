"use client";

import { BookOpen, Lock } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const columns = [
        {
            title: "Product",
            links: [
                { label: "Features", href: "#features" },
                { label: "Docs", href: "#" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "Security", href: "#" },
                { label: "Blog", href: "#" },
            ],
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
            ],
        },
    ];

    return (
        <footer className="relative overflow-hidden bg-black pb-10 pt-20 text-white">
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>

                            <span className="text-lg font-semibold tracking-tight">
                                Yugoma
                            </span>
                        </div>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
                            Your AI Executive Assistant for Gmail and Google
                            Calendar productivity.
                        </p>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-sm font-medium text-gray-300">
                                {column.title}
                            </h3>

                            <ul className="mt-4 space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-500 transition-colors hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Yugoma. All rights
                        reserved.
                    </p>

                    <div className="flex items-center gap-5 text-gray-500">
                        <Link
                            href="/privacy"
                            className="transition hover:text-white"
                            title="Privacy Policy"
                        >
                            <Lock className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-white"
                            title="Terms & Conditions"
                        >
                            <BookOpen className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}