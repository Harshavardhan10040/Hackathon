import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from './components/Sidebar';
import { WorkItemForm } from './components/WorkItemForm';
import { LivePipelineFooter } from './components/LivePipelineFooter';
import { TicketCard } from './components/TicketCard';
import { ActivityLog } from './components/ActivityLog';
import { CodeDiffViewer } from './components/CodeDiffViewer';
import { ApprovalPanel } from './components/ApprovalPanel';
import { PRResultCard } from './components/PRResultCard';

const API_BASE = 'http://localhost:8001/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('new-task');
  const [ticketId, setTicketId] = useState('AUTO-101');
  const [pipelineState, setPipelineState] = useState({
    ticket_id: null,
    current_step: 0,
    status: 'IDLE',
    ticket: null,
    task_spec: null,
    plan: [],
    identified_files: [],
    code_changes: null,
    pr_result: null,
    jira_result: null,
    logs: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Poll status when running or awaiting approval
  useEffect(() => {
    let interval = null;
    if (pipelineState.status === 'RUNNING') {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(`${API_BASE}/status`);
          setPipelineState(res.data);
        } catch (e) {
          console.error("Failed to fetch status:", e);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pipelineState.status]);

  const handleRunAgent = async (selectedTicketId, repoUrl, customDescription) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/run`, {
        ticket_id: selectedTicketId,
        repo_url: repoUrl,
        custom_description: customDescription
      });
      if (res.data && res.data.state) {
        setPipelineState(res.data.state);
      }
    } catch (e) {
      alert("Failed to start AutoPR agent. Is the backend server running on port 8001?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/approve`, { decision: 'approve' });
      if (res.data && res.data.state) {
        setPipelineState(res.data.state);
      }
    } catch (e) {
      alert("Failed to submit approval.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/approve`, { decision: 'reject' });
      if (res.data && res.data.state) {
        setPipelineState(res.data.state);
      }
    } catch (e) {
      alert("Failed to submit rejection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0b0f19' }}>
      {/* Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main App Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        {/* Top Header Bar */}
        <header
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between'
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>AutoPR-UX</h1>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Autonomous Software Development & Testing</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: pipelineState.status === 'RUNNING' ? '#3b82f6' : '#10b981'
              }}
            />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>
              {pipelineState.status === 'RUNNING' ? 'Agent Running' : 'System Ready'}
            </span>
          </div>
        </header>

        {/* Workspace Body */}
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          <WorkItemForm
            onStartAgent={handleRunAgent}
            isRunning={pipelineState.status === 'RUNNING'}
            ticketId={ticketId}
            setTicketId={setTicketId}
          />

          {pipelineState.status === 'AWAITING_APPROVAL' && (
            <ApprovalPanel
              onApprove={handleApprove}
              onReject={handleReject}
              isSubmitting={isSubmitting}
            />
          )}

          {pipelineState.status === 'COMPLETED' && (
            <PRResultCard
              prResult={pipelineState.pr_result}
              jiraResult={pipelineState.jira_result}
            />
          )}

          {/* Active Workspace Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', marginBottom: '20px' }}>
            <div style={{ gridColumn: 'span 6' }}>
              <TicketCard ticket={pipelineState.ticket} />
            </div>
            <div style={{ gridColumn: 'span 6' }}>
              <ActivityLog logs={pipelineState.logs} />
            </div>
          </div>

          {/* Code Diff Viewer */}
          <CodeDiffViewer codeChanges={pipelineState.code_changes} />

          {/* Live Pipeline Footer */}
          <LivePipelineFooter
            currentStep={pipelineState.current_step}
            status={pipelineState.status}
          />
        </main>
      </div>
    </div>
  );
}
