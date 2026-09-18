import React, { useState } from 'react';
import { Rocket, GitBranch, FileText } from 'lucide-react';

export function WorkItemForm({ onStartAgent, isRunning, ticketId, setTicketId }) {
  const [repoUrl, setRepoUrl] = useState('github.com/team/demo-app');
  const [requirementText, setRequirementText] = useState(
    'Add password validation to the registration form (minimum 8 characters, at least one number, at least one special character).'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartAgent(ticketId || 'AUTO-101', repoUrl, requirementText);
  };

  return (
    <div className="glass-card" style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '20px', letterSpacing: '-0.3px' }}>
        CREATE NEW WORK ITEM
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Ticket Selector / Repo URL */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              <GitBranch size={15} /> GitHub Repository
            </label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="github.com/team/demo-app"
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                padding: '10px 14px',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Jira Ticket ID
            </label>
            <input
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value.toUpperCase())}
              placeholder="AUTO-101"
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                padding: '10px 14px',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Requirement Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
            <FileText size={15} /> Requirement Description
          </label>
          <textarea
            rows={3}
            value={requirementText}
            onChange={(e) => setRequirementText(e.target.value)}
            placeholder="Add password validation to the registration form..."
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              padding: '12px 14px',
              fontSize: '0.9rem',
              outline: 'none',
              resize: 'vertical',
              lineHeight: 1.5
            }}
          />
        </div>

        {/* Big Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            className="btn-primary"
            disabled={isRunning}
            style={{
              padding: '14px 40px',
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '10px',
              letterSpacing: '0.5px'
            }}
          >
            <Rocket size={20} />
            <span>{isRunning ? 'AGENT RUNNING...' : 'START AGENT'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
