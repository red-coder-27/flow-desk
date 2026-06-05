import React from 'react';
import { getQuoteOfDay } from '../../utils/quotes';

export const QuoteCard = () => {
  const quote = getQuoteOfDay();

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        borderLeft: '4px solid var(--accent)',
        animation: 'fadeSlideUp 0.5s ease 0.3s both',
      }}
      className="glass-card"
    >
      <p
        style={{
          fontSize: '1.1rem',
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          lineHeight: 1.6,
          margin: '0 0 12px 0',
        }}
      >
        "{quote.text}"
      </p>
      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          margin: 0,
        }}
      >
        — {quote.author}
      </p>
    </div>
  );
};
