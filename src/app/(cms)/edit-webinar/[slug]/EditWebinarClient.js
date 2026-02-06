"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import EditWebinar from "@/components/EditWebinar/EditWebinar";

export default function EditWebinarClient() {
  const { slug } = useParams(); // ✅ THIS FIXES IT
  const router = useRouter();
  const [webinar, setWebinar] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const token = localStorage.getItem("adminAccessToken");

    if (!token) {
      router.push("/");
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-webinar-by-slug?slug=${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(res => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        if (!data.success) throw new Error("No webinar");
        setWebinar(data.response);
      })
      .catch(() => router.push("/"));
  }, [slug]);

  if (!webinar) return <div>Loading...</div>;

  return <EditWebinar webinar={webinar} />;
}
