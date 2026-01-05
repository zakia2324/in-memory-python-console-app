---
id: "009"
title: "Phase II Implementation Tasks"
stage: "tasks"
date: "2026-01-01"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "003-todo-app-web"
branch: "main"
user: "AK Technology"
command: "sp.tasks phase2-web <<EOF\nBreak Phase II into clear, sequential development tasks.\n\nTasks must include:\n1. Spec verification and alignment\n2. Monorepo initialization following Spec-Kit structure\n3. Backend FastAPI setup\n4. SQLModel models and Neon PostgreSQL connection\n5. JWT verification middleware in FastAPI\n6. REST API implementation (CRUD + complete toggle)\n7. Frontend Next.js app setup (App Router)\n8. Better Auth configuration with JWT issuance\n9. Frontend API client attaching JWT tokens\n10. UI pages for signup, login, task list, task create/edit\n11. Auth-protected routing\n12. End-to-end testing (auth + task isolation)\n\nEach task must:\n- Reference relevant spec files\n- Indicate frontend or backend responsibility\n- Be suitable for Claude Code execution\nEOF"
labels: ["tasks","phase-ii","implementation","backend","frontend"]
links:
  spec: "@specs/overview.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "specs/003-todo-app-web/tasks.md"
tests: []
---

## Prompt

sp.tasks phase2-web <<EOF
Break Phase II into clear, sequential development tasks.

Tasks must include:
1. Spec verification and alignment
2. Monorepo initialization following Spec-Kit structure
3. Backend FastAPI setup
4. SQLModel models and Neon PostgreSQL connection
5. JWT verification middleware in FastAPI
6. REST API implementation (CRUD + complete toggle)
7. Frontend Next.js app setup (App Router)
8. Better Auth configuration with JWT issuance
9. Frontend API client attaching JWT tokens
10. UI pages for signup, login, task list, task create/edit
11. Auth-protected routing
12. End-to-end testing (auth + task isolation)

Each task must:
- Reference relevant spec files
- Indicate frontend or backend responsibility
- Be suitable for Claude Code execution
EOF

## Response snapshot

Created comprehensive task breakdown (36 tasks) organized in 4 phases:

**Phase 1**: Spec Verification & Monorepo Setup (4 tasks)
- T001: Verify all Phase II specs
- T002-T004: Create monorepo structure, init backend, init frontend

**Phase 2**: Backend Implementation (12 tasks)
- T005-T006: SQLModel models + database connection
- T007-T009: Password hashing, JWT, auth middleware
- T010-T014: Auth endpoints, user/me, task CRUD, main app
- T015-T016: Backend unit and integration tests

**Phase 3**: Frontend Implementation (13 tasks)
- T017: Better Auth config
- T018-T019: API client + TypeScript types
- T020-T021: Signup + Login pages
- T022-T027: Auth layout, dashboard, task pages, logout
- T028-T029: Frontend tests

**Phase 4**: E2E Integration & Testing (7 tasks)
- T030-T032: Playwright E2E tests (auth flow, CRUD, isolation)
- T033-T034: JWT + ownership verification tests
- T035-T036: Documentation

Each task references spec files, indicates backend/frontend responsibility, and is suitable for Claude Code execution.

## Outcome

- ✅ Impact: Complete task breakdown created from T001-T036
- 🧪 Tests: 12 test tasks (backend, frontend, e2e, verification)
- 📁 Files: 1 created (specs/003-todo-app-web/tasks.md)
- 🔁 Next prompts: /sp.implement to execute T001-T036
- 🧠 Reflection: Tasks organized sequentially with clear dependencies, parallel opportunities marked with [P].

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
