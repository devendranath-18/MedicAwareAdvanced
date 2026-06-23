"use client";
import { useLanguage } from "@/context/LanguageContext";

import { translations } from "@/constants/translations";
import Link from "next/link";
export default function Footer() {
  const { language } = useLanguage();

  const t = translations[language as keyof typeof translations];
  return (
    <footer
      className="
      bg-gradient-to-r
      from-cyan-800
      to-blue-600
      text-white
      px-6
      py-10
      
      "
    >
      <div
        className="
        max-w-6xl
        mx-auto
        grid
        md:grid-cols-3
        gap-10
        "
      >
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">{t.title}</h2>
          <p className="text-white/80">{t.footerDescription}</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">{t.quickLinks}</h3>

          <ul className="space-y-2 text-white/80">
            <Link href="/medicine">{t.footermedicineSearch}</Link>
            <li className="hover:text-white cursor-pointer">
              <Link href="/scanner">{t.footerscanner}</Link>
            </li>
            <li className="hover:text-white cursor-pointer">{t.about}</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">{t.contact}</h3>

          <p className="text-white/80">Email: support@medicaware.ai</p>

          <p className="text-white/80 mt-2">{t.builtWith}</p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center mt-10 text-white/60 text-sm">
        © {new Date().getFullYear()} {t.title}.{t.rights}
      </div>
    </footer>
  );
}
