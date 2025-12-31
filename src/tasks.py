"""Task management module for CLI Todo App.

This module provides the Task dataclass and TaskList class for managing
in-memory task storage with CRUD operations.
"""

import logging
from dataclasses import dataclass
from typing import Iterator, Optional

logger = logging.getLogger(__name__)


@dataclass
class Task:
    """Represents a single task in the todo list.

    Attributes:
        id: Unique numeric identifier for the task.
        title: Short description of the task (required).
        description: Detailed description of the task (optional).
        completed: Whether the task has been completed (default False).
    """
    id: int
    title: str
    description: str = ""
    completed: bool = False

    def __str__(self) -> str:
        """Return a formatted string representation of the task."""
        status = "[X]" if self.completed else "[ ]"
        return f"ID: {self.id} | {status} | {self.title}"


class TaskNotFoundError(ValueError):
    """Raised when a task operation is attempted with an invalid ID."""

    def __init__(self, task_id: int):
        """Initialize error with the invalid task ID.

        Args:
            task_id: The invalid task ID that was used.
        """
        self.task_id = task_id
        super().__init__(f"Task with ID {task_id} not found")


class TaskList:
    """Manages a collection of tasks stored in memory.

    Provides CRUD operations for tasks with automatic ID assignment.
    """

    def __init__(self) -> None:
        """Initialize an empty task list with ID counter starting at 1."""
        self._tasks: list[Task] = []
        self._next_id: int = 1
        logger.info("TaskList initialized")

    def __len__(self) -> int:
        """Return the number of tasks in the list."""
        return len(self._tasks)

    def __iter__(self) -> Iterator[Task]:
        """Iterate over all tasks in the list."""
        return iter(self._tasks)

    def all(self) -> list[Task]:
        """Return a copy of all tasks.

        Returns:
            List of all tasks in creation order.
        """
        return self._tasks.copy()

    def get_by_id(self, task_id: int) -> Optional[Task]:
        """Find a task by its ID.

        Args:
            task_id: The unique ID of the task to find.

        Returns:
            The Task if found, None otherwise.
        """
        for task in self._tasks:
            if task.id == task_id:
                return task
        return None

    def add(self, title: str, description: str = "") -> Task:
        """Create and add a new task.

        Args:
            title: Short description of the task (required).
            description: Detailed description (optional, defaults to empty).

        Returns:
            The newly created Task.

        Raises:
            ValueError: If title is empty or whitespace.
        """
        if not title or not title.strip():
            logger.warning("Attempted to add task with empty title")
            raise ValueError("Task title cannot be empty")

        task = Task(
            id=self._next_id,
            title=title.strip(),
            description=description.strip() if description else ""
        )
        self._tasks.append(task)
        self._next_id += 1
        logger.info("Task added: id=%d, title=%s", task.id, task.title)
        return task

    def update(
        self,
        task_id: int,
        title: Optional[str] = None,
        description: Optional[str] = None
    ) -> Task:
        """Update an existing task's title and/or description.

        Args:
            task_id: The ID of the task to update.
            title: New title (optional, keeps current if None).
            description: New description (optional, keeps current if None).

        Returns:
            The updated Task.

        Raises:
            TaskNotFoundError: If no task with the given ID exists.
            ValueError: If title is empty or whitespace.
        """
        task = self.get_by_id(task_id)
        if task is None:
            logger.warning("Update failed: task id %d not found", task_id)
            raise TaskNotFoundError(task_id)

        if title is not None:
            if not title.strip():
                logger.warning("Attempted to update task %d with empty title", task_id)
                raise ValueError("Task title cannot be empty")
            task.title = title.strip()

        if description is not None:
            task.description = description.strip() if description else ""

        logger.info("Task updated: id=%d, title=%s", task.id, task.title)
        return task

    def delete(self, task_id: int) -> None:
        """Remove a task by its ID.

        Args:
            task_id: The ID of the task to delete.

        Raises:
            TaskNotFoundError: If no task with the given ID exists.
        """
        task = self.get_by_id(task_id)
        if task is None:
            logger.warning("Delete failed: task id %d not found", task_id)
            raise TaskNotFoundError(task_id)

        self._tasks.remove(task)
        logger.info("Task deleted: id=%d, title=%s", task_id, task.title)

    def toggle(self, task_id: int) -> Task:
        """Toggle the completion status of a task.

        Args:
            task_id: The ID of the task to toggle.

        Returns:
            The Task with toggled status.

        Raises:
            TaskNotFoundError: If no task with the given ID exists.
        """
        task = self.get_by_id(task_id)
        if task is None:
            logger.warning("Toggle failed: task id %d not found", task_id)
            raise TaskNotFoundError(task_id)

        task.completed = not task.completed
        status = "completed" if task.completed else "incomplete"
        logger.info("Task %d marked as %s", task_id, status)
        return task
