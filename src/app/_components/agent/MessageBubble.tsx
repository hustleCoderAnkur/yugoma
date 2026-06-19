"use client";

import { Bot, User } from "lucide-react";

type MessageBubbleProps = {
    role: "user" | "assistant";
    content: string;
    error?: boolean;
};

export default function MessageBubble({
    role,
    content,
    error = false,
}: MessageBubbleProps) {
    const isUser = role === "user";

    return (
        <div
            className={`flex items-end gap-2.5 ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            {!isUser && (
                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${error ? "bg-red-100" : "bg-black"
                        }`}
                >
                    <Bot
                        className={`h-4 w-4 ${error ? "text-red-500" : "text-white"
                            }`}
                    />
                </div>
            )}

            <div
                className={`max-w-[75%] rounded-3xl px-5 py-3.5 shadow-sm ${error
                        ? "border border-red-100 bg-red-50"
                        : isUser
                            ? "bg-black text-white"
                            : "border border-gray-100 bg-white"
                    }`}
            >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {content}
                </p>
            </div>

            {isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <User className="h-4 w-4 text-gray-600" />
                </div>
            )}
        </div>
    );
}