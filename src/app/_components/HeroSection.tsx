"use client";
import {
    ArrowRight,
    BarChart3,
    Bell,
    CalendarDays,
    ListChecks,
    Mail,
    Play,
    Repeat2,
    Reply,
    Sparkles,
    Users,
    Inbox,
    MessageSquare,
    Settings,
    Clock,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const ORBIT_CARDS: { icon: React.ElementType; label: string }[] = [
    { icon: Mail, label: "Email Assistant" },
    { icon: Reply, label: "Smart Replies" },
    { icon: CalendarDays, label: "Calendar" },
    { icon: ListChecks, label: "Task Tracking" },
    { icon: BarChart3, label: "Daily Summary" },
    { icon: Repeat2, label: "Follow-Ups" },
    { icon: Bell, label: "Reminders" },
    { icon: Users, label: "Meeting Scheduler" },
    { icon: Inbox, label: "Unread Summary" },
    { icon: MessageSquare, label: "Draft Response" },
    { icon: Clock, label: "Availability Check" },
    { icon: Settings, label: "Automation" },
];

const ORBIT_DURATION = 44;

const ORBIT_SCALE_X = 2.0;
const ORBIT_SCALE_Y = 0.8 ;

function OrbitCard({
    icon: Icon,
    label,
    index,
    total,
}: {
    icon: React.ElementType;
    label: string;
    index: number;
    total: number;
}) {
    const delay = -(index / total) * ORBIT_DURATION;

    return (
        <div
            className="absolute top-1/2 left-1/2 hidden h-0 w-0 sm:block"
            style={{
                animation: `orbitSpin ${ORBIT_DURATION}s linear infinite`,
                animationDelay: `${delay}s`,
            }}
        >
            <div
                className="absolute top-0 left-0 -translate-y-1/2"
                style={{ transform: "translateX(var(--orbit-radius))" }}
            >
                <div
                    style={{
                        animation: `counterSpin ${ORBIT_DURATION}s linear infinite`,
                        animationDelay: `${delay}s`,
                    }}
                >
                    <div
                        style={{
                            transform: `scale(${1 / ORBIT_SCALE_X}, ${1 / ORBIT_SCALE_Y})`,
                        }}
                    >
                        <div className="flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-lg">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
                                <Icon className="h-3.5 w-3.5 text-white" />
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-slate-900 whitespace-nowrap">
                                {label}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AiOrb() {
    const [look, setLook] = useState({ x: 0, y: 0 });

    const MAX_OFFSET = 90; 
    const SENSITIVITY_RANGE = 250;
    
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;

            const x = Math.max(-1, Math.min(1, dx / SENSITIVITY_RANGE));
            const y = Math.max(-1, Math.min(1, dy / SENSITIVITY_RANGE));

            setLook({
                x: x * MAX_OFFSET,
                y: y * MAX_OFFSET,
            });
        };

        const handleMouseLeave = () => {
            setLook({ x: 0, y: 0 });
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div className="relative h-105 sm:h-140 flex items-center justify-center">
            <style>{`
        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes counterSpin { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
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

            <div
                className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-3xl shadow-[0_40px_120px_rgba(168,85,247,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translate(${look.x}px, ${look.y}px)` }}
            >
                <div className="absolute inset-1 rounded-full bg-slate-900" />
                <div className="absolute top-8 left-10 h-12 w-12 rounded-full bg-white/25 blur-xl" />
                <div className="absolute inset-6 rounded-full border border-white/20" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-xl">
                    <Sparkles className="h-8 w-8 text-white" />
                </div>
            </div>

            <div
                className="absolute h-72 w-72 sm:h-88 sm:w-88"
                style={{
                    transform: `scale(${ORBIT_SCALE_X}, ${ORBIT_SCALE_Y})`,
                }}
            >
                <div
                    className="absolute inset-0 rounded-full"
                    style={{ "--orbit-radius": "180px" } as React.CSSProperties}
                >
                    {ORBIT_CARDS.map((card, i) => (
                        <OrbitCard
                            key={card.label}
                            icon={card.icon}
                            label={card.label}
                            index={i}
                            total={ORBIT_CARDS.length}
                        />
                    ))}
                </div>
            </div>
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
                    <Link
                        href={"https://www.youtube.com/watch?v=FXN86V4mBHU"}
                    >
                        <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white text-black text-sm font-medium px-6 py-3.5 hover:border-gray-300 transition-colors">
                            <Play className="h-3.5 w-3.5" />
                            Watch Demo
                        </button>
                    </Link>
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