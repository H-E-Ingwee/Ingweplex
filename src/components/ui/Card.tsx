import type { PropsWithChildren } from 'react';

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white shadow-soft ${className}`}>
      {children}
    </div>
  );
}
