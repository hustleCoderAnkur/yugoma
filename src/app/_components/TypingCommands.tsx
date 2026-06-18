"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { COMMANDS } from "../../lib/constants";

type Phase = "typing" | "deleting";

function TypingConsole() {
    const [index, setIndex] = useState<number>(0);
    const [text, setText] = useState<string>("");
    const [phase, setPhase] = useState<Phase>("typing");

    useEffect(() => {
        const current = COMMANDS[index];

        if (!current) return;

        let timeout: ReturnType<typeof setTimeout>;

        if (phase === "typing") {
            if (text.length < current.length) {
                timeout = setTimeout(() => {
                    setText(current.slice(0, text.length + 1));
                }, 45);
            } else {
                timeout = setTimeout(() => {
                    setPhase("deleting");
                }, 1300);
            }
        } else {
            if (text.length > 0) {
                timeout = setTimeout(() => {
                    setText(current.slice(0, text.length - 1));
                }, 22);
            } else {
                setPhase("typing");
                setIndex((prev) => (prev + 1) % COMMANDS.length);
                return;
            }
        }

        return () => clearTimeout(timeout);
    }, [text, phase, index]);

    return (
        <div className="relative min-h-220px rounded-3xl border border-gray-100 bg-white/70 p-8 shadow-xl shadow-slate-100 backdrop-blur-xl sm:p-10">
            <div className="flex gap-2 mb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
            </div>

            <div className="flex flex-1 items-center">
                <div className="flex w-full items-center gap-2.5 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>

                    <p className="truncate text-base font-medium text-gray-800 sm:text-lg">
                        {text}
                        <span
                            className="ml-0.5 inline-block h-5 w-[2px align-middle bg-gray-800"
                            style={{ animation: "blink 1s step-end infinite" }}
                        />
                    </p>
                </div>
            </div>

            <p className="text-xs text-gray-400">
                Yugoma listens, understands intent, and acts — no menus, no clicks.
            </p>
        </div>
    );
}

export default function CommandSection() {
    return (
        <section className="relative py-28">
            <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
                <div>
                    <h2 className="text-5xl font-bold leading-[1.05] tracking-tight text-black sm:text-6xl">
                        You can <span className="font-serif italic">do</span>
                    </h2>

                    <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-500">
                        Just tell Yugoma what you need — in plain language. It listens,
                        understands, and gets it done across your email and calendar.
                    </p>
                </div>

                <TypingConsole />
            </div>
        </section>
    );
}

export { TypingConsole };