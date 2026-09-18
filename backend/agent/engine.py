import os
import time
import datetime
from services.jira_service import JiraService
from services.github_service import GitHubService
from services.llm_service import LLMService

class AutoPREngine:
    def __init__(self, demo_app_path: str):
        self.demo_app_path = demo_app_path
        self.jira_service = JiraService()
        self.github_service = GitHubService()
        self.llm_service = LLMService()
        self.state = self._reset_state()

    def _reset_state(self):
        return {
            "ticket_id": None,
            "current_step": 0,
            "status": "IDLE", # IDLE, RUNNING, AWAITING_APPROVAL, REJECTED, COMPLETED, FAILED
            "ticket": None,
            "task_spec": None,
            "plan": [],
            "identified_files": [],
            "code_changes": None,
            "pr_result": None,
            "jira_result": None,
            "logs": []
        }

    def add_log(self, message: str):
        timestamp = datetime.datetime.now().strftime("%H:%M:%S")
        log_entry = f"[{timestamp}] {message}"
        self.state["logs"].append(log_entry)
        print(log_entry)

    def start_pipeline(self, ticket_id: str, repo_url: str = None, custom_description: str = None):
        self.state = self._reset_state()
        self.state["ticket_id"] = ticket_id
        self.state["repo_url"] = repo_url
        self.state["status"] = "RUNNING"
        self.add_log(f"Received Work Item request for Ticket: {ticket_id}")

        if repo_url:
            self.github_service.clone_repository(repo_url, self.demo_app_path)

        # Step 1: Receive Work Item
        self.state["current_step"] = 1
        ticket = self.jira_service.get_ticket(ticket_id)
        if custom_description:
            ticket["description"] = custom_description
        self.state["ticket"] = ticket
        self.add_log(f"Retrieved Work Item details (Priority: {ticket.get('priority', 'Medium')})")

        # Step 2: Requirement Understanding
        self.state["current_step"] = 2
        self.add_log("Analyzing requirements and acceptance criteria using LLM...")
        task_spec = self.llm_service.understand_requirements(ticket, custom_description=custom_description)
        self.state["task_spec"] = task_spec
        self.add_log(f"Goal identified: {task_spec['goal']}")

        # Step 3 & 4: Repo Context & Codebase Analysis
        self.state["current_step"] = 3
        self.add_log(f"Scanning target repository context at '{self.demo_app_path}'...")
        self.state["current_step"] = 4
        self.add_log("Analyzing repository files to locate implementation targets...")
        self.state["identified_files"] = task_spec["likely_files"]
        self.add_log(f"Identified target files: {', '.join(task_spec['likely_files'])}")

        # Step 5: Create Implementation Plan
        self.state["current_step"] = 5
        self.add_log("Generating implementation plan...")
        plan = self.llm_service.generate_implementation_plan(task_spec)
        self.state["plan"] = plan
        self.add_log("Implementation plan created successfully.")

        # Step 6: Code Implementation
        self.state["current_step"] = 6
        self.add_log("Generating code modifications and diffs...")
        code_changes = self.llm_service.generate_code_changes(ticket_id, {}, custom_description=custom_description)
        self.state["code_changes"] = code_changes

        # Apply code modifications to actual local target repo
        for rel_file_path, content in code_changes["file_contents"].items():
            abs_file_path = os.path.join(os.path.dirname(self.demo_app_path), rel_file_path)
            os.makedirs(os.path.dirname(abs_file_path), exist_ok=True)
            with open(abs_file_path, "w", encoding="utf-8") as f:
                f.write(content)
            self.add_log(f"Applied code changes to file '{rel_file_path}'")

        # Step 7: Pause for Human Approval Checkpoint
        self.state["current_step"] = 7
        self.state["status"] = "AWAITING_APPROVAL"
        self.add_log("Code implementation complete. Pipeline paused at Human Approval Checkpoint.")
        return self.state

    def submit_human_approval(self, decision: str):
        if self.state["status"] != "AWAITING_APPROVAL":
            return {"error": "Pipeline is not awaiting approval"}

        if decision.lower() == "reject":
            self.state["status"] = "REJECTED"
            self.add_log("Human reviewer rejected the implementation plan. Pipeline stopped.")
            return self.state

        self.state["status"] = "RUNNING"
        self.add_log("Human reviewer APPROVED implementation! Proceeding to GitHub PR creation.")

        # Step 8: GitHub Pull Request
        self.state["current_step"] = 8
        self.add_log("Creating git feature branch and pushing commit...")
        pr_result = self.github_service.create_pull_request(
            ticket_id=self.state["ticket_id"],
            title=self.state["ticket"]["title"],
            summary=self.state["code_changes"]["summary"],
            changed_files=self.state["code_changes"]["changed_files"],
            repo_url=self.state.get("repo_url")
        )
        self.state["pr_result"] = pr_result
        self.add_log(f"GitHub Pull Request successfully created: {pr_result['pr_url']}")

        # Step 9: Update Jira Ticket
        self.state["current_step"] = 9
        self.add_log("Updating Jira ticket status to 'In Review' and posting PR comment...")
        jira_result = self.jira_service.update_ticket_status(
            ticket_id=self.state["ticket_id"],
            new_status="In Review",
            pr_url=pr_result["pr_url"]
        )
        self.state["jira_result"] = jira_result
        self.add_log("Jira ticket successfully updated!")

        self.state["current_step"] = 10
        self.state["status"] = "COMPLETED"
        self.add_log("AutoPR workflow completed successfully end-to-end! [SUCCESS]")
        return self.state
