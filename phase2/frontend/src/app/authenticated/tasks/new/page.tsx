"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import type { TaskCreate } from "@/types";

export default function NewTaskPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TaskCreate>({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/tasks", formData);
      router.push("/authenticated/dashboard");
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("Invalid task data. Please check your input.");
      } else {
        setError("Failed to create task. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass rounded-2xl p-8 card-hover fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 gradient-text">
            Create New Task
          </h1>
          <p className="text-gray-600">
            Add a new task to your to-do list
          </p>
        </div>

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
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                maxLength={500}
                placeholder="What needs to be done?"
                className="input-animated w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all text-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                📝
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Max 500 characters
            </p>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <div className="relative">
              <textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={6}
                maxLength={2000}
                placeholder="Add more details about this task..."
                className="input-animated w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all resize-none"
              />
              <span className="absolute right-4 top-4 text-2xl">
                📄
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Max 2000 characters
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Create Task</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push("/authenticated/dashboard")}
              className="flex-1 py-4 px-6 bg-white/80 hover:bg-white text-gray-700 rounded-xl font-semibold smooth-transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
