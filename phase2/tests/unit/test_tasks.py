"""Unit tests for the tasks module.

Tests cover Task dataclass and TaskList class operations.
Run with: python -m pytest tests/unit/test_tasks.py -v
"""

import pytest
import sys
import os

# Add src to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'src'))

from src.tasks import Task, TaskList, TaskNotFoundError


class TestTask:
    """Tests for the Task dataclass."""

    def test_task_creation_with_all_fields(self):
        """Test creating a task with all fields specified."""
        task = Task(id=1, title="Test task", description="Test description", completed=True)
        assert task.id == 1
        assert task.title == "Test task"
        assert task.description == "Test description"
        assert task.completed is True

    def test_task_creation_with_defaults(self):
        """Test creating a task with default values."""
        task = Task(id=1, title="Test task")
        assert task.id == 1
        assert task.title == "Test task"
        assert task.description == ""
        assert task.completed is False

    def test_task_str_representation(self):
        """Test string representation of a task."""
        task = Task(id=1, title="Buy milk", completed=False)
        str_repr = str(task)
        assert "ID: 1" in str_repr
        assert "[ ]" in str_repr
        assert "Buy milk" in str_repr

    def test_task_completed_str_representation(self):
        """Test string representation of a completed task."""
        task = Task(id=2, title="Finish report", completed=True)
        str_repr = str(task)
        assert "[X]" in str_repr


