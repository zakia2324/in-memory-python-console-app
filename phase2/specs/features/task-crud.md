# Feature Specification: Task CRUD Operations

**Feature Branch**: `003-todo-app-web`
**Created**: 2026-01-01
**Status**: Draft
**Input**: Phase II requirements - persistent task management

## User Scenarios & Testing

### User Story 1 - Create Tasks (Priority: P1)

As a user, I want to create new tasks so I can track things I need to do.

**Why this priority**: Task creation is the fundamental feature - without it, there is no todo app.

**Independent Test**: Can be tested by creating a task via API/UI and verifying it appears in the task list with correct content and ownership.

**Acceptance Scenarios**:

1. **Given** user is authenticated, **When** they create a task with title "Buy milk", **Then** the task is saved with title "Buy milk" and user_id set to current user.
2. **Given** user is authenticated, **When** they create a task without a title, **Then** the request is rejected with validation error.
3. **Given** user is authenticated, **When** they create a task with title and description, **Then** both fields are stored and returned in list responses.

---

### User Story 2 - List My Tasks (Priority: P1)

As a user, I want to see all my tasks so I can review what needs to be done.

**Why this priority**: Task listing is essential for the core todo experience.

**Independent Test**: Can be tested by listing tasks for a user and verifying only that user's tasks are returned.

**Acceptance Scenarios**:

1. **Given** user has 3 tasks, **When** they request their task list, **Then** exactly 3 tasks are returned.
2. **Given** user has no tasks, **When** they request their task list, **Then** an empty array is returned.
3. **Given** user A has tasks, **When** user B requests their task list, **Then** only user B's tasks are returned (not user A's).
4. **Given** tasks exist with different completed statuses, **When** user requests tasks, **Then** all statuses are included by default.

---

### User Story 3 - Update Task (Priority: P2)

As a user, I want to edit task details so I can correct mistakes or add more information.

**Why this priority**: Editing is a common workflow but not as critical as create/list.

**Independent Test**: Can be tested by updating a task's title and verifying the change is persisted.

**Acceptance Scenarios**:

1. **Given** task exists with title "Buy milk", **When** user updates title to "Buy almond milk", **Then** the task title is updated.
2. **Given** task exists, **When** user updates the title to empty string, **Then** the request is rejected with validation error.
3. **Given** task belongs to user A, **When** user B attempts to update it, **Then** the request is rejected with 403 Forbidden.

---

### User Story 4 - Toggle Task Completion (Priority: P2)

As a user, I want to mark tasks as complete so I can track my progress.

**Why this priority**: Completion tracking is core to todo app value proposition.

**Independent Test**: Can be tested by toggling a task's completed status and verifying the change.

**Acceptance Scenarios**:

1. **Given** task is incomplete, **When** user toggles it complete, **Then** completed_at is set to current timestamp.
2. **Given** task is complete, **When** user toggles it incomplete, **Then** completed_at is set to null.
3. **Given** task belongs to user A, **When** user B attempts to toggle it, **Then** the request is rejected with 403 Forbidden.

---

### User Story 5 - Delete Task (Priority: P3)

As a user, I want to delete tasks so I can remove things I no longer need to track.

**Why this priority**: Deletion is important but lower priority as tasks can be archived instead.

**Independent Test**: Can be tested by deleting a task and verifying it's no longer accessible.

**Acceptance Scenarios**:

1. **Given** task exists, **When** user deletes it, **Then** the task is removed from the database.
2. **Given** task belongs to user A, **When** user B attempts to delete it, **Then** the request is rejected with 403 Forbidden.

---

### Edge Cases

- What happens when user creates a task with very long title (>500 chars)?
- How does system handle concurrent updates to the same task?
- What happens when user tries to toggle a task that doesn't exist?
- How are tasks sorted when listed (creation time? alphabetical?)?


## Requirements

### Functional Requirements

- **FR-001**: System MUST allow authenticated users to create tasks with title (required) and optional description.
- **FR-002**: System MUST return only tasks belonging to the authenticated user on list requests.
- **FR-003**: System MUST allow users to update task title and description.
- **FR-004**: System MUST allow users to toggle task completion status (completed/incomplete).
- **FR-005**: System MUST allow users to delete their own tasks.
- **FR-006**: System MUST reject any task operation for tasks not owned by the user.
- **FR-007**: System MUST validate required fields (title) on create/update operations.
- **FR-008**: System MUST return appropriate HTTP status codes (200, 201, 400, 401, 403, 404).

### Key Entities

- **Task**: Represents a todo item owned by a user
  - `id`: UUID primary key
  - `user_id`: Foreign key to User
  - `title`: String (1-500 chars, required)
  - `description`: String (optional, nullable)
  - `completed`: Boolean (default false)
  - `completed_at`: DateTime (nullable)
  - `created_at`: DateTime (auto)
  - `updated_at`: DateTime (auto)

## Success Criteria

- **SC-001**: Users can create, read, update, toggle, and delete their tasks
- **SC-002**: Task ownership is enforced at API level (users cannot access others' tasks)
- **SC-003**: Task operations complete within 500ms p95 latency
- **SC-004**: All task endpoints require valid JWT authentication
