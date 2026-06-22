"use client";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      <div
        className="
min-h-screen
flex
justify-center
items-center
text-2xl
"
      >
        Loading...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Medicines",
      value: stats?.totalMedicines,
      path: null,
    },

    {
      title: "Total Reviews",
      value: stats?.totalReviews,
      path: null,
    },

    {
      title: "Pending Requests",
      value: stats?.pendingRequests,
      path: "/admin/requests",
    },

    {
      title: "Completed Requests",
      value: stats?.completedRequests,
      path: null,
    },
  ];

  return (
    <AdminProtectedRoute>
      <main
        className="
min-h-screen
bg-gradient-to-br
from-slate-900
via-blue-900
to-indigo-950
p-10
text-white
"
      >
        <div
          className="
flex
justify-between
items-center
mb-10
"
        >
          <h1
            className="
text-5xl
font-bold
"
          >
            Admin Dashboard
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("adminToken");

              window.location.href = "/admin/login";
            }}
            className="
px-6
py-3
rounded-xl
bg-red-500
text-white
font-semibold
hover:bg-red-600
hover:scale-105
transition
"
          >
            Logout
          </button>
        </div>

        <div
          className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-6
"
        >
          {cards.map((card) => (
            <div
              key={card.title}
              onClick={() => {
                if (card.path) {
                  router.push(card.path);
                }
              }}
              className={`
bg-white/10
backdrop-blur-xl
rounded-3xl
border
border-white/20
p-8
shadow-xl
transition
${card.path ? "cursor-pointer hover:scale-105 hover:bg-white/20" : ""}
`}
            >
              <h2
                className="
text-gray-300
mb-3
"
              >
                {card.title}
              </h2>

              <p
                className="
text-4xl
font-bold
"
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </main>
    </AdminProtectedRoute>
  );
}
