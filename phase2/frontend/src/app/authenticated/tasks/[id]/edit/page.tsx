"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import type { Task, TaskUpdate } from "@/types";

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [formData, setFormData] = useState<TaskUpdate>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      const task: Task = response.data.task;
      setFormData({
        title: task.title,
        description: task.description || "",
      });
      setLoading(false);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("You do not have permission to edit this task");
      } else if (err.response?.status === 404) {
        setError("Task not found");
      } else {
        setError("Failed to load task");
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.put(`/tasks/${taskId}`, formData);
      router.push("/authenticated/dashboard");
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("You do not have permission to edit this task");
      } else if (err.response?.status === 404) {
        setError("Task not found");
      } else {
        setError("Failed to update task. Please try again.");
      }
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white/80">Loading task...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="glass p-6 bg-red-50 border-red-400 text-red-700 rounded-2xl shake">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚠️</span>
            <div>
              <h2 className="text-xl font-bold mb-1">Error Loading Task</h2>
              <p>{error}</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/authenticated/dashboard")}
            className="btn-primary px-6 py-3 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass rounded-2xl p-8 card-hover fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 gradient-text">
            Edit Task
          </h1>
          <p className="text-gray-600">
            Update your task details
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
                value={formData.title || ""}
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
              disabled={submitting}
              className="flex-1 btn-primary py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="spinner"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003-3h10a3 3 0 003 3v1a3 3 0 00-3 3H7a3 3 0 00-3 3V16zm4-2.25V5.5a2.5 2.5 0 010-2.5h8a2.5 2.5 0 010-2.5V8.75a2.5 2.5 0 01-2.5 2.5h-8a2.5 2.5 0 01-2.5-2.5V8.25a2.5 2.5 0 010-2.5z"
                    />
                  </svg>
                  <span>Save Changes</span>
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
