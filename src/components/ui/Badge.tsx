import type { PropsWithChildren } from 'react';

const variantClasses: Record<string, string> = {
  default: 'bg-slate-100 text-slate-800',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-rose-100 text-rose-800',
  brand: 'bg-orange-100 text-orange-600',
};

export function Badge({ children, variant = 'default' }: PropsWithChildren<{ variant?: keyof typeof variantClasses }>) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant] ?? variantClasses.default}`}>
      {children}
    </span>
  );
}
