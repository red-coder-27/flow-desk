import React from 'react';
import { AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          background: 'var(--bg-primary)',
        }}>
          <div style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            border: '2px solid var(--danger)',
            borderRadius: 'var(--radius)',
            padding: '40px',
            textAlign: 'center',
            maxWidth: '500px',
          }}>
            <AlertTriangle 
              size={48} 
              style={{ 
                color: 'var(--danger)', 
                marginBottom: '20px',
                margin: '0 auto 20px'
              }} 
            />
            <h1 style={{
              color: 'var(--text-primary)',
              fontSize: '1.5rem',
              marginBottom: '10px',
              fontWeight: 700,
            }}>Something went wrong</h1>
            <p style={{
              color: 'var(--text-secondary)',
              marginBottom: '20px',
              lineHeight: 1.6,
            }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
