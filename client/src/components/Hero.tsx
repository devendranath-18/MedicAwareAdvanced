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
      min-h-[85vh]
      flex
      flex-col
      items-center
      justify-center
      bg-gradient-to-r
      from-cyan-700
      to-blue-500
      text-white
      px-6
      "
    >
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
          bg-white/10
          backdrop-blur-md
          p-6 md:p-10
          rounded-2xl
          cursor-pointer
          hover:scale-105
          transition
          "
        >
          <h2
            className="
text-xl
md:text-3xl
font-bold
"
          >
            {t.medicineSearch}
          </h2>

          <p
            className="
mt-4
text-sm
md:text-base
"
          >
            {t.medicineDescription}
          </p>
        </div>

        <div
          onClick={() => router.push("/scanner")}
          className="
          bg-white/10
          backdrop-blur-md
          p-6 md:p-10
          rounded-2xl
          cursor-pointer
          hover:scale-105
          transition
          "
        >
          <h2
            className="
text-xl
md:text-3xl
font-bold
"
          >
            {t.scanner}
          </h2>

          <p
            className="
mt-4
text-sm
md:text-base
"
          >
            {t.scannerDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
