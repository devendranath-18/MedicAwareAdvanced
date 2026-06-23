"use client";

import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DashboardData {
  totalMedicines: number;
  totalReviews: number;
  pendingRequests: number;
  completedRequests: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        setStats(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center health-gradient-soft">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-4 border-health-200 border-t-health-600" />
          <p className="text-sm font-medium text-health-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Medicines",
      value: stats?.totalMedicines,
      path: null,
      icon: Package,
      color: "from-health-500 to-health-700",
      bg: "bg-health-50",
      iconColor: "text-health-600",
    },
    {
      title: "Total Reviews",
      value: stats?.totalReviews,
      path: null,
      icon: MessageSquare,
      color: "from-cyan-500 to-teal-600",
      bg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      title: "Pending Requests",
      value: stats?.pendingRequests,
      path: "/admin/requests",
      icon: Clock,
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Completed Requests",
      value: stats?.completedRequests,
      path: null,
      icon: CheckCircle2,
      color: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <AdminProtectedRoute>
      <main className="min-h-screen health-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="animate-fade-up flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-health-600 text-white shadow-lg shadow-health-600/25">
                <LayoutDashboard className="size-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-health-900 sm:text-3xl lg:text-4xl">
                  Admin Dashboard
                </h1>
                <p className="mt-0.5 text-sm text-slate-500">
                  Overview of your MedicAware platform
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                window.location.href = "/admin/login";
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition-all hover:bg-red-50 hover:shadow-md sm:px-6 sm:py-3"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  onClick={() => {
                    if (card.path) {
                      router.push(card.path);
                    }
                  }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-sm transition-all duration-300",
                    card.path &&
                      "cursor-pointer hover:-translate-y-1 hover:border-health-200 hover:shadow-lg hover:shadow-health-100",
                  )}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br opacity-10 transition-opacity group-hover:opacity-20",
                      card.color,
                    )}
                  />

                  <div className="relative">
                    <div
                      className={cn(
                        "mb-4 inline-flex size-11 items-center justify-center rounded-xl",
                        card.bg,
                        card.iconColor,
                      )}
                    >
                      <Icon className="size-5" strokeWidth={2} />
                    </div>

                    <h2 className="text-sm font-medium text-slate-500">
                      {card.title}
                    </h2>

                    <p className="mt-1 text-3xl font-bold tracking-tight text-health-900 sm:text-4xl">
                      {card.value ?? "—"}
                    </p>

                    {card.path && (
                      <p className="mt-3 text-xs font-semibold text-health-600 opacity-0 transition-opacity group-hover:opacity-100">
                        View requests →
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </AdminProtectedRoute>
  );
}
