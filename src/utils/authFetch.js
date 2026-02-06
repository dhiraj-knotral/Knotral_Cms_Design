export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("adminAccessToken");

  // 🚫 No token → force login
  if (!token) {
    window.location.href = "/";
    throw new Error("No access token");
  }

  let res = await fetch(url, {
    ...options,
    credentials: "include", // ✅ include cookies if any
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  // 🔁 Token expired → refresh
  if (res.status === 401 || res.status === 403) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/refresh-super-admin`,
      {
        method: "POST",
        credentials: "include", // 🔥 THIS IS THE KEY
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!refreshRes.ok) {
      localStorage.removeItem("adminAccessToken");
      localStorage.removeItem("superadminuser");
      window.location.href = "/";
      throw new Error("Session expired");
    }

    const refreshData = await refreshRes.json();
    const newToken = refreshData.accessToken;

    localStorage.setItem("adminAccessToken", newToken);

    // 🔁 Retry original request with new token
    return fetch(url, {
      ...options,
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newToken}`,
        ...(options.headers || {}),
      },
    });
  }

  return res;
};
