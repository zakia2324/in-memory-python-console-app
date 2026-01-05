"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import type { UserLogin } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      const { user, token } = response.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token.access_token);
        localStorage.setItem("auth_user", JSON.stringify(user));
      }
      router.push("/authenticated/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.data) {
        const errorMsg = err.response.data.detail || err.response.data.message;
        setError(typeof errorMsg === "string" ? errorMsg : "Login failed. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8 scale-in">
          <div className="inline-block">
            <span className="text-6xl">📝</span>
          </div>
          <h1 className="text-4xl font-bold mt-4 gradient-text">Welcome Back</h1>
          <p className="text-white/80 mt-2">Sign in to access your tasks</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 card-hover fade-in">
          {error && (
            <div className="mb-6 p-4 bg-red-100/90 border border-red-400 text-red-700 rounded-xl shake">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="input-animated w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all"
                  placeholder="Enter your email"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                  📧
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="input-animated w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all"
                  placeholder="Enter your password"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                  🔒
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Signup Link */}
        <p className="mt-8 text-center fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="text-white/80">Don't have an account? </span>
          <Link
            href="/signup"
            className="text-white font-semibold hover:underline decoration-2 underline-offset-4 transition-all"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
