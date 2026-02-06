"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import WebinarList from "@/components/WebinarList/WebinarList";

export default function WebinarListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("adminAccessToken");

    if (!token) {
      router.push("/");
      return;
    }

    const page = searchParams.get("page") || 1;
    const category = searchParams.get("category") || "";
    const type = searchParams.get("type") || "";
    const price = searchParams.get("price") || "";
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "dateNew";

    const query = new URLSearchParams({
      page,
      sort,
      ...(category && { category }),
      ...(type && { type }),
      ...(price && { price }),
      ...(search && { search }),
    }).toString();

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/get-all-webinars?${query}`,
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
        if (!data.success) throw new Error("Failed");
        setData(data.response);
        setPagination(data.pagination);
      })
      .catch(() => router.push("/"));
  }, [searchParams]);

  if (!data) return <div>Loading...</div>;

  return (
    <WebinarList
      webinars={data}
      pagination={pagination}
      filters={{
        category: searchParams.get("category") || "",
        type: searchParams.get("type") || "",
        price: searchParams.get("price") || "",
        search: searchParams.get("search") || "",
        sort: searchParams.get("sort") || "dateNew",
      }}
    />
  );
}
