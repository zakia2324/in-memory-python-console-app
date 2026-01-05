---
description: "Task list for CLI Todo App implementation"
---

# Tasks: CLI Todo App

**Input**: Design documents from `/specs/002-todo-app-cli/`
**Prerequisites**: plan.md (required), spec.md (required)

**Tests**: Unit tests for core logic are REQUIRED for this feature.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions

- Single project: `src/`, `tests/` at repository root
- Paths shown below assume single project

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create src/ directory with __init__.py
- [ ] T002 Create tests/unit/ directory with __init__.py
- [ ] T003 [P] Create src/tasks.py with Task dataclass skeleton
- [ ] T004 [P] Create src/cli.py with main() skeleton
- [ ] T005 [P] Create src/utils.py with helper functions skeleton

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data structures that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Implement Task dataclass in src/tasks.py (id: int, title: str, description: str, completed: bool)
- [ ] T007 Implement TaskList class in src/tasks.py with _tasks list and _next_id counter
- [ ] T008 [P] Implement get_by_id() method in TaskList for task lookup
- [ ] T009 [P] Implement __len__() and __iter__() methods in TaskList

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add Task (Priority: P1) 🎯 MVP

**Goal**: Users can add tasks with title and optional description

**Independent Test**: Run app, select Add, enter title/description, verify task appears in list

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Unit test: test_add_task_creates_task_with_correct_fields in tests/unit/test_tasks.py
- [ ] T011 [P] [US1] Unit test: test_add_task_assigns_unique_incrementing_ids in tests/unit/test_tasks.py
- [ ] T012 [P] [US1] Unit test: test_add_task_with_empty_description in tests/unit/test_tasks.py
- [ ] T013 [P] [US1] Unit test: test_add_task_default_completed_is_false in tests/unit/test_tasks.py

### Implementation for User Story 1

- [ ] T014 [US1] Implement add() method in TaskList class (src/tasks.py)
- [ ] T015 [US1] Create handle_add() function in src/cli.py for prompting user
- [ ] T016 [US1] Connect add_task() to handle_add() in src/cli.py
- [ ] T017 [US1] Add input validation for non-empty title in handle_add()

**Checkpoint**: User Story 1 complete - tasks can be added

---

## Phase 4: User Story 2 - List Tasks (Priority: P1) 🎯 MVP

**Goal**: Users can view all tasks with ID, title, and status

**Independent Test**: Add 2-3 tasks, select List, verify all display correctly

### Tests for User Story 2 ⚠️

- [ ] T018 [P] [US2] Unit test: test_list_empty_returns_no_tasks in tests/unit/test_tasks.py
- [ ] T019 [P] [US2] Unit test: test_list_returns_all_tasks in tests/unit/test_tasks.py
- [ ] T020 [P] [US2] Unit test: test_task_completed_status_reflected in tests/unit/test_tasks.py

### Implementation for User Story 2

- [ ] T021 [US2] Implement all() method in TaskList class (src/tasks.py)
- [ ] T022 [US2] Create format_task() helper in src/utils.py for display formatting
- [ ] T023 [US2] Create handle_list() function in src/cli.py for displaying tasks
- [ ] T024 [US2] Handle empty task list message in handle_list()

**Checkpoint**: User Stories 1 AND 2 complete - tasks can be added and listed

---

## Phase 5: User Story 3 - Update Task (Priority: P1)

**Goal**: Users can modify task title and/or description

**Independent Test**: Add task, update it, verify changes

### Tests for User Story 3 ⚠️

- [ ] T025 [P] [US3] Unit test: test_update_task_title_changes_title in tests/unit/test_tasks.py
- [ ] T026 [P] [US3] Unit test: test_update_task_description_changes_description in tests/unit/test_tasks.py
- [ ] T027 [P] [US3] Unit test: test_update_task_preserves_other_fields in tests/unit/test_tasks.py
- [ ] T028 [P] [US3] Unit test: test_update_task_invalid_id_raises_error in tests/unit/test_tasks.py

### Implementation for User Story 3

- [ ] T029 [US3] Implement update() method in TaskList class (src/tasks.py)
- [ ] T030 [US3] Create get_valid_task_id() helper in src/utils.py
- [ ] T031 [US3] Create handle_update() function in src/cli.py
- [ ] T032 [US3] Add "press Enter to keep current value" logic in handle_update()

**Checkpoint**: User Story 3 complete - tasks can be updated

---

## Phase 6: User Story 4 - Delete Task (Priority: P1)

**Goal**: Users can remove tasks by ID

**Independent Test**: Add 2 tasks, delete one, verify only other remains

### Tests for User Story 4 ⚠️

- [ ] T033 [P] [US4] Unit test: test_delete_task_removes_from_list in tests/unit/test_tasks.py
- [ ] T034 [P] [US4] Unit test: test_delete_task_invalid_id_raises_error in tests/unit/test_tasks.py
- [ ] T035 [P] [US4] Unit test: test_delete_last_task_results_in_empty_list in tests/unit/test_tasks.py

