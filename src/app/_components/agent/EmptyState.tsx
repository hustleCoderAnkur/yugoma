"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { COMMANDS } from "@/lib/constants";

type EmptyStateProps = {
    onPick: (command: string) => void;
};

export default function EmptyState({
    onPick,
}: EmptyStateProps) {
    const [username, setUsername] = useState<string>("User");
    const [inputName, setInputName] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const storedUsername =
            localStorage.getItem("username");

        const googleToken =
            localStorage.getItem(
                "googleAccessToken",
            );

        if (storedUsername) {
            const firstName =
                storedUsername.split(" ")[0] ?? "User";

            setUsername(firstName);
        } else if (googleToken) {
            setShowModal(true);
        }
    }, []);

    const handleSaveName = () => {
        const trimmed = inputName.trim();

        if (!trimmed) return;

        localStorage.setItem(
            "username",
            trimmed,
        );

        const firstName =
            trimmed.split(" ")[0] ?? "User";

        setUsername(firstName);
        setShowModal(false);
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-32px bg-white p-8 shadow-2xl">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-black">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>

                        <h2 className="mt-6 text-center text-2xl font-semibold text-slate-900">
                            Welcome to Yugoma
                        </h2>

                        <p className="mt-2 text-center text-sm text-slate-500">
                            What would you like Yugoma to call you?
                        </p>

                        <input
                            value={inputName}
                            onChange={(e) =>
                                setInputName(
                                    e.target.value,
                                )
                            }
                            placeholder="Enter your name"
                            className="
                                mt-6
                                w-full
                                rounded-2xl
                                border border-slate-200
                                px-4 py-3
                                outline-none
                                focus:border-black
                            "
                        />

                        <button
                            onClick={handleSaveName}
                            className="
                                mt-5
                                w-full
                                rounded-2xl
                                bg-black
                                px-4 py-3
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-slate-900
                            "
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-1 items-center justify-center px-6">
                <div className="w-full max-w-3xl text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-black shadow-sm">
                        <Sparkles className="h-7 w-7 text-white" />
                    </div>

                    <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-900">
                        Hello, {username}
                    </h1>

                    <p className="mt-3 text-base text-slate-500">
                        What would you like to do today?
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        {COMMANDS.slice(0, 6).map(
                            (command) => (
                                <button
                                    key={command}
                                    onClick={() =>
                                        onPick(command)
                                    }
                                    className="
                                        rounded-2xl
                                        border border-slate-200
                                        bg-white
                                        px-5 py-3
                                        text-sm font-medium
                                        text-slate-700
                                        shadow-sm
                                        transition-all
                                        hover:border-slate-300
                                        hover:bg-slate-50
                                    "
                                >
                                    {command}
                                </button>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}