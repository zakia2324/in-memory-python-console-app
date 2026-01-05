# Phase II Overview: Full-Stack Todo Web Application

**Feature Branch**: `003-todo-app-web`
**Created**: 2026-01-01
**Status**: Active

## Executive Summary

Transform the existing CLI-based Todo application into a modern multi-user web application with persistent storage. The system will support user authentication, task CRUD operations, and strict task ownership enforcement.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │  Signup   │  │   Login   │  │  Dashboard│               │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘               │
│        │              │              │                      │
│        └──────────────┴──────────────┘                      │
│                      │                                       │
│              ┌───────▼───────┐                               │
│              │ Better Auth   │                               │
│              │ (JWT Tokens)  │                               │
│              └───────┬───────┘                               │
└──────────────────────┼───────────────────────────────────────┘
                       │ HTTP + JWT
┌──────────────────────┼───────────────────────────────────────┐
│                     Backend (FastAPI)                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐    │
│  │ Auth Router   │  │ Task Router   │  │ User Router   │    │
│  │ /auth/*       │  │ /tasks/*      │  │ /users/*      │    │
│  └───────────────┘  └───────────────┘  └───────────────┘    │
│                      │                                       │
│              ┌───────▼───────┐                               │
│              │ JWT Verify    │                               │
│              │ Middleware    │                               │
│              └───────┬───────┘                               │
│                      │                                       │
│              ┌───────▼───────┐                               │
│              │ SQLModel      │                               │
│              │ PostgreSQL    │                               │
│              └───────────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16+ (App Router) |
| Frontend Auth | Better Auth |
| Backend | Python FastAPI |
| ORM | SQLModel |
| Database | Neon PostgreSQL |
| JWT | Python-jose + passlib |

## Core Requirements

### Multi-Tenancy
- Users authenticate via email/password
- Each user sees only their own tasks
- Task ownership enforced at API layer

### Persistent Storage
- All data stored in Neon PostgreSQL
- Schema managed via SQLModel
- Migrations tracked in version control

### Security
- JWT-based authentication
- 15-minute access token expiry
- Password hashing with bcrypt (12 rounds)

## User Journey

```
1. User visits app → Redirected to /login
2. User signs up → Account created, JWT issued
3. User logs in → JWT issued, redirected to dashboard
4. User creates task → Task saved with user_id
5. User views tasks → Only own tasks returned
6. User toggles task → Status updated, reflected in UI
7. User logs out → JWT discarded, session cleared
```

## Success Criteria

- SC-001: Users can create account and authenticate
- SC-002: Authenticated users access only their tasks
- SC-003: Task CRUD operations complete within 500ms
- SC-004: JWT verification prevents unauthorized access

## Related Specs

- @specs/features/authentication.md
- @specs/features/task-crud.md
- @specs/api/rest-endpoints.md
- @specs/database/schema.md
