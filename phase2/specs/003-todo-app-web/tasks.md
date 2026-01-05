---
description: "Phase II implementation tasks for full-stack Todo web application"
---

# Tasks: Phase II - Full-Stack Todo Web Application

**Feature Branch**: `003-todo-app-web`
**Input**:
- @specs/overview.md
- @specs/features/task-crud.md
- @specs/features/authentication.md
- @specs/api/rest-endpoints.md
- @specs/database/schema.md

## Execution Order

**Phase 1**: Spec Verification → No dependencies
**Phase 2**: Backend Setup → Depends on Phase 1
**Phase 3**: Frontend Setup → Depends on Phase 2 (backend running)
**Phase 4**: Integration → Depends on Phases 2 & 3

---

## Phase 1: Spec Verification & Monorepo Setup

**Purpose**: Verify all specs are aligned and initialize monorepo structure

### T001 [Spec Verification] Verify all Phase II specs exist and are consistent

- **Location**: `specs/*.md`
- **Backend**: No
- **Frontend**: No
- **Action**: Verify these files exist and are readable:
  - [ ] `specs/overview.md`
  - [ ] `specs/features/task-crud.md`
  - [ ] `specs/features/authentication.md`
  - [ ] `specs/api/rest-endpoints.md`
  - [ ] `specs/database/schema.md`
- **Verify**: Cross-reference API endpoints in `@specs/api/rest-endpoints.md` with task requirements in `@specs/features/task-crud.md`

---

### T002 [P] [Monorepo] Create monorepo directory structure

- **Location**: `backend/`, `frontend/`
- **Backend**: Yes
- **Frontend**: Yes
- **Action**: Create directories following Spec-Kit structure:
  ```bash
  backend/
    src/
      models/
      routers/
      middleware/
      core/
    tests/
      __init__.py
    pyproject.toml
    requirements.txt
    .env.example
  frontend/
    src/
      app/
      components/
      lib/
      types/
    tests/
    package.json
    next.config.js
    tsconfig.json
  ```

---

### T003 [P] [Backend] Initialize Python/FastAPI project

- **Location**: `backend/`
- **Backend**: Yes
- **Frontend**: No
- **Action**:
  - Initialize Python project with `pyproject.toml`
  - Add dependencies: `fastapi`, `sqlmodel`, `uvicorn`, `python-jose`, `passlib`, `bcrypt`, `pydantic`
  - Create `backend/src/__init__.py`
  - Create `.env.example` with: `DATABASE_URL`, `SECRET_KEY`, `JWT_ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`

---

### T004 [P] [Frontend] Initialize Next.js project with TypeScript

- **Location**: `frontend/`
- **Backend**: No
- **Frontend**: Yes
- **Action**:
  - Initialize Next.js 16+ with App Router: `npx create-next-app@latest frontend --typescript --tailwind --eslint`
  - Add dependencies: `better-auth`, `axios`, `zod`, `react-hook-form`
  - Create `frontend/src/types/` for shared TypeScript types

---

**Checkpoint**: Phase 1 complete - monorepo initialized, specs verified

---

## Phase 2: Backend Implementation

**Purpose**: Build FastAPI backend with auth, JWT, and task CRUD

### T005 [Database] Define SQLModel User and Task models

- **Location**: `backend/src/models/user.py`, `backend/src/models/task.py`
- **Backend**: Yes
- **Frontend**: No
- **References**: @specs/database/schema.md
- **Action**: Create SQLModel classes:
  - `User` table with id, email, password_hash, created_at, updated_at
  - `Task` table with id, user_id (FK), title, description, completed, completed_at, created_at, updated_at
  - Define relationship: User.tasks → Task.user
- **Verify**: Tables match @specs/database/schema.md column definitions

---

### T006 [Database] Create database connection and session management

- **Location**: `backend/src/core/database.py`
- **Backend**: Yes
- **Frontend**: No
- **References**: @specs/database/schema.md
- **Action**:
  - Create `get_db()` dependency for FastAPI
  - Configure SQLModel engine with Neon PostgreSQL URL from env
  - Implement session lifecycle management

