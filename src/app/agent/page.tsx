"use client";

import React, {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
} from "react";
import { api } from "@/trpc/react";
import {
    Send,
    Sparkles,
    Bot,
    User,
    Loader2,
    ChevronDown,
    LogOut,
    Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { COMMANDS } from "@/lib/constants";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    error?: boolean;
};

type MessageBubbleProps = {
    role: "user" | "assistant";
    content: string;
    error?: boolean;
};

type EmptyStateProps = {
    onPick: (command: string) => void;
};

type ChatInputProps = {
    value: string;
    onChange: (
        e: ChangeEvent<HTMLTextAreaElement>
    ) => void;
    onSend: () => void;
    loading: boolean;
};

function MessageBubble({
    role,
    content,
    error = false,
}: MessageBubbleProps) {
    const isUser = role === "user";

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-sm ${error
                    ? "border border-red-100 bg-red-50"
                    : isUser
                        ? "bg-black text-white"
                        : "border border-gray-100 bg-white"
                    }`}
            >
                <div className="mb-2 flex items-center gap-2">
                    {isUser ? (
                        <User className="h-4 w-4" />
                    ) : (
                        <Bot className="h-4 w-4 text-slate-950" />
                    )}

                    <span className="text-xs font-medium opacity-70">
                        {isUser ? "You" : "Yugoma"}
                    </span>
                </div>

                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {content}
                </p>
            </div>
        </div>
    );
}

function EmptyState({
    onPick,
}: EmptyStateProps) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500">
                <Sparkles className="h-7 w-7 text-white" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-black">
                Ask Yugoma anything
            </h2>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
                Email, calendar and productivity actions through natural
                language.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
                {COMMANDS.map((command) => (
                    <button
                        key={command}
                        type="button"
                        onClick={() => onPick(command)}
                        className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                        {command}
                    </button>
                ))}
            </div>
        </div>
    );
}

function ChatInput({
    value,
    onChange,
    onSend,
    loading,
}: ChatInputProps) {
    const handleKeyDown = (
        e: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="border-t border-gray-100 bg-white p-5">
            <div className="flex items-end gap-3">
                <textarea
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask Yugoma..."
                    className="min-h-[52px] flex-1 resize-none rounded-3xl border border-gray-200 bg-gray-50 px-5 py-3 outline-none"
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

export default function AgentPage() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const bottomRef =
        useRef<HTMLDivElement | null>(null);

    // ── real tRPC mutation ──────────────────────────────────────
    const chatMutation = api.agent.chat.useMutation();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const sendMessage = async (
        text: string
    ) => {
        const trimmed = text.trim();

        if (!trimmed || loading) return;

        setInput("");

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: trimmed,
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        setLoading(true);

        try {
            // ── real call → agentRouter.chat ────────────────────
            const tenantId =
                localStorage.getItem("tenantId") ?? "";

            const result = await chatMutation.mutateAsync({
                tenantId,
                query: trimmed,
            });

            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: result.response,
                error: !result.success,
            };

            setMessages((prev) => [
                ...prev,
                assistantMessage,
            ]);
        } catch (err: unknown) {
            const errorMessage: Message = {
                id: crypto.randomUUID(),
                role: "assistant",
                error: true,
                content:
                    err instanceof Error
                        ? err.message
                        : "Something went wrong. Please try again.",
            };

            setMessages((prev) => [
                ...prev,
                errorMessage,
            ]);
        } finally {
            setLoading(false);
        }
    };

    const router = useRouter();

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
                <div>
                    <h1 className="text-2xl font-bold text-black">
                        Yugoma Agent
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Email + Calendar AI assistant
                    </p>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm hover:bg-gray-50"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                            <User className="h-4 w-4" />
                        </div>

                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 top-14 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                            <button
                                onClick={() => router.push("/profile")}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm hover:bg-gray-50"
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </button>

                            <button
                                onClick={()=> router.push("settings")}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm hover:bg-gray-50">
                                <Settings className="h-4 w-4" />
                                Settings
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("accessToken");
                                    localStorage.removeItem("refreshToken");

                                    router.push("/auth/login");
                                }}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
                {messages.length === 0 ? (
                    <EmptyState
                        onPick={(command) => {
                            void sendMessage(command);
                        }}
                    />
                ) : (
                    <div className="mx-auto flex max-w-4xl flex-col gap-5">
                        {messages.map((message) => (
                            <MessageBubble
                                key={message.id}
                                role={message.role}
                                content={message.content}
                                error={message.error}
                            />
                        ))}

                        <div ref={bottomRef} />
                    </div>
                )}
            </div>

            <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSend={() => {
                    void sendMessage(input);
                }}
                loading={loading}
            />
        </div>
    );
}