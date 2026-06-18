---
name: browser-use
description: Use when automating web browsers with AI agents — scraping, form filling, testing, data extraction, multi-step web workflows, or any task requiring browser interaction via browser-use (Python).
origin: browser-use
---

# Browser-Use Skill

> Source: browser-use (v0.13.2) | License: MIT | 99.5k+ ⭐

AI-driven browser automation using the `browser-use` Python library. Create agents that navigate, interact with, and extract data from websites autonomously.

## When to Activate

- Automating web tasks (form filling, shopping, research, data entry)
- Scraping or extracting structured data from web pages
- Running E2E browser tests with AI-driven navigation
- Multi-step web workflows requiring login, navigation, and interaction
- Testing web applications with domain-restricted agents
- Integrating browser automation into agent pipelines

## Installation

```bash
# Core installation
uv add "browser-use[core]"
# or: pip install "browser-use[core]"

# Install Chromium browser
browser-use install

# Set API key (optional — needed for ChatBrowserUse)
echo "BROWSER_USE_API_KEY=your-key" >> .env
```

## Quick Start

### Minimal Agent

```python
from browser_use import Agent, BrowserProfile

agent = Agent(
    task="Find the number of stars of the browser-use GitHub repo",
    llm=ChatBrowserUse(model="openai/gpt-4.1-mini"),
)
result = await agent.run()
print(result.final_result())
```

### With Browser Configuration

```python
from browser_use import Agent, BrowserProfile

browser_profile = BrowserProfile(
    headless=True,
    allowed_domains=["*.github.com"],
)

agent = Agent(
    task="Find the latest release version of browser-use",
    llm=ChatBrowserUse(model="openai/gpt-4.1-mini"),
    browser_profile=browser_profile,
)
result = await agent.run()
print(result.final_result())
```

### Synchronous Usage

```python
result = agent.run_sync(max_steps=50)
print(result.final_result())
```

## LLM Providers

### ChatBrowserUse (Default — Universal Gateway)

```python
from browser_use import ChatBrowserUse

# Uses BROWSER_USE_API_KEY env var
# Supports provider-prefixed models
llm = ChatBrowserUse(model="anthropic/claude-sonnet-4-6")
llm = ChatBrowserUse(model="openai/gpt-4.1-mini")
llm = ChatBrowserUse(model="google/gemini-3-pro")
```

### Anthropic Claude

```python
from browser_use import ChatAnthropic

llm = ChatAnthropic(
    model="claude-sonnet-4-20250514",
    api_key="sk-ant-...",
    max_tokens=8192,
)
```

### OpenAI

```python
from browser_use import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4.1-mini",
    api_key="sk-...",
    temperature=0.2,
)
```

### Ollama (Local)

```python
from browser_use import ChatOllama

llm = ChatOllama(model="llama3.3:70b")
# Requires: ollama running locally on port 11434
```

### Fallback LLM

```python
agent = Agent(
    task="...",
    llm=ChatOpenAI(model="gpt-4.1"),
    fallback_llm=ChatOllama(model="llama3.3:70b"),  # Switches on 429/5xx
)
```

## BrowserProfile Configuration

```python
from browser_use import BrowserProfile

profile = BrowserProfile(
    # Display
    headless=True,                    # Auto-detected if unset
    window_size={"width": 1920, "height": 1080},

    # Security — Domain restriction
    allowed_domains=["*.example.com", "api.trusted.io"],
    prohibited_domains=["ads.tracker.com"],
    block_ip_addresses=True,           # Block IP-based URLs

    # Proxy & Stealth
    proxy=ProxySettings(
        server="http://proxy:8080",
        username="user",
        password="pass",
    ),

    # Authentication — Use existing Chrome profile
    user_data_dir="~/.config/google-chrome",
    profile_directory="Profile 1",

    # Persistence
    keep_alive=True,                  # Keep browser alive after run

    # Performance
    minimum_wait_page_load_time=0.5,
    wait_for_network_idle_page_load_time=1.0,
    wait_between_actions=0.2,

    # Recording
    record_har_path="session.har",   # HAR recording
    record_video_dir="./videos",      # Video recording

    # Extensions
    enable_default_extensions=True,   # uBlock Origin, ClearURLs, etc.
)
```

## Custom Actions / Tools

Register domain-specific actions to extend agent capabilities:

