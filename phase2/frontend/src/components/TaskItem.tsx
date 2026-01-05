"use client";

import { useState } from "react";
import api from "@/lib/api";
import type { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
}

export default function TaskItem({ task, onUpdate }: TaskItemProps) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await api.patch(`/tasks/${task.id}/toggle`);
      onUpdate();
    } catch (err: any) {
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/tasks/${task.id}`);
      onUpdate();
    } catch (err: any) {
      alert("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 flex items-center justify-between ${
        loading ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={loading}
          className="h-5 w-5 text-blue-600 rounded mr-4"
        />
        <div className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}>
          <h3 className="text-lg font-medium">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 mt-1">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 ml-4">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
