"use client";

import { translations } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Activity, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/features", key: "features" as const },
];

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 border-b border-health-100/80 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-health-600 text-white shadow-md shadow-health-600/25 transition-transform group-hover:scale-105">
            <Activity className="size-5" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-bold tracking-tight text-health-900 sm:text-2xl">
            {t.title}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                isActive(href)
                  ? "text-health-700 bg-health-50"
                  : "text-slate-600 hover:bg-health-50/60 hover:text-health-700",
              )}
            >
              {t[key]}
            </Link>
          ))}

          {pathname === "/" && (
            <div className="ml-3 flex items-center gap-2 rounded-xl border border-health-100 bg-health-50/50 px-3 py-1.5">
              <Globe className="size-4 text-health-600" />
              <select
                value={language}
                onChange={(e) =>
                  setLanguage(
                    e.target.value as
                      | "English"
                      | "Telugu"
                      | "Hindi"
                      | "Tamil"
                      | "Kannada",
                  )
                }
                className="cursor-pointer bg-transparent text-sm font-medium text-health-800 outline-none"
              >
                <option value="English">English</option>
                <option value="Telugu">తెలుగు</option>
                <option value="Hindi">हिंदी</option>
                <option value="Tamil">தமிழ்</option>
                <option value="Kannada">ಕನ್ನಡ</option>
              </select>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center rounded-xl border border-health-100 text-health-700 transition-colors hover:bg-health-50 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-health-100 bg-white transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0",
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          {navLinks.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-health-50 text-health-700"
                  : "text-slate-600 hover:bg-health-50/60 hover:text-health-700",
              )}
            >
              {t[key]}
            </Link>
          ))}

          {pathname === "/" && (
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-health-100 bg-health-50/50 px-4 py-3">
              <Globe className="size-4 shrink-0 text-health-600" />
              <select
                value={language}
                onChange={(e) =>
                  setLanguage(
                    e.target.value as
                      | "English"
                      | "Telugu"
                      | "Hindi"
                      | "Tamil"
                      | "Kannada",
                  )
                }
                className="w-full cursor-pointer bg-transparent text-sm font-medium text-health-800 outline-none"
              >
                <option value="English">English</option>
                <option value="Telugu">తెలుగు</option>
                <option value="Hindi">हिंदी</option>
                <option value="Tamil">தமிழ்</option>
                <option value="Kannada">ಕನ್ನಡ</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
