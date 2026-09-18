import React from 'react';
import { Ticket, CheckSquare, ListChecks } from 'lucide-react';

export function TicketCard({ ticket }) {
  if (!ticket) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
        <Ticket size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
        <p>Enter a Jira ticket ID above and run AutoPR to fetch details.</p>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Ticket size={20} color="var(--primary)" />
          <span style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{ticket.id}</span>
        </div>
        <span className={`badge ${ticket.status === 'In Review' ? 'badge-info' : 'badge-warning'}`}>
          {ticket.status || 'To Do'}
        </span>
      </div>

      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>{ticket.title}</h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{ticket.description}</p>

      {ticket.requirements && ticket.requirements.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '6px' }}>
            <ListChecks size={16} /> Requirements
          </div>
          <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
            {ticket.requirements.map((req, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {ticket.acceptance_criteria && ticket.acceptance_criteria.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--success)', marginBottom: '6px' }}>
            <CheckSquare size={16} /> Acceptance Criteria
          </div>
          <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
            {ticket.acceptance_criteria.map((cri, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>{cri}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
