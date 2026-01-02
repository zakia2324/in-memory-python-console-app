# MyMemory Python - Todo Web Application

Full-stack multi-user Todo web application with persistent storage.

## Architecture

```
┌─────────────────────────────────────────────┐
│         Frontend (Next.js)              │
│  - App Router                            │
│  - TypeScript                             │
│  - Tailwind CSS                           │
└─────────────┬───────────────────────────┘
              │ HTTP + JWT
┌─────────────┴───────────────────────────┐
│         Backend (FastAPI)                 │
│  - Python 3.13+                         │
│  - SQLModel + PostgreSQL                  │
│  - JWT Authentication                      │
└─────────────┬───────────────────────────┘
              │
┌─────────────┴───────────────────────────┐
│      Database (PostgreSQL)                │
│  - Neon or Local                         │
└───────────────────────────────────────────┘
```

## Features

- **User Authentication**: Email/password registration and login
- **JWT Security**: 15-minute token expiry, secure token verification
- **Task Management**: Create, read, update, delete tasks
- **Task Completion**: Toggle task completion with timestamp
- **Task Isolation**: Users can only access their own tasks
- **Protected Routes**: All task endpoints require authentication

## Project Structure

```
mymemorypython2/
├── backend/                 # FastAPI backend
│   ├── src/
│   │   ├── models/         # SQLModel models (User, Task)
│   │   ├── routers/        # API endpoints (auth, tasks, users)
│   │   ├── core/           # Database, auth utilities
│   │   └── main.py        # FastAPI app
│   ├── tests/               # Backend tests
│   └── requirements.txt
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   ├── components/      # React components
│   │   ├── lib/            # API client, auth utilities
│   │   └── types/          # TypeScript types
│   ├── tests/               # Frontend tests
│   └── package.json
├── docs/                   # Documentation
├── specs/                  # Feature specifications
└── history/                # Prompt history
```

## Quick Start

### Prerequisites

- Python 3.13+
- Node.js 18+
- PostgreSQL (local or Neon)

### Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your DATABASE_URL and SECRET_KEY
uvicorn src.main:app --reload --port 8000
```

Backend runs at: http://localhost:8000
API docs: http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

## Documentation

- [Configuration Guide](docs/configuration.md)
- [API Documentation](docs/api.md)
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)

## Specs

- [Phase II Overview](specs/overview.md)
- [Authentication Spec](specs/features/authentication.md)
- [Task CRUD Spec](specs/features/task-crud.md)
- [REST API Spec](specs/api/rest-endpoints.md)
- [Database Schema](specs/database/schema.md)

## Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Development Workflow

1. Update specs in `specs/`
2. Update tasks in `specs/003-todo-app-web/tasks.md`
3. Implement features following spec-driven workflow
4. Create PHRs for each implementation session

## License

Personal project for learning purposes.