---

### T007 [Auth] Implement password hashing utilities

- **Location**: `backend/src/core/auth.py`
- **Backend**: Yes
- **Frontend**: No
- **References**: @specs/features/authentication.md
- **Action**:
  - Implement `hash_password(password: str) -> str` using bcrypt (12 rounds)
  - Implement `verify_password(plain_password: str, hashed_password: str) -> bool`
- **Verify**: Passwords are not stored in plaintext

---

### T008 [Auth] Implement JWT token creation and verification

- **Location**: `backend/src/core/auth.py`
- **Backend**: Yes
- **Frontend**: No
- **References**: @specs/features/authentication.md, @specs/api/rest-endpoints.md
- **Action**:
  - Implement `create_access_token(user_id: UUID, email: str) -> str` with 15-min expiry
  - Implement `verify_token(token: str) -> dict` using python-jose HS256
  - Create JWT payload: `{"sub": user_id, "email": email, "exp": ..., "iat": ...}`

---

### T009 [Middleware] Create JWT authentication dependency

- **Location**: `backend/src/middleware/auth.py`
- **Backend**: Yes
- **Frontend**: No
- **References**: @specs/features/authentication.md
- **Action**:
  - Create `get_current_user(token: str) -> User` FastAPI dependency
  - Extract `Authorization: Bearer <token>` header
  - Verify JWT and retrieve user from database
  - Return 401 if token missing/invalid/expired
  - Attach `current_user` to request state

---

### T010 [API] Implement User registration endpoint

- **Location**: `backend/src/routers/auth.py`
- **Backend**: Yes
- **Frontend**: No
- **References**: @specs/features/authentication.md, @specs/api/rest-endpoints.md
- **Action**:
  - POST `/auth/register` accepting `email`, `password`
  - Validate email format, password >= 8 chars
  - Check email uniqueness (409 if exists)
  - Hash password and create User record
  - Return JWT token and user info (201)
- **Error Codes**: 400 (validation), 409 (conflict)

---

### T011 [API] Implement User login endpoint

- **Location**: `backend/src/routers/auth.py`
- **Backend**: Yes
- **Frontend**: No
- **References**: @specs/features/authentication.md, @specs/api/rest-endpoints.md
- **Action**:
  - POST `/auth/login` accepting `email`, `password`
  - Look up user by email
  - Verify password hash
  - Return JWT token and user info (200)
  - Return 401 for invalid credentials (generic message)
- **Security**: Don't reveal if email exists

---

### T012 [API] Implement GET /users/me endpoint

- **Location**: `backend/src/routers/users.py`
- **Backend**: Yes
- **Frontend**: No
- **References**: @specs/api/rest-endpoints.md
- **Action**:
  - GET `/users/me` returning current authenticated user
  - Requires JWT authentication
  - Return user id, email, created_at

---

### T013 [API] Implement Task CRUD endpoints

- **Location**: `backend/src/routers/tasks.py`
- **Backend**: Yes
- **Frontend**: No
- **References**: @specs/features/task-crud.md, @specs/api/rest-endpoints.md
- **Action**: Implement these endpoints (all require JWT):
  - GET `/tasks/` - List all tasks for current user
  - POST `/tasks/` - Create task (title required, description optional)
  - GET `/tasks/{task_id}` - Get specific task
  - PUT `/tasks/{task_id}` - Update task title/description
  - PATCH `/tasks/{task_id}/toggle` - Toggle completion status
  - DELETE `/tasks/{task_id}` - Delete task
- **Enforcement**: Filter all queries by `user_id = current_user.id`
- **Errors**: 403 if user tries to access another user's task

---

### T014 [API] Register all routers in main FastAPI app

- **Location**: `backend/src/main.py`
- **Backend**: Yes
- **Frontend**: No
- **Action**:
  - Create FastAPI app instance
  - Include auth router at `/auth`
  - Include users router at `/users`
  - Include tasks router at `/tasks`
  - Add CORS middleware for frontend origin
  - Configure OpenAPI metadata

---

### T015 [Testing] Write backend unit tests for auth logic

