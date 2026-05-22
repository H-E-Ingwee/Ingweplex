# Ingweplex Business Management System

This repository contains the initial scaffold for a modern web application built with Next.js, TypeScript, and Tailwind CSS. The application is designed to become your business operations platform for customers, sales, reports, and settings.

## What is included

- `Next.js` App Router with TypeScript support
- `Tailwind CSS` for responsive UI styling
- Starter pages for Dashboard, Customers, Sales, Reports, and Settings
- Clean project structure optimized for Vercel deployment
- Documentation and development instructions

## System vision

Ingweplex will be a unified business management hub that helps you:

- Track customers and relationships
- Manage sales, orders, and invoices
- Visualize business reports and financial performance
- Configure team access, company settings, and branding

## Recommended core technology stack

- Next.js 14+ (React + server rendering + static optimization)
- TypeScript for type safety
- Tailwind CSS for modern responsive UIs
- Vercel for deployment and automated builds
- PostgreSQL / Prisma or Supabase for backend data management
- Optional: Clerk or NextAuth for authentication

## Development setup

1. Install dependencies:

```bash
cd c:\Users\Nancy\Documents\GitHub\Ingweplex
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000` in your browser.

## Deployment to Vercel

1. Create a Vercel account or log in at https://vercel.com.
2. Import this GitHub repository.
3. Set the root directory to the repository root.
4. Vercel will detect the Next.js project automatically.
5. Add any required environment variables for your backend or data provider.

## Next steps for full business functionality

- Add database integration with Prisma and PostgreSQL
- Implement authentication and user roles
- Add CRUD forms for customers, products, invoices, and projects
- Add reporting charts with Recharts or ApexCharts
- Connect email notifications and payment workflows
- Build a mobile-responsive sidebar and user settings experience

## Project structure

- `package.json` — scripts and dependencies
- `tsconfig.json` — TypeScript compiler configuration
- `tailwind.config.ts` — Tailwind CSS configuration
- `src/app` — Next.js application routes and pages
- `src/lib` — reusable navigation and metadata data

## Contact & collaboration

This scaffold is a strong starting point. From here, we can expand the system into a full business management tool with integrations for accounting, CRM, inventory, and project tracking.

