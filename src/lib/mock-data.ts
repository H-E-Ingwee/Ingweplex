export type LeadStage = 'NEW_LEAD' | 'CONTACTED' | 'QUALIFIED' | 'DISCOVERY_CALL' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'WON' | 'LOST';

export type Lead = {
  id: string;
  client: string;
  contact: string;
  package: 'STARTER' | 'GROWTH' | 'ENTERPRISE' | 'CUSTOM';
  value: number;
  stage: LeadStage;
  prob: number;
  expectedClose: string;
  source: string;
  notes: string;
  history: string[];
};

export type ProjectTask = {
  id: string;
  title: string;
  dueDate: string;
  owner: string;
  completed: boolean;
};

export type Project = {
  id: string;
  name: string;
  client: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'OVERDUE' | 'AT_RISK';
  progress: number;
  dueDate: string;
  owner: string;
  onboarding: string[];
  tasks: ProjectTask[];
};

export type Invoice = {
  id: string;
  project: string;
  client: string;
  amount: number;
  status: 'PENDING' | 'PARTIAL' | 'PAID';
  dueDate: string;
  milestone: string;
};

export type MarketingPost = {
  id: string;
  platform: 'LinkedIn' | 'Instagram' | 'X' | 'TikTok';
  title: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  views: number;
  date: string;
};

export const dashboardStats = [
  { label: 'Total Pipeline Value', value: 'KES 915,000', trend: '↑ 12%', trendLabel: 'from last month' },
  { label: 'Active Projects', value: '14', trend: '2 At Risk', trendLabel: 'requires attention' },
  { label: 'Collection Rate', value: '96.4%', trend: 'Target ≥95%', trendLabel: 'On track' },
  { label: 'Discovery Calls', value: '8', trend: '↑ 3', trendLabel: 'booked this week' },
];

export const packageValues = {
  STARTER: 45000,
  GROWTH: 120000,
  ENTERPRISE: 280000,
  CUSTOM: 0,
} as const;

export const packageOptions = [
  { value: 'STARTER', label: 'Starter' },
  { value: 'GROWTH', label: 'Growth' },
  { value: 'ENTERPRISE', label: 'Enterprise' },
  { value: 'CUSTOM', label: 'Custom' },
] as const;

