"use client";

import FeaturesSection from "./_components/FeaturesSection";
import Footer from "./_components/Footer";
import { HeroSection } from "./_components/HeroSection";
import HowItWorks from "./_components/HowItWorks";
import IntegrationsSection from "./_components/IntegrationsSection";
import Navbar from "./_components/Navbar";
import ProductivitySection from "./_components/ProductivitySection";
import { ShowcaseSection } from "./_components/TestPanel";
import CommandSection from "./_components/TypingCommands";

export default function YugomaLandingPage() {
  return (
    <div className="bg-white text-black antialiased">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: .55; transform: scale(1); }
          50% { opacity: .85; transform: scale(1.06); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <Navbar />

      <main>
        <HeroSection />
        <CommandSection />
        <HowItWorks />
        <FeaturesSection />
        <ShowcaseSection />
        <ProductivitySection />
        <IntegrationsSection />
      </main>

      <Footer />
    </div>
  );
}