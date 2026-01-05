"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import type { Task } from "@/types";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to load tasks");
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId: string, currentStatus: boolean) => {
    try {
      await api.patch(`/tasks/${taskId}/toggle`);
      fetchTasks();
    } catch (err: any) {
      alert("Failed to update task");
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err: any) {
      alert("Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white/80">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="glass p-6 bg-red-50 border-red-400 text-red-700 rounded-2xl shake">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <h2 className="text-xl font-bold mb-1">Error Loading Tasks</h2>
              <p>{error}</p>
            </div>
          </div>
          <button
            onClick={fetchTasks}
            className="mt-4 btn-primary px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 gradient-text">
              My Tasks
            </h1>
            <p className="text-gray-600">
              You have{" "}
              <span className="font-semibold text-indigo-600">{activeCount}</span> active
              {activeCount > 0 && completedCount > 0 && " and "}
              {completedCount > 0 && (
                <span className="font-semibold text-green-600">{completedCount} completed</span>
              )}
              {" task"}
              {(activeCount + completedCount) !== 1 && "s"}
            </p>
          </div>
          <Link
            href="/authenticated/tasks/new"
            className="btn-primary px-6 py-3 rounded-xl text-lg font-semibold flex items-center gap-2 smooth-transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>New Task</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl font-semibold smooth-transition ${
                filter === f
                  ? "btn-primary text-white"
                  : "bg-white/80 hover:bg-white text-gray-700"
              }`}
            >
              {f === "all" && "📋 All"}
              {f === "active" && "⏳ Active"}
              {f === "completed" && "✅ Completed"}
              <span className="ml-1 capitalize">{f}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center card-hover scale-in">
          <div className="text-6xl mb-4 float">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {filter === "all"
              ? "No tasks yet"
              : filter === "active"
              ? "No active tasks"
              : "No completed tasks"}
          </h2>
          <p className="text-gray-600 mb-6">
            {filter === "all"
              ? "Create your first task to get started"
              : filter === "active"
              ? "All tasks are completed! Great job!"
              : "Complete some tasks to see them here"}
          </p>
          <Link
            href="/authenticated/tasks/new"
            className="btn-primary px-8 py-3 rounded-xl text-lg font-semibold inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create First Task
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className="glass rounded-2xl p-6 card-hover task-item smooth-transition"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <label className="relative flex-shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id, task.completed)}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer transition-all"
                  />
                  {task.completed && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-green-500 success-pop"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </label>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`transition-all duration-300 ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-900"
                    }`}
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-gray-600 text-sm whitespace-pre-wrap">
                        {task.description}
                      </p>
                    )}
                  </div>

                  {/* Task Metadata */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    {task.created_at && (
                      <span className="flex items-center gap-1">
                        📅
                        {new Date(task.created_at).toLocaleDateString()}
                      </span>
                    )}
                    {task.completed && task.completed_at && (
                      <span className="flex items-center gap-1 text-green-600">
                        ✅ Completed{" "}
                        {new Date(task.completed_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <Link
                    href={`/authenticated/tasks/${task.id}/edit`}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 smooth-transition group"
                  >
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414 2-2 2-2a2 2 0 012-2V4a2 2 0 012-2h-3"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 smooth-transition group"
                  >
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 17m5 4h6M5 7h14a2 2 0 002 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2-2h-4l-3 3M5 9l14 14"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