export const leadStages: LeadStage[] = ['NEW_LEAD', 'CONTACTED', 'QUALIFIED', 'DISCOVERY_CALL', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON'];

export const initialLeads: Lead[] = [
  {
    id: 'L1',
    client: 'TechVentures Ltd',
    contact: 'Sarah Odhiambo',
    package: 'ENTERPRISE',
    value: 280000,
    stage: 'PROPOSAL_SENT',
    prob: 0.6,
    expectedClose: '2026-06-01',
    source: 'LinkedIn',
    notes: 'Enterprise package with custom workshop add-on.',
    history: ['2026-05-10: First inbound contact received', '2026-05-13: Discovery call booked', '2026-05-20: Proposal sent'],
  },
  {
    id: 'L2',
    client: 'GreenPath Energy',
    contact: 'David Kimani',
    package: 'GROWTH',
    value: 120000,
    stage: 'DISCOVERY_CALL',
    prob: 0.3,
    expectedClose: '2026-06-15',
    source: 'Referral',
    notes: 'Strong sustainability narrative for ESG branding campaign.',
    history: ['2026-05-09: Referred by partner agency', '2026-05-12: Lead qualified', '2026-05-17: Discovery call scheduled'],
  },
  {
    id: 'L3',
    client: 'Karibu Hotels',
    contact: 'Grace Njoroge',
    package: 'STARTER',
    value: 45000,
    stage: 'NEGOTIATION',
    prob: 0.8,
    expectedClose: '2026-05-30',
    source: 'LinkedIn',
    notes: 'Discounted onboarding package for hospitality brand.',
    history: ['2026-05-05: Initial contact', '2026-05-11: Proposal revised', '2026-05-18: Awaiting final approval'],
  },
  {
    id: 'L4',
    client: 'FinServe Africa',
    contact: 'John Doe',
    package: 'GROWTH',
    value: 120000,
    stage: 'NEW_LEAD',
    prob: 0.1,
    expectedClose: '2026-07-10',
    source: 'Email campaign',
    notes: 'Large corporate lead with potential retainer.',
    history: ['2026-05-21: Initial inquiry from email outreach'],
  },
  {
    id: 'L5',
    client: 'Acme Corp',
    contact: 'Jane Smith',
    package: 'CUSTOM',
    value: 350000,
    stage: 'QUALIFIED',
    prob: 0.4,
    expectedClose: '2026-06-20',
    source: 'Website form',
    notes: 'Custom project with training and workshop deliverables.',
    history: ['2026-05-12: Form submitted', '2026-05-15: Qualified by sales team'],
  },
];

export const initialProjects: Project[] = [
  {
    id: 'P1',
    name: 'Brand Strategy Blueprint',
    client: 'Acme Corp',
    status: 'ACTIVE',
    progress: 65,
    dueDate: '2026-06-10',
    owner: 'Lead Consultant A',
    onboarding: ['Send Onboarding Pack (Day 1)', 'Confirm Deposit', 'Set up Client Folder referencing SOP-010', 'Schedule 90-minute Kick-off Call'],
    tasks: [
      { id: 'P1-T1', title: 'Stakeholder Interviews', dueDate: '2026-05-25', owner: 'Lead Consultant A', completed: true },
      { id: 'P1-T2', title: 'Brand Audit Delivery', dueDate: '2026-05-29', owner: 'Lead Consultant A', completed: false },
      { id: 'P1-T3', title: 'Strategy Workshop', dueDate: '2026-06-05', owner: 'Lead Consultant A', completed: false },
      { id: 'P1-T4', title: 'Final Presentation', dueDate: '2026-06-10', owner: 'Lead Consultant A', completed: false },
    ],
  },
  {
    id: 'P2',
    name: 'ESG Branding',
    client: 'GreenPath Energy',
    status: 'ON_HOLD',
    progress: 30,
    dueDate: '2026-07-01',
    owner: 'Senior Consultant B',
    onboarding: ['Send Onboarding Pack (Day 1)', 'Confirm Deposit', 'Set up Client Folder referencing SOP-010', 'Schedule 90-minute Kick-off Call'],
    tasks: [
      { id: 'P2-T1', title: 'Kick-off Call', dueDate: '2026-05-25', owner: 'Senior Consultant B', completed: true },
      { id: 'P2-T2', title: 'ESG Messaging Draft', dueDate: '2026-06-10', owner: 'Senior Consultant B', completed: false },
      { id: 'P2-T3', title: 'Stakeholder Review', dueDate: '2026-06-18', owner: 'Senior Consultant B', completed: false },
    ],
  },
  {
    id: 'P3',
    name: 'Digital Transformation Audit',
    client: 'TechVentures Ltd',
    status: 'COMPLETED',
    progress: 100,
    dueDate: '2026-05-10',
    owner: 'Lead Consultant A',
    onboarding: ['Send Onboarding Pack (Day 1)', 'Confirm Deposit', 'Set up Client Folder referencing SOP-010', 'Schedule 90-minute Kick-off Call'],
    tasks: [
      { id: 'P3-T1', title: 'Current State Assessment', dueDate: '2026-05-02', owner: 'Lead Consultant A', completed: true },
      { id: 'P3-T2', title: 'Digital Gap Analysis', dueDate: '2026-05-06', owner: 'Lead Consultant A', completed: true },
      { id: 'P3-T3', title: 'Final Report Delivery', dueDate: '2026-05-10', owner: 'Lead Consultant A', completed: true },
    ],
  },
  {
    id: 'P4',
    name: 'Market Entry Strategy',
    client: 'Global Importers',
    status: 'OVERDUE',
    progress: 80,
    dueDate: '2026-05-20',
    owner: 'Senior Consultant C',
    onboarding: ['Send Onboarding Pack (Day 1)', 'Confirm Deposit', 'Set up Client Folder referencing SOP-010', 'Schedule 90-minute Kick-off Call'],
    tasks: [
      { id: 'P4-T1', title: 'Market Scan', dueDate: '2026-05-14', owner: 'Senior Consultant C', completed: true },
      { id: 'P4-T2', title: 'Competitor Workshop', dueDate: '2026-05-18', owner: 'Senior Consultant C', completed: true },
      { id: 'P4-T3', title: 'Strategy Draft', dueDate: '2026-05-20', owner: 'Senior Consultant C', completed: false },
    ],
  },
];

export const initialInvoices: Invoice[] = [
  { id: 'ING-2026-001', project: 'Brand Strategy Blueprint', client: 'Acme Corp', amount: 140000, status: 'PENDING', dueDate: '2026-06-15', milestone: 'Phase 1 Delivery' },
  { id: 'ING-2026-002', project: 'ESG Branding', client: 'GreenPath Energy', amount: 180000, status: 'PARTIAL', dueDate: '2026-07-05', milestone: 'Phase 1 Kick-off' },
  { id: 'ING-2026-003', project: 'Digital Transformation Audit', client: 'TechVentures Ltd', amount: 120000, status: 'PAID', dueDate: '2026-05-12', milestone: 'Final Report' },
  { id: 'ING-2026-004', project: 'Market Entry Strategy', client: 'Global Importers', amount: 160000, status: 'PENDING', dueDate: '2026-05-28', milestone: 'Strategy Draft' },
];

export const initialMarketingPosts: MarketingPost[] = [
  { id: 'M1', platform: 'Instagram', title: 'ESG Branding Results Graphic', likes: 240, comments: 48, shares: 12, saves: 18, views: 4200, date: '2026-05-17' },
  { id: 'M2', platform: 'LinkedIn', title: 'Digital Transformation Audit Highlights', likes: 310, comments: 46, shares: 28, saves: 6, views: 5200, date: '2026-05-19' },
  { id: 'M3', platform: 'X', title: 'CEO Thought Piece on Brand Value', likes: 120, comments: 15, shares: 22, saves: 3, views: 2100, date: '2026-05-13' },
  { id: 'M4', platform: 'TikTok', title: 'Behind the Scenes: Workshop Prep', likes: 950, comments: 68, shares: 41, saves: 30, views: 12500, date: '2026-05-14' },
];

export const financeMetrics = [
  { label: 'Monthly Revenue', value: 'KES 1.8M', icon: 'Dollar' },
  { label: 'Gross Profit', value: 'KES 720K', icon: 'Trending' },
  { label: 'Pending Invoices', value: '6', icon: 'Bell' },
  { label: 'YTD Cash Flow', value: 'KES 2.3M', icon: 'Briefcase' },
];

export const marketingMetrics = [
  { label: 'Total Reach', value: '126K', delta: '↑ 18% this month' },
  { label: 'Engagement Rate', value: '4.8%', delta: 'Above average' },
  { label: 'Discovery Calls', value: '12', delta: '↑ 25%' },
  { label: 'Top Channel', value: 'LinkedIn', delta: 'Best performing' },
];
