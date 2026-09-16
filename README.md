# Contest Service

A NestJS-based microservice for managing competitive programming and hackathon-style contests, registrations, submission scoring, and leaderboards using **Drizzle ORM** and **PostgreSQL**.

---

## Features

- **Contest Lifecycle Management:** Create, publish, query, and manage contests with automatic slug generation.
- **Team Registration:** Register teams and generate shareable invite codes for seamless member onboarding.
- **Submissions & Scoring:** Submit round entries and track user score metadata in real time.
- **Leaderboards:** Query ordered round leaderboards on demand.
- **Fully Tested:** High test coverage powered by **Vitest** for unit and integration testing.

---

## Tech Stack

- **Framework:** NestJS
- **ORM:** Drizzle ORM (`drizzle-orm`)
- **Database:** PostgreSQL
- **Language:** TypeScript (`v5.x`)
- **Testing:** Vitest
- **Linting & Code Quality:** ESLint, Prettier

---

## Prerequisites

- **Node.js:** `>=18.x`
- **npm:** `>=9.x`
- **PostgreSQL Database:** Local instance or cloud provider (Neon, Supabase, Render)

---

## Getting Started

### 1. Installation

```bash
npm install


2. Environment Setup
Create a .env file in the root directory and specify your database connection URL:

Code snippet
DATABASE_URL=postgresql://user:password@localhost:5432/contest_db


3. Database Migrations
Generate and apply database migrations using Drizzle Kit:

Bash
# Generate migrations from schema
npx drizzle-kit generate

# Apply migrations to database
npx drizzle-kit push


Running the Application
Bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod

# 1. Type Check
npx tsc --noEmit

# 2. Linting & Auto-fix
npm run lint

# 3. Test Suite
npx vitest run



src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── database/
│   ├── connection.provider.ts
│   └── schema.ts
└── contests/
    ├── contests.controller.ts
    ├── contests.module.ts
    ├── contests.service.ts
    └── dto/
        ├── create-contest.dto.ts
        ├── register-contest.dto.ts
        └── submit-round.dto.ts
