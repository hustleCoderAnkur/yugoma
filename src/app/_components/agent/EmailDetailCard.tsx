"use client";

import { Loader2, Reply, Archive, Trash2 } from "lucide-react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type EmailDetailCardProps = {
    tenantId: string;
    threadId: string;
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

type GmailThread = {
    id: string;
    historyId?: string;
    messages?: GmailMessage[];
};

export default function EmailDetailCard({
    tenantId,
    threadId,
}: EmailDetailCardProps) {
    const { data, isLoading, isError } = api.gmail.getThread.useQuery(
            {
                tenantId,
                threadId,
            },
            {
                enabled: !!tenantId && !!threadId,
            },
        );

    const router = useRouter();
    
    if (isLoading) {
        return (
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                    <span className="text-sm text-gray-500">
                        Loading email...
                    </span>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <p className="text-sm text-red-500">
                    Failed to load email.
                </p>
            </div>
        );
    }

    const thread = data as GmailThread;

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

    const to =
        headers.find(
            (header) => header.name === "To",
        )?.value ?? "Unknown recipient";

    const subject =
        headers.find(
            (header) => header.name === "Subject",
        )?.value ?? "(No subject)";

    const date =
        headers.find(
            (header) => header.name === "Date",
        )?.value ?? "";

    const body =
        latest?.snippet ??
        "No content available.";
    
    
    const archiveMutation =
        api.gmail.archiveEmail.useMutation();

    const trashMutation =
        api.gmail.trashThread.useMutation();
    
    const handleReply = () => {
        localStorage.setItem(
            "replyContext",
            JSON.stringify({
                threadId,
                from,
                to,
                subject,
                body,
            }),
        );

        router.push("/agent");
    };

    const handleArchive = async () => {
        await archiveMutation.mutateAsync({
            tenantId,
            threadId,
        });
    };

    const handleTrash = async () => {
        await trashMutation.mutateAsync({
            tenantId,
            threadId,
        });
    };

    return (
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="border-b border-gray-100 pb-6">
                <h1 className="text-2xl font-bold text-black">
                    {subject}
                </h1>

                <div className="mt-5 space-y-2 text-sm text-gray-600">
                    <p>
                        <span className="font-medium text-black">
                            From:
                        </span>{" "}
                        {from}
                    </p>

                    <p>
                        <span className="font-medium text-black">
                            To:
                        </span>{" "}
                        {to}
                    </p>

                    <p>
                        <span className="font-medium text-black">
                            Date:
                        </span>{" "}
                        {date}
                    </p>

                    <p>
                        <span className="font-medium text-black">
                            Messages:
                        </span>{" "}
                        {messages.length}
                    </p>
                </div>
            </div>

            <div className="py-8">
                <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                    {body}
                </p>
            </div>

            <div className="flex gap-3 border-t border-gray-100 pt-6">
                <button
                    onClick={handleReply}
                    className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                    <Reply className="h-4 w-4" />
                    Reply
                </button>

                <button
                    onClick={handleArchive}
                    className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                    <Archive className="h-4 w-4" />
                    Archive
                </button>

                <button
                    onClick={handleTrash}
                    className="flex items-center gap-2 rounded-2xl border border-red-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                >
                    <Trash2 className="h-4 w-4" />
                    Trash
                </button>
            </div>
        </div>
    );
}