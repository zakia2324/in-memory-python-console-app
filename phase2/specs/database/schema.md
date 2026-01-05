# Database Specification: PostgreSQL Schema

**Feature Branch**: `003-todo-app-web`
**Created**: 2026-01-01
**Status**: Draft
**Input**: Phase II requirements - persistent storage

## Overview

The database uses PostgreSQL (Neon serverless) with SQLModel as the ORM layer. The schema supports multi-user task management with foreign key relationships and proper indexing.

## Schema Diagram

```
┌─────────────────────────────────────┐
│              users                  │
├─────────────────────────────────────┤
│ id: UUID            PK              │
│ email: VARCHAR(255) UNIQUE, INDEX   │
│ password_hash: VARCHAR(255)         │
│ created_at: TIMESTAMP               │
│ updated_at: TIMESTAMP               │
└─────────────────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────────────────┐
│              tasks                  │
├─────────────────────────────────────┤
│ id: UUID            PK              │
│ user_id: UUID       FK → users.id   │
│ title: VARCHAR(500) NOT NULL        │
│ description: TEXT   NULLABLE        │
│ completed: BOOLEAN  DEFAULT FALSE   │
│ completed_at: TIMESTAMP NULLABLE    │
│ created_at: TIMESTAMP               │
│ updated_at: TIMESTAMP               │
└─────────────────────────────────────┘
```

## Table Definitions

### users

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique user identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL, INDEX | User email (login identifier) |
| `password_hash` | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Record creation time |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update time |

**Indexes**:
- `ix_users_email`: ON (email) - For login lookups
- `ix_users_id`: ON (id) - For foreign key references

---

### tasks

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique task identifier |
| `user_id` | UUID | NOT NULL, FK → users.id | Owner of the task |
| `title` | VARCHAR(500) | NOT NULL | Task title (1-500 chars) |
| `description` | TEXT | NULLABLE | Optional task details |
| `completed` | BOOLEAN | NOT NULL, DEFAULT FALSE | Completion status |
| `completed_at` | TIMESTAMP | NULLABLE | When task was completed |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Record creation time |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update time |

**Indexes**:
- `ix_tasks_user_id`: ON (user_id) - For user-scoped queries
- `ix_tasks_completed`: ON (completed) - For filtering by status
- `ix_tasks_created_at`: ON (created_at) - For sorting

**Foreign Keys**:
- `fk_tasks_user_id`: ON DELETE CASCADE - Deleting user deletes their tasks

---

## SQLModel Classes

### User (SQLModel)

```python
class User(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(unique=True, index=True, max_length=255)
    password_hash: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    tasks: list["Task"] = Relationship(back_populates="user", cascade_delete="all")
```

### Task (SQLModel)

```python
class Task(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id", on_delete="CASCADE", index=True)
    title: str = Field(max_length=500)
    description: str | None = Field(default=None)
    completed: bool = Field(default=False)
    completed_at: datetime | None = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user: User = Relationship(back_populates="tasks")
```

---

## Connection Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |
| `SECRET_KEY` | JWT signing key | Yes |

### Connection String Format

```
postgresql://<username>:<password>@<host>/<database>?sslmode=require
```

Example:
```
postgresql://user:pass@ep-xyz.us-east-1.aws.neon.tech/mydb?sslmode=require
```

---

## Migration Strategy

### Development Migrations

1. Use SQLModel `create_all()` for schema creation in development
2. Track schema changes in version control
3. Document migration steps for production

### Production Migrations

1. Use Alembic for production migrations
2. Create migration files for schema changes
3. Test migrations in staging before production

### Seed Data

No seed data required. Users self-register.

---

## Security Considerations

- All connections use SSL/TLS (`sslmode=require`)
- Passwords never stored in plaintext
- User data isolated by foreign key relationships
- Index on email for efficient login lookups

---

## Performance Considerations

- Compound index on (user_id, completed) for filtered queries
- UUID primary keys distributed across insert volume
- CASCADE delete prevents orphaned task records