### Implementation for User Story 4

- [ ] T036 [US4] Implement delete() method in TaskList class (src/tasks.py)
- [ ] T037 [US4] Create handle_delete() function in src/cli.py
- [ ] T038 [US4] Add confirmation prompt (optional) or direct delete in handle_delete()

**Checkpoint**: User Story 4 complete - tasks can be deleted

---

## Phase 7: User Story 5 - Mark Complete/Incomplete (Priority: P1)

**Goal**: Users can toggle task completion status

**Independent Test**: Mark task complete, verify status, mark incomplete, verify status

### Tests for User Story 5 ⚠️

- [ ] T039 [P] [US5] Unit test: test_toggle_task_marks_incomplete_as_complete in tests/unit/test_tasks.py
- [ ] T040 [P] [US5] Unit test: test_toggle_task_marks_complete_as_incomplete in tests/unit/test_tasks.py
- [ ] T041 [P] [US5] Unit test: test_toggle_task_invalid_id_raises_error in tests/unit/test_tasks.py

### Implementation for User Story 5

- [ ] T042 [US5] Implement toggle() method in TaskList class (src/tasks.py)
- [ ] T043 [US5] Create handle_mark() function in src/cli.py
- [ ] T044 [US5] Add clear status change message in handle_mark()

**Checkpoint**: All user stories complete - all CRUD operations working

---

## Phase 8: User Story 6 - Exit Application (Priority: P1)

**Goal**: Users can cleanly exit the application

**Independent Test**: Select Exit, verify application terminates with goodbye message

### Implementation for User Story 6

- [ ] T045 [US6] Create display_menu() function in src/cli.py
- [ ] T046 [US6] Create get_menu_choice() function with input validation in src/cli.py
- [ ] T047 [US6] Implement main() loop in src/cli.py that returns to menu after each action
- [ ] T048 [US6] Add exit option (6) with goodbye message in main loop

---

## Phase 9: Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T049 [P] Add basic console logging in src/tasks.py for key operations
- [ ] T050 [P] Add logging configuration in src/cli.py (--verbose flag support)
- [ ] T051 [P] Add comprehensive error handling throughout src/cli.py
- [ ] T052 [P] Add edge case tests for invalid IDs in tests/unit/test_tasks.py
- [ ] T053 [P] Add edge case tests for empty list operations in tests/unit/test_tasks.py

---

## Phase 10: Polish & Validation

**Purpose**: Final verification and code quality

- [ ] T054 Run all unit tests and fix any failures
- [ ] T055 Test all 6 user stories end-to-end manually
- [ ] T056 Verify edge cases: empty input, invalid IDs, non-numeric input
- [ ] T057 Code review: ensure clean code principles followed
- [ ] T058 Verify logging output for errors and key events

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phases 3-8)**: All depend on Foundational completion
  - User stories can proceed in parallel after Phase 2
- **Cross-Cutting (Phase 9)**: Depends on all user stories
- **Polish (Phase 10)**: Depends on Cross-Cutting completion

### User Story Dependencies

- **US1 (Add)**: Can start after Phase 2 - No dependencies on other stories
- **US2 (List)**: Can start after Phase 2 - No dependencies on other stories
- **US3 (Update)**: Can start after Phase 2 - No dependencies on other stories
- **US4 (Delete)**: Can start after Phase 2 - No dependencies on other stories
- **US5 (Mark)**: Can start after Phase 2 - No dependencies on other stories
- **US6 (Exit)**: Can start after Phase 2 - No dependencies on other stories

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Foundation classes before action handlers
- Action handlers before main loop integration

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- Tests for different user stories marked [P] can run in parallel
- Implementation of different user stories can run in parallel
- Cross-cutting tasks marked [P] can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 + 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Add Task)
4. Complete Phase 4: User Story 2 (List Tasks)
5. **STOP and VALIDATE**: Test add + list independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test → Demo (MVP!)
3. Add User Story 2 → Test → Demo
4. Add User Story 3 → Test → Demo
5. Add User Story 4 → Test → Demo
6. Add User Story 5 → Test → Demo
7. Add User Story 6 → Test → Demo
8. Cross-cutting + Polish → Final

### Parallel Team Strategy

With multiple developers:
1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 + 2 (Add + List)
   - Developer B: User Story 3 + 4 (Update + Delete)
   - Developer C: User Story 5 + 6 (Mark + Exit)
3. Stories complete and integrate independently

---

## Notes

- **[P] tasks** = different files, no dependencies
- **[USN] label** = maps task to specific user story for traceability
- Each user story should be independently completable and testable
- **Write tests FIRST** for user stories, ensure they fail, then implement
- **Commit after each task** or logical group
- Stop at any checkpoint to validate story independently
- **Avoid**: vague tasks, same file conflicts, cross-story dependencies that break independence
