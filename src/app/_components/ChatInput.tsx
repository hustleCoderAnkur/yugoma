"use client";

type ChatInputProps = {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    isLoading?: boolean;
};

export default function ChatInput({
    value,
    onChange,
    onSend,
    isLoading = false,
}: ChatInputProps) {
    return (
        <div className="flex gap-3 border-t border-zinc-800 bg-black p-4">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !isLoading) {
                        onSend();
                    }
                }}
                placeholder="Ask Ankur..."
                className="flex-1 rounded-xl bg-zinc-900 px-4 py-3 text-white outline-none"
            />

            <button
                onClick={onSend}
                disabled={isLoading}
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white disabled:opacity-50"
            >
                {isLoading ? "Sending..." : "Send"}
            </button>
        </div>
    );
}