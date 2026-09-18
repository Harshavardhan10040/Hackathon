import React from 'react';
import { FileCode, GitCommit } from 'lucide-react';

export function CodeDiffViewer({ codeChanges }) {
  if (!codeChanges || !codeChanges.diffs) {
    return (
      <div className="glass-card" style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px' }}>
        <FileCode size={28} style={{ marginBottom: '8px', opacity: 0.5 }} />
        <p>No code diffs available yet. Diffs will render when implementation stage completes.</p>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitCommit size={20} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Proposed Code Modifications</h3>
        </div>
        <span className="badge badge-info">{codeChanges.changed_files.length} File(s) Changed</span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
        {codeChanges.summary}
      </p>

      {Object.entries(codeChanges.diffs).map(([filePath, diffText]) => (
        <div key={filePath} style={{ marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '8px 12px', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileCode size={14} color="var(--primary)" />
            {filePath}
          </div>
          <div style={{ background: '#090d16', padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', overflowX: 'auto', whiteSpace: 'pre' }}>
            {diffText.split('\n').map((line, idx) => {
              if (line.startsWith('+')) {
                return <span key={idx} className="diff-line-add">{line}</span>;
              }
              if (line.startsWith('-')) {
                return <span key={idx} className="diff-line-del">{line}</span>;
              }
              if (line.startsWith('@')) {
                return <span key={idx} className="diff-line-info">{line}</span>;
              }
              return <span key={idx} style={{ display: 'block', padding: '2px 8px', color: '#9ca3af' }}>{line}</span>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
