"use client";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface Request {
  id: number;
  medicine_name: string;
  status: string;
  created_at: string;
}

export default function RequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<Request[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        setRequests(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <AdminProtectedRoute>
        <div
          className="
min-h-screen
flex
justify-center
items-center
text-2xl
text-white
bg-gradient-to-br
from-slate-900
via-blue-900
to-indigo-950
"
        >
          Loading...
        </div>
      </AdminProtectedRoute>
    );
  }

  const handleReject = async (id: number) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reject/${id}`,

        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Request rejected ✅");

        setRequests((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to reject ❌");
    }
  };
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
        <h1
          className="
      text-5xl
      font-bold
      mb-10
      "
        >
          Medicine Requests
        </h1>

        <div
          className="
      space-y-6
      "
        >
          {requests.map((request) => (
            <div
              key={request.id}
              className="
          bg-white/10
          backdrop-blur-xl
          rounded-3xl
          border
          border-white/20
          p-6
          shadow-xl
          flex
          justify-between
          items-center
          "
            >
              <div>
                <h2
                  className="
              text-2xl
              font-semibold
              "
                >
                  {request.medicine_name}
                </h2>

                <p
                  className="
              text-gray-300
              mt-2
              "
                >
                  Status: {request.status}
                </p>
              </div>

              <div
                className="
            flex
            gap-4
            "
              >
                <button
                  onClick={() =>
                    router.push(
                      `/admin/add-medicine?id=${request.id}&name=${request.medicine_name}`,
                    )
                  }
                  className="
              px-6
              py-3
              rounded-xl
              bg-green-500
              hover:scale-105
              transition
              "
                >
                  Add Medicine
                </button>

                <button
                  onClick={() => handleReject(request.id)}
                  className="
px-6
py-3
rounded-xl
bg-red-500
hover:scale-105
transition
"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AdminProtectedRoute>
  );
}
