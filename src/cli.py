#!/usr/bin/env python3
"""CLI Todo App - Interactive menu-driven task management.

This module provides the main interactive interface for the todo application.
Run this file directly to start the application.
"""

import argparse
import logging
import sys

from src.tasks import TaskList, TaskNotFoundError
from src.utils import (
    get_valid_input,
    get_valid_number,
    format_task_list,
)

# Configure logging
logging.basicConfig(
    level=logging.WARNING,
    format="%(levelname)s: %(message)s"
)
logger = logging.getLogger(__name__)

# Global task list instance
task_list = TaskList()


def display_main_menu() -> None:
    """Display the main menu options."""
    print("\n" + "=" * 50)
    print("         My Todo App - Main Menu")
    print("=" * 50)
    print("1. Add Task")
    print("2. List Tasks")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Mark Complete/Incomplete")
    print("6. Exit")
    print("=" * 50)


def get_menu_choice() -> int:
    """Get and validate the user's menu choice.

    Returns:
        The validated menu choice (1-6).
    """
    return get_valid_number(
        "Enter your choice (1-6): ",
        min_val=1,
        max_val=6,
        invalid_message="Invalid choice. Please enter a number between {min} and {max}."
    )


def handle_add() -> None:
    """Handle adding a new task."""
    print("\n--- Add Task ---")
    title = get_valid_input("Enter task title: ")
    description = get_valid_input(
        "Enter description (optional, press Enter to skip): ",
        allow_empty=True
    )

    task = task_list.add(title, description)
    print(f"\nTask added successfully! (ID: {task.id})")
    logger.info("User added task: id=%d, title=%s", task.id, task.title)


def handle_list() -> None:
    """Handle listing all tasks."""
    print("\n--- Your Tasks ---")
    tasks = task_list.all()

    if not tasks:
        print("No tasks yet. Add your first task!")
        logger.debug("List requested: no tasks found")
    else:
        for task in tasks:
            status = "[X]" if task.completed else "[ ]"
            print(f"{task.id:2}. {status} {task.title}")
            if task.description:
                print(f"    {task.description}")
        logger.info("User listed %d tasks", len(tasks))


def handle_update() -> None:
    """Handle updating an existing task."""
    print("\n--- Update Task ---")

    # Check if there are tasks to update
    tasks = task_list.all()
    if not tasks:
        print("No tasks to update. Add a task first!")
        logger.debug("Update requested: no tasks exist")
        return

    # Get task ID
    task_id = get_valid_number(
        "Enter task ID to update: ",
        min_val=1,
        max_val=999
    )

    # Verify task exists
    task = task_list.get_by_id(task_id)
    if task is None:
        print(f"Task with ID {task_id} not found.")
        logger.warning("Update failed: task id %d not found", task_id)
        return

    # Show current values and get new ones
    print(f"Current title: {task.title}")
    print(f"Current description: {task.description or '(none)'}")

    print("\nEnter new values (press Enter to keep current value):")
    new_title = get_valid_input(
        "New title: ",
        allow_empty=True
    )
    new_description = get_valid_input(
        "New description: ",
        allow_empty=True
    )

    # Update only if new values provided
    task_list.update(
        task_id,
        title=new_title if new_title else None,
        description=new_description if new_description else None
    )
    print(f"\nTask {task_id} updated successfully!")
    logger.info("User updated task: id=%d", task_id)


def handle_delete() -> None:
    """Handle deleting a task."""
    print("\n--- Delete Task ---")

    # Check if there are tasks to delete
    tasks = task_list.all()
    if not tasks:
        print("No tasks to delete.")
        logger.debug("Delete requested: no tasks exist")
        return

    # Get task ID
    task_id = get_valid_number(
        "Enter task ID to delete: ",
        min_val=1,
        max_val=999
    )

    # Attempt deletion
    try:
        task_list.delete(task_id)
        print(f"\nTask {task_id} deleted successfully!")
        logger.info("User deleted task: id=%d", task_id)
    except TaskNotFoundError:
        print(f"Task with ID {task_id} not found.")
        logger.warning("Delete failed: task id %d not found", task_id)


def handle_mark() -> None:
    """Handle toggling task completion status."""
    print("\n--- Mark Complete/Incomplete ---")

    # Check if there are tasks
    tasks = task_list.all()
    if not tasks:
        print("No tasks available.")
        logger.debug("Mark requested: no tasks exist")
        return

    # Get task ID
    task_id = get_valid_number(
        "Enter task ID to toggle: ",
        min_val=1,
        max_val=999
    )

    # Attempt toggle
    try:
        task = task_list.toggle(task_id)
        status = "COMPLETE" if task.completed else "INCOMPLETE"
        print(f"\nTask '{task.title}' marked as {status}.")
        logger.info("User toggled task %d: now %s", task_id, status)
    except TaskNotFoundError:
        print(f"Task with ID {task_id} not found.")
        logger.warning("Toggle failed: task id %d not found", task_id)


def run_app(verbose: bool = False) -> None:
    """Run the main application loop.

    Args:
        verbose: If True, enable debug logging.
    """
    if verbose:
        logging.getLogger().setLevel(logging.DEBUG)
        logger.info("Debug logging enabled")

    logger.info("Application started")
    print("Welcome to My Todo App!")
    print("Manage your tasks with an interactive menu.\n")

    while True:
        display_main_menu()
        choice = get_menu_choice()

        if choice == 1:
            handle_add()
        elif choice == 2:
            handle_list()
        elif choice == 3:
            handle_update()
        elif choice == 4:
            handle_delete()
        elif choice == 5:
            handle_mark()
        elif choice == 6:
            print("\nGoodbye! Thanks for using My Todo App.")
            logger.info("Application exited normally")
            break

        # Small pause before re-displaying menu
        input("\nPress Enter to continue...")


def main() -> None:
    """Main entry point for the application."""
    parser = argparse.ArgumentParser(
        description="My Todo App - An interactive CLI task manager"
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Enable debug logging"
    )

    args = parser.parse_args()
    run_app(verbose=args.verbose)


if __name__ == "__main__":
    main()
