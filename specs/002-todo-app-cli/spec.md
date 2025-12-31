# Feature Specification: CLI Todo App

**Feature Branch**: `002-todo-app-cli`
**Created**: 2025-12-31
**Status**: Draft
**Input**: Interactive CLI Todo App with menu-driven interface for managing in-memory tasks

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add Task (Priority: P1)

As a user, I want to add new tasks with a title and optional description so I can capture things I need to do.

**Why this priority**: Core functionality - without adding tasks, nothing else matters.

**Independent Test**: Can be tested by running the app, selecting option 1, entering a title and description, then verifying the task appears in the list.

**Acceptance Scenarios**:

1. **Given** the app is running, **When** I select "Add Task" and enter "Buy groceries" as title and "Milk, eggs, bread" as description, **Then** a task is created with the given title and description, marked as incomplete.
2. **Given** the app is running, **When** I select "Add Task" and enter only a title "Call Mom", **Then** a task is created with empty description.
3. **Given** the app is running, **When** I select "Add Task" and enter an empty title, **Then** an error is displayed prompting for a valid title.
4. **Given** tasks exist, **When** I add another task, **Then** previous tasks remain intact and new task gets a unique ID.

---

### User Story 2 - List Tasks (Priority: P1)

As a user, I want to see all my tasks with their IDs, titles, and completion status so I can review what needs to be done.

**Why this priority**: Core functionality - users need visibility into their task list.

**Independent Test**: Can be tested by adding 2-3 tasks, selecting option 2, and verifying all tasks display with correct information.

**Acceptance Scenarios**:

1. **Given** no tasks exist, **When** I select "List Tasks", **Then** a helpful message "No tasks yet. Add your first task!" is displayed.
2. **Given** tasks exist in the system, **When** I select "List Tasks", **Then** each task is displayed on its own line showing ID, title, description (if present), and status.
3. **Given** tasks exist with mixed completion status, **When** I select "List Tasks", **Then** incomplete tasks show "[ ]" and completed tasks show "[X]".
4. **Given** multiple tasks exist, **When** I select "List Tasks", **Then** tasks are displayed in creation order with sequential IDs.

---

### User Story 3 - Update Task (Priority: P1)

As a user, I want to modify task details so I can correct mistakes or refine my task descriptions.

**Why this priority**: Users inevitably need to change task details after creation.

**Independent Test**: Can be tested by adding a task, selecting option 3, entering its ID, and providing new values.

**Acceptance Scenarios**:

1. **Given** a task exists with title "Buy groceries", **When** I update it with title "Buy food", **Then** the task's title is changed while preserving description and status.
2. **Given** a task exists, **When** I update it with a new description, **Then** the description is changed.
3. **Given** a task exists, **When** I update it and leave title/description empty, **Then** the original values are preserved (user can press Enter to keep).
4. **Given** no tasks exist, **When** I select "Update Task", **Then** a message "No tasks to update" is displayed.
5. **Given** tasks exist, **When** I enter an invalid task ID, **Then** an error "Invalid task ID" is displayed.

---

### User Story 4 - Delete Task (Priority: P1)

As a user, I want to remove tasks so I can keep my list clean and relevant.

**Why this priority**: Essential for managing task list lifecycle.

**Independent Test**: Can be tested by adding 2 tasks, deleting one, and verifying only the other remains.

**Acceptance Scenarios**:

1. **Given** multiple tasks exist, **When** I delete task with ID 1, **Then** task 1 is removed and remaining tasks keep their IDs.
2. **Given** no tasks exist, **When** I select "Delete Task", **Then** a message "No tasks to delete" is displayed.
3. **Given** tasks exist, **When** I enter an invalid task ID, **Then** an error "Invalid task ID" is displayed.
4. **Given** the last task exists, **When** I delete it, **Then** the list becomes empty.

---

### User Story 5 - Mark Complete/Incomplete (Priority: P1)

As a user, I want to toggle task completion status so I can track what I've accomplished.

**Why this priority**: Core workflow - users need to mark tasks as done and reopen if needed.

**Independent Test**: Can be tested by adding a task, marking it complete, verifying status change, then marking it incomplete again.

**Acceptance Scenarios**:

1. **Given** a task exists with incomplete status, **When** I mark it complete, **Then** its status changes to completed.
2. **Given** a task exists with completed status, **When** I mark it incomplete, **Then** its status changes to incomplete.
3. **Given** no tasks exist, **When** I select "Mark Complete/Incomplete", **Then** a message "No tasks available" is displayed.
4. **Given** tasks exist, **When** I enter an invalid task ID, **Then** an error "Invalid task ID" is displayed.

