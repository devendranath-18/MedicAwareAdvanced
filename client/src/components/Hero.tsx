"use client";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { translations } from "@/constants/translations";

export default function Hero() {
  const router = useRouter();

  const { language } = useLanguage();

  
  const t = translations[language as keyof typeof translations];
  return (
   <section
  className="
    relative
    min-h-[85vh]
    flex
    flex-col
    items-center
    justify-center
    text-white
    px-6
    overflow-hidden
  "
>
  {/* Background Image */}
  <div
    className="
      absolute
      inset-0
      bg-cover
      bg-center
      scale-110
      blur-[3px]
    "
    style={{
      backgroundImage: "url('/hero-medical.jpg')",
    }}
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Hero Content */}
  <div className="relative z-10 flex flex-col items-center">
    
    <div className="mb-4 px-4 py-2 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-300">
      Trusted Healthcare Information
    </div>

    <h1
      className="
      text-3xl
      sm:text-4xl
      md:text-5xl
      lg:text-6xl
      font-bold
      mb-5
      text-center
      "
    >
      {t.title}
    </h1>

    <p
      className="
      text-sm
      sm:text-base
      md:text-lg
      lg:text-xl
      max-w-2xl
      text-center
      mb-12
      px-2
      text-gray-100
      "
    >
      {t.heroDescription}
    </p>

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-6
      w-full
      max-w-5xl
      "
    >
      <div
        onClick={() => router.push("/medicine")}
        className="
        bg-white/15
        backdrop-blur-xl
        border
        border-white/20
        p-6
        md:p-10
        rounded-3xl
        cursor-pointer
        hover:scale-105
        hover:bg-white/20
        transition-all
        duration-300
        shadow-xl
        "
      >
        <h2 className="text-xl md:text-3xl font-bold">
          {t.medicineSearch}
        </h2>

        <p className="mt-4 text-sm md:text-base">
          {t.medicineDescription}
        </p>
      </div>

      <div
        onClick={() => router.push("/scanner")}
        className="
        bg-white/15
        backdrop-blur-xl
        border
        border-white/20
        p-6
        md:p-10
        rounded-3xl
        cursor-pointer
        hover:scale-105
        hover:bg-white/20
        transition-all
        duration-300
        shadow-xl
        "
      >
        <h2 className="text-xl md:text-3xl font-bold">
          {t.scanner}
        </h2>

        <p className="mt-4 text-sm md:text-base">
          {t.scannerDescription}
        </p>
      </div>
    </div>
  </div>
</section>
  );
}
