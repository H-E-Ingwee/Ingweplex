# Ingweplex Business Management System (IBMS)

## Version 1.1 — Expanded & Detailed

### Prepared for
Ingweplex Business and Branding Consultancy

### Target Hosting Environment
Vercel (Edge Network)

### Target Database Environment
PostgreSQL (Vercel Postgres or Supabase)

---

## 1. Executive Summary

The Ingweplex Business Management System (IBMS) is a centralized ERP and CRM hybrid web application tailored for the operational workflows of a premium branding consultancy.

Currently, Ingweplex relies on fragmented Excel trackers for P&L, Cash Flow, Pipeline, and KPI Scorecards. These spreadsheets create significant scalability constraints through manual entry, version conflicts, siloed data, and lack of real-time visibility.

IBMS replaces fragmented spreadsheets with a single source of truth. It centralizes project management, sales pipelines, financial tracking, and marketing analytics so the Ingweplex leadership team can make fast, data-driven decisions and consultants can focus on high-value strategy rather than administrative work.

---

## 2. Recommended Technology Stack

To maximize performance, security, and CI/CD on Vercel, IBMS is built with the following modern stack:

- Frontend Framework: **Next.js 15 (App Router)**
- Language: **TypeScript**
- UI Styling: **Tailwind CSS** + **shadcn/ui**
- Database: **PostgreSQL** via **Vercel Postgres** or **Supabase**
- ORM: **Prisma**
- Authentication: **NextAuth.js (Auth.js)**

### Why this stack?

- Next.js App Router supports React Server Components and fast page delivery
- TypeScript brings enterprise-grade type safety
- Tailwind + shadcn/ui enables polished dashboard design rapidly
- PostgreSQL ensures ACID-safe financial and CRM data
- Prisma auto-generates a type-safe client for reliable DB access
- NextAuth.js provides secure session management and RBAC

---

## 3. Core System Modules

IBMS is architected into four deeply integrated modules:

### Module 1: CRM & Sales Pipeline

- Lead Management & Scoring
- Automated Deal Valuation
- Onboarding Automation

### Module 2: Project Management Office (PMO)

- Dynamic Project Log
- Task & Milestone Tracking
- Client Portal (Phase 2)

### Module 3: Financial Hub

- Real-Time Revenue & Cash Flow Dashboards
- Invoicing & Ledger Management
- Scenario Modeling & Break-Even Tracking

### Module 4: Marketing & Social Engagement

- Cross-Platform Analytics Engine
- Automated KPI Scorecard
- Algorithmic Content Leaderboard

---

## 4. Database Schema Design (Prisma)

The foundation of IBMS is a normalized PostgreSQL schema that enforces relational integrity and auditability.

### Key entities

- `User`
- `Client`
- `Lead`
- `Project`
- `Task`
- `Invoice`

### Highlights

- Role-based user access with `ADMIN`, `LEAD_CONSULTANT`, `SENIOR_CONSULTANT`, `FINANCE`
- Strict client/lead/project/invoice relationship mapping
- Audit fields on every table for compliance and reporting
- Cascade deletes for project-related tasks and invoices

### Prisma schema

See `prisma/schema.prisma` for the complete relational model.

---

## 5. Development Workflow (VS Code to Vercel)

### Step 1: Local initialization

```bash
cd c:\Users\Nancy\Documents\GitHub\Ingweplex
npm install
npx prisma db push
npx prisma generate
npm run dev
```

### Step 2: Architectural layout

Recommended route structure:

```
ingweplex-bms/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── dashboard/
│   │   ├── crm/
│   │   ├── projects/
│   │   ├── finance/
│   │   ├── marketing/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   └── types/
```

### Step 3: Vercel deployment

- Import the repository into Vercel
- Add environment variables: `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- Deploy to production
- Use preview deployments for branch testing

---

## 6. Implementation Roadmap

### Phase 1: Foundation & CRM (Weeks 1-3)

- Set up repository, database, and authentication
- Build CRM module and lead pipeline visualization
- Digitize client onboarding workflows

### Phase 2: PMO & Financials (Weeks 4-6)

- Build project log, task board, and milestone tracking
- Enable invoicing, payment status, and ledger workflows
- Add financial dashboards and KPI tracking

### Phase 3: Marketing & Automation (Weeks 7-9)

- Create marketing performance trackers
- Build content leaderboard analytics
- Conduct UAT, polish UI, and fix bugs

### Phase 4: Advanced enhancements (Weeks 10+)

- Migrate historical Excel data
- Add direct social analytics API integrations
- Build a secure client portal

---

## 7. Detailed Feature Summary

### CRM & Sales Pipeline

- Interactive Kanban pipeline
- Lead scoring and probability-weighted forecasts
- Automated project creation on deal closure

### Project Management Office

- Project status tracking with color-coded alerts
- Onboarding task automation tied to SOPs
- Overdue and risk notification workflows

### Financial Hub

- Live P&L and cash flow dashboards
- Invoice generation and payment tracking
- Break-even scenario monitoring

### Marketing & Social Engagement

- Weekly performance entry and normalization
- Algorithmic post ranking by engagement
- KPI scorecard status indicators

---

## 8. Transformational Impact

IBMS is designed to shift Ingweplex from manual, spreadsheet-based operations to a real-time digital nervous system.

### Leadership benefits

- Absolute visibility across sales, delivery, and finance
- Immediate decision support from live dashboards
- Stronger operational confidence for growth and investment

### Consultant benefits

- Less administrative overhead
- More time focused on strategic delivery
- Automated workflows and standardized operating procedures

### Client benefits

- Professional, transparent project experience
- Faster onboarding and delivery visibility
- Better security and data control

---

## 9. Current implementation status

This repository includes:

- Initial Next.js + Tailwind application scaffold
- Starter dashboard and module placeholder pages
- Prisma schema for the PostgreSQL data model
- Architecture documentation in `docs/system-proposal.md`

The next phase is to connect the UI to Prisma and PostgreSQL, add authentication, and build the first live CRM/finance/project workflows.
