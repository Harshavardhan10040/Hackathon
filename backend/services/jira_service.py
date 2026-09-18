import requests
from requests.auth import HTTPBasicAuth
from config import settings

MOCK_TICKETS = {
    "AUTO-101": {
        "id": "AUTO-101",
        "title": "Add password strength validation",
        "description": "Add password validation to the registration form in the demo web application.",
        "requirements": [
            "Password must contain at least 8 characters.",
            "Password must contain at least one number.",
            "Password must contain at least one special character.",
            "Display a clear validation message.",
            "Existing valid passwords must continue to work."
        ],
        "acceptance_criteria": [
            "Weak passwords are rejected with a clear error message.",
            "Strong passwords containing length >= 8, a number, and a special char are accepted.",
            "Validation messages update dynamically upon form submission.",
            "No regression on valid username or email fields."
        ],
        "priority": "High",
        "status": "To Do"
    }
}

class JiraService:
    def __init__(self):
        self.url = settings.JIRA_URL
        self.email = settings.JIRA_EMAIL
        self.token = settings.JIRA_API_TOKEN

    def get_ticket(self, ticket_id: str) -> dict:
        ticket_id = ticket_id.upper()
        if not self.token or settings.USE_MOCK_SERVICED or ticket_id in MOCK_TICKETS:
            if ticket_id in MOCK_TICKETS:
                return MOCK_TICKETS[ticket_id]
            # Generic fallback mock ticket
            return {
                "id": ticket_id,
                "title": f"Task {ticket_id}: Feature Update",
                "description": f"Implement requested changes for work item {ticket_id}.",
                "requirements": ["Implement feature as described", "Maintain code quality"],
                "acceptance_criteria": ["Feature works as expected"],
                "priority": "Medium",
                "status": "To Do"
            }
        
        try:
            auth = HTTPBasicAuth(self.email, self.token)
            headers = {"Accept": "application/json"}
            res = requests.get(f"{self.url}/rest/api/3/issue/{ticket_id}", headers=headers, auth=auth, timeout=5)
            if res.status_code == 200:
                data = res.json()
                fields = data.get("fields", {})
                return {
                    "id": ticket_id,
                    "title": fields.get("summary", ""),
                    "description": fields.get("description", ""),
                    "requirements": ["Follow ticket specifications"],
                    "acceptance_criteria": ["Criteria met"],
                    "priority": fields.get("priority", {}).get("name", "Medium"),
                    "status": fields.get("status", {}).get("name", "To Do")
                }
        except Exception as e:
            print(f"[JiraService] API Error: {e}, falling back to mock.")

        return MOCK_TICKETS.get(ticket_id, MOCK_TICKETS["AUTO-101"])

    def update_ticket_status(self, ticket_id: str, new_status: str, pr_url: str) -> dict:
        print(f"[JiraService] Updating Jira ticket {ticket_id} status to '{new_status}' with PR: {pr_url}")
        if ticket_id in MOCK_TICKETS:
            MOCK_TICKETS[ticket_id]["status"] = new_status
            MOCK_TICKETS[ticket_id]["pr_url"] = pr_url

        if self.token and not settings.USE_MOCK_SERVICED:
            try:
                auth = HTTPBasicAuth(self.email, self.token)
                headers = {"Accept": "application/json", "Content-Type": "application/json"}
                # Add comment with PR link
                comment_data = {
                    "body": {
                        "type": "doc",
                        "version": 1,
                        "content": [{
                            "type": "paragraph",
                            "content": [{
                                "type": "text",
                                "text": f"AutoPR: Implementation complete. Created Pull Request: {pr_url}"
                            }]
                        }]
                    }
                }
                requests.post(f"{self.url}/rest/api/3/issue/{ticket_id}/comment", json=comment_data, headers=headers, auth=auth, timeout=5)
            except Exception as e:
                print(f"[JiraService] Failed to post live comment: {e}")

        return {
            "ticket_id": ticket_id,
            "status": new_status,
            "pr_url": pr_url,
            "success": True
        }
