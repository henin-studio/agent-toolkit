# Python Patterns

## Type Hints

Always use type hints for function signatures:

```python
from typing import Optional

def process_agent(agent: dict[str, Any]) -> dict[str, Any]:
    """Process an agent definition."""
    return {**agent, "processed": True}
```

## Error Handling

```python
import logging

logger = logging.getLogger(__name__)

try:
    result = risky_operation()
except SpecificError as e:
    logger.error(f"Operation failed: {e}", exc_info=True)
    raise ValueError(f"User-friendly message: {e}") from e
```

## Data Validation

Use Pydantic for schema validation:

```python
from pydantic import BaseModel, Field
from enum import Enum

class ModelType(str, Enum):
    SONNET = "sonnet"
    OPUS = "opus"
    HAIKU = "haiku"

class AgentDefinition(BaseModel):
    name: str = Field(min_length=1)
    description: str = Field(min_length=10)
    tools: list[str] = Field(default_factory=list)
    model: ModelType = ModelType.SONNET
    effort: str = "medium"
```

## Repository Pattern

```python
from abc import ABC, abstractmethod
from typing import Generic, TypeVar

T = TypeVar("T")

class Repository(ABC, Generic[T]):
    @abstractmethod
    async def find_all(self, filters: dict | None = None) -> list[T]: ...
    @abstractmethod
    async def find_by_id(self, id: str) -> T | None: ...
    @abstractmethod
    async def create(self, data: dict) -> T: ...
```