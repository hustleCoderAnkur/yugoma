"use client";

import React, {
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    Loader2,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
    Inbox,
    CalendarDays,
    Bell,
    Settings,
    type LucideIcon,
} from "lucide-react";
import { api } from "@/trpc/react";

type NavItem = {
    icon: LucideIcon;
    label: string;
    active?: boolean;
};

type PasswordFieldProps = {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    autoComplete: string;
};

type StrengthMeterProps = {
    password: string;
};

const NAV: NavItem[] = [
    { icon: MessageSquare, label: "Chat" },
    { icon: Inbox, label: "Emails" },
    { icon: CalendarDays, label: "Calendar" },
    { icon: Bell, label: "Reminders" },
    { icon: Settings, label: "Settings", active: true },
];

function Sidebar() {
    return (
        <aside className="hidden lg:flex w-60 flex-col border-r border-gray-100 p-6">
            <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-xl bg-linear-to-br from-slate-500 to-emerald-400" />

                <span className="text-lg font-semibold tracking-tight text-black">
                    Yugoma
                </span>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
                {NAV.map(({ icon: Icon, label, active }) => (
                    <div
                        key={label}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors ${active
                            ? "bg-linearto-r from-slate-50 to-emerald-50 text-black font-medium"
                            : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </div>
                ))}
            </nav>
        </aside>
    );
}

function getStrength(password: string): number {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password))
        score++;

    return score;
}

const STRENGTH_LABEL = [
    "Too short",
    "Weak",
    "Fair",
    "Good",
    "Strong",
];

function StrengthMeter({ password }: StrengthMeterProps) {
    const score = getStrength(password);

    return (
        <div className="mt-2">
            <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${i < score
                            ? "bg-linear-to-r from-slate-500 to-emerald-400"
                            : "bg-gray-100"
                            }`}
                    />
                ))}
            </div>

            {password.length > 0 && (
                <p className="mt-1.5 text-xs text-gray-400">
                    {STRENGTH_LABEL[score]}
                </p>
            )}
        </div>
    );
}

function PasswordField({
    label,
    value,
    onChange,
    placeholder,
    autoComplete,
}: PasswordFieldProps) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <label className="text-xs font-medium text-gray-600">
                {label}
            </label>

            <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                    type={show ? "text" : "password"}
                    required
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
                />

                <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {show ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    );
}

function ChangePasswordCard() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const changePasswordMutation =
        api.auth.changePassword.useMutation({
            onSuccess: () => {
                setSuccess(true);

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            },

            onError: (error) => {
                setError(error.message);
            },
        });

    const loading = changePasswordMutation.isPending;

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setSuccess(false);

        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirmation do not match.");
            return;
        }

        try {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                throw new Error("User not found");
            }

            await changePasswordMutation.mutateAsync({
                userId,
                currentPassword,
                newPassword,
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-slate-500 to-emerald-400">
                <ShieldCheck className="h-5 w-5 text-white" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-black">
                Change password
            </h2>

            <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                Use a strong password you do not use anywhere else.
            </p>

            {error && (
                <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {success && (
                <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

                    <p className="text-sm text-slate-700">
                        Password updated successfully.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <PasswordField
                    label="Current password"
                    value={currentPassword}
                    onChange={(e) =>
                        setCurrentPassword(e.target.value)
                    }
                    placeholder=""
                    autoComplete="current-password"
                />

                <div>
                    <PasswordField
                        label="New password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                    />

                    <StrengthMeter password={newPassword} />
                </div>

                <PasswordField
                    label="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    placeholder=""
                    autoComplete="new-password"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 text-sm font-medium text-white shadow-lg shadow-slate-100 transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        "Update password"
                    )}
                </button>
            </form>

            <p className="mt-6 text-xs leading-relaxed text-gray-400">
                For security, you will be signed out of other devices after your password is changed.
            </p>
        </div>
    );
}


export default function SettingsSecurityPage() {
    return (
        <div className="min-h-screen bg-white text-black antialiased">
            <div className="flex min-h-screen">
                <Sidebar />

                <main className="flex-1 px-6 py-14 sm:px-12">
                    <div className="mx-auto max-w-lg">
                        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600">
                            Account Security
                        </span>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-black">
                            Settings
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Manage your account and keep it secure.
                        </p>

                        <div className="mt-9">
                            <ChangePasswordCard />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}