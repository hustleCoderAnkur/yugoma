"use client";

import { useState } from "react";
import {
    Mail,
    Loader2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { api } from "@/trpc/react";

import EmailThreadRow from "./EmailThreadRow";
import EmailDetailCard from "./EmailDetailCard";

type GmailThread = {
    id: string;
    entity_id?: string;
    snippet?: string;
};

export default function EmailPanel() {
    const [selectedThreadId, setSelectedThreadId] =
        useState<string | null>(null);

    const [page, setPage] = useState(1);

    const tenantId =
        typeof window !== "undefined"
            ? localStorage.getItem("tenantId") ?? ""
            : "";

    const { data, isLoading, error } =
        api.gmail.listThreads.useQuery(
            {
                tenantId,
            },
            {
                enabled: !!tenantId,
            },
        );

    const allThreads =
        (data as GmailThread[]) ?? [];

    const ITEMS_PER_PAGE = 20;

    const totalPages = Math.max(
        1,
        Math.ceil(allThreads.length / ITEMS_PER_PAGE),
    );

    const startIndex =
        (page - 1) * ITEMS_PER_PAGE;

    const threads = allThreads.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE,
    );

    return (
        <div className="flex h-full gap-6 bg-slate-50 p-6">
            {/* LEFT PANEL */}
            <div className="flex w-420px flex-col overflow-hidden rounded-32px border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="border-b border-slate-100 px-5 py-5">
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                        Inbox
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Review and manage connected Gmail threads
                    </p>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="flex flex-1 items-center justify-center">
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                            <Loader2 className="h-5 w-5 animate-spin text-slate-500" />

                            <span className="text-sm text-slate-500">
                                Loading emails...
                            </span>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && threads.length === 0 && (
                    <div className="flex flex-1 items-center justify-center px-6">
                        <div className="max-w-sm text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100">
                                <Mail className="h-7 w-7 text-slate-700" />
                            </div>

                            <h2 className="mt-6 text-xl font-semibold tracking-tight text-slate-900">
                                {error
                                    ? "Couldn't load emails"
                                    : "No emails found"}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Connected Gmail messages will appear here once your inbox has items.
                            </p>
                        </div>
                    </div>
                )}

                {/* Email List */}
                {!isLoading &&
                    !error &&
                    threads.length > 0 && (
                        <>
                            <div className="flex-1 overflow-y-auto px-4 py-4">
                                <div className="space-y-3">
                                    {threads.map((thread) => (
                                        <EmailThreadRow
                                            key={thread.id}
                                            tenantId={tenantId}
                                            threadId={
                                                thread.entity_id ??
                                                thread.id
                                            }
                                            fallbackSnippet={
                                                thread.snippet
                                            }
                                            onClick={() =>
                                                setSelectedThreadId(
                                                    thread.entity_id ??
                                                    thread.id,
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="border-t border-slate-100 px-5 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-slate-500">
                                        Showing{" "}
                                        <span className="font-medium text-slate-900">
                                            {startIndex + 1}
                                        </span>
                                        –
                                        <span className="font-medium text-slate-900">
                                            {Math.min(
                                                startIndex +
                                                ITEMS_PER_PAGE,
                                                allThreads.length,
                                            )}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-medium text-slate-900">
                                            {allThreads.length}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                setPage((prev) =>
                                                    Math.max(
                                                        prev - 1,
                                                        1,
                                                    ),
                                                )
                                            }
                                            disabled={page === 1}
                                            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-50 disabled:opacity-40"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>

                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                                            {page} / {totalPages}
                                        </div>

                                        <button
                                            onClick={() =>
                                                setPage((prev) =>
                                                    Math.min(
                                                        prev + 1,
                                                        totalPages,
                                                    ),
                                                )
                                            }
                                            disabled={
                                                page === totalPages
                                            }
                                            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-50 disabled:opacity-40"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-1 overflow-y-auto">
                {selectedThreadId ? (
                    <div className="w-full">
                        <EmailDetailCard
                            tenantId={tenantId}
                            threadId={selectedThreadId}
                        />
                    </div>
                ) : (
                    <div className="flex flex-1 items-center justify-center rounded-32px border border-dashed border-slate-200 bg-white shadow-sm">
                        <div className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100">
                                <Mail className="h-7 w-7 text-slate-700" />
                            </div>

                            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
                                Select an email
                            </h2>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                Choose a message from the left panel to view the full thread.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}