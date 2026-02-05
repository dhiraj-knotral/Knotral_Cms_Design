"use client";

import React, { useState } from "react";
import styles from "./LoginScreen.module.css";
import { useRouter } from "next/navigation";

import { FaEye, FaEyeSlash } from "react-icons/fa";


const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


const handleLogin = async () => {
  setError("");
  setLoading(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login-super-admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    // ❌ Backend validation errors (400, 401, etc.)
    if (!res.ok) {
      setError(data?.message || "Login failed");
      return;
    }

    // ❌ Safety check (in case success=false with 200)
    if (!data.success) {
      setError(data.message);
      return;
    }

    // ✅ Success
    localStorage.setItem(
      "adminAccessToken",
      data.response.accessToken
    );

    localStorage.setItem(
      "superadminuser",
      JSON.stringify(data.response.foundUser)
    );

    console.log("super admin",data)

    router.push("/dashboard");

  } catch (err) {
    // ❌ Network / server down / CORS
    setError("Unable to connect to server. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={styles.container}>
      {/* Left section */}
      <div className={styles.left}>
        {/* <img
          src="/knotralicon.jpeg"
          alt="Login"
          className={styles.image}
        /> */}
        <div className={styles.overlay}>
          <h1 className={styles.brand}>Knotral CMS</h1>
          <p className={styles.tagline}>Manage webinars effortlessly</p>
        </div>
      </div>

      {/* Right section */}
      <div className={styles.right}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>Login to your account</p>

          {error && <p className={styles.error}>{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          /> */}
          <div className={styles.passwordWrapper}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className={styles.input}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    type="button"
    className={styles.eyeButton}
    onClick={() => setShowPassword((prev) => !prev)}
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

          <button
            className={styles.button}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
