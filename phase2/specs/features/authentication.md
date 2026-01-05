# Feature Specification: User Authentication

**Feature Branch**: `003-todo-app-web`
**Created**: 2026-01-01
**Status**: Draft
**Input**: Phase II requirements - JWT-based authentication

## User Scenarios & Testing

### User Story 1 - User Registration (Priority: P1)

As a new user, I want to create an account so I can access the todo application.

**Why this priority**: Registration is required before any user can use the system.

**Independent Test**: Can be tested by registering a new user and verifying account creation.

**Acceptance Scenarios**:

1. **Given** user provides valid email "user@example.com" and password, **When** they submit registration, **Then** account is created and user record saved with hashed password.
2. **Given** user provides email that already exists, **When** they submit registration, **Then** error is returned indicating email is taken.
3. **Given** user provides invalid email format, **When** they submit registration, **Then** validation error is returned.
4. **Given** user provides password shorter than 8 chars, **When** they submit registration, **Then** validation error is returned.
5. **Given** registration succeeds, **When** account is created, **Then** JWT access token is returned.

---

### User Story 2 - User Login (Priority: P1)

As a registered user, I want to log in so I can access my tasks.

**Why this priority**: Login is the primary authentication entry point.

**Independent Test**: Can be tested by logging in with valid credentials and receiving a JWT.

**Acceptance Scenarios**:

1. **Given** user has registered with "user@example.com"/"password123", **When** they log in with correct credentials, **Then** JWT access token is returned.
2. **Given** user logs in with wrong password, **When** authentication fails, **Then** 401 Unauthorized is returned.
3. **Given** user logs in with non-existent email, **When** authentication fails, **Then** 401 Unauthorized is returned (don't reveal if email exists).
4. **Given** login succeeds, **When** JWT is issued, **Then** token contains user_id and email claims.

---

### User Story 3 - Protected Resource Access (Priority: P1)

As an authenticated user, I want to access my tasks so I can manage my todo list.

**Why this priority**: All task operations require authenticated access.

**Independent Test**: Can be tested by making API requests with and without JWT tokens.

**Acceptance Scenarios**:

1. **Given** user has valid JWT, **When** they request protected resource, **Then** request succeeds and resource is returned.
2. **Given** user has expired JWT, **When** they request protected resource, **Then** 401 Unauthorized is returned.
3. **Given** user has no JWT, **When** they request protected resource, **Then** 401 Unauthorized is returned.
4. **Given** JWT is tampered with (invalid signature), **When** they request protected resource, **Then** 401 Unauthorized is returned.

---

### User Story 4 - Password Hashing (Priority: P1)

As the system, I want to store passwords securely so user credentials are protected.

**Why this priority**: Security requirement - plaintext passwords must never be stored.

**Independent Test**: Can be tested by verifying stored password hashes are not plaintext and can verify login.

**Acceptance Scenarios**:

1. **Given** user registers with "password123", **When** stored in database, **Then** password is bcrypt hashed (not plaintext).
2. **Given** stored bcrypt hash, **When** verifying correct password, **Then** verification succeeds.
3. **Given** stored bcrypt hash, **When** verifying wrong password, **Then** verification fails.

---

### Edge Cases

- What happens when user requests with malformed JWT header?
- How does system handle JWT with missing required claims?
- What happens during concurrent login attempts with same credentials?
- How are registration attempts rate-limited to prevent abuse?

## Requirements

### Functional Requirements

- **FR-001**: System MUST allow users to register with email and password.
- **FR-002**: System MUST validate email format on registration.
- **FR-003**: System MUST require minimum 8-character password on registration.
- **FR-004**: System MUST hash passwords with bcrypt (12 rounds) before storage.
- **FR-005**: System MUST NOT store plaintext passwords.
- **FR-006**: System MUST reject duplicate email registrations.
- **FR-007**: System MUST authenticate users via email/password and return JWT.
- **FR-008**: System MUST reject invalid credentials with generic error (don't reveal email existence).
- **FR-009**: System MUST issue JWT with 15-minute expiration.
- **FR-010**: System MUST verify JWT on every protected endpoint.
- **FR-011**: System MUST include user_id and email in JWT payload.

### Key Entities

- **User**: Represents an authenticated user
  - `id`: UUID primary key
  - `email`: String (unique, indexed)
  - `password_hash`: String (bcrypt)
  - `created_at`: DateTime (auto)
  - `updated_at`: DateTime (auto)

## Success Criteria

- **SC-001**: Users can register with valid email/password
- **SC-002**: Users can login and receive JWT token
- **SC-003**: All protected endpoints require valid JWT
- **SC-004**: Passwords are bcrypt hashed (not stored in plaintext)
- **SC-005**: JWT verification prevents unauthorized access
- **SC-006**: Invalid credentials return 401 (without revealing email existence)
