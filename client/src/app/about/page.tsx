"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/constants/translations";

export default function AboutPage() {
  const { language } = useLanguage();

  const t =
    translations[
      language as keyof typeof translations
    ];

  return (
    <main className="p-10 max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">
        {t.about}
      </h1>

      <p className="whitespace-pre-line">
        {t.aboutContent}
      </p>

    </main>
  );
}