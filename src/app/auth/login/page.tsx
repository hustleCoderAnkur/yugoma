"use client";


import React, {
    useState,
    type ChangeEvent,
    type FormEvent,
    type ElementType,
} from "react";
import Link from "next/link";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    CalendarDays,
    Bell,
} from "lucide-react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type GoogleIconProps = {
    className?: string;
};

function GoogleIcon({ className }: GoogleIconProps) {
    return (
        <svg className={className} viewBox="0 0 48 48">
            <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
            />
            <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
            />
            <path
                fill="#4CAF50"
                d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.5 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
            />
            <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.2 5.8l6.2 5.2C40.7 36 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z"
            />
        </svg>
    );
}

type FloatingChipProps = {
    icon: ElementType;
    label: string;
    className: string;
    delay: string;
};

function FloatingChip({
    icon: Icon,
    label,
    className,
    delay,
}: FloatingChipProps) {
    return (
        <div
            className={`absolute hidden sm:flex items-center gap-2 rounded-2xl border border-slate-400 bg-slate-200 px-4 py-2.5 backdrop-blur-xl ${className}`}
            style={{
                animation: "float 6s ease-in-out infinite",
                animationDelay: delay,
            }}
        >
            <Icon className="h-3.5 w-3.5 text-black" />
            <span className="whitespace-nowrap text-xs font-medium text-black">
                {label}
            </span>
        </div>
    );
}

function VisualPanel() {
    return (
        <div className="relative hidden w-[45%] overflow-hidden lg:flex">
            <Image
                src="https://assets.newsweek.com/wp-content/uploads/2025/08/2339870-woman-relaxing-desk.jpg?w=1600&quality=80&webp=1"
                alt="Login Cover"
                fill
                className="object-cover object-[80%] "
            />

            <FloatingChip
                icon={Mail}
                label="Email Assistant"
                className="left-8 top-36"
                delay="0s"
            />

            <FloatingChip
                icon={CalendarDays}
                label="Calendar"
                className="right-112 top-72"
                delay="1s"
            />

            <FloatingChip
                icon={Bell}
                label="Reminders"
                className="bottom-80 left-8"
                delay="1.8s"
            />

            <div className="relative z-10 max-w-sm">
                <div className="relative mx-auto mb-10 h-40 w-40">
                    <div
                        className="absolute inset-0 rounded-full bg-white/20 blur-2xl"
                        style={{ animation: "pulseGlow 5s ease-in-out infinite" }}
                    />

               
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    const loginMutation = api.auth.login.useMutation({
        onSuccess: (data) => {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("tenantId", data.user.email);
            router.push("/agent");
        },

        onError: (error) => {
            console.error(error.message);
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        await loginMutation.mutateAsync({
            email: form.email,
            password: form.password,
        });
    };
    return (
        <div className="flex min-h-screen bg-white text-black">
            <div className="relative flex flex-1 flex-col">
                <div className="px-8 pt-8 sm:px-14">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="h-7 w-7 rounded-xl bg-emerald-500" />

                        <span className="text-lg font-semibold">Yugoma</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center px-8">
                    <div className="w-full max-w-sm">
                        <h1 className="text-4xl font-bold">
                            Welcome{" "}
                            <span className="bg-emerald-600 bg-clip-text font-serif italic text-transparent">
                                back
                            </span>
                        </h1>

                        <button
                            type="button"
                            className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 py-3"
                        >
                            <GoogleIcon className="h-4 w-4" />
                            Continue with Google
                        </button>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder=""
                                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4"
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-11"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loginMutation.isPending}
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-white disabled:opacity-50"
                            >
                                {loginMutation.isPending ? "Logging In..." : "Login In"}

                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            Dont have an account?{" "}
                            <Link href="/auth/signup" className="font-medium text-black">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <VisualPanel />
        </div>
    );
}