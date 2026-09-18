import React, { useState } from 'react';
import { Bot, Play, RefreshCw } from 'lucide-react';

export function Header({ ticketId, setTicketId, onRun, status, isRunning }) {
  const [inputVal, setInputVal] = useState(ticketId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setTicketId(inputVal.trim());
      onRun(inputVal.trim());
    }
  };

  return (
    <header className="glass-card" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bot size={28} color="#fff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.5px' }}>AutoPR</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Autonomous Software Engineering Agent</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>TICKET:</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value.toUpperCase())}
            placeholder="AUTO-101"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--bg-card-border)',
              borderRadius: '8px',
              color: '#fff',
              padding: '10px 12px 10px 76px',
              fontSize: '0.95rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              width: '180px',
              outline: 'none'
            }}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={isRunning}>
          {isRunning ? <RefreshCw size={18} className="spin" /> : <Play size={18} />}
          <span>{isRunning ? 'Agent Running...' : 'Run AutoPR Agent'}</span>
        </button>
      </form>
    </header>
  );
}
