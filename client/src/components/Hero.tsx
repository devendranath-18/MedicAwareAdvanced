"use client";

import { translations } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ScanLine, Search, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];

  const cards = [
    {
      title: t.medicineSearch,
      description: t.medicineDescription,
      icon: Search,
      path: "/medicine",
      accent: "from-emerald-400/20 to-teal-400/10",
    },
    {
      title: t.scanner,
      description: t.scannerDescription,
      icon: ScanLine,
      path: "/scanner",
      accent: "from-cyan-400/20 to-blue-400/10",
    },
  ];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden health-gradient text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-white/10 blur-3xl animate-pulse-soft"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-cyan-300/20 blur-3xl animate-pulse-soft"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
          <ShieldCheck className="size-4 text-emerald-300" />
          <span>Trusted healthcare information</span>
        </div>

        <h1 className="animate-fade-up-delay-1 max-w-4xl text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {t.title}
        </h1>

        <p className="animate-fade-up-delay-2 mt-5 max-w-2xl px-2 text-center text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
          {t.heroDescription}
        </p>

        <div className="animate-fade-up-delay-3 mt-12 grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {cards.map(({ title, description, icon: Icon, path, accent }) => (
            <button
              key={path}
              type="button"
              onClick={() => router.push(path)}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/10 sm:p-8 md:p-10"
            >
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="relative">
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-white/15 text-white transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-6" strokeWidth={2} />
                </div>

                <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">
                  {title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                  {description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition-colors group-hover:text-white">
                  Get started
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
