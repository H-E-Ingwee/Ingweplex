import { BarChart3, Briefcase, DollarSign, LayoutDashboard, TrendingUp, Users } from 'lucide-react';

export const navigation = [
  {
    title: 'Dashboard',
    description: 'Executive overview and business pulse.',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'CRM',
    description: 'Sales pipeline and lead management.',
    href: '/crm',
    icon: Users,
  },
  {
    title: 'PMO',
    description: 'Project delivery, milestones, and risks.',
    href: '/pmo',
    icon: Briefcase,
  },
  {
    title: 'Finance',
    description: 'Revenue, cash flow, and collections.',
    href: '/finance',
    icon: DollarSign,
  },
  {
    title: 'Marketing',
    description: 'Engagement, campaigns, and content ROI.',
    href: '/marketing',
    icon: TrendingUp,
  },
];
