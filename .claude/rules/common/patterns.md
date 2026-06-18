# Common Patterns

## Repository Pattern

Encapsulate data access behind a consistent interface:
- Define standard operations: `findAll`, `findById`, `create`, `update`, `delete`
- Concrete implementations handle storage details
- Business logic depends on abstract interfaces, not storage
- Enables easy data source switching and mock testing

## API Response Format

Use a consistent envelope for all API responses:
- Include success/status indicator
- Include data payload (can be empty on error)
- Include error message field (can be empty on success)
- Include metadata for paginated responses (`total`, `page`, `limit`)

## Error Handling

- Handle errors at every level explicitly
- Provide user-friendly error messages in UI-facing code
- Log detailed error context server-side
- Never swallow errors silently

## Input Validation

- Validate all user input before processing
- Use schema-based validation (Zod for TS, Pydantic for Python)
- Fail fast with clear error messages
- Never trust external data