```python
from browser_use import Agent, Tools, ActionResult
from browser_use.browser import BrowserSession
from pydantic import BaseModel, Field

tools = Tools()
registry = tools.registry


# Pattern 1: With explicit param_model
class SearchParams(BaseModel):
    query: str = Field(description="Search query")
    max_results: int = Field(default=5, ge=1, le=20)


@registry.action(description="Search internal database", param_model=SearchParams)
async def search_database(params: SearchParams, browser_session: BrowserSession):
    results = await my_db.search(params.query, limit=params.max_results)
    return ActionResult(extracted_content=f"Found {len(results)} results for '{params.query}'")


# Pattern 2: With inline typed parameters (param_model auto-generated)
@registry.action(description="Trigger notification", domains=["*.myapp.com"])
async def send_notification(browser_session: BrowserSession, message: str = "Done!"):
    # 'message' auto-creates a param_model with string field
    await notify_user(message)
    return ActionResult(extracted_content="Notification sent")


# Pattern 3: With sensitive data injection
@registry.action(description="Login with stored credentials")
async def login(browser_session: BrowserSession, has_sensitive_data: bool):
    # When sensitive_data is provided to Agent, credentials are injected
    return ActionResult(extracted_content="Logged in successfully")


agent = Agent(
    task="Search for recent papers on RAG and notify the team",
    llm=ChatOpenAI(model="gpt-4.1"),
    tools=tools,
)
```

### Special Injected Parameters

Actions can receive these injected parameters (not passed by the LLM):

| Parameter | Type | Description |
|-----------|------|-------------|
| `browser_session` | `BrowserSession` | Current browser session |
| `page_extraction_llm` | `BaseChatModel` | LLM for page content extraction |
| `file_system` | `FileSystem` | File system access |
| `available_file_paths` | `list[str]` | Available files |
| `has_sensitive_data` | `bool` | Whether sensitive data is available |
| `context` | `Any` | User-provided context object |
| `cdp_client` | | Chrome DevTools Protocol client |
| `page_url` | `str` | Current page URL |

### Exclude Default Actions

```python
tools = Tools()
tools.exclude_action("screenshot")      # Remove screenshot action
tools.exclude_action("go_back")          # Remove go_back action
```

### Structured Output

```python
from pydantic import BaseModel

class ResearchResult(BaseModel):
    title: str
    summary: str
    sources: list[str]
    confidence: float

tools = Tools()
tools.use_structured_output_action(ResearchResult)
```

## Sensitive Data & Authentication

```python
agent = Agent(
    task="Book a flight from Brussels to Tokyo",
    llm=ChatAnthropic(model="claude-sonnet-4-6"),
    sensitive_data={
        # Legacy format — available on all domains
        "username": "john@example.com",
        "password": "s3cret",
        # Domain-scoped format — only on matching domains
        "https://*.airlines.example.com": {
            "loyalty_number": "ABC123",
            "bu_2fa_code": "JBSWY3DPEHPK3PXP",  # TOTP via pyotp
        },
    },
    browser_profile=BrowserProfile(
        allowed_domains=["*.airlines.example.com"],
    ),
)
```

The LLM sees `<secret>password</secret>` placeholders; actual values are injected at execution time.

## Agent Settings

```python
from browser_use import Agent

agent = Agent(
    task="...",

    # Vision
    use_vision=True,                  # or 'auto' for screenshot-only
    vision_detail_level="auto",       # 'low', 'high', or 'auto'

    # Failure handling
    max_failures=3,                   # Consecutive failures before stopping
    final_response_after_failure=True, # Force done after max failures

    # Step control
    max_actions_per_step=3,           # Actions per LLM call
    step_timeout=180,                # Seconds per step
    llm_timeout=90,                  # Seconds for LLM response

    # Thinking
    use_thinking=True,               # Extended thinking mode
    flash_mode=False,                # Simplified prompts (faster, cheaper)

    # Evaluation
    use_judge=True,                  # Post-run LLM judging
    ground_truth="Expected: 42 stars", # Judge validation criteria

    # Output
    output_model_schema=ResearchResult, # Pydantic model for structured output
    generate_gif=False,              # Generate GIF of the run

    # Callbacks
    register_new_step_callback=my_step_fn,
    register_done_callback=my_done_fn,
    register_should_stop_callback=my_stop_fn,

    # Messages
    override_system_message="You are a research assistant...",
    extend_system_message="Always verify sources.",
)
```

## Domain Restriction Patterns

### Whitelist Mode (Recommended for Production)

```python
# Only allow specific domains
profile = BrowserProfile(
    allowed_domains=[
        "*.github.com",       # All GitHub subdomains + github.com
        "api.example.com",    # Exact match
        "docs.python.org",    # Exact match
    ],
)
```

### Blacklist Mode

```python
# Allow everything except specific domains
profile = BrowserProfile(
    prohibited_domains=[
        "ads.tracker.com",
        "*.malware.site",
    ],
)
```

### Action-Level Domain Restriction

```python
# Actions only available on specific domains
@registry.action(description="Add to cart", domains=["*.shop.example.com"])
async def add_to_cart(browser_session: BrowserSession, item_id: str):
    ...
```

## Error Handling & Recovery

