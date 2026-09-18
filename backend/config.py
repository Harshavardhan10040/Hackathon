import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    JIRA_URL: str = os.getenv("JIRA_URL", "https://your-domain.atlassian.net")
    JIRA_EMAIL: str = os.getenv("JIRA_EMAIL", "developer@example.com")
    JIRA_API_TOKEN: str = os.getenv("JIRA_API_TOKEN", "")
    GITHUB_TOKEN: str = os.getenv("GITHUB_TOKEN", "")
    GITHUB_REPO: str = os.getenv("GITHUB_REPO", "owner/demo-app")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    USE_MOCK_SERVICED: bool = os.getenv("USE_MOCK_SERVICES", "true").lower() == "true"

settings = Settings()
