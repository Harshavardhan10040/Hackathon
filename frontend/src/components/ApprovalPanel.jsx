import React from 'react';
import { ShieldCheck, CheckCircle, XCircle } from 'lucide-react';

export function ApprovalPanel({ onApprove, onReject, isSubmitting }) {
  return (
    <div
      className="glass-card"
      style={{
        marginBottom: '24px',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(18, 24, 38, 0.8) 100%)',
        boxShadow: '0 0 24px rgba(245, 158, 11, 0.15)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '10px', borderRadius: '10px' }}>
            <ShieldCheck size={28} color="#fbbf24" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fbbf24' }}>Human Approval Checkpoint</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              AutoPR has generated and verified code changes. Please review proposed diffs before creating the GitHub Pull Request.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-danger" onClick={onReject} disabled={isSubmitting}>
            <XCircle size={18} /> Reject Changes
          </button>
          <button className="btn-success" onClick={onApprove} disabled={isSubmitting}>
            <CheckCircle size={18} /> Approve & Create PR
          </button>
        </div>
      </div>
    </div>
  );
}
