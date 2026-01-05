# API Specification: REST Endpoints

**Feature Branch**: `003-todo-app-web`
**Created**: 2026-01-01
**Status**: Draft
**Input**: Phase II requirements - task and auth APIs

## Authentication Endpoints

### POST /auth/register

Create a new user account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201)**:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "token": {
    "access_token": "eyJ...",
    "token_type": "bearer"
  }
}
```

**Errors**:
- 400: Validation error (invalid email, short password)
- 409: Email already registered

---

### POST /auth/login

Authenticate and receive JWT token.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200)**:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "token": {
    "access_token": "eyJ...",
    "token_type": "bearer"
  }
}
```

**Errors**:
- 401: Invalid credentials

---

## Task Endpoints

All task endpoints require `Authorization: Bearer <token>` header.

### GET /tasks

List all tasks for authenticated user.

**Response (200)**:
```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Buy milk",
      "description": "Get 2% milk",
      "completed": false,
      "completed_at": null,
      "created_at": "2026-01-01T10:00:00Z",
      "updated_at": "2026-01-01T10:00:00Z"
    }
  ]
}
```

---

### POST /tasks

Create a new task.

**Request Body**:
```json
{
  "title": "Buy milk",
  "description": "Get 2% milk"
}
```

**Response (201)**:
```json
{
  "task": {
    "id": "uuid",
    "title": "Buy milk",
    "description": "Get 2% milk",
    "completed": false,
    "completed_at": null,
    "created_at": "2026-01-01T10:00:00Z",
    "updated_at": "2026-01-01T10:00:00Z"
  }
}
```

**Errors**:
- 400: Validation error (missing title, title too long)
- 401: Unauthorized (missing/invalid token)

---

### GET /tasks/{task_id}

Get a specific task.

**Response (200)**:
```json
{
  "task": {
    "id": "uuid",
    "title": "Buy milk",
    "description": "Get 2% milk",
    "completed": false,
    "completed_at": null,
    "created_at": "2026-01-01T10:00:00Z",
    "updated_at": "2026-01-01T10:00:00Z"
  }
}
```

**Errors**:
- 401: Unauthorized
- 403: Forbidden (task belongs to another user)
- 404: Task not found

---

### PUT /tasks/{task_id}

Update a task.

**Request Body**:
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

**Response (200)**:
```json
{
  "task": {
    "id": "uuid",
    "title": "Updated title",
    "description": "Updated description",
    "completed": false,
    "completed_at": null,
    "created_at": "2026-01-01T10:00:00Z",
    "updated_at": "2026-01-01T10:30:00Z"
  }
}
```

**Errors**:
- 400: Validation error
- 401: Unauthorized
- 403: Forbidden
- 404: Not found

---

### PATCH /tasks/{task_id}/toggle

Toggle task completion status.

**Response (200)**:
```json
{
  "task": {
    "id": "uuid",
    "title": "Buy milk",
    "completed": true,
    "completed_at": "2026-01-01T10:30:00Z",
    "updated_at": "2026-01-01T10:30:00Z"
  }
}
```

**Errors**:
- 401: Unauthorized
- 403: Forbidden
- 404: Not found

---

### DELETE /tasks/{task_id}

Delete a task.

**Response (204)**: No content

**Errors**:
- 401: Unauthorized
- 403: Forbidden
- 404: Not found

---

## User Endpoints

### GET /users/me

Get current authenticated user.

**Response (200)**:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2026-01-01T09:00:00Z"
  }
}
```

---

## Error Response Format

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

**Error Codes**:
| Code | HTTP Status | Description |
|------|-------------|-------------|
| validation_error | 400 | Request validation failed |
| unauthorized | 401 | Missing or invalid JWT |
| forbidden | 403 | Not owner of resource |
| not_found | 404 | Resource doesn't exist |
| conflict | 409 | Email already exists |
| internal_error | 500 | Server error |

## JWT Token Structure

**Header**:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload**:
```json
{
  "sub": "uuid-of-user",
  "email": "user@example.com",
  "exp": 1704111000,
  "iat": 1704110100
}
```

**Signature**: HS256 with SECRET_KEY environment variable
