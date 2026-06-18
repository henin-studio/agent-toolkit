# Python Testing

## Unit Tests (pytest)

```python
import pytest
from agent_toolkit.catalog import format_agent_name

class TestFormatAgentName:
    def test_kebab_case_to_title(self):
        assert format_agent_name("code-reviewer") == "Code Reviewer"

    def test_single_word(self):
        assert format_agent_name("architect") == "Architect"

    def test_empty_string(self):
        with pytest.raises(ValueError):
            format_agent_name("")
```

## Integration Tests

```python
import pytest
from agent_toolkit.converter import convert_to_codex

@pytest.fixture
def sample_agent():
    return {
        "name": "architect",
        "description": "System design specialist",
        "tools": ["Read", "Grep", "Glob"],
        "model": "opus",
    }

def test_codex_conversion_preserves_name(sample_agent):
    result = convert_to_codex(sample_agent)
    assert result["name"] == "architect"
    assert "effort" not in result  # Claude-specific field removed
```

## Rules

- Minimum coverage: 80%
- Use pytest fixtures for test data
- Use parameterized tests for multiple inputs
- Never mock what you don't own