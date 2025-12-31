<!--
Sync Impact Report:
- Version change: N/A → 1.0.0 (new constitution)
- Modified principles: N/A (all new)
- Added sections: 5 core principles, Additional Constraints, Development Workflow
- Removed sections: N/A
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ aligned (no changes needed)
  - .specify/templates/spec-template.md ✅ aligned (no changes needed)
  - .specify/templates/tasks-template.md ✅ aligned (no changes needed)
- Follow-up TODOs: None
-->

# MyMemoryPython2 Constitution

## Core Principles

### I. In-Memory Simplicity
All task data MUST be stored in Python in-memory data structures (lists, dicts). No external databases, files, or persistence layers. This ensures simplicity, fast startup, and demonstrates core CLI logic without infrastructure complexity. Rationale: The project exists to showcase CLI design and testing patterns, not storage engineering.

### II. Interactive Menu Design
The CLI MUST present an interactive step-by-step menu interface. Users navigate via numbered options or keyboard input, with clear prompts at each step. Text output MUST be human-readable with meaningful headers and separators. Rationale: Interactive menus provide better UX for CLI tools compared to complex flag-based interfaces.

### III. Edge Case Resilience
All user inputs MUST be validated with clear error messages. Invalid selections, empty inputs, and out-of-bounds indices MUST produce helpful guidance rather than crashes. The application MUST handle empty state (no tasks) gracefully. Rationale: CLI tools should never surprise users with tracebacks; helpful errors build trust.

### IV. Clean Code Architecture
Source code MUST be modular with clear separation: CLI presentation layer, task service layer, and data model. Function and variable names MUST be descriptive (snake_case). Each function SHOULD have a single responsibility. Rationale: Maintainable code enables learning and future extension.

### V. Test-First Discipline
Unit tests MUST cover core task logic (add, list, update, delete, mark operations). Tests MUST verify edge cases (empty list, invalid indices, duplicate handling). The test suite MUST run without external dependencies. Rationale: Tests demonstrate correct behavior and enable confident refactoring.

## Additional Constraints

**Python Version**: 3.13+ required. New syntax features (pattern matching, typed dicts, etc.) are encouraged where they improve clarity.

**Logging**: Basic console logging using Python's `logging` module with WARNING level by default, DEBUG level when --verbose flag is passed. Log key operations: task creation, state changes, errors.

**No External Dependencies**: Only the Python standard library is permitted. This keeps the project portable and focused on language fundamentals.

**Code Style**: Follow PEP 8 with line length of 100 characters. Use type hints for function signatures.

## Development Workflow

**Feature Branches**: All work on branch `002-todo-app-cli`. PRs not required for this personal project.

**Commit Messages**: Conventional commits format: `type(scope): description`. Types: feat, fix, docs, test, refactor.

**Testing Gate**: Run `python -m pytest` before commits. All tests MUST pass.

**Definition of Done**:
- Feature works as specified in user scenarios
- Edge cases handled with clear error messages
- Unit tests pass for all core operations
- No lint errors (flake8 or ruff)
- Code is readable and commented where logic is non-obvious

## Governance

This constitution establishes binding practices for the project. Amendments MUST be documented with rationale. The version follows Semantic Versioning (MAJOR for principle changes, MINOR for new sections, PATCH for clarifications).

**Version**: 1.0.0 | **Ratified**: 2025-12-31 | **Last Amended**: 2025-12-31
