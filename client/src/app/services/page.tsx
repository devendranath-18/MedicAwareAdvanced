"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/constants/translations";

export default function ServicesPage() {
  const { language } = useLanguage();

  const t =
    translations[
      language as keyof typeof translations
    ];

  return (
    <main className="p-10 max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">
        {t.services}
      </h1>

      <p className="whitespace-pre-line">
        {t.servicesContent}
      </p>

    </main>
  );
}