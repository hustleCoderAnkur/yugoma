"use client"

import React, { useState } from "react";
import {
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    ArrowRight,
    BarChart3,
    CalendarDays,
} from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import type { ComponentType, SVGProps } from "react";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";


// type GoogleIconProps = {
//     className?: string;
// };

// function GoogleIcon({ className }: GoogleIconProps) {
//     return (
//         <svg className={className} viewBox="0 0 48 48">
//             <path
//                 fill="#FFC107"
//                 d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
//             />
//             <path
//                 fill="#FF3D00"
//                 d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
//             />
//             <path
//                 fill="#4CAF50"
//                 d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.5 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
//             />
//             <path
//                 fill="#1976D2"
//                 d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.2 5.8l6.2 5.2C40.7 36 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z"
//             />
//         </svg>
//     );
// }

type FloatingChipProps = {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
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
            className={`absolute hidden sm:flex items-center gap-2 rounded-2xl border border-white/40 bg-white/15 backdrop-blur-xl px-4 py-2.5 ${className}`}
            style={{ animation: "float 6s ease-in-out infinite", animationDelay: delay }}
        >
            <Icon className="h-3.5 w-3.5 text-white" />
            <span className="text-xs font-medium text-white whitespace-nowrap">
                {label}
            </span>
        </div>
    );
}

function VisualPanel() {
    return (
        <div className="relative hidden flex-1 overflow-hidden lg:flex">
            <Image
                src="https://www.activtrak.com/wp-content/uploads/2025/01/blog-header-does-working-from-home-increase-or-decrease-productivity.jpg"
                alt="Yugoma cover"
                fill
                className="object-cover object-center"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35" />

            <FloatingChip
                icon={BarChart3}
                label="Daily Summary"
                className="top-16 right-40 z-20"
                delay="0.4s"
            />

            <FloatingChip
                icon={CalendarDays}
                label="Calendar"
                className="bottom-144 right-32 z-20"
                delay="1.4s"
            />

            <div className="relative z-20 mx-auto flex max-w-sm flex-col items-center">
                <div className="relative mb-10 h-40 w-40">
                    <div
                        className="absolute inset-0 rounded-full bg-white/20 blur-2xl"
                        style={{
                            animation: "pulseGlow 5s ease-in-out infinite",
                        }}
                    />

                 
                </div>

                <div className="rounded-3xl mt-60 ml-20 mr-10  border border-white/20 bg-white/10 p-7 backdrop-blur-xl">
                    <p className="text-xs font-medium uppercase tracking-wide text-white/80">
                        Why people switch to Yugoma
                    </p>

                    <ul className="mt-4 space-y-3 text-sm text-white">
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                            One inbox for everything no app switching
                        </li>

                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                            Meetings booked while you are in another meeting
                        </li>

                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                            Daily summaries that actually save time
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const router = useRouter();

    const signupMutation = api.auth.signup.useMutation({
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

        if (!agreed) return;

        await signupMutation.mutateAsync({
            username: form.name,
            email: form.email,
            password: form.password,
        });
    };

    return (
        <div className="min-h-screen flex bg-white text-black antialiased">
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: .5; transform: scale(1); }
          50% { opacity: .8; transform: scale(1.05); }
        }
      `}</style>

            <div className="relative flex-1 flex flex-col">
                <div className="px-8 sm:px-14 pt-8">
                    <Link href="/" className="inline-flex items-center gap-2" >
                        <div className="h-7 w-7 rounded-xl bg-emerald-600" />
                        <span className="text-lg font-semibold tracking-tight">
                            Yugoma
                        </span>
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center px-8 py-6">
                    <div className="w-full max-w-sm">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                            Create your{" "}
                            <span className="italic font-serif bg-emerald-600 bg-clip-text text-transparent">
                                account
                            </span>
                        </h1>
                        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                            Let Yugoma start handling your inbox and calendar today.
                        </p>

                        {/* <button
                            type="button"
                            className="mt-8 w-full inline-flex items-center justify-center gap-3 rounded-full border border-gray-200 bg-white py-3.5 text-sm font-medium text-gray-800 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            <GoogleIcon className="h-4 w-4" />
                            Continue with Google
                        </button> */}

                        <div className="my-7 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-100" />
                            <span className="text-xs text-gray-400">or sign up with email</span>
                            <div className="h-px flex-1 bg-gray-100" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-gray-600">
                                    Full name
                                </label>
                                <div className="mt-1.5 relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder=""
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">
                                    Email
                                </label>
                                <div className="mt-1.5 relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder=""
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">
                                    Password
                                </label>
                                <div className="mt-1.5 relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        minLength={8}
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder=""
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-11 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-slate-950 focus:ring-slate-300"
                                />
                                <span className="text-xs text-gray-500 leading-relaxed">
                                    I agree to the{" "}
                                    <a href="#" className="text-black hover:underline">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-black hover:underline">
                                        Privacy Policy
                                    </a>
                                    
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={!agreed || signupMutation.isPending}
                                className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-black text-white text-sm font-medium py-3.5 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-lg shadow-slate-100 mt-2"
                            >
                                {signupMutation.isPending
                                    ? "Creating Account..."
                                    : "Create Account"}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="font-medium text-black hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="px-8 sm:px-14 pb-8 text-center sm:text-left">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Yugoma. All rights reserved.
                    </p>
                </div>
            </div>

            <VisualPanel />
        </div>
    );
}