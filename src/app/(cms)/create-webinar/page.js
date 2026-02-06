"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateWebinar from "@/components/CreateWebinar/CreateWebinar";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminAccessToken");

    if (!token) {
      router.replace("/"); // 🔥 redirect to login
    }
  }, [router]);

  return <CreateWebinar />;
}