---

### User Story 6 - Exit Application (Priority: P1)

As a user, I want to cleanly exit the application so I can return to my terminal.

**Why this priority**: Basic usability requirement.

**Acceptance Scenarios**:

1. **Given** the app is running, **When** I select "Exit", **Then** the application terminates with a friendly "Goodbye!" message.
2. **Given** the app is running, **When** I select "Exit", **Then** any in-memory tasks are lost (expected per in-memory design).

---

### Edge Cases

- What happens when user enters non-numeric input for menu selection? → Display "Please enter a number" and re-prompt.
- What happens when user enters a number outside the valid range? → Display "Invalid choice" and re-prompt.
- What happens when user enters whitespace-only for title? → Display "Title cannot be empty" and re-prompt.
- What happens when user presses Ctrl+C? → Handle gracefully, maybe display "Use option 6 to exit" and return to menu.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST display a main menu with 6 numbered options (Add, List, Update, Delete, Mark, Exit).
- **FR-002**: Users MUST be able to select options by typing a number and pressing Enter.
- **FR-003**: After each action, the application MUST return to the main menu.
- **FR-004**: The application MUST validate all user input and display clear error messages for invalid input.
- **FR-005**: Tasks MUST be stored in-memory with no file or database persistence.
- **FR-006**: Each task MUST have a unique numeric ID assigned sequentially starting from 1.
- **FR-007**: Tasks MUST have a title (required), description (optional), and completion status.
- **FR-008**: The application MUST handle empty task list gracefully for all operations.
- **FR-009**: The application MUST handle invalid menu selections gracefully.
- **FR-010**: The application MUST provide example user sessions in documentation.

### Key Entities

- **Task**: Represents a single todo item with:
  - `id`: Integer, unique, auto-incrementing
  - `title`: String, required, non-empty
  - `description`: String, optional, defaults to empty string
  - `completed`: Boolean, defaults to False

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can add, list, update, delete, and toggle task status through a menu-driven interface.
- **SC-002**: Invalid inputs (non-numeric, out-of-range, empty) are handled with helpful error messages.
- **SC-003**: All six menu options work correctly and return to the main menu after completion.
- **SC-004**: Task operations maintain data integrity (no lost tasks, correct status changes).

## Example User Session

```
=== My Todo App ===

1. Add Task
2. List Tasks
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit

Enter your choice (1-6): 1

=== Add Task ===
Enter task title: Buy groceries
Enter description (optional): Milk, eggs, bread
Task added successfully! (ID: 1)

=== Main Menu ===

1. Add Task
2. List Tasks
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit

Enter your choice (1-6): 2

=== Your Tasks ===

ID | Status | Title
---|--------|------
1  | [ ]    | Buy groceries
    |        | Milk, eggs, bread

No tasks yet. Add your first task!

=== Main Menu ===

1. Add Task
2. List Tasks
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit

Enter your choice (1-6): 1

=== Add Task ===
Enter task title: Call Mom
Enter description (optional):
Task added successfully! (ID: 2)

=== Main Menu ===

1. Add Task
2. List Tasks
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit

Enter your choice (1-6): 5

=== Mark Complete/Incomplete ===
Enter task ID to toggle: 1

Task "Buy groceries" marked as COMPLETE.

=== Main Menu ===

1. Add Task
2. List Tasks
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit

Enter your choice (1-6): 3

=== Update Task ===
Enter task ID to update: 1
Enter new title (or press Enter to keep 'Buy groceries'): Buy food
Enter new description (or press Enter to keep 'Milk, eggs, bread'):

Task updated successfully!

=== Main Menu ===

1. Add Task
2. List Tasks
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit

Enter your choice (1-6): 2

=== Your Tasks ===

ID | Status | Title
---|--------|------
1  | [X]    | Buy food
    |        | Milk, eggs, bread
2  | [ ]    | Call Mom

=== Main Menu ===

1. Add Task
2. List Tasks
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit

Enter your choice (1-6): 6

Goodbye!
```

## Error Handling Examples

```
Enter your choice (1-6): 7
Invalid choice. Please enter a number between 1 and 6.

Enter your choice (1-6): abc
Please enter a valid number.

=== Update Task ===
Enter task ID to update: 99
Invalid task ID. Please enter a number between 1 and 2.

=== Add Task ===
Enter task title:
Title cannot be empty. Please try again.
Enter task title: Valid Title
```
