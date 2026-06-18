# Python Security

## Secret Management

```python
import os

# NEVER hardcode secrets
api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")
```

## Input Validation

- Use Pydantic for all input validation at API boundaries
- Never trust external data (API responses, user input, file contents)
- Fail fast with clear error messages
- Sanitize all HTML output to prevent XSS

## SQL Injection Prevention

- Always use parameterized queries
- Never concatenate user input into SQL strings

```python
# WRONG: SQL injection risk
cursor.execute(f"SELECT * FROM agents WHERE name = '{name}'")

# CORRECT: parameterized query
cursor.execute("SELECT * FROM agents WHERE name = %s", (name,))
```