class TestTaskList:
    """Tests for the TaskList class."""

    def setup_method(self):
        """Set up a fresh TaskList for each test."""
        self.task_list = TaskList()

    # --- Length and Iteration Tests ---

    def test_empty_task_list_length(self):
        """Test that empty task list has length 0."""
        assert len(self.task_list) == 0

    def test_task_list_length_after_adding(self):
        """Test task list length after adding tasks."""
        self.task_list.add("Task 1")
        self.task_list.add("Task 2")
        assert len(self.task_list) == 2

    def test_task_list_iteration(self):
        """Test iterating over task list."""
        self.task_list.add("Task 1")
        self.task_list.add("Task 2")
        tasks = list(self.task_list)
        assert len(tasks) == 2
        assert tasks[0].title == "Task 1"
        assert tasks[1].title == "Task 2"

    def test_empty_task_list_all(self):
        """Test all() returns empty list for new TaskList."""
        assert self.task_list.all() == []

    # --- Add Task Tests (User Story 1) ---

    def test_add_task_creates_task_with_correct_fields(self):
        """Test that add() creates task with correct title and description."""
        task = self.task_list.add("Buy groceries", "Milk, eggs, bread")
        assert task.title == "Buy groceries"
        assert task.description == "Milk, eggs, bread"
        assert task.completed is False

    def test_add_task_assigns_unique_incrementing_ids(self):
        """Test that each task gets a unique, incrementing ID."""
        task1 = self.task_list.add("Task 1")
        task2 = self.task_list.add("Task 2")
        task3 = self.task_list.add("Task 3")
        assert task1.id == 1
        assert task2.id == 2
        assert task3.id == 3

    def test_add_task_with_empty_description(self):
        """Test adding task with no description."""
        task = self.task_list.add("Solo task")
        assert task.description == ""

    def test_add_task_default_completed_is_false(self):
        """Test that new tasks are incomplete by default."""
        task = self.task_list.add("New task")
        assert task.completed is False

    def test_add_task_empty_title_raises_error(self):
        """Test that adding task with empty title raises ValueError."""
        with pytest.raises(ValueError, match="cannot be empty"):
            self.task_list.add("")

    def test_add_task_whitespace_only_title_raises_error(self):
        """Test that adding task with whitespace title raises ValueError."""
        with pytest.raises(ValueError, match="cannot be empty"):
            self.task_list.add("   ")

    # --- List Tasks Tests (User Story 2) ---

    def test_list_empty_returns_no_tasks(self):
        """Test that listing empty task list returns empty list."""
        assert self.task_list.all() == []

    def test_list_returns_all_tasks(self):
        """Test that all() returns all tasks in order."""
        self.task_list.add("Task 1")
        self.task_list.add("Task 2")
        tasks = self.task_list.all()
        assert len(tasks) == 2
        assert tasks[0].title == "Task 1"
        assert tasks[1].title == "Task 2"

    def test_task_completed_status_reflected(self):
        """Test that task completed status is correctly stored."""
        task = self.task_list.add("Test task")
        assert task.completed is False
        self.task_list.toggle(task.id)
        assert task.completed is True

    def test_get_by_id_returns_task(self):
        """Test getting a task by its ID."""
        added = self.task_list.add("Find me")
        found = self.task_list.get_by_id(added.id)
        assert found is not None
        assert found.id == added.id
        assert found.title == "Find me"

    def test_get_by_id_returns_none_for_invalid_id(self):
        """Test that get_by_id returns None for non-existent ID."""
        result = self.task_list.get_by_id(999)
        assert result is None

    # --- Update Task Tests (User Story 3) ---

    def test_update_task_title_changes_title(self):
        """Test updating task title."""
        task = self.task_list.add("Original title")
        self.task_list.update(task.id, title="New title")
        assert task.title == "New title"

    def test_update_task_description_changes_description(self):
        """Test updating task description."""
        task = self.task_list.add("Task", "Old description")
        self.task_list.update(task.id, description="New description")
        assert task.description == "New description"

    def test_update_task_preserves_other_fields(self):
        """Test that update preserves fields not being changed."""
        task = self.task_list.add("Task", "Description")
        self.task_list.update(task.id, title="New title")
        assert task.title == "New title"
        assert task.description == "Description"
        assert task.completed is False

    def test_update_task_preserves_empty_when_not_provided(self):
        """Test that None values don't change existing fields."""
        task = self.task_list.add("Task", "Description")
        self.task_list.update(task.id, title="New")
        # Description should remain unchanged
        assert task.description == "Description"

    def test_update_task_invalid_id_raises_error(self):
        """Test that updating non-existent task raises TaskNotFoundError."""
        with pytest.raises(TaskNotFoundError):
            self.task_list.update(999, title="New title")

    def test_update_task_empty_title_raises_error(self):
        """Test that updating with empty title raises ValueError."""
        task = self.task_list.add("Task")
        with pytest.raises(ValueError, match="cannot be empty"):
            self.task_list.update(task.id, title="")

    # --- Delete Task Tests (User Story 4) ---

    def test_delete_task_removes_from_list(self):
        """Test deleting a task removes it from the list."""
        task1 = self.task_list.add("Task 1")
        task2 = self.task_list.add("Task 2")
        assert len(self.task_list) == 2

        self.task_list.delete(task1.id)
        assert len(self.task_list) == 1
        assert self.task_list.get_by_id(task1.id) is None
        assert self.task_list.get_by_id(task2.id) is not None

    def test_delete_task_invalid_id_raises_error(self):
        """Test that deleting non-existent task raises TaskNotFoundError."""
        with pytest.raises(TaskNotFoundError):
            self.task_list.delete(999)

    def test_delete_last_task_results_in_empty_list(self):
        """Test that deleting last task leaves empty list."""
        task = self.task_list.add("Only task")
        self.task_list.delete(task.id)
        assert len(self.task_list) == 0
        assert self.task_list.all() == []

    # --- Mark Complete/Incomplete Tests (User Story 5) ---

    def test_toggle_task_marks_incomplete_as_complete(self):
        """Test toggling incomplete task marks it complete."""
        task = self.task_list.add("Task")
        assert task.completed is False
        result = self.task_list.toggle(task.id)
        assert task.completed is True
        assert result.completed is True

    def test_toggle_task_marks_complete_as_incomplete(self):
        """Test toggling complete task marks it incomplete."""
        task = self.task_list.add("Task")
        self.task_list.toggle(task.id)  # First toggle to complete
        self.task_list.toggle(task.id)  # Second toggle back to incomplete
        assert task.completed is False

    def test_toggle_task_invalid_id_raises_error(self):
        """Test that toggling non-existent task raises TaskNotFoundError."""
        with pytest.raises(TaskNotFoundError):
            self.task_list.toggle(999)

    def test_toggle_returns_updated_task(self):
        """Test that toggle() returns the toggled task."""
        task = self.task_list.add("Task")
        result = self.task_list.toggle(task.id)
        assert result is task
        assert result.completed is True

    # --- Edge Case Tests ---

    def test_empty_list_handled_gracefully(self):
        """Test that operations on empty list are handled gracefully."""
        # These should not raise, just return empty/None
        assert self.task_list.all() == []
        assert self.task_list.get_by_id(1) is None

    def test_invalid_ids_handled_gracefully(self):
        """Test that invalid IDs are handled with appropriate errors."""
        # All should raise TaskNotFoundError
        with pytest.raises(TaskNotFoundError):
            self.task_list.update(0, title="Test")

        with pytest.raises(TaskNotFoundError):
            self.task_list.delete(-1)

        with pytest.raises(TaskNotFoundError):
            self.task_list.toggle(999999)

    def test_multiple_operations_preserve_data_integrity(self):
        """Test that multiple operations maintain data integrity."""
        t1 = self.task_list.add("Task 1")
        t2 = self.task_list.add("Task 2")
        t3 = self.task_list.add("Task 3")

        # Delete middle task
        self.task_list.delete(t2.id)

        # Toggle first task
        self.task_list.toggle(t1.id)

        # Update last task
        self.task_list.update(t3.id, title="Task 3 Updated")

        # Verify state
        assert len(self.task_list) == 2
        assert self.task_list.get_by_id(t1.id).completed is True
        assert self.task_list.get_by_id(t2.id) is None
        assert self.task_list.get_by_id(t3.id).title == "Task 3 Updated"

    def test_add_after_delete_continues_id_sequence(self):
        """Test that ID sequence continues after deletions."""
        t1 = self.task_list.add("Task 1")
        t2 = self.task_list.add("Task 2")
        t3 = self.task_list.add("Task 3")

        self.task_list.delete(t2.id)

        t4 = self.task_list.add("Task 4")
        assert t4.id == 4  # Should continue from last ID, not reuse
        assert len(self.task_list) == 3


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