- **Location**: `backend/tests/test_auth.py`
- **Backend**: Yes
- **Frontend**: No
- **Action**:
  - Test password hashing and verification
  - Test JWT token creation and verification
  - Test token expiry handling
- **Run**: `pytest backend/tests/ -v`

---

### T016 [Testing] Write backend integration tests for API

- **Location**: `backend/tests/test_api.py`
- **Backend**: Yes
- **Frontend**: No
- **Action**:
  - Test user registration flow
  - Test login and JWT reception
  - Test task CRUD with authentication
  - Test task ownership enforcement
- **Run**: `pytest backend/tests/ -v`

---

**Checkpoint**: Phase 2 complete - backend fully functional with auth and tasks

---

## Phase 3: Frontend Implementation

**Purpose**: Build Next.js frontend with Better Auth and task UI

### T017 [Auth] Configure Better Auth

- **Location**: `frontend/src/lib/auth.ts`
- **Backend**: No
- **Frontend**: Yes
- **References**: @specs/features/authentication.md
- **Action**:
  - Initialize Better Auth client
  - Configure email/password sign-up
  - Configure JWT storage (cookies or localStorage)
  - Create auth state management hooks

---

### T018 [API] Create API client with JWT attachment

- **Location**: `frontend/src/lib/api.ts`
- **Backend**: No
- **Frontend**: Yes
- **References**: @specs/api/rest-endpoints.md
- **Action**:
  - Create axios instance with base URL (`http://localhost:8000`)
  - Add request interceptor to attach `Authorization: Bearer <token>` header
  - Get token from Better Auth session
  - Handle 401 responses (redirect to login)

---

### T019 [Types] Create shared TypeScript types

- **Location**: `frontend/src/types/index.ts`
- **Backend**: No
- **Frontend**: Yes
- **References**: @specs/api/rest-endpoints.md, @specs/database/schema.md
- **Action**:
  - Define `User` interface matching backend User model
  - Define `Task` interface matching backend Task model
  - Define API response types
  - Define form input types

---

### T020 [UI] Create Signup page

- **Location**: `frontend/src/app/signup/page.tsx`
- **Backend**: No
- **Frontend**: Yes
- **Action**:
  - Create signup form with email and password fields
  - Call Better Auth signUp()
  - On success, redirect to dashboard or login
  - Show error messages for validation failures

---

### T021 [UI] Create Login page

- **Location**: `frontend/src/app/login/page.tsx`
- **Backend**: No
- **Frontend**: Yes
- **Action**:
  - Create login form with email and password fields
  - Call Better Auth signIn()
  - On success, redirect to dashboard
  - Show error for invalid credentials

---

### T022 [UI] Create Auth-protected Layout and Navigation

- **Location**: `frontend/src/app/(authenticated)/layout.tsx`
- **Backend**: No
- **Frontend**: Yes
- **Action**:
  - Create authenticated layout wrapper
  - Check auth state on mount
  - Redirect to /login if not authenticated
  - Show navigation with logout button

---

### T023 [UI] Create Dashboard (Task List) page

- **Location**: `frontend/src/app/(authenticated)/dashboard/page.tsx`
- **Backend**: No
- **Frontend**: Yes
- **References**: @specs/features/task-crud.md
- **Action**:
  - Fetch tasks via API client
  - Display tasks in list with checkbox for completion
  - Show task title and description
  - Add buttons for edit and delete
  - Display empty state if no tasks

---

### T024 [UI] Create Task Create page

- **Location**: `frontend/src/app/(authenticated)/tasks/new/page.tsx`
- **Backend**: No
- **Frontend**: Yes
- **Action**:
  - Create form with title (required) and description (optional)
  - On submit, POST to `/tasks/`
  - On success, redirect to dashboard
  - Show validation errors

---

### T025 [UI] Create Task Edit page

- **Location**: `frontend/src/app/(authenticated)/tasks/[id]/edit/page.tsx`
- **Backend**: No
- **Frontend**: Yes
- **Action**:
  - Fetch task by ID via API
  - Pre-fill form with current values
  - On submit, PUT to `/tasks/{id}`
  - On success, redirect to dashboard
  - Handle 403 (not owner) and 404 (not found)

