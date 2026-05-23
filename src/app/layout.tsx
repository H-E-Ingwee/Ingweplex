import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/metadata';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
