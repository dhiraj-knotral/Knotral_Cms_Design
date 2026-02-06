// app/dashboard/DashboardClient.tsx (CLIENT)
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard/Dashboard";

export default function DashboardClient() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminAccessToken");

    if (!token) {
      router.push("/");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-webinars`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status === 401) throw new Error();
        return res.json();
      })
      .then(d => setData(d.response))
      .catch(() => router.push("/"));
  }, []);

  if (!data) return null;

  return <Dashboard webinars={data} />;
}
