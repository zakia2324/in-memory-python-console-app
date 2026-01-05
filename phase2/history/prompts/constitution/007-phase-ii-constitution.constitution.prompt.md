---
id: "007"
title: "Phase II Web Constitution"
stage: "constitution"
date: "2026-01-01"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "none"
branch: "main"
user: "AK Technology"
command: "sp.constitution phase2-web <<EOF\nPhase II Objective:\nTransform the existing console-based Todo application into a modern multi-user full-stack web application with persistent storage.\n\nRules:\n- No manual coding by the human.\n- All code must be generated and modified by Claude Code.\n- Development must follow Spec-Driven workflow using Spec-Kit Plus.\n- Backend must be Python FastAPI with SQLModel and Neon PostgreSQL.\n- Frontend must be Next.js App Router (v16+).\n- Authentication must use Better Auth on frontend with JWT-based verification on backend.\n- Monorepo structure must be followed as defined.\n- All features must reference specs under /specs using @specs paths.\n- REST API must be secured; every request requires JWT.\n- Task ownership must be enforced strictly.\n\nSuccess Criteria:\n- Multi-user Todo web app\n- Authenticated users only see their own tasks\n- Fully spec-driven implementation\nEOF"
labels: ["constitution","phase-ii","fullstack","architecture"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - ".specify/memory/constitution.md"
tests: []
---

## Prompt

sp.constitution phase2-web <<EOF
Phase II Objective:
Transform the existing console-based Todo application into a modern multi-user full-stack web application with persistent storage.

Rules:
- No manual coding by the human.
- All code must be generated and modified by Claude Code.
- Development must follow Spec-Driven workflow using Spec-Kit Plus.
- Backend must be Python FastAPI with SQLModel and Neon PostgreSQL.
- Frontend must be Next.js App Router (v16+).
- Authentication must use Better Auth on frontend with JWT-based verification on backend.
- Monorepo structure must be followed as defined.
- All features must reference specs under /specs using @specs paths.
- REST API must be secured; every request requires JWT.
- Task ownership must be enforced strictly.

Success Criteria:
- Multi-user Todo web app
- Authenticated users only see their own tasks
- Fully spec-driven implementation
EOF

## Response snapshot

Created Phase II constitution (v2.0.0) with:
- Preserved Phase I legacy principles for reference
- 5 new Phase II core principles covering web architecture, spec-driven development, JWT security, monorepo structure, and Claude Code execution
- Technology stack table defining FastAPI/SQLModel/Neon/Next.js/Better Auth
- Security model with JWT requirements, task ownership enforcement, password handling
- Development workflow with branch strategy, spec-driven flow, testing requirements
- Definition of Done specific to Phase II web development

## Outcome

- ✅ Impact: Constitution updated to v2.0.0, enabling full-stack web transformation
- 🧪 Tests: N/A (constitution update)
- 📁 Files: 1 modified (.specify/memory/constitution.md)
- 🔁 Next prompts: Create @specs/003-todo-app-web/spec.md
- 🧠 Reflection: Phase II establishes completely different architecture - FastAPI backend, Next.js frontend, Neon PostgreSQL, JWT auth. Breaking change from Phase I CLI approach.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
