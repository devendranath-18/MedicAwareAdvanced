"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);

        toast.success("Login successful ✅");

        router.push("/admin/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Login failed ❌");

      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div
      className="
min-h-screen
bg-gradient-to-br
from-blue-700
to-indigo-900
flex
justify-center
items-center
"
    >
      <div
        className="
w-[420px]
bg-white/10
backdrop-blur-xl
rounded-3xl
border
border-white/20
p-10
"
      >
        <h1
          className="
text-white
text-4xl
font-bold
mb-8
text-center
"
        >
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="
w-full
mb-5
p-4
rounded-xl
outline-none
"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
w-full
mb-6
p-4
rounded-xl
outline-none
"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="
w-full
bg-white
text-blue-700
font-bold
p-4
rounded-xl
hover:scale-105
transition
"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
