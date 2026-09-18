import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent.engine import AutoPREngine

app = FastAPI(title="AutoPR Engine API", version="1.0.0")

# Enable CORS for frontend dashboard access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engine targeting the demo-app directory
DEMO_APP_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "demo-app"))
engine = AutoPREngine(demo_app_path=DEMO_APP_PATH)

class RunRequest(BaseModel):
    ticket_id: str = "AUTO-101"
    repo_url: str = None
    custom_description: str = None

class ApprovalRequest(BaseModel):
    decision: str  # "approve" or "reject"

@app.get("/")
def read_root():
    return {"status": "AutoPR Engine API is running"}

@app.post("/api/run")
def run_pipeline(req: RunRequest):
    try:
        state = engine.start_pipeline(ticket_id=req.ticket_id, repo_url=req.repo_url, custom_description=req.custom_description)
        return {"success": True, "state": state}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/status")
def get_status():
    return engine.state

@app.post("/api/approve")
def submit_approval(req: ApprovalRequest):
    try:
        state = engine.submit_human_approval(req.decision)
        return {"success": True, "state": state}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ticket/{ticket_id}")
def get_ticket(ticket_id: str):
    ticket = engine.jira_service.get_ticket(ticket_id)
    return ticket

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
