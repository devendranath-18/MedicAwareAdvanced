"use client";

import { translations } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Pill, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showRequest, setShowRequest] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const requestMedicine = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medicine_name: search,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Medicine request submitted successfully ✅");
        setSearch("");
        setSuggestions([]);
        setShowRequest(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit request ❌");
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearch.trim()) {
        setSuggestions([]);
        setShowRequest(false);
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/medicines/suggestions?query=${debouncedSearch}`,
        );

        const data = await response.json();
        setSuggestions(data);

        if (debouncedSearch.trim() && data.length === 0) {
          setShowRequest(true);
        } else {
          setShowRequest(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  return (
    <div className="relative w-full max-w-5xl">
      <div className="relative">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-white/30 bg-white py-4 pl-5 pr-14 text-base text-slate-900 shadow-xl shadow-health-900/10 outline-none transition-all placeholder:text-slate-400 focus:border-health-300 focus:ring-4 focus:ring-health-200/50 sm:rounded-full sm:py-5 sm:pl-8 sm:pr-16 sm:text-lg md:text-xl"
        />
        <Search className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-health-600 sm:right-6 sm:size-6" />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-10 mt-3 w-full overflow-hidden rounded-2xl border border-health-100 bg-white shadow-2xl shadow-health-900/10">
          <div className="border-b border-health-50 bg-health-50/50 px-4 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-health-700">
              {suggestions.length} result{suggestions.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {suggestions.map((item: any, index: number) => (
              <div
                key={item.id}
                onClick={() => router.push(`/medicine/${item.id}`)}
                className="group flex cursor-pointer items-center gap-4 rounded-xl p-3 transition-all hover:bg-health-50 sm:p-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-health-100 text-health-700 transition-colors group-hover:bg-health-600 group-hover:text-white">
                  <Pill className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900 group-hover:text-health-800">
                    {item.medicine_name}
                  </p>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    View details & reviews
                  </p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-health-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      )}

      {showRequest && (
        <div className="mt-6 animate-fade-up rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-xl sm:p-8">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-white/15">
            <Pill className="size-7 text-white/80" />
          </div>
          <h2 className="text-xl font-bold sm:text-2xl">
            Sorry, Medicine not found
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            Wanted to add for future users, Your response will help us.
          </p>
          <button
            onClick={requestMedicine}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-health-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-health-50 hover:shadow-xl"
          >
            Request Medicine
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
