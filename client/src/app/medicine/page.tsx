"use client";

import SearchBar from "@/components/SearchBar";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";
import { Search } from "lucide-react";

export default function MedicinePage() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];

  return (
    <main className="relative min-h-screen health-gradient text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center px-4 pb-16 pt-12 sm:px-6 md:pt-20 lg:px-8">
        <div className="animate-fade-up mb-4 flex size-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
          <Search className="size-7" />
        </div>

        <h1 className="animate-fade-up-delay-1 text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {t.searchMedicine}
        </h1>

        <p className="animate-fade-up-delay-2 mt-4 max-w-2xl px-2 text-center text-sm leading-relaxed text-white/85 sm:text-base md:text-lg lg:text-xl">
          {t.searchMedicineDescription}
        </p>

        <div className="animate-fade-up-delay-3 mt-10 w-full md:mt-14">
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
