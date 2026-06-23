"use client";

import ReviewSection from "@/components/ReviewSection";
import { AlertTriangle, Beaker, Building2, Pill } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function MedicineDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [medicine, setMedicine] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicine();
  }, []);

  const fetchMedicine = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines/${id}`,
      );

      const data = await response.json();
      setMedicine(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center health-gradient-soft">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-4 border-health-200 border-t-health-600" />
          <p className="text-sm font-medium text-health-700">Loading medicine...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen health-gradient-soft px-4 py-6 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <article className="animate-fade-up overflow-hidden rounded-3xl border border-health-100 bg-white shadow-xl shadow-health-900/5">
          <div className="relative health-gradient px-6 py-10 text-center sm:px-8 sm:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative mx-auto flex size-28 items-center justify-center rounded-2xl bg-white p-4 shadow-lg sm:size-36 sm:p-5">
              <img
                src={medicine.image_url}
                alt={medicine.medicine_name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h1 className="relative mt-6 break-words text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {medicine.medicine_name}
            </h1>
          </div>

          <div className="space-y-6 p-5 sm:space-y-8 sm:p-8 md:p-10">
            <section className="rounded-2xl border border-health-50 bg-health-50/40 p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <Beaker className="size-5 text-health-600" />
                <h2 className="text-lg font-bold text-health-900 md:text-xl">
                  Composition
                </h2>
              </div>
              <p className="break-words text-sm leading-relaxed text-slate-700 md:text-base">
                {medicine.composition}
              </p>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <Pill className="size-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-health-900 md:text-xl">
                  Uses
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {medicine.uses
                  ?.replace(/([a-z])([A-Z])/g, "$1,$2")
                  .split(",")
                  .map((use: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-100 md:px-4 md:py-2 md:text-base"
                    >
                      {use.trim()}
                    </span>
                  ))}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-600" />
                <h2 className="text-lg font-bold text-health-900 md:text-xl">
                  Side Effects
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {medicine.side_effects
                  ?.match(/[A-Z][a-z]+(?:\s[a-z]+)*/g)
                  ?.map((effect: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 md:px-4 md:py-2 md:text-base"
                    >
                      {effect}
                    </span>
                  ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <Building2 className="size-5 text-slate-600" />
                <h2 className="text-lg font-bold text-health-900 md:text-xl">
                  Manufacturer
                </h2>
              </div>
              <p className="break-words text-sm leading-relaxed text-slate-700 md:text-base">
                {medicine.manufacturer}
              </p>
            </section>

            <div className="border-t border-health-100 pt-2">
              <ReviewSection medicineId={id} />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
