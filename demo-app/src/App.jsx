import React from 'react';
import { RegisterForm } from './components/RegisterForm';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <header style={{ background: '#1e293b', color: '#fff', padding: '16px', textAlign: 'center' }}>
        <h1>Demo Task App</h1>
      </header>
      <main>
        <RegisterForm />
      </main>
    </div>
  );
}
