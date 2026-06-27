# Mini ERP Invoicing System

A full-stack Mini ERP Invoicing System built with NestJS and Next.js, fulfilling all technical requirements.

## Tech Stack Used

**Backend:**
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: SQLite (via Prisma) - *Prepared for Postgres/MySQL via easy Prisma schema migration*
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens) with Passport
- **API Documentation**: Swagger UI

**Frontend:**
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Prerequisites

- Node.js (v18 or newer recommended)
- npm (Node Package Manager)

## Installation Steps

1. **Clone or Navigate to the project directory**
   ```bash
   cd "project intvw"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Generate Prisma client and migrate database
   npx prisma generate
   npx prisma migrate dev --name init
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

## How to Run the Application Locally

1. **Start the Backend Server**
   Open a terminal, navigate to the `backend` directory, and run:
   ```bash
   npm run start:dev
   ```
   *The backend API will run at `http://localhost:3000`.*
   *Swagger API Documentation is available at `http://localhost:3000/api/docs`.*

2. **Start the Frontend Server**
   Open another terminal, navigate to the `frontend` directory, and run:
   ```bash
   npm run dev
   ```
   *The frontend application will be available at `http://localhost:3001`.*

## Architectural Decisions & Assumptions

- **Database Choice for Local Dev**: Used SQLite instead of PostgreSQL for the initial setup to ensure a seamless local test run without needing to install a PostgreSQL server. Because Prisma is utilized, migrating to a microservice architecture and utilizing PostgreSQL/MySQL is straightforward by merely updating the `datasource` configuration in `prisma.config.ts`.
- **Modular Backend Design**: NestJS heavily encourages a modular monolith. Modules for Auth, Users, Customers, Invoices, and Dashboard were created with distinct service layers. This isolates responsibilities, laying solid groundwork for future decomposition into microservices.
- **Next.js App Router**: Employed the modern App Router (`/app`) for Server Components (RSC) capabilities, optimized rendering, and ease of routing.
- **Tailwind & Glassmorphism UI**: Built beautiful, custom, reusable UI components (Button, Input, Card, Table) using Tailwind CSS with modern design paradigms such as subtle gradients, glassmorphism, and responsive layouts to ensure a "premium" feel.
- **Authentication**: Set up basic JWT authentication with password hashing using bcrypt. A production environment might further separate auth into its own microservice/identity provider (like Auth0 or Keycloak).
- **Zustand for State Management**: Selected Zustand for lightweight, boilerplate-free state management in the frontend, particularly for handling the authentication token efficiently.

## Features Built
- Secure User Authentication (Login/Register flow prepared via API).
- Dashboard with aggregated metrics (Total Revenue, Customers, Pending Invoices).
- Customer Management (View list, Add customers).
- Invoicing System (Create multi-item invoices, view invoice history, update status).
