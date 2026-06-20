"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

import { api } from "@/trpc/react";

import Sidebar from "../_components/agent/Sidebar";
import ProfileDropdown from "../_components/agent/ProfileDropdown";
import ChatInput from "../_components/agent/ChatInput";
import AgentChat from "../_components/agent/AgentChat";
import { useConnectionStatus } from "../_components/agent/useConnectionStatus";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    error?: boolean;
};

type ReplyContext = {
    threadId: string;
    from: string;
    to: string;
    subject: string;
    body: string;
};

function buildReplyPrefill(ctx: ReplyContext) {
    return `Reply to email from ${ctx.from}
Subject: ${ctx.subject}
Thread ID: ${ctx.threadId}

Original message:
"${ctx.body}"

My reply:
`;
}

export default function AgentPage() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    const { gmailConnected, calendarConnected } =
        useConnectionStatus();

    const chatMutation = api.agent.chat.useMutation();

    useEffect(() => {
        const stored =
            localStorage.getItem("replyContext");

        if (!stored) return;

        try {
            const ctx = JSON.parse(stored) as ReplyContext;

            setInput(buildReplyPrefill(ctx));
        } catch {
            // ignore malformed context
        } finally {
            localStorage.removeItem("replyContext");
        }
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const sendMessage = async (text: string) => {
        const trimmed = text.trim();

        if (!trimmed || loading) return;

        setInput("");

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: trimmed,
        };

        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);

        try {
            const tenantId =
                localStorage.getItem("tenantId") ?? "";

            const username =
                localStorage.getItem("username") ?? "";

            const email =
                localStorage.getItem("tenantId") ?? "";

            const result =
                await chatMutation.mutateAsync({
                    tenantId,
                    query: trimmed,
                    username,
                    email,
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

    return (
        <div className="h-screen bg-slate-50">
            <Sidebar
                gmailConnected={gmailConnected}
                calendarConnected={calendarConnected}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex h-screen flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-50"
                        >
                            <Menu className="h-5 w-5 text-slate-700" />
                        </button>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Yugoma Agent
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Email + Calendar AI assistant
                            </p>
                        </div>
                    </div>

                    <ProfileDropdown />
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <AgentChat
                        messages={messages}
                        onPickCommand={(command) => {
                            void sendMessage(command);
                        }}
                    />

                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <ChatInput
                    value={input}
                    onChange={setInput}
                    onSend={() => {
                        void sendMessage(input);
                    }}
                    loading={loading}
                />
            </div>
        </div>
    );
}