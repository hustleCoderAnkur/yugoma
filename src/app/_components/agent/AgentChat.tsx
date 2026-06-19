"use client";

import MessageBubble from "./MessageBubble";
import EmptyState from "./EmptyState";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    error?: boolean;
};

type AgentChatProps = {
    messages: Message[];
    onPickCommand: (command: string) => void;
};

export default function AgentChat({
    messages,
    onPickCommand,
}: AgentChatProps) {
    if (messages.length === 0) {
        return (
            <EmptyState
                onPick={onPickCommand}
            />
        );
    }

    return (
        <div className="mx-auto flex max-w-4xl flex-col gap-6 pb-4">
            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    error={message.error}
                />
            ))}
        </div>
    );
}