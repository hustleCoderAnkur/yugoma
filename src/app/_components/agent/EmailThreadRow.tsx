"use client";

import { Loader2 } from "lucide-react";
import { api } from "@/trpc/react";

type EmailThreadRowProps = {
    tenantId: string;
    threadId: string;
    fallbackSnippet?: string;
    onClick?: () => void;
};

type GmailHeader = {
    name?: string;
    value?: string;
};

type GmailMessage = {
    snippet?: string;
    internalDate?: string;
    payload?: {
        headers?: GmailHeader[];
    };
};

type GmailThreadResponse = {
    id: string;
    historyId?: string;
    messages?: GmailMessage[];
};

export default function EmailThreadRow({
    tenantId,
    threadId,
    fallbackSnippet,
    onClick,
}: EmailThreadRowProps) {
    const {
        data,
        isLoading,
        isError,
    } = api.gmail.getThread.useQuery(
        {
            tenantId,
            threadId,
        },
        {
            enabled: !!tenantId && !!threadId,
            // These two options are the actual fix for the
            // "stuck Loading email..." / rate-limit problem:
            // - staleTime keeps the result cached for 5 min so
            //   re-renders / pagination don't re-fire the same
            //   20 requests over and over.
            // - retry: false stops react-query from silently
            //   retrying a rate-limited call 3x with backoff,
            //   which is what was making isLoading hang forever.
            staleTime: 5 * 60 * 1000,
            retry: false,
        },
    );

    if (isLoading) {
        return (
            <div className="flex items-center gap-3 rounded-[28px] border border-slate-200 bg-white px-5 py-5">
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />

                <span className="text-sm text-slate-500">
                    Loading email...
                </span>
            </div>
        );
    }

    if (isError || !data) {
        // Fall back to whatever the list endpoint already gave us
        // instead of just showing a dead-end error row.
        return (
            <button
                type="button"
                onClick={onClick}
                className="w-full rounded-[28px] border border-slate-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
            >
                <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                        ?
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="truncate text-sm font-semibold text-slate-900">
                            Unable to load
                        </span>
                        <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500">
                            {fallbackSnippet ?? ""}
                        </p>
                    </div>
                </div>
            </button>
        );
    }

    const thread = data as GmailThreadResponse;

    const messages = thread.messages ?? [];

    const latest =
        messages.length > 0
            ? messages[messages.length - 1]
            : undefined;

    const headers =
        latest?.payload?.headers ?? [];

    const from =
        headers.find(
            (header) => header.name === "From",
        )?.value ?? "Unknown sender";

    const senderName =
        (from.split("<")[0] ?? "").trim() || "Unknown sender";

    const subject =
        headers.find(
            (header) => header.name === "Subject",
        )?.value ?? "(No subject)";

    const snippet =
        latest?.snippet ??
        fallbackSnippet ??
        "";

    return (
        <button
            type="button"
            onClick={onClick}
            className="
                group
                w-full
                rounded-[28px]
                border border-slate-200
                bg-white
                p-5
                text-left
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-slate-300
                hover:bg-slate-50
                hover:shadow-md
            "
        >
            <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                    {senderName.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-semibold text-slate-900">
                            {senderName}
                        </span>

                        <div className="h-2 w-2 rounded-full bg-slate-300" />
                    </div>

                    <p className="mt-2 truncate text-sm font-medium text-slate-700">
                        {subject}
                    </p>

                    <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500">
                        {snippet}
                    </p>
                </div>
            </div>
        </button>
    );
}