```python
from browser_use import Agent, AgentHistoryList

agent = Agent(task="...", llm=ChatOpenAI(model="gpt-4.1"))

# Recovery: max_failures + final_response_after_failure
# After 3 consecutive failures (default), agent forces a 'done' action
# summarizing what it found — no crash, always returns a result

# Step-by-step monitoring
async def on_step(agent):
    print(f"Step {agent.state.n_steps}: {agent.state.last_result}")

# External stop signal
async def should_stop(agent):
    return agent.state.n_steps >= 20

agent = Agent(
    task="...",
    llm=ChatOpenAI(model="gpt-4.1"),
    register_new_step_callback=on_step,
    register_should_stop_callback=should_stop,
)

result = await agent.run(max_steps=100)
```

## CLI Usage

```bash
# Interactive mode (default)
browser-use

# Single task
browser-use run-task --task "Find the latest Python release version"

# With options
browser-use run-task --task "..." --model openai/gpt-4.1-mini --headless --max-steps 50

# Install browser
browser-use install

# Initialize project from template
browser-use init --template simple

# MCP server mode (for Claude Desktop integration)
browser-use --mcp
```

## Common Patterns

### Scraping with Domain Lockdown

```python
from browser_use import Agent, BrowserProfile, ChatAnthropic

agent = Agent(
    task="Extract all product names and prices from the first 3 pages",
    llm=ChatAnthropic(model="claude-sonnet-4-6"),
    browser_profile=BrowserProfile(
        headless=True,
        allowed_domains=["*.shop.example.com"],
        minimum_wait_page_load_time=1.0,
    ),
    use_vision=True,
    max_actions_per_step=5,
)
result = await agent.run(max_steps=50)
print(result.final_result())
```

### Multi-Agent Pipeline

```python
from browser_use import Agent, BrowserProfile, ChatOpenAI

browser_profile = BrowserProfile(headless=True, keep_alive=True)

# Step 1: Research
research_agent = Agent(
    task="Search for the top 5 Python web frameworks and summarize each",
    llm=ChatOpenAI(model="gpt-4.1"),
    browser_profile=browser_profile,
)
research_result = await research_agent.run()

# Step 2: Deep dive (reuses browser profile)
detail_agent = Agent(
    task=f"Based on: {research_result.final_result()}\n\nCompare these frameworks for building REST APIs",
    llm=ChatOpenAI(model="gpt-4.1"),
    browser_profile=browser_profile,
)
detail_result = await detail_agent.run()
```

### Structured Data Extraction

```python
from pydantic import BaseModel, Field
from browser_use import Agent, Tools

class ProductInfo(BaseModel):
    name: str
    price: float
    availability: str
    rating: float | None = None

class ProductList(BaseModel):
    products: list[ProductInfo]

tools = Tools()
tools.use_structured_output_action(ProductList)

agent = Agent(
    task="Extract product information from the electronics category",
    llm=ChatOpenAI(model="gpt-4.1"),
    tools=tools,
    browser_profile=BrowserProfile(allowed_domains=["*.store.example.com"]),
)
result = await agent.run()
products = result.final_result()  # Returns ProductList instance
```

### Testing Web Applications

```python
from browser_use import Agent, BrowserProfile, ChatAnthropic

agent = Agent(
    task="Test the login flow: enter 'test@example.com' and 'password123', verify redirect to dashboard",
    llm=ChatAnthropic(model="claude-sonnet-4-6"),
    browser_profile=BrowserProfile(
        headless=True,
        allowed_domains=["*.myapp.test"],
    ),
    max_failures=5,
    use_vision=True,
    ground_truth="Expected: successful login redirect to /dashboard",
    use_judge=True,
)
result = await agent.run(max_steps=30)
```

## Security Checklist

- [ ] Use `allowed_domains` to restrict agent to intended websites
- [ ] Use `sensitive_data` for credentials (never hardcode in task strings)
- [ ] Set `block_ip_addresses=True` for production agents
- [ ] Use `prohibited_domains` to block known ad/tracker domains
- [ ] Enable `enable_default_extensions=True` for uBlock Origin etc.
- [ ] Set `headless=True` for production/CI runs
- [ ] Use `keep_alive=False` (default) to close browser after run
- [ ] Validate `final_result()` output before acting on it
- [ ] Use `proxy` settings for rate-limited or geo-restricted targets
- [ ] Never expose `BROWSER_USE_API_KEY` or other API keys in code

## Focus Areas

- Domain-restricted browser automation for safe, predictable agents
- Custom action registration for domain-specific workflows
- Sensitive data handling with placeholder injection
- Multi-agent pipeline patterns with shared browser sessions
- Structured output extraction with Pydantic models
- Error recovery with `max_failures` and `final_response_after_failure`

## Related

- Agent: `browser-automator` — Full agent for browser automation tasks
- Agent: `e2e-runner` — E2E testing specialist (Playwright-based)
- Skill: `frontend-testing` — Testing frontend applications
- Skill: `web-security-essentials` — Web security patterns