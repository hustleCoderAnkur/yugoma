"use client";

import type {
    KeyboardEvent,
} from "react";

import {
    Loader2,
    Send,
} from "lucide-react";

type ChatInputProps = {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    loading?: boolean;
};

export default function ChatInput({
    value,
    onChange,
    onSend,
    loading = false,
}: ChatInputProps) {
    const handleKeyDown = (
        e: KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (
            e.key === "Enter" &&
            !e.shiftKey &&
            !loading
        ) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="border-t border-gray-100 bg-white p-5">
            <div className="flex items-end gap-3">
                <textarea
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask Yugoma..."
                    className="min-h-52px flex-1 resize-none rounded-3xl border border-gray-200 bg-gray-50 px-5 py-3 outline-none"
                />

                <button
                    type="button"
                    disabled={loading}
                    onClick={onSend}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    );
}