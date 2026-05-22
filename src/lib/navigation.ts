import { Activity, Briefcase, FileText, Settings, Users } from 'lucide-react';

export const navigation = [
  {
    title: 'Customers',
    description: 'Manage client records, contacts, and customer history.',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'Sales',
    description: 'Track orders, invoices, and revenue performance.',
    href: '/sales',
    icon: Briefcase,
  },
  {
    title: 'Reports',
    description: 'View business metrics and financial summaries.',
    href: '/reports',
    icon: FileText,
  },
  {
    title: 'Settings',
    description: 'Configure teams, roles, and company preferences.',
    href: '/settings',
    icon: Settings,
  },
];

export const stats = [
  { label: 'Monthly sales', value: '$48.2K', icon: Activity },
  { label: 'Active customers', value: '1,274', icon: Users },
  { label: 'Open deals', value: '32', icon: Briefcase },
];
