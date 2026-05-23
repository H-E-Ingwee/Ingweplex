import type { HTMLAttributes, PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white shadow-soft ${className}`} {...props}>
      {children}
    </div>
  );
}
