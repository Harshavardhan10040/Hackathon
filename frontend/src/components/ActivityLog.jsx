import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

export function ActivityLog({ logs }) {
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Terminal size={18} color="var(--accent-purple)" />
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Agent Activity Stream</h3>
      </div>

      <div
        ref={logContainerRef}
        style={{
          flex: 1,
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          padding: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: '#d1d5db',
          overflowY: 'auto',
          maxHeight: '280px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        {logs && logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} style={{ marginBottom: '6px', lineHeight: '1.4' }}>
              {log}
            </div>
          ))
        ) : (
          <span style={{ color: 'var(--text-muted)' }}>No activity logs yet. Run AutoPR to start pipeline.</span>
        )}
      </div>
    </div>
  );
}
