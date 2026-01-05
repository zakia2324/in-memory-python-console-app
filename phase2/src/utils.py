"""Utility functions for CLI Todo App.

Provides helper functions for input validation, formatting, and
terminal operations.
"""

import logging
import sys

logger = logging.getLogger(__name__)


def get_valid_input(
    prompt: str,
    allow_empty: bool = False,
    empty_message: str = "This field cannot be empty. Please try again."
) -> str:
    """Get and validate user input from the console.

    Continues prompting until valid input is received.

    Args:
        prompt: The prompt message to display.
        allow_empty: Whether empty input is valid (default False).
        empty_message: Error message when empty input is not allowed.

    Returns:
        The validated user input string.
    """
    while True:
        try:
            user_input = input(prompt).strip()
            if not user_input:
                if allow_empty:
                    return ""
                print(empty_message)
                logger.debug("Empty input rejected")
            else:
                return user_input
        except KeyboardInterrupt:
            print("\nUse option 6 to exit the application.")
            logger.info("Keyboard interrupt during input")


def get_valid_number(
    prompt: str,
    min_val: int,
    max_val: int,
    invalid_message: str = "Please enter a number between {min} and {max}."
) -> int:
    """Get and validate a numeric menu choice.

    Args:
        prompt: The prompt message to display.
        min_val: Minimum valid value (inclusive).
        max_val: Maximum valid value (inclusive).
        invalid_message: Error message template with {min} and {max} placeholders.

    Returns:
        The validated numeric input.
    """
    while True:
        try:
            user_input = input(prompt).strip()
            number = int(user_input)
            if min_val <= number <= max_val:
                return number
            else:
                print(invalid_message.format(min=min_val, max=max_val))
                logger.debug("Number out of range: %s", user_input)
        except ValueError:
            print("Please enter a valid number.")
            logger.debug("Non-numeric input rejected: %s", user_input)


def format_task(task, show_description: bool = True) -> str:
    """Format a single task for display.

    Args:
        task: The Task object to format.
        show_description: Whether to include description (default True).

    Returns:
        Formatted string representation of the task.
    """
    status = "[X]" if task.completed else "[ ]"
    lines = [f"ID: {task.id} | {status} | {task.title}"]

    if show_description and task.description:
        lines.append(f"     Description: {task.description}")

    return "\n".join(lines)


def format_task_list(tasks: list) -> str:
    """Format a list of tasks for display.

    Args:
        tasks: List of Task objects to format.

    Returns:
        Formatted string representation of all tasks.
    """
    if not tasks:
        return "No tasks yet. Add your first task!"

    lines = ["", "Your Tasks:", "-" * 50]

    for task in tasks:
        status = "[X]" if task.completed else "[ ]"
        lines.append(f"{task.id:2}. {status} {task.title}")
        if task.description:
            lines.append(f"    {task.description}")

    return "\n".join(lines)


def clear_screen() -> None:
    """Clear the terminal screen (cross-platform).

    Works on Windows, macOS, and Linux.
    """
    try:
        if sys.platform == "win32":
            import os
            os.system("cls")
        else:
            import os
            os.system("clear")
    except Exception as e:
        logger.debug("Failed to clear screen: %s", e)


def print_separator(char: str = "-", length: int = 50) -> None:
    """Print a separator line.

    
    Args:
        char: Character to use for the separator (default '-').
        length: Number of characters in the separator (default 50).
    """
    print(char * length)
