
"use client";
import { ArrowRight, BarChart3, Bell, CalendarDays, ListChecks, Mail, Play, Repeat2, Reply, Sparkles, Users } from "lucide-react";


import { useRouter } from "next/navigation";

function FloatingCard({
    icon: Icon,
    label,
    className,
    delay,
}: {
    icon: React.ElementType;
    label: string;
    className: string;
    delay: string;
}) {
    return (
        <div
            className={`absolute hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-lg ${className}`}
            style={{
                animation: "float 6s ease-in-out infinite",
                animationDelay: delay,
            }}
        >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 shrink-0">
                <Icon className="h-4 w-4 text-white" />
            </div>

            <p className="text-sm font-medium text-slate-900 whitespace-nowrap">
                {label}
            </p>
        </div>
    );
}

function AiOrb() {
    return (
        <div className="relative h-105 sm:h-120 flex items-center justify-center">
            <style>{`
        @keyframes orbitSpin { to { transform: rotate(360deg); } }
        @keyframes pulseGlow {
          0%, 100% { opacity: .55; transform: scale(1); }
          50% { opacity: .85; transform: scale(1.06); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
      `}</style>

            <div
                className="absolute h-80 w-80 rounded-full bg-slate-950/20 blur-[100px]"
                style={{ animation: "pulseGlow 6s ease-in-out infinite" }}
            />
            <div
                className="absolute h-60 w-60 rounded-full bg-emerald-500/20 blur-[80px]"
                style={{ animation: "pulseGlow 8s ease-in-out infinite reverse" }}
            />

            <div className="absolute h-72 w-72 rounded-full border border-white/10" />

            <div
                className="absolute h-64 w-64 rounded-full border border-dashed border-white/15"
                style={{ animation: "orbitSpin 30s linear infinite" }}
            />

            <div
                className="absolute h-88 w-88 rounded-full border border-white/6"
                style={{ animation: "orbitSpin 45s linear infinite reverse" }}
            />

            <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-3xl shadow-[0_40px_120px_rgba(168,85,247,0.35)]">
                <div className="absolute inset-1 rounded-full bg-slate-900" />
                <div className="absolute top-8 left-10 h-12 w-12 rounded-full bg-white/25 blur-xl" />
                <div className="absolute inset-6 rounded-full border border-white/20" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-xl">
                    <Sparkles className="h-10 w-10 text-white" />
                </div>
            </div>

            <FloatingCard
                icon={Mail}
                label="Email Assistant"
                className="top-24 left-[28%] rotate-[-24deg]"
                delay="0s"
            />

            <FloatingCard
                icon={Reply}
                label="Smart Replies"
                className="top-8 left-[50%] -translate-x-1/2 rotate-[12deg]"
                delay="0.3s"
            />

            <FloatingCard
                icon={CalendarDays}
                label="Calendar"
                className="top-20 right-[30%] rotate-[-32deg]"
                delay="1.2s"
            />

            <FloatingCard
                icon={Users}
                label="Meeting Scheduler"
                className="top-[52%] left-[24%] rotate-[14deg]"
                delay="0.9s"
            />

            <FloatingCard
                icon={ListChecks}
                label="Task Tracking"
                className="top-[44%] right-[24%] rotate-[12deg]"
                delay="2.1s"
            />

            <FloatingCard
                icon={Bell}
                label="Reminders"
                className="bottom-14 left-[30%] rotate-[1deg]"
                delay="0.6s"
            />

            <FloatingCard
                icon={Repeat2}
                label="Follow-Ups"
                className="bottom-2 left-[46%] rotate-[-2deg]"
                delay="1.5s"
            />

            <FloatingCard
                icon={BarChart3}
                label="Daily Summary"
                className="bottom-24 right-[28%] rotate-[-10deg]"
                delay="1.8s"
            />
        </div>
    );
}

function HeroSection() {

    const router = useRouter();

    const handleGetStarted = () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken && refreshToken) {
            router.push("/agent");
        } else {
            router.push("/auth/login");
        }
    };

    return (
        <section className="relative pt-40 pb-24 overflow-hidden">

            <div className="relative max-w-4xl mx-auto px-6 text-center">

                <h1 className="mt-7 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-black leading-[1.08]">
                    Work Smarter
                    <br />
                    Let Yugoma Handle{" "}
                    <div className="italic mt-2 font-serif bg-linear-to-r from-slate-950 to-emerald-500 bg-clip-text text-transparent">
                        The Busywork
                    </div>
                </h1>

                <p className="mt-7 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                    Yugoma manages your emails, schedules meetings, replies to
                    messages, and organizes your day - so you can focus on what
                    matters.
                </p>

                <div className="mt-9 flex items-center justify-center gap-4">
                    <button
                        onClick={handleGetStarted}
                        className="inline-flex items-center gap-2 rounded-full bg-black text-white text-sm font-medium px-6 py-3.5 hover:bg-gray-800 transition-colors shadow-lg shadow-slate-200">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white text-black text-sm font-medium px-6 py-3.5 hover:border-gray-300 transition-colors">
                        <Play className="h-3.5 w-3.5" />
                        Watch Demo
                    </button>
                </div>
            </div>

            <div className="relative mt-24 ">
                <AiOrb />
            </div>
        </section>
    );
}

export {
    HeroSection,
    AiOrb,
    FloatingCard
}