import { Toaster } from 'react-hot-toast';

export const Toast = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          borderRadius: 'var(--radius)',
          fontSize: '0.95rem',
        },
        success: {
          iconTheme: {
            primary: 'var(--accent)',
            secondary: 'var(--bg-primary)',
          },
        },
      }}
    />
  );
};
