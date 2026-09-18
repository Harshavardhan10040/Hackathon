import React from 'react';
import { FolderGit2, FileText, Code2, TestTube2, PlusCircle, History, Bot } from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside
      style={{
        width: '240px',
        background: 'rgba(15, 23, 42, 0.85)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        height: '100%'
      }}
    >
      <div>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', paddingLeft: '8px' }}>
          <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.3px', color: '#fff' }}>AutoPR-UX</h2>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Autonomous Dev Agent</span>
          </div>
        </div>

        {/* PROJECT SECTION */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px', paddingLeft: '8px' }}>
            PROJECT
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('project')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '6px',
                background: activeTab === 'project' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: activeTab === 'project' ? '#60a5fa' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                textAlign: 'left'
              }}
            >
              <FolderGit2 size={16} /> Project Overview
            </button>
            <button
              onClick={() => setActiveTab('context')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px 8px 28px',
                borderRadius: '6px',
                background: activeTab === 'context' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: activeTab === 'context' ? '#60a5fa' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              <FileText size={15} /> Context
            </button>
            <button
              onClick={() => setActiveTab('code')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px 8px 28px',
                borderRadius: '6px',
                background: activeTab === 'code' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: activeTab === 'code' ? '#60a5fa' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              <Code2 size={15} /> Code Diffs
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px 8px 28px',
                borderRadius: '6px',
                background: activeTab === 'tests' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: activeTab === 'tests' ? '#60a5fa' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              <TestTube2 size={15} /> Tests
            </button>
          </nav>
        </div>

        {/* WORKFLOWS SECTION */}
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px', paddingLeft: '8px' }}>
            WORKFLOWS
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('new-task')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '6px',
                background: activeTab === 'new-task' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: activeTab === 'new-task' ? '#60a5fa' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              <PlusCircle size={16} /> + New Task
            </button>
            <button
              onClick={() => setActiveTab('history')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '6px',
                background: activeTab === 'history' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: activeTab === 'history' ? '#60a5fa' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              <History size={16} /> 📋 History
            </button>
          </nav>
        </div>
      </div>
    </aside>
  );
}
