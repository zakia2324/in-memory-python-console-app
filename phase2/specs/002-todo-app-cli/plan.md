# Implementation Plan: CLI Todo App

**Branch**: `002-todo-app-cli` | **Date**: 2025-12-31 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-todo-app-cli/spec.md`

## Summary

Build an interactive menu-driven CLI todo application in Python that stores tasks in memory. The app presents a numbered main menu, prompts for required information after each selection, and returns to the menu after completing actions. Core operations (add, list, update, delete, mark) are implemented as functions with the Task class managing in-memory storage.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: Standard library only (logging, dataclasses)
**Storage**: In-memory list of Task objects (no persistence)
**Testing**: pytest for unit tests in tests/unit/
**Target Platform**: Cross-platform terminal (Windows, macOS, Linux)
**Project Type**: Single CLI application
**Performance Goals**: Sub-second response time, minimal memory footprint
**Constraints**: No external dependencies, must handle invalid input gracefully
**Scale/Scope**: Single-user, single-session (tasks lost on exit)

## Constitution Check

*GATE: Must pass before implementation begins.*

- **I. In-Memory Simplicity**: ✅ Using in-memory list for Task storage
- **II. Interactive Menu Design**: ✅ Main menu with numbered options and prompts
- **III. Edge Case Resilience**: ✅ Input validation and error handling required
- **IV. Clean Code Architecture**: ✅ Separate modules for CLI, tasks, and utilities
- **V. Test-First Discipline**: ✅ Unit tests for tasks.py required

## Project Structure

### Documentation (this feature)

```text
specs/002-todo-app-cli/
├── plan.md              # This file
├── spec.md              # Feature specification
└── tasks.md             # Implementation tasks (/sp.tasks output)
```

### Source Code (repository root)

```text
src/
├── __init__.py
├── cli.py               # Main interactive menu loop
├── tasks.py             # Task class and task operations
└── utils.py             # Helper functions (input validation, formatting)

tests/
├── __init__.py
└── unit/
    └── test_tasks.py    # Unit tests for Task class and functions
```

**Structure Decision**: Single project structure with `src/` and `tests/unit/` directories. The Task class and operations are isolated in `tasks.py` for testability without CLI dependencies.

## Architecture

### Module Responsibilities

**src/tasks.py**
- `Task` dataclass: id (int), title (str), description (str), completed (bool)
- `TaskList` class: manages in-memory list, auto-incrementing IDs
- Functions: `add_task()`, `list_tasks()`, `update_task()`, `delete_task()`, `toggle_task()`

**src/cli.py**
- `display_menu()`: prints main menu options
- `get_menu_choice()`: validates and returns user selection
- `main()`: infinite loop displaying menu until exit
- Action handlers: `handle_add()`, `handle_list()`, `handle_update()`, `handle_delete()`, `handle_mark()`

**src/utils.py**
- `get_valid_input()`: prompts with validation
- `format_task()`: formats task for display
- `clear_screen()`: optional terminal clear (platform-aware)

### Data Flow

```
User Input → cli.py (menu loop) → Action Handler → tasks.py (operations) → Console Output
                                      ↓
                               logging.info/warning
```

### Task Storage

```python
# In-memory structure (tasks.py)
class TaskList:
    _tasks: list[Task]
    _next_id: int

    def __init__(self):
        self._tasks = []
        self._next_id = 1

    def add(self, title: str, description: str = "") -> Task:
        task = Task(id=self._next_id, title=title, description=description)
        self._tasks.append(task)
        self._next_id += 1
        return task
```

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Logging Strategy

```python
import logging

logging.basicConfig(level=logging.WARNING, format='%(message)s')
# Or: python app.py --verbose for DEBUG level

# Usage:
logging.info("Task created: ID=%d, Title=%s", task.id, task.title)
logging.warning("Invalid menu choice: %s", user_input)
logging.error("Failed to update task %d: invalid ID", task_id)
```

## Implementation Phases

### Phase 1: Foundation (Setup + Task Model)
- Create src/ directory structure
- Implement Task dataclass
- Implement TaskList class with CRUD operations
- Write unit tests for task operations

### Phase 2: CLI Interface
- Implement menu display functions
- Implement input validation utilities
- Implement main menu loop
- Connect CLI to TaskList

### Phase 3: Feature Integration
- Implement all 5 action handlers (add, list, update, delete, mark)
- Add comprehensive error handling
- Verify all user stories work correctly

### Phase 4: Polish
- Add logging throughout
- Run all tests
- Verify edge cases
- Final code review