---

### T026 [UI] Add Task Toggle and Delete functionality

- **Location**: `frontend/src/components/TaskItem.tsx`
- **Backend**: No
- **Frontend**: Yes
- **Action**:
  - Create TaskItem component with toggle checkbox
  - Toggle calls PATCH `/tasks/{id}/toggle`
  - Delete button calls DELETE `/tasks/{id}`
  - Optimistic UI update on toggle

---

### T027 [UI] Add Logout functionality

- **Location**: `frontend/src/components/LogoutButton.tsx`
- **Backend**: No
- **Frontend**: Yes
- **Action**:
  - Create logout button in navigation
  - Call Better Auth signOut()
  - Clear JWT from API client
  - Redirect to /login

---

### T028 [Testing] Write frontend tests for auth flow

- **Location**: `frontend/tests/auth.test.tsx`
- **Backend**: No
- **Frontend**: Yes## Error Type
Build Error

## Error Message
Error evaluating Node.js code

## Build Output
./Desktop/mymemorypython2/frontend/src/app/globals.css
Error evaluating Node.js code
CssSyntaxError: C:\Users\AK Technology\Desktop\mymemorypython2\frontend\src\app\globals.css:1:1: The `border-border` class does not exist. If `border-border` is a custom class, make sure it is defined within a `@layer` directive.
    [at Input.error (turbopack:///[project]/Desktop/mymemorypython2/frontend/node_modules/postcss/lib/input.js:135:16)]
    [at AtRule.error (turbopack:///[project]/Desktop/mymemorypython2/frontend/node_modules/postcss/lib/node.js:146:32)]
    [at processApply (C:\Users\AK Technology\Desktop\mymemorypython2\frontend\node_modules\tailwindcss\lib\lib\expandApplyAtRules.js:380:29)]
    [at C:\Users\AK Technology\Desktop\mymemorypython2\frontend\node_modules\tailwindcss\lib\lib\expandApplyAtRules.js:551:9]
    [at C:\Users\AK Technology\Desktop\mymemorypython2\frontend\node_modules\tailwindcss\lib\processTailwindFeatures.js:55:50]
    [at async plugins (C:\Users\AK Technology\Desktop\mymemorypython2\frontend\node_modules\tailwindcss\lib\plugin.js:38:17)]
    [at async LazyResult.runAsync (turbopack:///[project]/Desktop/mymemorypython2/frontend/node_modules/postcss/lib/lazy-result.js:293:11)]
    [at async transform (turbopack:///[turbopack-node]/transforms/postcss.ts:70:34)]
    [at async run (turbopack:///[turbopack-node]/ipc/evaluate.ts:92:23)]

Import trace:
  Client Component Browser:
    ./Desktop/mymemorypython2/frontend/src/app/globals.css [Client Component Browser]
    ./Desktop/mymemorypython2/frontend/src/app/layout.tsx [Server Component]

Next.js version: 16.1.1 (Turbopack)

- **Action**:
  - Test signup page renders and submits
  - Test login page renders and authenticates
  - Test protected route redirects when not logged in
- **Run**: `npm test -- frontend/tests/`

---

### T029 [Testing] Write frontend tests for task operations

- **Location**: `frontend/tests/tasks.test.tsx`
- **Backend**: No
- **Frontend**: Yes
- **Action**:
  - Test dashboard renders task list
  - Test task creation form
  - Test task toggle functionality
  - Test task deletion
- **Run**: `npm test -- frontend/tests/`

---

**Checkpoint**: Phase 3 complete - frontend fully functional with auth and tasks

---

## Phase 4: End-to-End Integration & Testing

**Purpose**: Verify complete user journey and task isolation

### T030 [E2E] Create Playwright test for complete auth flow

- **Location**: `e2e/tests/auth-flow.spec.ts`
- **Backend**: Yes
- **Frontend**: Yes
- **Action**:
  - Test user registration flow (fill form, submit, receive JWT)
  - Test login flow with valid credentials
  - Test accessing protected route without auth redirects to login
- **Run**: `npx playwright test e2e/tests/auth-flow.spec.ts`

---

### T031 [E2E] Create Playwright test for task CRUD

- **Location**: `e2e/tests/task-crud.spec.ts`
- **Backend**: Yes
- **Frontend**: Yes
- **Action**:
  - Login as user1, create 2 tasks
  - Verify tasks appear in list
  - Toggle first task to complete
  - Edit second task title
  - Delete first task
  - Verify final state
- **Run**: `npx playwright test e2e/tests/task-crud.spec.ts`

---

### T032 [E2E] Create Playwright test for task isolation

- **Location**: `e2e/tests/task-isolation.spec.ts`
- **Backend**: Yes
- **Frontend**: Yes
- **Action**:
  - Login as user1, create task "User1 Task"
  - Login as user2 in new context
  - Verify user2 sees only their tasks (not "User1 Task")
  - Attempt to access user1's task via direct URL
  - Verify 403/redirect (cannot access other user's task)
- **Run**: `npx playwright test e2e/tests/task-isolation.spec.ts`

---

### T033 [Verification] Verify JWT enforcement on all endpoints

- **Location**: `backend/tests/test_jwt_enforcement.py`
- **Backend**: Yes
- **Frontend**: No
- **Action**:
  - GET /tasks without token → 401
  - GET /tasks with invalid token → 401
  - GET /tasks with expired token → 401
  - POST /tasks with valid token → 201
  - Verify all 6 task endpoints require auth
- **Run**: `pytest backend/tests/test_jwt_enforcement.py -v`

---

### T034 [Verification] Verify task ownership enforcement

- **Location**: `backend/tests/test_ownership.py`
- **Backend**: Yes
- **Frontend**: No
- **Action**:
  - Create task as user1
  - Get task as user2 → 403
  - Update task as user2 → 403
  - Delete task as user2 → 403
  - Toggle task as user2 → 403
- **Run**: `pytest backend/tests/test_ownership.py -v`

---

### T035 [Documentation] Create environment configuration documentation

- **Location**: `docs/configuration.md`
- **Backend**: Yes
- **Frontend**: Yes
- **Action**:
  - Document all environment variables
  - Document Neon PostgreSQL setup
  - Document JWT configuration
  - Provide example .env files

---

### T036 [Documentation] Create API documentation

- **Location**: `docs/api.md`
- **Backend**: Yes
- **Frontend**: No
- **Action**:
  - Document all REST endpoints
  - Provide example requests/responses
  - Document error codes
  - Link to @specs/api/rest-endpoints.md

---

**Checkpoint**: Phase 4 complete - all e2e tests pass, system ready for deployment

---

## Dependencies & Execution Order Summary

### Phase Dependencies

| Phase | Depends On | Blocks |
|-------|------------|--------|
| Phase 1: Spec & Setup | None | Phase 2 |
| Phase 2: Backend | Phase 1 | Phase 3, Phase 4 |
| Phase 3: Frontend | Phase 2 (backend running) | Phase 4 |
| Phase 4: E2E Testing | Phases 2 & 3 | Release |

### Within-Phase Dependencies

**Phase 1**: T001 → T002, T003, T004 (T002-T004 can run in parallel)

**Phase 2**: T005 → T006 → T007 → T008 → T009 → T010, T011 → T012 → T013 → T014 → T015, T016

**Phase 3**: T017 → T018, T019 → T020, T021 → T022 → T023 → T024 → T025 → T026, T027 → T028, T029

**Phase 4**: All T030-T036 can run once Phase 2 & 3 are complete

---

## Parallel Opportunities

- T002, T003, T004: Can initialize backend and frontend in parallel
- T015, T016: Backend tests can run in parallel
- T020, T021: Signup and login pages independent
- T028, T029: Frontend tests can run in parallel
- T030, T031, T032: E2E tests can run in parallel

---

## Definition of Done (per task)

- [ ] Code written as specified
- [ ] Tests written (where applicable)
- [ ] Tests pass locally
- [ ] No lint errors
- [ ] Referenced specs verified
- [ ] PHR created for implementation session
