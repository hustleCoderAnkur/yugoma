"use client";

import { useEffect, useState } from "react";
import type { ElementType } from "react";
import {
    User,
    Mail,
    Calendar,
    Shield,
    Bell,
    Palette,
    ChevronRight,
    ArrowLeft,
    Sparkles,
    Clock,
    Activity,
} from "lucide-react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type SessionState = {
    accessToken: string;
    googleAccessToken: string;
    username: string;
    email: string;
    memberSince: string;
};

function StatCard({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string;
    icon: ElementType;
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <div className="flex items-center gap-2 text-gray-500">
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{label}</span>
            </div>
            <p className="mt-2 text-xl font-semibold text-black">
                {value}
            </p>
        </div>
    );
}

function SettingsRow({
    icon: Icon,
    label,
    description,
    onClick,
}: {
    icon: ElementType;
    label: string;
    description: string;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 text-left transition hover:bg-gray-50"
        >
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                    <Icon className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-black">
                        {label}
                    </p>
                    <p className="text-xs text-gray-500">
                        {description}
                    </p>
                </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>
    );
}

function AvatarInitials({ name }: { name?: string }) {
    const initials = name
        ? name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "U";

    return (
        <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-black text-2xl font-bold text-white shadow-lg">
                {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
                <Sparkles className="h-3 w-3 text-white" />
            </div>
        </div>
    );
}

export default function ProfilePage() {
    const router = useRouter();

    const [hydrated, setHydrated] = useState(false);
    const [session, setSession] = useState<SessionState>({
        accessToken: "",
        googleAccessToken: "",
        username: "",
        email: "",
        memberSince: "",
    });

    useEffect(() => {
        const accessToken =
            localStorage.getItem("accessToken") ?? "";

        const googleAccessToken =
            localStorage.getItem("googleAccessToken") ?? "";

        const username =
            localStorage.getItem("username") ?? "";

        const email =
            localStorage.getItem("tenantId") ?? "";

        const memberSince =
            localStorage.getItem("memberSince") ?? "";

        setSession({
            accessToken,
            googleAccessToken,
            username,
            email,
            memberSince,
        });

        setHydrated(true);
    }, []);

    const isManualSession = session.accessToken.length > 0;
    const isGoogleSession =
        !isManualSession && session.googleAccessToken.length > 0;

    const { data, isLoading, error } = api.auth.me.useQuery(
        { accessToken: session.accessToken },
        { enabled: hydrated && isManualSession },
    );

    const deleteMutation = api.auth.deleteAccount.useMutation();

    const fallbackMemberSince = new Date().toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric",
        },
    );

    const usernameFromLocal = (
        session.username.split(" ")[0] ?? ""
    ).trim();

    const emailFromLocal = (
        session.email.split("@")[0] ?? ""
    ).trim();

    const resolvedUsername =
        data?.username ??
        (usernameFromLocal.length > 0
            ? usernameFromLocal
            : undefined) ??
        (emailFromLocal.length > 0 ? emailFromLocal : undefined) ??
        "User";

    const resolvedEmail =
        data?.email ?? session.email ?? "—";

    const resolvedMemberSince = data?.createdAt
        ? new Date(data.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })
        : session.memberSince.length > 0
            ? session.memberSince
            : fallbackMemberSince;

    const accountTypeLabel = isManualSession
        ? "Manual Account"
        : isGoogleSession
            ? "Google Account"
            : "Guest Session";

    const clearLocalSession = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("googleAccessToken");
        localStorage.removeItem("googleRefreshToken");
        localStorage.removeItem("username");
        localStorage.removeItem("tenantId");
        localStorage.removeItem("memberSince");
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account?",
        );

        if (!confirmed) return;

        try {
            if (data?.id) {
                await deleteMutation.mutateAsync({
                    userId: data.id,
                });
            }

            clearLocalSession();
            router.replace("/auth/login");
        } catch (err) {
            console.error(err);
            alert("Failed to delete account");
        }
    };

    if (!hydrated || (isManualSession && isLoading)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    <p className="text-sm text-gray-500">
                        Loading your profile...
                    </p>
                </div>
            </div>
        );
    }

    if (isManualSession && error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
                    <p className="text-sm text-red-500">
                        Failed to load profile. Please try again.
                    </p>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mt-4 rounded-full bg-black px-5 py-2 text-sm text-white"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b border-gray-100 bg-white px-6 py-5">
                <div className="mx-auto flex max-w-2xl items-center justify-between">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>

                    <span className="text-sm font-medium text-black">
                        Profile
                    </span>

                    <div className="w-16" />
                </div>
            </div>

            <div className="mx-auto max-w-2xl space-y-5 px-6 py-8">
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                    <div className="flex items-start gap-6">
                        <AvatarInitials name={resolvedUsername} />

                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-black">
                                {resolvedUsername}
                            </h1>
                            <p className="mt-0.5 text-sm text-gray-500">
                                {resolvedEmail}
                            </p>

                            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="text-xs font-medium text-emerald-700">
                                    {accountTypeLabel}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-3">
                        <StatCard
                            label="Member Since"
                            value={resolvedMemberSince}
                            icon={Calendar}
                        />
                        <StatCard
                            label="Emails Handled"
                            value="142"
                            icon={Mail}
                        />
                        <StatCard
                            label="Hours Saved"
                            value="18h"
                            icon={Clock}
                        />
                    </div>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
                        Account Details
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white">
                                <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">
                                    Username
                                </p>
                                <p className="text-sm font-medium text-black">
                                    {resolvedUsername}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white">
                                <Mail className="h-4 w-4 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">
                                    Email Address
                                </p>
                                <p className="text-sm font-medium text-black">
                                    {resolvedEmail}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white">
                                <Calendar className="h-4 w-4 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">
                                    Joined
                                </p>
                                <p className="text-sm font-medium text-black">
                                    {resolvedMemberSince}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
                        Preferences
                    </h2>

                    <div className="space-y-2">
                        <SettingsRow
                            icon={Bell}
                            label="Notifications"
                            description="Manage email and push alerts"
                        />
                        <SettingsRow
                            icon={Shield}
                            label="Privacy & Security"
                            description="Password, 2FA, connected apps"
                        />
                        <SettingsRow
                            icon={Palette}
                            label="Appearance"
                            description="Theme and display options"
                        />
                        <SettingsRow
                            icon={Activity}
                            label="Activity Log"
                            description="View recent Yugoma actions"
                        />
                    </div>
                </div>

                <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-red-400">
                        Danger Zone
                    </h2>

                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="w-full rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-100"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}