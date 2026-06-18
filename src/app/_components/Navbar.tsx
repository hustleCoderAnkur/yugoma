"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter()
    const [hasToken, setHasToken] = useState(false);
    
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        setHasToken(!!accessToken && !!refreshToken);
    }, []);

    const handleGetStarted = () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken && refreshToken) {
            router.push("/agent");
        } else {
            router.push("/auth/signup");
        }
    };

    return (
        <header className="fixed top-0 inset-x-0 z-50 border-b border-gray-100 bg-white/70 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-black">
                        Yugoma
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-9 text-sm text-gray-600">
                    <Link href="#features" className="hover:text-black font-bold transition-colors">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="hover:text-black  font-bold transition-colors">
                        How it Works
                    </Link>
                </nav>

                <button
                    onClick={handleGetStarted}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-black text-white text-sm font-medium pl-5 pr-4 py-2.5 hover:bg-gray-800 transition-colors"
                >
                    {hasToken ? "Sign In" : "Sign Up"}
                </button>
            </div>
        </header>
    );
}