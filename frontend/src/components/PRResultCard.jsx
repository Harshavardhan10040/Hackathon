import React from 'react';
import { GitPullRequest, ExternalLink, CheckCircle2, Ticket } from 'lucide-react';

export function PRResultCard({ prResult, jiraResult }) {
  if (!prResult) return null;

  return (
    <div
      className="glass-card"
      style={{
        marginBottom: '24px',
        border: '1px solid rgba(16, 185, 129, 0.4)',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(18, 24, 38, 0.85) 100%)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <GitPullRequest size={24} color="var(--success)" />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399' }}>GitHub Pull Request Created!</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Branch: {prResult.branch}</span>
          </div>
        </div>
        <span className="badge badge-success">Status: Ready for Review</span>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{prResult.title}</div>
        <a
          href={prResult.pr_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#60a5fa', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
        >
          {prResult.pr_url} <ExternalLink size={14} />
        </a>
      </div>

      {jiraResult && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
          <Ticket size={16} color="var(--primary)" />
          <span>Jira Ticket <strong>{jiraResult.ticket_id}</strong> updated to <strong>'{jiraResult.status}'</strong> with PR comment posted!</span>
          <CheckCircle2 size={16} color="var(--success)" />
        </div>
      )}
    </div>
  );
}
