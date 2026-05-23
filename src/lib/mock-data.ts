export const dashboardStats = [
  { label: 'Total Pipeline Value', value: 'KES 915,000', trend: '↑ 12%', trendLabel: 'from last month' },
  { label: 'Active Projects', value: '14', trend: '2 At Risk', trendLabel: 'requires attention' },
  { label: 'Collection Rate', value: '96.4%', trend: 'Target ≥95%', trendLabel: 'On track' },
  { label: 'Discovery Calls', value: '8', trend: '↑ 3', trendLabel: 'booked this week' },
];

export const leadStages = ['NEW_LEAD', 'CONTACTED', 'QUALIFIED', 'DISCOVERY_CALL', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON'];

export const initialLeads = [
  { id: 'L1', client: 'TechVentures Ltd', contact: 'Sarah Odhiambo', package: 'ENTERPRISE', value: 280000, stage: 'PROPOSAL_SENT', prob: 0.6, expectedClose: '2026-06-01' },
  { id: 'L2', client: 'GreenPath Energy', contact: 'David Kimani', package: 'GROWTH', value: 120000, stage: 'DISCOVERY_CALL', prob: 0.3, expectedClose: '2026-06-15' },
  { id: 'L3', client: 'Karibu Hotels', contact: 'Grace Njoroge', package: 'STARTER', value: 45000, stage: 'NEGOTIATION', prob: 0.8, expectedClose: '2026-05-30' },
  { id: 'L4', client: 'FinServe Africa', contact: 'John Doe', package: 'GROWTH', value: 120000, stage: 'NEW_LEAD', prob: 0.1, expectedClose: '2026-07-10' },
  { id: 'L5', client: 'Acme Corp', contact: 'Jane Smith', package: 'CUSTOM', value: 350000, stage: 'QUALIFIED', prob: 0.4, expectedClose: '2026-06-20' },
];

export const initialProjects = [
  { id: 'P1', name: 'Brand Strategy Blueprint', client: 'Acme Corp', status: 'ACTIVE', progress: 65, dueDate: '2026-06-10', owner: 'Lead Consultant A' },
  { id: 'P2', name: 'ESG Branding', client: 'GreenPath Energy', status: 'ON_HOLD', progress: 30, dueDate: '2026-07-01', owner: 'Senior Consultant B' },
  { id: 'P3', name: 'Digital Transformation Audit', client: 'TechVentures Ltd', status: 'COMPLETED', progress: 100, dueDate: '2026-05-10', owner: 'Lead Consultant A' },
  { id: 'P4', name: 'Market Entry Strategy', client: 'Global Importers', status: 'OVERDUE', progress: 80, dueDate: '2026-05-20', owner: 'Senior Consultant C' },
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
