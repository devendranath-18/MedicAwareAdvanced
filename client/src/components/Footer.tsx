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
  bg-black/40
  backdrop-blur-xl
  border-t
  border-white/10
  text-white
  px-6
  py-12
"
>
  <div
    className="
    max-w-6xl
    mx-auto
    grid
    grid-cols-1
    md:grid-cols-3
    gap-10
    "
  >

    {/* Brand */}
    <div>
      <h2 className="text-2xl font-bold mb-3 text-cyan-400">
        {t.title}
      </h2>

      <p className="text-white/70">
        {t.footerDescription}
      </p>
    </div>

    {/* Links */}
    <div>
      <h3 className="text-xl font-semibold mb-4">
        {t.quickLinks}
      </h3>

      <ul className="space-y-3 text-white/70">

        <li className="hover:text-cyan-400 transition">
          <Link href="/medicine">
            {t.footermedicineSearch}
          </Link>
        </li>

        <li className="hover:text-cyan-400 transition">
          <Link href="/scanner">
            {t.footerscanner}
          </Link>
        </li>

        <li className="hover:text-cyan-400 transition cursor-pointer">
          {t.about}
        </li>

      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-xl font-semibold mb-4">
        {t.contact}
      </h3>

      <p className="text-white/70">
        Email: support@medicaware.ai
      </p>

      <p className="text-white/70 mt-2">
        {t.builtWith}
      </p>
    </div>

  </div>

  <div
    className="
    text-center
    mt-10
    pt-6
    border-t
    border-white/10
    text-white/50
    text-sm
    "
  >
    © {new Date().getFullYear()} {t.title}. {t.rights}
  </div>
</footer>
  );
}
