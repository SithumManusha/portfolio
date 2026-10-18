import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// DATA DEFINITIONS (PROJECTS & BLOGS)
// ==========================================

interface CoreModule {
  name: string;
  desc: string;
  highlights: string[];
}

interface TechLayer {
  layer: string;
  technologies: string[];
  role: string;
}

interface QAHighlight {
  title: string;
  desc: string;
  icon?: string;
}

interface VisualMetric {
  title: string;
  icon: string;
  bullets: string[];
}

interface FinancialVisualizations {
  intro: string;
  items: VisualMetric[];
}

interface SecurityItem {
  label: string;
  desc: string;
  icon?: string;
}

interface SecurityArchitecture {
  title?: string;
  items: SecurityItem[];
}

interface ExecutiveHighlight {
  icon: string;
  title: string;
  desc: string;
}

interface SolutionPoint {
  label: string;
  desc: string;
}

interface ProjectDetails {
  title: string;
  category: string;
  typeLabel?: string;
  statusLabel?: string;
  executiveHighlights?: ExecutiveHighlight[];
  role: string;
  methodology: string;
  tags: string[];
  description: string;
  problemStatement: string;
  solutionOverview: string;
  solutionPoints?: SolutionPoint[];
  architecture: string;
  modules: CoreModule[];
  financialVisualizations?: FinancialVisualizations;
  securityArchitecture?: SecurityArchitecture;
  qaHighlights?: QAHighlight[];
  techLayers: TechLayer[];
  databaseSchema: {
    title: string;
    tables: string[];
    description: string;
  };
  image?: string;
  github?: string;
  liveDemo?: string;
}

const projectDetailsData: Record<string, ProjectDetails> = {
  ryzera: {
    title: "Ryzera POS",
    category: "Enterprise Distributed Systems • Retail ERP & POS",
    role: "Software Systems & Quality Engineer",
    methodology: "Agile Scrum & Distributed Architecture",
    tags: ["Next.js 16", "NestJS", "TypeScript", "PostgreSQL", "Prisma ORM", "IndexedDB", "Socket.io", "PWA", "Postman", "Jira", "Git"],
    description: "Ryzera POS is an enterprise-grade multi-branch retail Point of Sale (POS) system engineered for high availability and terminal resilience during complete network blackouts. Architected around a client-first Progressive Web App (PWA) model, transactions are isolated and persisted into browser IndexedDB object stores with temporary cryptographic UUIDs, and automatically batched and reconciled against central PostgreSQL master instances via background Service Workers once connectivity is re-established. It features an interactive 7-node regional mesh radar visualizer, automated exponential backoff error auto-recovery, and a 3-way deterministic conflict reconciliation engine.",
    problemStatement: "Traditional cloud-dependent retail POS systems freeze or reject checkouts when physical store internet disconnects, resulting in lost sales, cashier bottleneck queues, and prone-to-error manual inventory reconciliations.",
    solutionOverview: "Engineered an offline-first distributed architecture leveraging browser IndexedDB storage and event-driven Service Workers to execute sub-50ms offline checkouts. Implemented idempotency tokens, a 3-way deterministic conflict engine (Branch Wins, Cloud Authority, and Smart Field-Level Merges), transaction retry queues with exponential backoff, and atomic database locks to guarantee zero double-charges or stock collisions upon automated background sync.",
    architecture: `+-----------------------------------------------------------------------------------+
|               Cashier POS Client Terminal (Browser / Progressive Web App)         |
|         Sales UI  <--->  IndexedDB Local Cache Store  <--->  Sync Service Worker  |
+-----------------------------------------------------------------------------------+
                                          |
                REST / JSON APIs (Validated via Postman & Swagger UI)
                                          v
+-----------------------------------------------------------------------------------+
|                        Central Enterprise Backend Server                          |
|         Auth & RBAC Middleware  |  Inventory Controller  |  Sales Sync Router     |
+-----------------------------------------------------------------------------------+
                                          |
                        ACID-Compliant Relational Data Layer
                                          v
+-----------------------------------------------------------------------------------+
|                      PostgreSQL Central Enterprise Database                       |
|           Branches, Registers, Products, Inventory Ledger, Audit Logs             |
+-----------------------------------------------------------------------------------+`,
    modules: [
      {
        name: "Cashier Checkout & Offline Cart",
        desc: "High-speed barcode product lookup, dynamic cart pricing, discount engines, multi-tender split payments (Cash/Card), and offline receipt generation.",
        highlights: ["Instant UI response <50ms", "Local persistence in IndexedDB", "Thermal printer receipt templates"]
      },
      {
        name: "3-Way Deterministic Conflict Engine",
        desc: "Automated reconciliation for concurrent multi-branch catalog and inventory changes supporting Trust Local (Branch Wins), Cloud Master Authority, and Smart Field-Level Merging.",
        highlights: ["Smart field-level merge", "Zero data loss", "Immutable audit trail"]
      },
      {
        name: "7-Node Regional Mesh Topology Radar",
        desc: "Interactive visualizer monitoring 7 regional nodes (Head Office, Kandy, Galle, Kurunegala, Negombo, Jaffna, Matara) with live WebSocket latency tracking & 100% mesh efficiency telemetry.",
        highlights: ["Live sub-20ms heartbeat", "100% network efficiency score", "Real-time topology radar"]
      },
      {
        name: "Fault-Tolerant Auto-Recovery & Device Manager",
        desc: "Intelligent background event loop executing exponential backoff retry cycles on failed transactions with schema auto-normalization and in-place cryptographic POS terminal revocation.",
        highlights: ["Zero-trust session kill", "Exponential backoff auto-recovery", "Automated PDF audit reports"]
      },
      {
        name: "Role-Based Access Control (RBAC)",
        desc: "Multi-tier security boundaries separating Cashier terminal checkout access, Branch Manager overrides (refunds/voids), and Super Admin enterprise analytics.",
        highlights: ["JWT token validation", "Manager PIN authorization", "Complete audit trail"]
      }
    ],
    qaHighlights: [
      {
        title: "Offline Data Integrity & Sync Testing",
        desc: "Simulated complete network disconnections validating that 100% of offline orders remain persisted in IndexedDB and reconcile with zero data loss.",
        icon: "fa-arrows-rotate"
      },
      {
        title: "ACID Concurrency & Stock Locks",
        desc: "Validated race conditions across concurrent multi-register checkouts with PostgreSQL row-level locks and cryptographic UUID idempotency.",
        icon: "fa-database"
      },
      {
        title: "REST API & Boundary Testing",
        desc: "Tested checkout ingestion, inventory decrements, and manager void operations across 12+ endpoints with Postman collections and Swagger UI schemas.",
        icon: "fa-vial-circle-check"
      },
      {
        title: "PWA Service Worker & Security Audits",
        desc: "Audited Service Worker caching strategies, Lighthouse offline criteria, and JWT RBAC authentication boundary tokens.",
        icon: "fa-shield-halved"
      }
    ],
    techLayers: [
      {
        layer: "Frontend & Client POS",
        technologies: ["JavaScript/TypeScript", "PWA Service Workers", "HTML5 & CSS Grid", "IndexedDB API"],
        role: "Client-side checkout interface, reactive UI state, and local persistence layer."
      },
      {
        layer: "Backend & API Routing",
        technologies: ["Node.js", "Express REST API", "Swagger UI", "Postman Collections"],
        role: "Microservices architecture handling authentication, sales ingestion, and inventory decrements."
      },
      {
        layer: "Database & Storage",
        technologies: ["PostgreSQL 16", "Relational ACID Engine", "SQL Query Optimization"],
        role: "Master transaction ledger, branch schemas, relational integrity, and inventory records."
      },
      {
        layer: "Tooling & Collaboration",
        technologies: ["Git & GitHub", "Jira Agile Scrum", "Chrome DevTools", "Jest Test Runner"],
        role: "Version control, sprint lifecycle tracking, and comprehensive system verification."
      }
    ],
    databaseSchema: {
      title: "Relational Multi-Branch Schema (PostgreSQL)",
      tables: ["branches", "registers", "cashiers", "products", "inventory_ledger", "sales_orders", "sale_items", "sync_events"],
      description: "Structured with foreign-key referential integrity, compound indexes on product barcodes, and immutable audit ledger tables to prevent financial and stock discrepancies."
    },
    image: "/ryzera_real_showcase.png?v=3d",
    github: "https://github.com/Ryzera/Ryzera-POS"
  },
  ledgerly: {
    title: "Ledgerly — Autonomous AI Financial Intelligence & Collaborative Ledger",
    category: "Full-stack financial intelligence engine, autonomous copilot, and real-time collaborative ledger.",
    typeLabel: "Individual Full-Stack & AI Systems Project | 2026",
    statusLabel: "Live in Production (24/7 Always-On)",
    role: "Full-Stack Software & AI Systems Engineer",
    methodology: "Agile Scrum & Automated CI/CD Pipeline",
    tags: ["React 19", "TypeScript", "tRPC 11", "Node.js", "Express.js", "PostgreSQL", "Server-Sent Events (SSE)", "Tailwind CSS", "Recharts", "Vitest (68 Tests)"],
    description: "Managing personal budgets and splitting expenses across roommates or group trips often results in tangled debts, uneven payments, and messy spreadsheet calculation errors. My goal was to build Ledgerly—an enterprise-grade financial intelligence platform and collaborative ledger that acts as an autonomous financial advisor and automated accountant in your pocket. Beyond conventional CRUD budgeting apps, Ledgerly features an Autonomous AI Copilot calculating a dynamic 0–100 Financial Health Score (with letter grades A+ to D) and detecting category spending velocity anomalies (>25% surge above baselines). It introduces an interactive 'What-If' Financial Runway Simulator allowing users to stress-test discretionary cuts, simulate capital purchases, and project comparative 6-month cash-flow curves. For collaborative households, Ledgerly pairs 4 mathematical debt-minimization split models (Equal, Percentage, Exact, and Occupancy Days) with a real-time Server-Sent Events (SSE) notification bell and live chronological activity audit stream. Fortified by 68 automated Vitest unit/integration tests and deployed 24/7 on Render Cloud, this project represents production-ready, bank-grade financial engineering balancing complex algorithms with an intuitive user experience.",
    executiveHighlights: [
      {
        icon: "🧠",
        title: "Autonomous AI Copilot",
        desc: "Proprietary financial health algorithm calculating a 0–100 score, letter grade (A+ to D), and spending velocity anomaly alerts (>25% surge)."
      },
      {
        icon: "🎛️",
        title: "Interactive What-If Simulator",
        desc: "Stress-testing sliders for discretionary spend cuts, capital outlay impacts, net runway delta (+/- months), and 6-month Recharts cash-flow curves."
      },
      {
        icon: "🔔",
        title: "Real-Time Notification Bell",
        desc: "Reactive global notification center in header pushing live anomaly flags, budget breach warnings, and debt settlement alerts via SSE."
      },
      {
        icon: "📜",
        title: "Live Activity Audit Stream",
        desc: "Immutable chronological collaborative audit timeline synchronizing group bill additions, AI splits, and verified bank receipts in real-time."
      },
      {
        icon: "🧮",
        title: "4 Smart Split Models & Debt Matrix",
        desc: "Features Equal, Percentage, Exact Amount, and Occupancy Days algorithms settling group debts with the fewest possible cash transfers."
      },
      {
        icon: "🧪",
        title: "QA & 68 Automated Vitest Tests",
        desc: "Rigorous test suite across 11 test files guaranteeing zero debt calculation bugs, auth regressions, or data anomalies."
      }
    ],
    problemStatement: "Managing shared expenses across group trips, room rentals, and recurring household bills frequently results in tangled debt webs, uneven payment distributions, and error-prone manual spreadsheet calculations.",
    solutionOverview: "Engineered an end-to-end type-safe financial intelligence platform featuring:",
    solutionPoints: [
      { label: "Autonomous AI Copilot & Anomaly Alerts", desc: "0–100 Health Score and category velocity surge detection (>25%)." },
      { label: "Interactive 'What-If' Runway Simulator", desc: "Dynamic stress sliders and 6-month comparative cash-flow curves." },
      { label: "Real-Time SSE Notification & Audit Stream", desc: "Live event broadcasting for bills, debts, and evidence slips." },
      { label: "4 Debt-Minimization Split Models", desc: "Equal, Percentage, Exact, and Occupancy Days with net balance matrix." },
      { label: "Dynamic In-Memory PDF Settlement Engine", desc: "Direct binary streaming via backend PDFKit." },
      { label: "Rigorous 68-Test QA Pipeline", desc: "100% passing Vitest test suite running on GitHub Actions CI." }
    ],
    architecture: `+-----------------------------------------------------------------------------------+
|                        Client (React 19, TypeScript, Vite)                        |
|       UI Components + TailwindCSS + Recharts Charts + Live Notification Bell      |
+-----------------------------------------------------------------------------------+
                                          |
            tRPC 11 / Typesafe RPC API   <--->   Server-Sent Events (SSE) Bus
                                          v
+-----------------------------------------------------------------------------------+
|                        Server (Node.js & Express.js, tRPC)                        |
|   Autonomous AI Financial Intelligence Engine | Spending Anomaly & Runway Sim     |
|   Real-Time Notification & Audit Services     | PDF Settlement Reporter (PDFKit)  |
|   Auth & Session Cookies (bcryptjs)           | Zod Input Validation              |
+-----------------------------------------------------------------------------------+
                                          |
                        Drizzle ORM (Type-Safe Query Layer)
                                          v
+-----------------------------------------------------------------------------------+
|                     PostgreSQL Database (Hosted on Render)                        |
|       Users, Expenses, Budgets, Groups, Splits, Settlements, Audit Events         |
+-----------------------------------------------------------------------------------+`,
    modules: [
      {
        name: "🧠 Autonomous AI Copilot & Health Scoring",
        desc: "Algorithmic financial health engine calculating a 0–100 score, letter grade (A+ to D), burn stability, budget breach extrapolations, and spending velocity anomaly alerts (>25% spike).",
        highlights: ["0–100 Health Score & Grade", "Spending Velocity Anomaly Alerts", "Budget Breach Extrapolations", "Natural Language Financial Copilot"]
      },
      {
        name: "🎛️ Interactive 'What-If' Runway Simulator",
        desc: "Interactive stress-testing engine simulating discretionary spend reductions (0–50%), one-off capital purchases, and income shifts with net runway delta and 6-month projected comparative Recharts curves.",
        highlights: ["Discretionary Cut Sliders", "Capital Outlay Simulation", "Net Runway Delta (+/- Months)", "6-Month Comparative Recharts"]
      },
      {
        name: "🔔 Real-Time Notification Bell & SSE Stream",
        desc: "Global reactive notification center in header navigation pushing real-time alerts for spending anomalies, budget overages, debt settlement receipts, and group invites via Server-Sent Events.",
        highlights: ["Animated Unread Badge", "Categorized Alert Popover", "Server-Sent Events (SSE)", "Mark All as Read"]
      },
      {
        name: "📜 Live Activity Audit Stream & Shared Ledger",
        desc: "Chronological immutable event timeline tracking bill additions, AI split allocations, payment proof slips, and verified settlements in real-time.",
        highlights: ["Immutable Event Log", "Live Sync Active (SSE)", "Payment Proof Attachments", "Collaborative Audit Trail"]
      },
      {
        name: "🧮 4 Group Bill Allocation Models & Debt Matrix",
        desc: "Mathematical debt-minimization algorithms supporting 4 allocation models:",
        highlights: [
          "Equal Split: Even distribution across all group members",
          "Percentage Split: Custom percentage allocation per person (validated to 100%)",
          "Exact Amount Split: Direct cash values assigned per individual",
          "Occupancy Days Split: Trip and boarding cost allocation by exact days stayed",
          "Debt Minimization Matrix: Settle group debts with the fewest possible transactions"
        ]
      },
      {
        name: "📄 Dynamic PDF Settlement Exports",
        desc: "Instant in-memory PDF generation built with PDFKit, streaming branded downloadable settlement statements with dynamic currency formatting.",
        highlights: ["Instant PDFKit Generation", "Downloadable Statements", "In-Memory Streaming"]
      }
    ],
    financialVisualizations: {
      intro: "Ledgerly provides real-time financial insights through dynamic and reactive data visualization components built with Recharts and Tailwind CSS:",
      items: [
        {
          title: "🎛️ 'What-If' Projected Cash-Flow Curves",
          icon: "fa-chart-area",
          bullets: [
            "6-Month comparative Recharts timeline showing current vs. simulated monthly burn trajectories."
          ]
        },
        {
          title: "🍩 Spending Breakdown (Donut Charts)",
          icon: "fa-chart-pie",
          bullets: [
            "Category-wise real-time distribution with interactive hover tooltips (Amounts & percentages)."
          ]
        },
        {
          title: "📈 Budget Health & Velocity Spikes",
          icon: "fa-chart-line",
          bullets: [
            "Dynamic color-coded progress bars and anomaly flags warning users when spending crosses limits or spikes >25%."
          ]
        },
        {
          title: "👥 Debt Settlement & Group Balance Matrix",
          icon: "fa-users-viewfinder",
          bullets: [
            "Visual breakdown of net transfers, pairwise settlements, and chronological audit nodes."
          ]
        }
      ]
    },
    securityArchitecture: {
      title: "Security Architecture",
      items: [
        {
          label: "🛡️ Password Security",
          desc: "Cryptographic password hashing using bcryptjs with 12 salt rounds for zero plaintext exposure.",
          icon: "fa-shield-halved"
        },
        {
          label: "🍪 Session Protection",
          desc: "Secure, signed HTTP-only cookies mitigating XSS and session hijacking.",
          icon: "fa-cookie-bite"
        },
        {
          label: "⏳ Password Recovery",
          desc: "One-time cryptographically secure SHA-256 tokens with a 30-minute auto-expiry window.",
          icon: "fa-clock-rotate-left"
        },
        {
          label: "🗄️ Database Isolation",
          desc: "Supabase Cloud PostgreSQL protected with strict Row-Level Security (RLS) and SSL encryption.",
          icon: "fa-database"
        }
      ]
    },
    qaHighlights: [
      {
        title: "🧪 68 Automated Unit & Integration Tests",
        desc: "Vitest test suite across 11 files covering AI health scoring, What-If simulation, anomaly detection, auth state, and PDF generation.",
        icon: "fa-vial-circle-check"
      },
      {
        title: "🔄 Automated CI/CD Pipeline",
        desc: "GitHub Actions automated workflow running tests and strict TypeScript type-checks on every pull request / push.",
        icon: "fa-code-branch"
      },
      {
        title: "📡 Real-Time SSE Event Testing",
        desc: "End-to-end verification of Server-Sent Events event broadcasting for group activities, settlements, and notifications.",
        icon: "fa-network-wired"
      },
      {
        title: "☁️ 24/7 Cloud Hosting on Render",
        desc: "Containerized production deployment hosted on Render Cloud connected to Supabase PostgreSQL.",
        icon: "fa-cloud-arrow-up"
      }
    ],
    techLayers: [
      {
        layer: "🎨 Frontend",
        technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "Lucide Icons", "Shadcn UI"],
        role: "High-performance reactive user interface with What-If simulator sliders, circular health gauges, notification popovers, and audit streams."
      },
      {
        layer: "⚙️ Backend",
        technologies: ["Node.js", "Express.js", "tRPC 11", "Server-Sent Events (SSE)", "PDFKit", "Bcryptjs"],
        role: "End-to-end type-safe API routing, autonomous financial intelligence engine, real-time SSE event dispatcher, and streaming PDF report engine."
      },
      {
        layer: "🗄️ Database",
        technologies: ["PostgreSQL (Supabase Cloud)", "Drizzle ORM", "Drizzle-Kit Migrations"],
        role: "Normalized relational schemas with ACID compliance, decimal currency precision, audit trail logging, and strict data isolation."
      },
      {
        layer: "🚀 Testing & DevOps",
        technologies: ["Vitest (68 Tests)", "GitHub Actions CI/CD", "Git", "Render Cloud"],
        role: "68 automated unit/integration tests across 11 test files, CI/CD pipeline type-checking, and 24/7 containerized cloud deployment."
      }
    ],
    databaseSchema: {
      title: "Relational Financial Schema (PostgreSQL via Drizzle ORM)",
      tables: ["users", "sessions", "categories", "expenses", "budgets", "groups", "group_members", "group_splits", "settlements"],
      description: "Normalized relational schema with cascading foreign keys, decimal accuracy for currency fields, and isolated group member permissions."
    },
    image: "/ledgerly_showcase.png?v=3d",
    github: "https://github.com/SithumManusha/Ledgerly",
    liveDemo: "https://ledgerly-mbcd.onrender.com"
  },
  careerflow: {
    title: "CareerFlow Enterprise — Distributed ATS Resume Optimizer & AI Interview Platform",
    category: "Cloud-Native Distributed Systems • AI/NLP Talent Engineering",
    typeLabel: "Individual Distributed Systems & AI Project | 2026",
    statusLabel: "Live in Production (Render Cloud)",
    executiveHighlights: [
      {
        icon: "fa-solid fa-server",
        title: "Decoupled Microservices",
        desc: "Java 21 Spring Boot 3 core gateway, Python 3.12 FastAPI NLP worker, and Next.js 14 web client."
      },
      {
        icon: "fa-solid fa-brain",
        title: "TF-IDF & Cosine NLP Engine",
        desc: "Automated semantic scoring, missing keyword taxonomy extraction, and Google XYZ bullet re-writing."
      },
      {
        icon: "fa-solid fa-comments",
        title: "5-Round Mock Interview Studio",
        desc: "Tailored technical & behavioral simulation with instant scoring, intent breakdowns, and model answers."
      },
      {
        icon: "fa-solid fa-shield-halved",
        title: "Production Rate Limiting & Swagger UI",
        desc: "Token-bucket sliding window rate limiting (10 req/min) with OpenAPI 3.0 interactive documentation."
      }
    ],
    role: "Full-Stack & Cloud Systems Engineer",
    methodology: "Microservices Architecture & Automated CI/CD",
    tags: ["Java 21", "Spring Boot 3", "Python 3.12", "FastAPI", "Next.js 14", "PostgreSQL", "Docker", "Render Cloud", "Playwright", "Scikit-learn"],
    description: "CareerFlow is an enterprise-grade ATS resume optimization and technical interview preparation platform engineered to eliminate resume filtering rejections. Designed with a decoupled microservices architecture, it unites a Java 21 Spring Boot 3 core gateway, a Python 3.12 FastAPI NLP worker utilizing TF-IDF vectorization and Cosine Similarity, and a Next.js 14 App Router web client. The platform features an industrial ATS dual-scoring scanner, an ATS-safe 1-page CV builder with real-time A4 overflow guard and Google XYZ bullet rewriting, an interactive 5-round AI mock interview studio, and persistent candidate history on serverless PostgreSQL.",
    problemStatement: "Over 75% of software engineering applications are rejected by Applicant Tracking Systems (ATS) due to unparsed multi-column layouts, missing job-description keyword density, or weak task-oriented bullet points without quantified impact.",
    solutionOverview: "Engineered a distributed cloud talent platform providing transparent ATS scoring, instant missing-keyword gap analysis, 1-page A4 Taleo-safe CV building, automated Google XYZ bullet point rewriting, and interactive 5-round technical mock interviews backed by persistent PostgreSQL history and client rate limiting.",
    architecture: `+-----------------------------------------------------------------------------------+
|               Next.js 14 Web Frontend (React 18, Tailwind CSS, Lucide)            |
|         ATS Scanner UI  |  1-Page CV Builder  |  AI Interview Prep Studio         |
+-----------------------------------------------------------------------------------+
                                          |
                REST / JSON APIs (Protected via Rate Limiter)
                                          v
+-----------------------------------------------------------------------------------+
|                        Java 21 Spring Boot 3 Core Backend                         |
|         Auth Service (JWT)  |  Token-Bucket Rate Limiter  |  Candidate History    |
+-----------------------------------------------------------------------------------+
                  |                                               |
        Internal HTTP REST Calls                        JPA / Hibernate (HikariCP)
                  v                                               v
+-----------------------------------+           +-----------------------------------+
|      Python 3.12 FastAPI Worker   |           |    Serverless PostgreSQL (Neon)   |
|   TF-IDF + Cosine Similarity RAG  |           |   User Accounts, Scans, CV Drafts |
|   Google XYZ Bullet Point Engine  |           +-----------------------------------+
+-----------------------------------+`,
    modules: [
      {
        name: "Industrial ATS Resume Scanner (/ats-checker)",
        desc: "Analyzes resumes against job descriptions with dual scoring: Job Match % via Cosine Similarity and ATS Format Health. Categorizes missing skills into Languages, Frameworks, Databases, DevOps, and Architecture.",
        highlights: ["TF-IDF semantic vectorization", "Real-time keyword frequency audit", "Direct ATS skill transfer to CV Builder"]
      },
      {
        name: "1-Page Smart ATS CV Builder (/cv-builder)",
        desc: "Taleo-safe single-column CV builder with real-time page-budget overflow detection, contact pre-flight validation, and Google XYZ bullet re-writing (Accomplished [X] as measured by [Y], by doing [Z]).",
        highlights: ["Automated Google XYZ rewriter", "Live print & PDF export", "Cloud draft persistence in PostgreSQL"]
      },
      {
        name: "AI Mock Interview Studio (/interview-prep)",
        desc: "Generates 5 tailored technical & behavioral rounds covering JVM internals, distributed systems, database optimization, fault tolerance, and STAR scenarios with automated answer scoring and model solutions.",
        highlights: ["Hiring manager intent breakdown", "0-100% answer scoring", "Identifies missing technical concepts"]
      },
      {
        name: "Core API Gateway & Security",
        desc: "Java 21 Spring Boot 3 enterprise gateway featuring token-bucket rate limiting (10 req/min/IP), OpenAPI / Swagger 3.0 documentation, and secure candidate session authentication.",
        highlights: ["Sub-50MB memory footprint", "Token-bucket sliding window", "Full Swagger UI interactive docs"]
      }
    ],
    qaHighlights: [
      {
        title: "26 Automated Unit & Integration Tests",
        desc: "100% passing test suites across JUnit 5 (Spring Boot), Pytest (FastAPI NLP Worker), and Playwright (End-to-End browser flows).",
        icon: "fa-vial-circle-check"
      },
      {
        title: "Token-Bucket Rate Limiter Validation",
        desc: "Verified HTTP 429 Too Many Requests response after exceeding window limits with automated header telemetry checks.",
        icon: "fa-shield-halved"
      },
      {
        title: "TF-IDF & Cosine Precision Testing",
        desc: "Validated vector similarity thresholds, keyword clustering, and format compliance against real industry job descriptions.",
        icon: "fa-bullseye"
      },
      {
        title: "Cloud Microservices Health Telemetry",
        desc: "Monitored uptime and dynamic port binding across Render Web Services with Neon PostgreSQL connection pooling.",
        icon: "fa-cloud"
      }
    ],
    techLayers: [
      {
        layer: "🖥️ Frontend (Client)",
        technologies: ["Next.js 14 (App Router)", "React 18", "Tailwind CSS", "Lucide Icons", "TypeScript"],
        role: "Responsive single-page application with real-time A4 height monitoring, live preview, and state management."
      },
      {
        layer: "☕ Core Backend Gateway",
        technologies: ["Java 21", "Spring Boot 3.3.4", "Spring Data JPA", "Hibernate", "HikariCP", "Swagger UI"],
        role: "Enterprise REST gateway, candidate session auth, sliding-window rate limiter, and cloud persistence."
      },
      {
        layer: "🐍 AI / NLP Worker",
        technologies: ["Python 3.12", "FastAPI", "Scikit-learn", "Uvicorn", "TF-IDF Vectorizer"],
        role: "Asynchronous NLP microservice computing semantic cosine similarity, keyword frequency, and XYZ transformations."
      },
      {
        layer: "🗄️ Database & Cloud DevOps",
        technologies: ["PostgreSQL (Neon Serverless)", "Docker", "Render Cloud", "GitHub Actions CI/CD", "Playwright"],
        role: "Automated multi-service CI/CD pipelines, containerization, and 24/7 serverless relational storage."
      }
    ],
    databaseSchema: {
      title: "Relational Enterprise Schema (PostgreSQL)",
      tables: ["user_accounts", "candidate_profiles", "job_postings", "ats_audits", "user_scan_records", "user_cv_drafts"],
      description: "Normalized relational schema with foreign-key referential integrity, candidate scan audit history, and JSONB cloud draft storage."
    },
    image: "/careerflow_showcase.png?v=3d",
    github: "https://github.com/SithumManusha/careerflow",
    liveDemo: "https://careerflow-app.onrender.com"
  },
  'robotic-sorting': {
    title: "Automated Robotic Sorting System — Dual-Microcontroller Mechatronic Platform",
    category: "Mechatronics & Embedded Systems • Autonomous Industrial Robotics",
    typeLabel: "Level 1 Hardware Engineering Project | 2024 – 2025",
    statusLabel: "Validated Physical Prototype (UoM FIT)",
    executiveHighlights: [
      {
        icon: "fa-solid fa-microchip",
        title: "Dual-MCU Distributed Architecture",
        desc: "Arduino Mega 2560 master conveyor & RFID controller coordinated with Arduino Uno 4-DOF inverse kinematics controller."
      },
      {
        icon: "fa-solid fa-hand-holding-hand",
        title: "98% Pick & Place Gripper Accuracy",
        desc: "Step-accurate 2-finger gripper driven by 28BYJ-48 stepper motor, ULN2003 driver, and hardware microswitch endstops."
      },
      {
        icon: "fa-solid fa-radio",
        title: "Dynamic RFID Categorization",
        desc: "MFRC522 RFID reader dynamically routing tagged components to 3 designated bin chutes via MG995 diverter servo flaps."
      },
      {
        icon: "fa-solid fa-bell",
        title: "Closed-Loop Ultrasonic Bin Safety",
        desc: "3x HC-SR04 ultrasonic sensors calculating real-time bin capacity (8.0 cm threshold), triggering LCD and piezo audio alerts."
      }
    ],
    role: "Hardware Systems & Firmware Engineer",
    methodology: "Hardware-Software Co-Design, Kinematic Calibration & Embedded Testing",
    tags: ["Embedded C++", "Arduino Mega 2560", "Arduino Uno", "UART Serial Bus", "NEMA 17 Steppers", "A4988 Drivers", "MFRC522 RFID (SPI)", "HC-SR04 Ultrasonic", "TowerPro MG995 Servos", "EasyEDA PCB"],
    description: "An industrial-grade autonomous sorting conveyor platform designed and constructed from the ground up. Features a 4-DOF articulated robotic arm, a dual-microcontroller distributed architecture communicating via asynchronous 9600-baud UART serial, non-contact RFID item identification, servo-driven mechanical diverter chutes, and ultrasonic bin capacity monitoring. Built and demonstrated as part of the Level 1 Hardware Project at the Faculty of Information Technology, University of Moratuwa.",
    problemStatement: "Manual parcel and component categorization in logistics facilities is labor-intensive, error-prone, and hazardous. Traditional single-MCU setups frequently suffer from latency bottlenecks and blocking motor timing delays when attempting concurrent kinematic arm trajectories and continuous high-speed conveyor scanning.",
    solutionOverview: "Engineered a distributed dual-microcontroller embedded platform. Dedicated an Arduino Uno to real-time kinematic calculations, microswitch origin homing, and step-accurate pick-and-place gripper actuation. Coupled it with an Arduino Mega 2560 managing conveyor indexing, RFID scanning, servo diversion, and closed-loop ultrasonic capacity protection synchronized via non-blocking UART events.",
    architecture: `+-----------------------------------------------------------------------------------+
|               Arduino Uno (Kinematics & Arm Trajectory Controller)                |
|       Base Stepper  |  Shoulder Stepper  |  Elbow Stepper  |  28BYJ-48 Gripper    |
|                     4x Hardware Micro-Limit Homing Endstops                       |
+-----------------------------------------------------------------------------------+
                                          |
                UART Serial Bus (9600 Baud) -- Signal: "OBJECT_DROPPED"
                                          v
+-----------------------------------------------------------------------------------+
|               Arduino Mega 2560 (Conveyor & Sorting Subsystem Master)             |
|   NEMA 17 Stepper (A4988)  |  MFRC522 RFID (SPI)  |  3x MG995 Diverter Servos     |
+-----------------------------------------------------------------------------------+
                                          |
                        Real-Time Sensor & Alert Feedback Loop
                                          v
+-----------------------------------------------------------------------------------+
|               Peripherals, Closed-Loop Safety & User Diagnostics                  |
|     3x HC-SR04 Ultrasonic Bins  |  16x2 I2C LCD (0x27)  |  Piezo Buzzer & LEDs     |
+-----------------------------------------------------------------------------------+`,
    modules: [
      {
        name: "4-DOF Articulated Robotic Arm & Gripper",
        desc: "Inverse kinematics engine computing step coordinates for Base, Shoulder, and Elbow joints. Features a custom 2-finger mechanical gripper with geared stepper drive and mechanical endstop homing calibration.",
        highlights: ["98% pick-and-place precision", "Step-accurate calibration", "Hardware microswitch zero-referencing"]
      },
      {
        name: "Synchronized Conveyor & Diverter Subsystem",
        desc: "NEMA 17 stepper-driven conveyor bed with active tensioning rollers and three MG995 high-torque servo diverter flaps routing items into classified compartments upon drop confirmation.",
        highlights: ["Sub-millimeter belt step control", "Dynamic 90-degree flap deflection", "Instant belt start on UART trigger"]
      },
      {
        name: "MFRC522 Non-Contact RFID Categorization",
        desc: "SPI-driven high-frequency RFID reader identifying unique UID credentials on items to determine target sorting bin (Group A, Group B, or Group C pass-through).",
        highlights: ["Sub-50ms UID classification", "Multi-tag lookup table", "Zero contact automated routing"]
      },
      {
        name: "Closed-Loop Bin Capacity & Safety Interlocks",
        desc: "3x HC-SR04 ultrasonic transceivers continuously sampling bin depth (8.0 cm threshold). Automatically pauses conveyor, sounds piezo buzzer alarms, and flags LCD warnings when bins reach capacity.",
        highlights: ["Autonomous overflow prevention", "Real-time 16x2 I2C diagnostics", "Hardware audio/visual alert indicators"]
      }
    ],
    qaHighlights: [
      {
        title: "98% Pick-and-Place Precision Benchmark",
        desc: "Calibrated motor step counts and gripper closing margins across 100+ trial cycles achieving repeatable drop accuracy into conveyor intake.",
        icon: "fa-bullseye"
      },
      {
        title: "Dual-MCU UART Asynchronous Signal Testing",
        desc: "Validated handshake integrity across 9600 baud serial lines ensuring zero dropped 'OBJECT_DROPPED' triggers between Uno and Mega.",
        icon: "fa-arrows-rotate"
      },
      {
        title: "Ultrasonic Threshold Distance & False-Positive Audit",
        desc: "Calibrated HC-SR04 reflection latency and debounced ultrasonic triggers to prevent false bin-full alarms during vibration.",
        icon: "fa-shield-halved"
      },
      {
        title: "Electrical Load & Power Distribution Verification",
        desc: "Audited EasyEDA single-layer PCB tracks (1mm width, 1mm clearance) under full multi-motor stall current loads.",
        icon: "fa-bolt"
      }
    ],
    techLayers: [
      {
        layer: "🦾 Arm Kinematics & Homing",
        technologies: ["Arduino Uno (ATmega328P)", "Embedded C++", "Stepper.h", "ULN2003 Driver", "SPDT Microswitches"],
        role: "Real-time joint angle trajectory sequencing, physical homing zero-calibration, and gripper grasping control."
      },
      {
        layer: "🚚 Conveyor & Actuation",
        technologies: ["Arduino Mega 2560", "NEMA 17 Stepper", "A4988 Driver", "TowerPro MG995 Servos", "Servo.h"],
        role: "Continuous belt transport, high-torque diverter flap angle control, and motor current limit optimization."
      },
      {
        layer: "📡 Telemetry & Sensing",
        technologies: ["MFRC522 RFID (SPI)", "3x HC-SR04 Ultrasonic", "16x2 LCD (LiquidCrystal_I2C)", "Piezo Buzzer"],
        role: "Non-contact UID categorization, closed-loop bin depth monitoring, and real-time status telemetry."
      },
      {
        layer: "⚡ Circuit & Hardware Fabrication",
        technologies: ["EasyEDA CAD", "Custom Single-Layer PCB", "CNC Shield v3", "12V/5V Dual Power Supply"],
        role: "Low-noise PCB track routing (1mm track/clearance), optoisolated signals, and common ground bus."
      }
    ],
    databaseSchema: {
      title: "Embedded Hardware Pinout & Interconnect Mapping",
      tables: ["Arduino Mega (Conveyor, RFID, Servos, Sensors)", "Arduino Uno (Kinematic Steppers, Gripper, Endstops)", "UART Serial Bus (Uno TX Pin 1 -> Mega RX1 Pin 19)"],
      description: "Dedicated dual-microcontroller pin assignment matrix ensuring zero pin conflicts across high-speed SPI (RFID), I2C (LCD), PWM (Servos), and UART serial buses."
    },
    image: "/robotic_sorting_3d_showcase.png?v=3d",
    github: "https://github.com/SithumManusha/robotic-sorting-system"
  }
};

// ==========================================
// REAL-WORLD WEB BUG AUDITS & CASE STUDIES
// ==========================================

interface BugAudit {
  id: string;
  platform: string;
  platformIcon: string;
  platformColor: string;
  domain: string;
  categoryTag: string;
  title: string;
  category: string;
  severity: 'Critical (P1)' | 'High (P2)' | 'Medium (P3)';
  summary: string;
  environment: string;
  preconditions: string;
  stepsToReproduce: string[];
  expectedResult: string;
  actualResult: string;
  rootCauseAnalysis: string;
  systemLogs: string;
  qaRecommendation: string;
  verificationQuery?: string;
  tags: string[];
  bannerBg: string;
  bannerBorder: string;
  centerGraphic: {
    icon: string;
    iconColor: string;
    headline: string;
    subline: string;
    statusBadge: string;
    statusBg: string;
    statusColor: string;
  };
  bottomPills: string[];
  evidenceType: string;
  sourceUrl: string;
  sourceLabel: string;
}

const bugAuditsData: Record<string, BugAudit> = {
  "amazon-cart-race": {
    id: "CASE-GITLAB-2017",
    platform: "GitLab.com",
    platformIcon: "fa-brands fa-gitlab",
    platformColor: "#fc6d26",
    domain: "Database Reliability & Recovery",
    categoryTag: "database-reliability",
    title: "Database outage and recovery-control gaps caused production data loss",
    category: "Database Operations & Disaster Recovery",
    severity: "Critical (P1)",
    summary: "A public GitLab postmortem describes a January 2017 GitLab.com outage involving accidental removal of data from the primary database and gaps in backup and recovery procedures. This portfolio entry analyzes the incident as a QA and reliability case study; it is not a claim that the issue is currently present.",
    environment: "GitLab.com, PostgreSQL primary/secondary setup, replication, backups, recovery runbooks.",
    preconditions: "Use the published GitLab postmortem and its documented timeline as the evidence source; do not test or access production systems.",
    stepsToReproduce: [
      "1. Read the public incident timeline and identify the database, replication, and recovery control points.",
      "2. Map each failure point to a testable control: environment guard, backup verification, restore drill, and runbook step.",
      "3. Review whether the proposed recovery controls have an owner, frequency, and measurable pass condition.",
      "4. Record findings as a learning-oriented defect study rather than a live production vulnerability claim."
    ],
    expectedResult: "A production recovery process should prevent destructive commands from targeting the wrong environment, verify backups, support tested restores, and provide clear runbooks for incident response.",
    actualResult: "The public postmortem reports an outage and unrecoverable data loss affecting some GitLab.com data, followed by improvements to backup, recovery, and operational controls.",
    rootCauseAnalysis: "The incident shows how operational safeguards, environment identification, replication behavior, backup coverage, and runbook clarity must be tested together rather than reviewed independently.",
    systemLogs: `[CASE STUDY] Public GitLab postmortem reviewed
[CONTROL] Primary/secondary role verification required
[CONTROL] Backup restore drill and recovery evidence required`,
    qaRecommendation: "Add destructive-operation safeguards, backup restore tests, recovery-time objectives, role verification, and tracked runbook action items to the release and operations quality plan.",
    tags: ["PostgreSQL", "Disaster Recovery", "RCA", "Runbooks", "SRE"],
    bannerBg: "radial-gradient(circle at 50% 30%, #35170c 0%, #1a0b08 60%, #080403 100%)",
    bannerBorder: "rgba(252, 109, 38, 0.4)",
    centerGraphic: {
      icon: "fa-brands fa-gitlab",
      iconColor: "#fc6d26",
      headline: "DATABASE RECOVERY CASE STUDY",
      subline: "Public GitLab postmortem • January 2017",
      statusBadge: "CONTROL GAP: RECOVERY & BACKUP",
      statusBg: "rgba(239, 68, 68, 0.15)",
      statusColor: "#f87171"
    },
    bottomPills: ["BACKUP RESTORE TESTS", "RUNBOOK CONTROLS"],
    evidenceType: "Public incident postmortem",
    sourceUrl: "https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/",
    sourceLabel: "Read GitLab postmortem"
  },
  "spotify-stream-leak": {
    id: "CASE-CF-2025",
    platform: "Cloudflare Network",
    platformIcon: "fa-solid fa-cloud",
    platformColor: "#f6821f",
    domain: "Configuration Propagation & HTTP Reliability",
    categoryTag: "platform-reliability",
    title: "Configuration-file generation defect caused intermittent HTTP 5xx failures",
    category: "Release Safety & Distributed Configuration",
    severity: "Critical (P1)",
    summary: "Cloudflare's public November 2025 incident report explains how a database-permission change produced an oversized Bot Management feature file that caused core proxy failures and elevated HTTP 5xx responses. This entry applies a QA audit lens to the published incident.",
    environment: "Cloudflare edge network, ClickHouse-generated feature files, core proxy, distributed propagation, HTTP 5xx monitoring.",
    preconditions: "Use Cloudflare's public incident report as the evidence source; do not probe Cloudflare infrastructure or attempt to reproduce the outage.",
    stepsToReproduce: [
      "1. Review the public timeline, affected services, and stated trigger in the incident report.",
      "2. Identify contract checks for generated configuration size, schema, permissions, and rollout safety.",
      "3. Design a staging test that rejects malformed or unexpectedly large files before global propagation.",
      "4. Define canary, rollback, and 5xx-alert acceptance criteria for the release pipeline."
    ],
    expectedResult: "Generated configuration should pass schema, size, compatibility, canary, and rollback checks before it reaches the full production fleet.",
    actualResult: "The public report states that an unexpectedly large feature file caused software limits to be exceeded and contributed to widespread HTTP 5xx failures until propagation was stopped and a known-good version restored.",
    rootCauseAnalysis: "The case demonstrates a distributed configuration contract failure: an upstream data-generation change was not blocked by downstream size and compatibility validation before broad rollout.",
    systemLogs: `[CASE STUDY] Cloudflare public incident report reviewed
[OBSERVED] Elevated HTTP 5xx responses
[CONTROL] Stop propagation and restore known-good configuration`,
    qaRecommendation: "Add schema and size contract tests, staged canaries, immutable known-good rollback artifacts, propagation gates, and synthetic 5xx monitoring to the quality strategy.",
    tags: ["HTTP 5xx", "Contract Testing", "Canary Release", "Rollback", "Observability"],
    bannerBg: "radial-gradient(circle at 50% 30%, #172b43 0%, #0b1728 60%, #050b14 100%)",
    bannerBorder: "rgba(246, 130, 31, 0.4)",
    centerGraphic: {
      icon: "fa-solid fa-cloud-arrow-down",
      iconColor: "#f6a04d",
      headline: "CONFIGURATION PROPAGATION FAILURE",
      subline: "Public Cloudflare incident • November 2025",
      statusBadge: "HTTP 5XX: ROLLBACK REQUIRED",
      statusBg: "rgba(239, 68, 68, 0.15)",
      statusColor: "#f87171"
    },
    bottomPills: ["SCHEMA CONTRACT TESTS", "CANARY & ROLLBACK"],
    evidenceType: "Public incident postmortem",
    sourceUrl: "https://blog.cloudflare.com/18-november-2025-outage/",
    sourceLabel: "Read Cloudflare incident report"
  },
  "notion-crdt-conflict": {
    id: "CASE-GSRE-2014",
    platform: "Google SRE Case Study",
    platformIcon: "fa-brands fa-google",
    platformColor: "#4285f4",
    domain: "Automation Safety & Distributed Systems",
    categoryTag: "automation-safety",
    title: "Unsafe automation semantics turned an empty filter into a destructive action",
    category: "API Semantics & Operational Guardrails",
    severity: "High (P2)",
    summary: "Google's SRE postmortem-culture chapter presents a case in which a decommission automation bug treated an empty list as no filter, leading to a much larger destructive action. This is a public teaching case study, not a claim about a current Google defect.",
    environment: "Automated machine decommission workflow, API filter semantics, production traffic routing, monitoring and capacity planning.",
    preconditions: "Use the Google SRE case study for learning; do not run destructive commands or interact with Google infrastructure.",
    stepsToReproduce: [
      "1. Read the public case study and document the intended meaning of an empty selection.",
      "2. Model the API contract for empty, null, invalid, and non-empty filter values.",
      "3. Add negative tests requiring a safe no-op or explicit confirmation for an empty destructive target set.",
      "4. Review idempotency, rate limits, dry-run mode, approvals, and blast-radius controls."
    ],
    expectedResult: "An empty target set should produce a safe no-op, an explicit validation error, or a confirmation gate; it must never be interpreted as all targets for a destructive action.",
    actualResult: "The public Google SRE case study describes an API bug where an empty list was treated as no filter, allowing an automation retry to affect machines beyond the intended scope.",
    rootCauseAnalysis: "The failure came from ambiguous API semantics combined with insufficient sanity checks, idempotency, and blast-radius controls around destructive automation.",
    systemLogs: `[CASE STUDY] Google SRE public example reviewed
[NEGATIVE TEST] empty target list must be safe
[CONTROL] dry-run, approval, and idempotency required`,
    qaRecommendation: "Write contract tests for empty and invalid filters, require explicit target counts, add dry-run and approval gates, make operations idempotent, and monitor blast radius.",
    tags: ["API Contract", "Negative Testing", "Idempotency", "Safety Gates", "SRE"],
    bannerBg: "radial-gradient(circle at 50% 30%, #13284a 0%, #0a1429 60%, #040814 100%)",
    bannerBorder: "rgba(66, 133, 244, 0.4)",
    centerGraphic: {
      icon: "fa-brands fa-google",
      iconColor: "#74a7ff",
      headline: "UNSAFE AUTOMATION SEMANTICS",
      subline: "Public Google SRE teaching case",
      statusBadge: "EMPTY FILTER: SAFE NO-OP REQUIRED",
      statusBg: "rgba(99, 102, 241, 0.15)",
      statusColor: "#a5b4fc"
    },
    bottomPills: ["NEGATIVE API TESTS", "BLAST-RADIUS CONTROLS"],
    evidenceType: "Public SRE case study",
    sourceUrl: "https://sre.google/workbook/postmortem-culture/",
    sourceLabel: "Read Google SRE case study"
  },
  "stripe-currency-truncation": {
    id: "LAB-OWASP-JS",
    platform: "OWASP Juice Shop",
    platformIcon: "fa-solid fa-flask-vial",
    platformColor: "#65a30d",
    domain: "Authorized Training Target & Web Security",
    categoryTag: "training-lab",
    title: "Reproducible security and validation exercises on an intentionally vulnerable web app",
    category: "Web Security Testing & Evidence Quality",
    severity: "High (P2)",
    summary: "OWASP Juice Shop is an intentionally insecure training application designed for authorized learning and security testing. This portfolio entry demonstrates a responsible bug-report workflow without claiming defects on a real commercial website.",
    environment: "Local or authorized OWASP Juice Shop instance, browser DevTools, proxy/testing tools, application logs, and a controlled test database.",
    preconditions: "Run only a local or explicitly authorized instance. Never test a third-party production website without permission.",
    stepsToReproduce: [
      "1. Start an authorized local Juice Shop instance and record the version and environment.",
      "2. Select one documented training challenge and define the expected security behavior.",
      "3. Capture minimal reproduction steps, request/response evidence, and impact without accessing unrelated data.",
      "4. Write a responsible defect report with scope, severity rationale, remediation, and retest criteria."
    ],
    expectedResult: "A controlled security test should be reproducible, scoped to the authorized target, supported by evidence, and followed by a clear remediation and retest plan.",
    actualResult: "The intentionally vulnerable training application exposes known learning challenges by design; the value of this case study is the disciplined audit and reporting method, not a claim about a live commercial service.",
    rootCauseAnalysis: "The exercise demonstrates how authorization, scope, evidence handling, impact analysis, and retesting are essential parts of a responsible QA/security workflow.",
    systemLogs: `[LAB] Authorized OWASP Juice Shop instance
[SCOPE] Local training environment only
[REPORT] Evidence captured without unrelated data access`,
    qaRecommendation: "Use isolated training targets, document authorization, preserve minimal evidence, map findings to risk, and verify remediation through a controlled retest.",
    tags: ["OWASP", "Security Testing", "Authorized Lab", "Evidence", "Jira"],
    bannerBg: "radial-gradient(circle at 50% 30%, #24340e 0%, #121c08 60%, #060a03 100%)",
    bannerBorder: "rgba(101, 163, 13, 0.4)",
    centerGraphic: {
      icon: "fa-solid fa-flask-vial",
      iconColor: "#a3e635",
      headline: "AUTHORIZED BUG REPORTING LAB",
      subline: "OWASP Juice Shop • Controlled training target",
      statusBadge: "SCOPE: LOCAL / AUTHORIZED ONLY",
      statusBg: "rgba(101, 163, 13, 0.16)",
      statusColor: "#bef264"
    },
    bottomPills: ["RESPONSIBLE TESTING", "EVIDENCE & RETEST"],
    evidenceType: "Authorized training target",
    sourceUrl: "https://owasp.org/www-project-juice-shop/",
    sourceLabel: "Read OWASP Juice Shop project"
  }
};

// Skills Data Structure
interface SkillItem {
  name: string;
  icon: string;
  color?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: SkillItem[];
}

const skillsCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: 'fa-solid fa-code',
    skills: [
      { name: 'Java (21)', icon: 'fa-brands fa-java', color: '#ea580c' },
      { name: 'Python (3.12)', icon: 'fa-brands fa-python', color: '#3776ab' },
      { name: 'TypeScript', icon: 'fa-solid fa-file-code', color: '#3b82f6' },
      { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#eab308' },
      { name: 'C', icon: 'fa-solid fa-c', color: '#659ad2' },
      { name: 'SQL', icon: 'fa-solid fa-database', color: '#06b6d4' }
    ]
  },
  {
    id: 'frontend',
    title: 'Front-end Development',
    icon: 'fa-solid fa-globe',
    skills: [
      { name: 'React (19)', icon: 'fa-brands fa-react', color: '#06b6d4' },
      { name: 'Next.js 14/16', icon: 'fa-solid fa-layer-group', color: '#ffffff' },
      { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: '#38bdf8' },
      { name: 'HTML5 & CSS3', icon: 'fa-brands fa-html5', color: '#f97316' },
      { name: 'IndexedDB API', icon: 'fa-solid fa-hard-drive', color: 'var(--primary-color)' },
      { name: 'Recharts', icon: 'fa-solid fa-chart-line', color: '#8884d8' }
    ]
  },
  {
    id: 'backend',
    title: 'Back-end & Microservices',
    icon: 'fa-solid fa-server',
    skills: [
      { name: 'Spring Boot 3', icon: 'fa-solid fa-leaf', color: '#6db33f' },
      { name: 'FastAPI', icon: 'fa-solid fa-bolt', color: '#009688' },
      { name: 'Node.js & Express', icon: 'fa-brands fa-node-js', color: '#22c55e' },
      { name: 'NestJS', icon: 'fa-solid fa-fire', color: '#e0234e' },
      { name: 'RESTful APIs', icon: 'fa-solid fa-network-wired', color: '#38bdf8' },
      { name: 'Prisma & Drizzle ORM', icon: 'fa-solid fa-gem', color: '#c5f74f' }
    ]
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    icon: 'fa-solid fa-database',
    skills: [
      { name: 'PostgreSQL', icon: 'fa-solid fa-database', color: '#336791' },
      { name: 'MySQL', icon: 'fa-solid fa-server', color: '#00758f' },
      { name: 'Redis', icon: 'fa-solid fa-layer-group', color: '#dc2626' },
      { name: 'SQL Schema & ACID Design', icon: 'fa-solid fa-table', color: '#818cf8' }
    ]
  },
  {
    id: 'testing',
    title: 'Testing & QA Automation',
    icon: 'fa-solid fa-vial-circle-check',
    skills: [
      { name: 'Vitest (68 Tests)', icon: 'fa-solid fa-bolt', color: '#facc15' },
      { name: 'Playwright (E2E)', icon: 'fa-solid fa-masks-theater', color: '#2e64b7' },
      { name: 'JUnit 5', icon: 'fa-solid fa-vial', color: '#25a162' },
      { name: 'Pytest', icon: 'fa-solid fa-vial-virus', color: '#0a9edc' },
      { name: 'API Testing (Postman)', icon: 'fa-solid fa-paper-plane', color: '#f97316' },
      { name: 'Jira & STLC', icon: 'fa-brands fa-jira', color: '#0052cc' }
    ]
  },
  {
    id: 'tools',
    title: 'DevOps, Tools & Platforms',
    icon: 'fa-solid fa-toolbox',
    skills: [
      { name: 'Docker & Compose', icon: 'fa-brands fa-docker', color: '#2496ed' },
      { name: 'GitHub Actions (CI/CD)', icon: 'fa-solid fa-gears', color: '#2088ff' },
      { name: 'Git & GitHub', icon: 'fa-brands fa-git-alt', color: '#f05032' },
      { name: 'Render Cloud', icon: 'fa-solid fa-cloud', color: '#46e3b7' },
      { name: 'IntelliJ IDEA & VS Code', icon: 'fa-solid fa-laptop-code', color: '#fe315d' },
      { name: 'Swagger / OpenAPI', icon: 'fa-solid fa-book', color: '#85ea2d' }
    ]
  }
];

// Skills Summary Metrics & Infinite Marquee Data
const skillsMetrics = [
  {
    icon: 'fa-solid fa-code',
    num: '4',
    label: 'Core Languages',
    sub: 'Java, TypeScript, Python, SQL'
  },
  {
    icon: 'fa-solid fa-server',
    num: '3',
    label: 'Full-Stack Systems',
    sub: 'Distributed Cloud & Offline Sync'
  },
  {
    icon: 'fa-solid fa-vial-circle-check',
    num: '94+',
    label: 'Automated Tests',
    sub: '68 Vitest + 26 JUnit, Pytest & Playwright'
  },
  {
    icon: 'fa-solid fa-shield-halved',
    num: '100%',
    label: 'Type-Safe & ACID',
    sub: 'Strict TypeScript & PostgreSQL'
  }
];

const marqueeSkillsRow1 = [
  { name: 'Java 21', tag: 'Enterprise Core', color: '#f89820' },
  { name: 'Spring Boot 3', tag: 'Microservices & REST', color: '#6db33f' },
  { name: 'Next.js 14', tag: 'Full-Stack React', color: '#38bdf8' },
  { name: 'TypeScript', tag: 'Type-Safe Architecture', color: '#3178c6' },
  { name: 'PostgreSQL', tag: 'Relational ACID DB', color: '#336791' },
  { name: 'Docker', tag: 'Containerization', color: '#2496ed' },
  { name: 'Tailwind CSS', tag: 'Modern UI System', color: '#06b6d4' },
  { name: 'React 19', tag: 'Component Engineering', color: '#61dafb' },
  { name: 'Node.js & Express', tag: 'Backend Services', color: '#22c55e' },
  { name: 'Drizzle ORM', tag: 'Database Persistence', color: '#c5f74f' },
];

const marqueeSkillsRow2 = [
  { name: 'Playwright', tag: 'End-to-End Testing', color: '#2e64b7' },
  { name: 'Vitest', tag: '68 Unit & Integration Tests', color: '#facc15' },
  { name: 'JUnit 5', tag: 'Java Backend TDD', color: '#25a162' },
  { name: 'IndexedDB', tag: 'Offline Client Cache', color: '#6366f1' },
  { name: 'FastAPI & Python 3.12', tag: 'AI & NLP Services', color: '#3776ab' },
  { name: 'Git & GitHub', tag: 'CI/CD & Workflows', color: '#f05032' },
  { name: 'Render Cloud', tag: 'Production Deployment', color: '#46e3b7' },
  { name: 'Postman & Swagger', tag: 'API Validation', color: '#ff6c37' },
  { name: 'JWT & RBAC', tag: 'Role Security & Auth', color: '#10b981' },
  { name: 'Manual & Functional QA', tag: 'Bug Audits & STLC', color: '#ec4899' },
];

// Certifications Data Structure
interface CertificationItem {
  id: string;
  category: 'qa' | 'cloud' | 'dev-ai';
  categoryLabel: string;
  badge: string;
  issuer: string;
  department?: string;
  title: string;
  date: string;
  credId: string;
  verifyUrl?: string;
  desc: string;
  file: string;
  skills: string[];
}

const allCertifications: CertificationItem[] = [
  {
    id: 'genai-qa',
    category: 'qa',
    categoryLabel: 'QA & AI',
    badge: 'vial-circle-check',
    issuer: 'Simplilearn (SkillUp)',
    title: 'Software Testing with Generative AI',
    date: 'August 31, 2026',
    credId: 'Code: 10675900',
    desc: 'Official Certificate of Completion covering AI-driven test design, automated scenario generation, and modern QA workflows.',
    file: '/cert_software_testing_genai_simplilearn.pdf',
    skills: ['GenAI in QA', 'Test Automation', 'Prompt Engineering', 'STLC']
  },
  {
    id: 'intro-qa',
    category: 'qa',
    categoryLabel: 'QA & Testing',
    badge: 'list-check',
    issuer: 'Simplilearn (SkillUp)',
    title: 'Introduction to Software Testing',
    date: 'September 6, 2026',
    credId: 'Code: 10699881',
    desc: 'Official Certificate of Completion covering fundamental QA principles, STLC & SDLC lifecycle, test case design (BVA, EP), and defect tracking.',
    file: '/cert_intro_to_software_testing.pdf',
    skills: ['STLC / SDLC', 'Test Case Design', 'Defect Life Cycle', 'Black-Box Testing']
  },
  {
    id: 'python-uom',
    category: 'dev-ai',
    categoryLabel: 'Programming',
    badge: 'code',
    issuer: 'University of Moratuwa (CODL)',
    department: 'Dept. of Computer Science & Engineering',
    title: 'Python for Beginners',
    date: 'March 25, 2024',
    credId: 'Code: RnPFR5JZxA',
    verifyUrl: 'https://open.uom.lk/verify',
    desc: 'Official E-Certificate conducted by Department of Computer Science & Engineering, Faculty of Engineering, University of Moratuwa covering core syntax, data structures, algorithms, and procedural programming.',
    file: '/cert_python_for_beginners_uom.pdf',
    skills: ['Python 3', 'Data Structures', 'Algorithmic Logic', 'Automation Scripting']
  },
  {
    id: 'uom-web',
    category: 'dev-ai',
    categoryLabel: 'Web & UI',
    badge: 'graduation-cap',
    issuer: 'University of Moratuwa (CODL)',
    department: 'Dept. of Information Technology',
    title: 'Web Design for Beginners',
    date: 'March 21, 2024',
    credId: 'Code: 3FIAuhLtm6',
    verifyUrl: 'https://open.uom.lk/verify',
    desc: 'Official E-Certificate conducted by Department of Information Technology, Faculty of Information Technology, University of Moratuwa covering HTML5 semantic markup, CSS3 styling, responsive layouts, and UX standards.',
    file: '/cert_web_design_uom.pdf',
    skills: ['HTML5 & CSS3', 'Responsive Layout', 'UI/UX Standards', 'DOM Tree']
  },
  {
    id: 'aws',
    category: 'cloud',
    categoryLabel: 'Cloud Computing',
    badge: 'cloud',
    issuer: 'Amazon Web Services (AWS)',
    title: 'AWS Cloud Practitioner Essentials',
    date: 'July 18, 2026',
    credId: 'AWS Verified Credential',
    desc: 'Foundational credential covering AWS global infrastructure, core cloud compute (EC2, Lambda), storage (S3), database (RDS), IAM security, and cloud architecture.',
    file: '/cert_aws_cloud_practitioner.pdf',
    skills: ['AWS Cloud', 'IAM Security', 'EC2 & S3', 'Cloud Architecture']
  },
  {
    id: 'cyber',
    category: 'cloud',
    categoryLabel: 'Cybersecurity',
    badge: 'shield-halved',
    issuer: 'Cisco Networking Academy',
    title: 'Introduction to Cybersecurity',
    date: 'July 19, 2026',
    credId: 'Cisco Verified (QR)',
    desc: 'Official Cisco credential covering cyber threat vectors, defense-in-depth, network security principles, data privacy (PDPA), and vulnerability mitigation.',
    file: '/cert_intro_cybersecurity.pdf',
    skills: ['Threat Mitigation', 'Network Defense', 'Data Privacy', 'Security Posture']
  },
  {
    id: 'ai',
    category: 'dev-ai',
    categoryLabel: 'AI & Data',
    badge: 'brain',
    issuer: 'Simplilearn (SkillUp)',
    title: 'Introduction to Artificial Intelligence',
    date: 'July 19, 2026',
    credId: 'Code: 10486363',
    desc: 'Official Certificate of Completion covering foundational AI principles, machine learning paradigms (supervised/unsupervised), neural networks, and computer vision.',
    file: '/cert_intro_to_ai.pdf',
    skills: ['Machine Learning', 'Neural Networks', 'AI Ethics', 'Model Evaluation']
  }
];

// Leadership & Extracurricular Activities Data Structure
interface LeadershipItem {
  id: string;
  name: string;
  icon: string;
  roles: {
    title: string;
    period: string;
    desc: string;
    active: boolean;
  }[];
  volunteering: {
    title: string;
    items: string[];
  };
}

const leadershipActivities: LeadershipItem[] = [
  {
    id: 'career-fair',
    name: 'Career Fair — University of Moratuwa',
    icon: 'fa-solid fa-ribbon',
    roles: [
      {
        title: 'Member of the Organizing Committee',
        period: '2026',
        desc: 'Member of the Organizing Committee for the Official Career Fair conducted by University of Moratuwa.',
        active: true
      }
    ],
    volunteering: {
      title: 'EVENT & ROLE',
      items: [
        'Official Career Fair 2026',
        'Organizing Committee',
        'University of Moratuwa'
      ]
    }
  },
  {
    id: 'leo-club',
    name: 'Leo Club of UoM',
    icon: 'fa-solid fa-globe',
    roles: [
      {
        title: 'Member of the Organizing Committee — Project "Rest with Hope"',
        period: '2025',
        desc: 'Organizing committee member for Project "Rest with Hope" conducted by Leo Club, UoM.',
        active: true
      },
      {
        title: 'Active Club Member',
        period: '2024 – PRESENT',
        desc: 'Active member participating in community service, social welfare, and university volunteer programs.',
        active: false
      }
    ],
    volunteering: {
      title: 'INITIATIVES & SERVICE',
      items: [
        'Project "Rest with Hope"',
        'Community Welfare',
        'Leo Club of UoM'
      ]
    }
  },
  {
    id: 'fit-moments',
    name: 'FIT Moments (Faculty Media Body)',
    icon: 'fa-solid fa-camera-retro',
    roles: [
      {
        title: 'Active Member — FIT Moments (Faculty Media Body)',
        period: '2024 – PRESENT',
        desc: 'Active member of the official Faculty of Information Technology media body (FIT Moments), contributing to university media, photography, and event coverage.',
        active: true
      }
    ],
    volunteering: {
      title: 'AFFILIATIONS & MEDIA',
      items: [
        'FIT Moments (Faculty Media)',
        'University Media Body',
        'Active Student Member'
      ]
    }
  },
  {
    id: 'legal-youth',
    name: 'Legal Youth Community Sri Lanka',
    icon: 'fa-solid fa-scale-balanced',
    roles: [
      {
        title: 'Active Member — Legal Youth Community Sri Lanka',
        period: '2024 – PRESENT',
        desc: 'Active member engaging in youth legal awareness and community forums.',
        active: true
      }
    ],
    volunteering: {
      title: 'ADVOCACY & ENGAGEMENT',
      items: [
        'Youth Legal Awareness',
        'Community Forums',
        'Active Member'
      ]
    }
  }
];

// Featured Projects Data Structure
interface ProjectItem {
  id: string;
  title: string;
  category: string;
  teamBadge?: {
    type: 'duo' | 'solo';
    label: string;
    role: string;
  };
  desc: string;
  myContributions?: string[];
  image: string;
  alt: string;
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  detailsId: string;
  featurePills: { icon: string; text: string }[];
}

const projectsData: ProjectItem[] = [
  {
    id: 'ryzera',
    title: 'Ryzera POS',
    category: 'Enterprise Distributed Retail POS & Offline Sync · 2026',
    teamBadge: {
      type: 'duo',
      label: 'Group Project',
      role: 'Lead Backend & Offline Sync Architect'
    },
    desc: 'A distributed, multi-branch retail Point of Sale (POS) and inventory platform engineered for zero-downtime offline sales continuity. Implements client-side IndexedDB local state caching, automated bi-directional synchronization via Service Workers, and mathematical conflict resolution. Features centralized multi-branch terminal monitoring, battery and network health tracking, and remote security revocation.',
    myContributions: [
      'Offline-First Sync Engine: Architected IndexedDB client buffer & PWA Service Workers delivering sub-50ms billing during network blackouts with automated batch sync to PostgreSQL.',
      '3-Way Conflict Engine: Implemented mathematical reconciliation (Branch Wins, Cloud Master, Smart Stock Merge) with real-time Socket.io latency tracking.',
      'Terminal Fleet Console & Remote Kill-Switch: Built device monitoring dashboard to track POS battery levels & network health across branches with 1-click remote session revocation.'
    ],
    image: '/ryzera_real_showcase.png?v=3d',
    alt: 'Ryzera POS Multi-Branch Retail Enterprise Showcase',
    tags: ['Next.js 16', 'TypeScript', 'NestJS', 'PostgreSQL (Supabase)', 'Prisma ORM', 'Socket.io', 'IndexedDB', 'Postman', 'Docker'],
    githubUrl: 'https://github.com/Ryzera/Ryzera-POS',
    detailsId: 'ryzera',
    featurePills: [
      { icon: 'fa-solid fa-wifi-slash', text: 'OFFLINE INDEXEDDB SYNC' },
      { icon: 'fa-solid fa-tower-broadcast', text: 'EDGE TELEMETRY & KILL-SWITCH' }
    ]
  },
  {
    id: 'ledgerly',
    title: 'Ledgerly',
    category: 'Autonomous AI Financial Copilot & Collaborative Ledger · 2026',
    teamBadge: {
      type: 'solo',
      label: 'Individual Project',
      role: 'Full-Stack Software & AI Systems Engineer'
    },
    desc: 'An enterprise-grade financial intelligence engine and collaborative ledger featuring an Autonomous AI Copilot (0–100 health scoring, velocity anomaly alerts), interactive "What-If" cash-flow runway simulations with Recharts, real-time Server-Sent Events (SSE) activity audit stream, and 4 debt-minimization split models with in-memory PDF settlements. Fortified by 68 automated Vitest tests.',
    image: '/ledgerly_showcase.png?v=3d',
    alt: 'Ledgerly Workspace & Dashboard Showcase',
    tags: ['React 19', 'TypeScript', 'tRPC 11', 'PostgreSQL', 'Server-Sent Events', 'Tailwind CSS', 'Recharts', 'Vitest (68 Tests)'],
    liveUrl: 'https://ledgerly-mbcd.onrender.com/',
    githubUrl: 'https://github.com/SithumManusha/Ledgerly',
    detailsId: 'ledgerly',
    featurePills: [
      { icon: 'fa-solid fa-brain', text: 'AUTONOMOUS AI COPILOT' },
      { icon: 'fa-solid fa-sliders', text: 'WHAT-IF RUNWAY SIMULATOR' },
      { icon: 'fa-solid fa-clock-rotate-left', text: 'REAL-TIME SSE AUDIT' }
    ]
  },
  {
    id: 'careerflow',
    title: 'CareerFlow',
    category: 'AI Resume Optimizer & ATS Technical Interview Platform · 2026',
    teamBadge: {
      type: 'solo',
      label: 'Individual Project',
      role: 'Full-Stack & AI Systems Engineer'
    },
    desc: 'A full-stack ATS resume optimization and technical interview platform engineered with Next.js 14, Java 21 Spring Boot 3, and Python 3.12 FastAPI microservices. Features dual-score ATS analysis, Google XYZ bullet rewriting, 5-round AI mock interviews, and PostgreSQL persistence.',
    image: '/careerflow_showcase.png?v=3d',
    alt: 'CareerFlow Enterprise ATS Optimizer & AI Interview Platform',
    tags: ['Next.js 14', 'Java 21', 'Spring Boot 3', 'Python 3.12', 'FastAPI', 'PostgreSQL', 'Render', 'Playwright'],
    liveUrl: 'https://careerflow-app.onrender.com',
    githubUrl: 'https://github.com/SithumManusha/careerflow',
    detailsId: 'careerflow',
    featurePills: [
      { icon: 'fa-solid fa-brain', text: 'TF-IDF & COSINE NLP' },
      { icon: 'fa-solid fa-server', text: 'JAVA 21 & SPRING BOOT 3' }
    ]
  },
  {
    id: 'robotic-sorting',
    title: 'Robotic Sorting System',
    category: 'Dual-MCU Mechatronics & Autonomous Conveyor Platform · 2025',
    teamBadge: {
      type: 'duo',
      label: 'Group Project (UoM FIT - Microbotics)',
      role: 'Lead Firmware & Mechatronics Architect'
    },
    desc: 'An industrial-grade autonomous sorting conveyor platform combining a 4-DOF robotic arm, dual-microcontroller distributed architecture (Arduino Mega + Uno), RFID categorization, and closed-loop ultrasonic capacity monitoring. Calibrated for 98% pick-and-place precision and non-blocking UART coordination.',
    myContributions: [
      'Two-Finger Mechanical Gripper: Designed articulated gripper powered by 28BYJ-48 stepper motor & ULN2003 driver, optimized for lightweight payload balance.',
      'Precision Firmware Calibration: Programmed Arduino C++ step routines (openGripper/closeGripper) achieving 98% pick-and-place precision without slipping or crushing.',
      'Conveyor Assembly & Timing Sync: Built structural conveyor frame, aligned roller pulley tension, and synchronized item drop timing with continuous belt feed.'
    ],
    image: '/robotic_sorting_3d_showcase.png?v=3d',
    alt: 'Automated Robotic Sorting System 3D CAD, Robotic Arm & Full Conveyor Belt Showcase',
    tags: ['Embedded C++', 'Arduino Mega', 'Arduino Uno', 'UART Serial', 'NEMA 17 Stepper', 'RFID (SPI)', 'HC-SR04 Ultrasonic', 'EasyEDA PCB'],
    githubUrl: 'https://github.com/SithumManusha/robotic-sorting-system',
    detailsId: 'robotic-sorting',
    featurePills: [
      { icon: 'fa-solid fa-microchip', text: 'DUAL-MCU UART BUS' },
      { icon: 'fa-solid fa-robot', text: '98% PICK & PLACE' }
    ]
  }
];

// ==========================================
// LINEAR / VERCEL MODERN MONOGRAM & PRECISION COUNTER PRELOADER
// ==========================================

interface LinearVercelPreloaderProps {
  onComplete: () => void;
}

const LinearVercelPreloader: React.FC<LinearVercelPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear realistic engineering boot pace
      const step = current < 35 ? Math.floor(Math.random() * 5) + 3
                 : current < 70 ? Math.floor(Math.random() * 4) + 2
                 : current < 92 ? Math.floor(Math.random() * 3) + 2
                 : 1;
      current = Math.min(100, current + step);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 180);
      }
    }, 28);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        clearInterval(interval);
        setProgress(100);
        setTimeout(onComplete, 80);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  // Dynamic system status phase text
  const statusPhase =
    progress < 25 ? 'INITIALIZING RUNTIME & VIRTUAL DOM' :
    progress < 55 ? 'HYDRATING DISTRIBUTED PLATFORMS' :
    progress < 80 ? 'VERIFYING AUTOMATED QA & EMBEDDED BUSES' :
    progress < 100 ? 'FINALIZING RESILIENCE PROTOCOLS' :
    'SITHUM MANUSHA // SYSTEMS ONLINE';

  return (
    <motion.div
      key="linear-preloader"
      className="linear-preloader-backdrop"
      onClick={() => {
        setProgress(100);
        setTimeout(onComplete, 80);
      }}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(12px)',
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      {/* Precision background grid with radial spotlight */}
      <div className="linear-preloader-grid" />

      {/* Top micro metadata header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        style={{
          position: 'absolute',
          top: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          color: 'rgba(148, 163, 184, 0.75)',
          textTransform: 'uppercase'
        }}
      >
        <span style={{ color: '#06b6d4' }}>●</span>
        <span>VERIFIED SE CANDIDATE</span>
        <span style={{ opacity: 0.3 }}>/</span>
        <span>UOM ITM · 2026</span>
      </motion.div>

      {/* Center Console */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Monogram Box with Rotating Conic Border Beam */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="linear-monogram-box"
        >
          <div className="linear-monogram-beam" />
          <div className="linear-monogram-core">
            <span className="linear-monogram-text">SM</span>
          </div>
        </motion.div>

        {/* Precision Counter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <div className="linear-counter-val">
            <span>{progress < 10 ? `0${progress}` : progress}</span>
            <span className="linear-counter-percent">%</span>
          </div>

          {/* Laser Progress Rail */}
          <div className="linear-rail-track">
            <div
              className="linear-rail-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="linear-rail-glow-tip" />
            </div>
          </div>
        </div>

        {/* Dynamic Status Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="linear-status-ticker"
        >
          <div className="linear-status-live-dot" />
          <span>{statusPhase}</span>
        </motion.div>
      </div>

      {/* Micro Skip Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ position: 'absolute', bottom: '26px' }}
      >
        <div className="linear-skip-hint">
          CLICK ANYWHERE OR PRESS ESC TO SKIP
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// APP COMPONENT
// ==========================================

function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('portfolio-theme-v2') as 'light' | 'dark') || 'dark';
  });

  // Scroll states
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Loading / Splash screen state
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeBugAuditId, setActiveBugAuditId] = useState<string | null>(null);
  const [previewCert, setPreviewCert] = useState<CertificationItem | null>(null);

  // Project Carousel (චක්‍රය) state
  const [projectSlideIndex, setProjectSlideIndex] = useState(0);

  // Certifications category filter & carousel pagination
  const [certFilter, setCertFilter] = useState<'all' | 'qa' | 'cloud' | 'dev-ai'>('all');
  const [certStartIndex, setCertStartIndex] = useState(0);

  // Skills carousel pagination
  const [skillsStartIndex, setSkillsStartIndex] = useState(0);

  // Leadership carousel pagination
  const [leadershipStartIndex, setLeadershipStartIndex] = useState(0);

  // Toast notifications state
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'info' | 'warning' }[]>([]);

  // 3D Card Hover spotlight / transform handlers
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--spot-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--spot-y', `${(y / rect.height) * 100}%`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.removeProperty('--spot-x');
    card.style.removeProperty('--spot-y');
  };

  // Toast dispatch helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Theme switcher
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme-v2', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  // Scroll listener for progress & navbar
  useEffect(() => {
    const handleScroll = () => {
      // Progress calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }

      // Sticky navbar
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }

      // Intersection detection for nav link states
      const sectionsList = ['home', 'education', 'skills', 'certifications', 'projects', 'leadership', 'contact'];
      let current = 'home';
      for (const sectionId of sectionsList) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 150;
          if (window.scrollY >= top) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Back to top button trigger
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScrollButton = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScrollButton);
    return () => window.removeEventListener('scroll', handleScrollButton);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Prevent background scroll when any modal is open
  useEffect(() => {
    if (activeProjectId || activeBugAuditId || previewCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeProjectId, activeBugAuditId, previewCert]);

  // ESC key to close any active modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewCert) setPreviewCert(null);
        else if (activeProjectId) setActiveProjectId(null);
        else if (activeBugAuditId) setActiveBugAuditId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectId, activeBugAuditId, previewCert]);

  // Hash smooth scroll listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const targetId = hash.replace('#', '');
      if (targetId && targetId !== 'home') {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run once on startup
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleDownloadCV = async (e: React.MouseEvent) => {
    e.preventDefault();
    showToast("Downloading Sithum's Official CV... 📥", "info");

    try {
      const response = await fetch('/Sithum_Manusha_CV.pdf');
      if (!response.ok) throw new Error('File not found');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Sithum_Manusha_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download error:', err);
      window.open('/Sithum_Manusha_CV.pdf', '_blank');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get('name') as string).trim();
    const email = (formData.get('email') as string).trim();
    const message = (formData.get('message') as string).trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    try {
      const response = await fetch("https://formsubmit.co/ajax/bf69a687f8f8aad8c7c00f1d29a1bfa6", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `💼 New Portfolio Message from ${name}`,
          _template: "table"
        })
      });

      if (response.ok) {
        showToast(`Thank you, ${name}! Your message has been sent successfully. 🌟`, 'success');
        form.reset();
      } else {
        showToast('Problem sending message. Please try again.', 'warning');
      }
    } catch (err) {
      console.error(err);
      showToast('Oops! Network error. Please try again.', 'warning');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  };


  // Skills slider calculations (show max 3 at a time if > 3)
  const maxSkillsStart = Math.max(0, skillsCategories.length - 3);
  const visibleSkills = skillsCategories.length > 3
    ? skillsCategories.slice(skillsStartIndex, skillsStartIndex + 3)
    : skillsCategories;

  // Certifications slider calculations (show max 3 at a time if > 3)
  const filteredCerts = allCertifications.filter(cert => certFilter === 'all' || cert.category === certFilter);
  const maxCertStart = Math.max(0, filteredCerts.length - 3);
  const visibleCerts = filteredCerts.length > 3
    ? filteredCerts.slice(certStartIndex, certStartIndex + 3)
    : filteredCerts;

  // Leadership slider calculations (show max 3 at a time if > 3)
  const maxLeadershipStart = Math.max(0, leadershipActivities.length - 3);
  const visibleLeadership = leadershipActivities.length > 3
    ? leadershipActivities.slice(leadershipStartIndex, leadershipStartIndex + 3)
    : leadershipActivities;

  // Framer Motion reusable variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } }
  };

  return (
    <>
      {/* Linear / Vercel Modern Monogram & Precision Counter Preloader */}
      <AnimatePresence>
        {isLoading && (
          <LinearVercelPreloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <div id="scroll-prog" style={{ width: `${scrollProgress}%` }}></div>

      {/* Navigation Bar */}
      <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <a href="#home" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="fa-solid fa-terminal"></i> SM
          </a>
          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`} id="nav-links">
            <li>
              <a 
                href="#home" 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#education" 
                className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Education
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#certifications" 
                className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Certifications
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#leadership" 
                className={`nav-link ${activeSection === 'leadership' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Leadership
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              className="theme-toggle" 
              id="theme-toggle" 
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <a href="#contact" className="nav-talk-btn">
              Let's Talk <i className="fa-solid fa-arrow-up-right"></i>
            </a>
            <div 
              className="nav-toggle" 
              id="nav-toggle" 
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section className="hero" id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          {/* Availability Status Badge with Pulsing Radar Ping */}
          <div className="hero-status-pill">
            <span className="radar-ping-wrapper">
              <span className="radar-ping-ring"></span>
              <span className="radar-ping-dot"></span>
            </span>
            Available for Software Engineering Internship
          </div>

          <h1 className="hero-title">Hi, I'm <span className="gradient-text">Sithum Manusha</span></h1>
          <h2 className="hero-subtitle" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
            3rd-Year BSc (Hons) IT &amp; Management Student | University of Moratuwa
          </h2>
          <p className="hero-description" style={{ marginBottom: '28px', lineHeight: 1.7, maxWidth: '820px', width: '100%' }}>
            I'm an undergraduate at the University of Moratuwa passionate about full-stack web development and software quality. I build clean, reliable applications using <strong style={{ color: 'var(--text-primary)' }}>Java (Spring Boot), React, TypeScript, and PostgreSQL</strong>, with a strong focus on clean code and automated testing. Currently seeking a Software Engineering Internship to learn, contribute, and build practical software.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects <i className="fa-solid fa-arrow-down"></i>
            </a>
            <a 
              href="/Sithum_Manusha_CV.pdf" 
              download="Sithum_Manusha_CV.pdf" 
              className="btn btn-secondary" 
              onClick={handleDownloadCV}
            >
              Download CV <i className="fa-solid fa-download"></i>
            </a>
            <a href="https://linkedin.com/in/sithum-manusha" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-brands fa-linkedin-in"></i> LinkedIn
            </a>
            <a href="https://github.com/SithumManusha" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-brands fa-github"></i> GitHub
            </a>
          </div>
        </div>

        <div className="hero-img-wrapper" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <div className="hero-img-container" style={{ marginLeft: 'auto', marginRight: 0 }}>
            <img src="/sithum_full.jpg" alt="Sithum Manusha" style={{ objectPosition: 'center 12%', width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="hero-bg-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section className="education" id="education"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
      >
        <div className="section-header-editorial">
          <span className="section-eyebrow">// 01 &bull; ACADEMIC FOUNDATIONS</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My academic foundations and degrees currently in progress.</p>
          <div className="section-accent-bar"></div>
        </div>
        
        <div className="edu-grid">
          {/* UOM Card */}
          <div 
            className="edu-card glass-card uom-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="edu-head">
              <div className="edu-logo">
                <img src="/uom_logo.png" alt="University of Moratuwa Logo" />
              </div>
              <div className="edu-head-copy">
                <span className="edu-kicker">3rd-Year Undergraduate Degree &bull; University of Moratuwa</span>
                <h3 className="edu-degree">B.Sc. (Hons) in Information Technology &amp; Management</h3>
                <p className="edu-org">University of Moratuwa (UOM)</p>
              </div>
            </div>
            <div className="edu-meta">
              <span>2024 - Present (3rd Year)</span>
            </div>
          </div>

          {/* OUSL Card */}
          <div 
            className="edu-card glass-card ousl-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="edu-head">
              <div className="edu-logo">
                <img src="/ousl_logo.png" alt="Open University of Sri Lanka Logo" />
              </div>
              <div className="edu-head-copy">
                <span className="edu-kicker">Undergraduate Law Degree</span>
                <h3 className="edu-degree">Bachelor of Laws Honours (LL.B.)</h3>
                <p className="edu-org">Open University of Sri Lanka (OUSL)</p>
              </div>
            </div>
            <div className="edu-meta">
              <span>2025 - Present</span>
            </div>
          </div>

          {/* Vaz College Card */}
          <div 
            className="edu-card glass-card school-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="edu-head">
              <div className="edu-logo">
                <img src="/vaz_logo.ico" alt="St. Joseph's Vaz College Logo" />
              </div>
              <div className="edu-head-copy">
                <span className="edu-kicker">Secondary &amp; High School Education</span>
                <h3 className="edu-degree">G.C.E. Advanced Level &amp; Ordinary Level</h3>
                <p className="edu-org">St. Joseph's Vaz College, Wennappuwa</p>
              </div>
            </div>
            <div className="edu-meta">
              <span>2009 - 2022</span>
              <span>G.C.E. O/L &amp; A/L Commerce</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Technical Stack Section */}
      <motion.section className="skills" id="skills"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      >
        <div className="section-header-editorial" style={{ marginBottom: '24px' }}>
          <span className="section-eyebrow" style={{ marginBottom: '8px' }}>// 02 &bull; TECHNICAL CAPABILITIES</span>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>Technical Stack &amp; Skills</h2>
          <div className="section-accent-bar" style={{ margin: '6px 0 12px 0' }}></div>
          <p className="section-subtitle" style={{ textAlign: 'left', margin: 0, maxWidth: '680px' }}>
            Production-grade technologies across full-stack development, distributed backend APIs, and automated test pipelines.
          </p>
        </div>

        {/* Skills Summary Metrics Bar */}
        <div className="skills-metrics-grid">
          {skillsMetrics.map((metric, idx) => (
            <div key={idx} className="skills-metric-card glass-card">
              <div className="skills-metric-icon">
                <i className={metric.icon}></i>
              </div>
              <div>
                <div className="skills-metric-num">{metric.num}</div>
                <div className="skills-metric-label">{metric.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{metric.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Dual-Direction Tech Marquee */}
        <div className="infinite-marquee-wrapper">
          {/* Row 1 - Scrolling Left */}
          <div className="marquee-track-container">
            <div className="marquee-track-left">
              {[...marqueeSkillsRow1, ...marqueeSkillsRow1].map((skill, idx) => (
                <div key={`m1-${idx}`} className="marquee-pill">
                  <span className="marquee-pill-dot" style={{ background: skill.color }}></span>
                  <span>{skill.name}</span>
                  <span className="marquee-pill-tag">{skill.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolling Right */}
          <div className="marquee-track-container">
            <div className="marquee-track-right">
              {[...marqueeSkillsRow2, ...marqueeSkillsRow2].map((skill, idx) => (
                <div key={`m2-${idx}`} className="marquee-pill">
                  <span className="marquee-pill-dot" style={{ background: skill.color }}></span>
                  <span>{skill.name}</span>
                  <span className="marquee-pill-tag">{skill.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deep-Dive Skill Domains Header & Carousel Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', margin: '28px 0 16px 0' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
              Deep-Dive Skill Domains
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Explore comprehensive tooling, frameworks, and database proficiencies
            </p>
          </div>

          {/* Carousel Slider Controls if items > 3 */}
          {skillsCategories.length > 3 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
              <span style={{ 
                fontFamily: 'ui-monospace, monospace', 
                fontSize: '0.86rem', 
                fontWeight: 700, 
                color: 'var(--text-secondary)',
                letterSpacing: '0.06em',
                background: 'var(--card-bg)',
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid var(--card-border)'
              }}>
                {String(skillsStartIndex + 1).padStart(2, '0')} - {String(Math.min(skillsStartIndex + 3, skillsCategories.length)).padStart(2, '0')} / {String(skillsCategories.length).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  type="button"
                  aria-label="Previous skill categories"
                  onClick={() => setSkillsStartIndex(prev => (prev > 0 ? prev - 1 : maxSkillsStart))}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                    e.currentTarget.style.color = 'var(--primary-color)';
                    e.currentTarget.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.85rem' }}></i>
                </button>
                <button 
                  type="button"
                  aria-label="Next skill categories"
                  onClick={() => setSkillsStartIndex(prev => (prev < maxSkillsStart ? prev + 1 : 0))}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    border: 'none',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: '0 4px 14px rgba(var(--primary-rgb), 0.35)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(var(--primary-rgb), 0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(var(--primary-rgb), 0.35)';
                  }}
                >
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.85rem' }}></i>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {visibleSkills.map(category => (
            <motion.div 
              key={category.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="tech-category-box"
            >
              <div className="tech-category-header">
                <div className="tech-category-icon-box">
                  <i className={category.icon}></i>
                </div>
                <h3 className="tech-category-title">{category.title}</h3>
              </div>
              <div className="tech-pills-row">
                {category.skills.map(skill => (
                  <span key={skill.name} className="tech-pill-badge">
                    <i className={skill.icon} style={{ color: skill.color || 'var(--primary-color)' }}></i> {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots Indicator if > 3 */}
        {skillsCategories.length > 3 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
            {Array.from({ length: maxSkillsStart + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Jump to skill set ${idx + 1}`}
                onClick={() => setSkillsStartIndex(idx)}
                style={{
                  width: skillsStartIndex === idx ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: skillsStartIndex === idx ? 'var(--primary-color)' : 'var(--card-border)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  padding: 0
                }}
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* Certifications Section */}
      <motion.section className="certifications" id="certifications"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
          <div>
            <span className="section-eyebrow" style={{ marginBottom: '8px' }}>// 03 &bull; VERIFIED CREDENTIALS</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>Certifications</h2>
            <div className="section-accent-bar" style={{ margin: '6px 0 12px 0' }}></div>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0, maxWidth: '640px' }}>
              Verified professional credentials, cloud specializations, and university coursework demonstrating practical technical proficiency.
            </p>
          </div>

          {/* Carousel Slider Controls if items > 3 */}
          {filteredCerts.length > 3 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
              <span style={{ 
                fontFamily: 'ui-monospace, monospace', 
                fontSize: '0.86rem', 
                fontWeight: 700, 
                color: 'var(--text-secondary)',
                letterSpacing: '0.06em',
                background: 'var(--card-bg)',
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid var(--card-border)'
              }}>
                {String(certStartIndex + 1).padStart(2, '0')} - {String(Math.min(certStartIndex + 3, filteredCerts.length)).padStart(2, '0')} / {String(filteredCerts.length).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  type="button"
                  aria-label="Previous certificates"
                  onClick={() => setCertStartIndex(prev => (prev > 0 ? prev - 1 : maxCertStart))}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                    e.currentTarget.style.color = 'var(--primary-color)';
                    e.currentTarget.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.85rem' }}></i>
                </button>
                <button 
                  type="button"
                  aria-label="Next certificates"
                  onClick={() => setCertStartIndex(prev => (prev < maxCertStart ? prev + 1 : 0))}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    border: 'none',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: '0 4px 14px rgba(var(--primary-rgb), 0.35)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(var(--primary-rgb), 0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(var(--primary-rgb), 0.35)';
                  }}
                >
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.85rem' }}></i>
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Certificate Category Filters */}
        <div className="cert-filters">
          <button 
            type="button"
            className={`cert-filter-btn ${certFilter === 'all' ? 'active' : ''}`}
            onClick={() => { setCertFilter('all'); setCertStartIndex(0); }}
          >
            <i className="fa-solid fa-layer-group"></i> All Credentials
            <span className="filter-count">7</span>
          </button>
          <button 
            type="button"
            className={`cert-filter-btn ${certFilter === 'qa' ? 'active' : ''}`}
            onClick={() => { setCertFilter('qa'); setCertStartIndex(0); }}
          >
            <i className="fa-solid fa-vial-circle-check"></i> QA & Testing
            <span className="filter-count">2</span>
          </button>
          <button 
            type="button"
            className={`cert-filter-btn ${certFilter === 'cloud' ? 'active' : ''}`}
            onClick={() => { setCertFilter('cloud'); setCertStartIndex(0); }}
          >
            <i className="fa-solid fa-cloud"></i> Cloud & Security
            <span className="filter-count">2</span>
          </button>
          <button 
            type="button"
            className={`cert-filter-btn ${certFilter === 'dev-ai' ? 'active' : ''}`}
            onClick={() => { setCertFilter('dev-ai'); setCertStartIndex(0); }}
          >
            <i className="fa-solid fa-laptop-code"></i> Engineering & AI
            <span className="filter-count">3</span>
          </button>
        </div>

        <div className="certs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', width: '100%', marginTop: '16px' }}>
          {visibleCerts.map(cert => (
            <motion.div 
              key={cert.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="cert-card glass-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="cert-badge"><i className={`fa-solid fa-${cert.badge}`}></i></div>
              <div className="cert-info">
                <div className="cert-issuer-wrap">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-category-badge">{cert.categoryLabel}</span>
                </div>
                {cert.department && (
                  <div className="cert-dept">{cert.department}</div>
                )}
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-meta-row">
                  <span className="cert-meta-item">
                    <i className="fa-regular fa-calendar" style={{ color: 'var(--primary-color)' }}></i> {cert.date}
                  </span>
                  <span className="cert-meta-item">
                    <i className="fa-solid fa-fingerprint" style={{ color: 'var(--primary-color)' }}></i> {cert.credId}
                  </span>
                </div>
                <p className="cert-desc">{cert.desc}</p>
                
                <div className="cert-tags">
                  {cert.skills.map(skill => (
                    <span key={skill} className="cert-tag">{skill}</span>
                  ))}
                </div>

                <div className="cert-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <button 
                    type="button"
                    onClick={() => setPreviewCert(cert)}
                    className="btn btn-primary"
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.82rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fa-solid fa-eye"></i> Quick Preview
                  </button>
                  <a href={cert.file} target="_blank" rel="noopener noreferrer" className="cert-verify-link">
                    PDF <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                  {cert.verifyUrl ? (
                    <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="cert-verify-ext" title="Verify directly on university portal">
                      Verify on UoM <i className="fa-solid fa-shield-check"></i>
                    </a>
                  ) : (
                    <span className="cert-verify-ext" style={{ cursor: 'default' }}>
                      <i className="fa-solid fa-shield-check" style={{ color: 'var(--primary-color)' }}></i> Verified
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots Indicator if > 3 */}
        {filteredCerts.length > 3 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
            {Array.from({ length: maxCertStart + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Jump to certificate set ${idx + 1}`}
                onClick={() => setCertStartIndex(idx)}
                style={{
                  width: certStartIndex === idx ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: certStartIndex === idx ? 'var(--primary-color)' : 'var(--card-border)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  padding: 0
                }}
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section className="projects" id="projects"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '90px 24px 80px' }}
      >
        {/* Header with Title and Slide Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '36px'
        }}>
          <div>
            <span className="section-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
              // 04 &bull; FEATURED ENGINEERING WORK
            </span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>
              Featured Projects
            </h2>
            <div className="section-accent-bar" style={{ margin: '6px 0 12px 0' }}></div>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0, maxWidth: '640px' }}>
              Production-grade systems and enterprise applications built with offline-first synchronization, ACID database persistence, and automated test coverage.
            </p>
          </div>

          {/* Slide Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              fontFamily: 'monospace',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              letterSpacing: '1px'
            }}>
              {String(projectSlideIndex + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => setProjectSlideIndex(prev => (prev - 1 + projectsData.length) % projectsData.length)}
              aria-label="Previous Project"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid #2a3756',
                background: theme === 'light' ? '#ffffff' : '#141c2e',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.06)' : '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-color)';
                e.currentTarget.style.transform = 'translateX(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme === 'light' ? '#cbd5e1' : '#2a3756';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={() => setProjectSlideIndex(prev => (prev + 1) % projectsData.length)}
              aria-label="Next Project"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid #2a3756',
                background: theme === 'light' ? '#ffffff' : '#141c2e',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.06)' : '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-color)';
                e.currentTarget.style.transform = 'translateX(2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme === 'light' ? '#cbd5e1' : '#2a3756';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Active Featured Project Card (Carousel Slide) */}
        <AnimatePresence mode="wait">
          {(() => {
            const currentProj = projectsData[projectSlideIndex];
            return (
              <motion.div
                key={currentProj.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="project-card glass-card"
                style={{
                  borderRadius: '20px',
                  border: theme === 'light' ? '1px solid #d4deee' : '1px solid #222d4f',
                  background: theme === 'light' ? '#ffffff' : '#111726',
                  overflow: 'hidden',
                  boxShadow: theme === 'light' ? '0 12px 35px rgba(0,0,0,0.06)' : '0 18px 45px rgba(0,0,0,0.45)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                  minHeight: '440px'
                }}
              >
                {/* Left Column: macOS Browser Mockup Frame & 3D Isometric View */}
                <div style={{
                  position: 'relative',
                  background: theme === 'light' ? '#0f172a' : '#080c14',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRight: theme === 'light' ? '1px solid #e2e8f0' : '1px solid #1e293b'
                }}>
                  {/* macOS Browser Window Header */}
                  <div className="browser-mockup-header">
                    <div className="browser-mockup-dots">
                      <span className="browser-dot browser-dot-red"></span>
                      <span className="browser-dot browser-dot-yellow"></span>
                      <span className="browser-dot browser-dot-green"></span>
                    </div>
                    <div className="browser-mockup-url-bar">
                      <i className="fa-solid fa-lock" style={{ fontSize: '0.62rem', color: '#10b981' }}></i>
                      <span>
                        {currentProj.id === 'ryzera' ? 'ryzera.internal/pos-sync' :
                         currentProj.id === 'ledgerly' ? 'ledgerly-mbcd.onrender.com' :
                         currentProj.id === 'careerflow' ? 'careerflow-app.onrender.com' :
                         'github.com/SithumManusha/robotic-sorting-system'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme === 'light' ? '#94a3b8' : '#64748b', fontSize: '0.72rem' }}>
                      <i className="fa-solid fa-shield-halved" title="SSL Secured"></i>
                      <i className="fa-solid fa-arrow-rotate-right" title="Live Sync Active"></i>
                    </div>
                  </div>

                  {/* Top Live Engineering Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '52px',
                    left: '16px',
                    zIndex: 3,
                    background: 'rgba(10, 15, 30, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: '#f8fafc',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                    {currentProj.id === 'robotic-sorting' ? 'Mechatronics & Embedded Architecture' : 'Enterprise Architecture'}
                  </div>

                  {/* Aspect Video Image Container */}
                  <div style={{
                    flex: 1,
                    width: '100%',
                    minHeight: '320px',
                    aspectRatio: '16 / 9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px 16px 40px 16px',
                    background: 'radial-gradient(circle at center, rgba(37,99,235,0.09) 0%, transparent 70%)'
                  }}>
                    <img
                      src={currentProj.image}
                      alt={currentProj.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '380px',
                        objectFit: 'contain',
                        borderRadius: '12px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>

                  {/* Feature Badges Overlay Bar at the bottom of media */}
                  <div style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '16px',
                    right: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '8px',
                    flexWrap: 'wrap',
                    zIndex: 3
                  }}>
                    {currentProj.featurePills.map((pill, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(10, 15, 30, 0.88)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(59, 130, 246, 0.35)',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: '#60a5fa',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          letterSpacing: '0.4px'
                        }}
                      >
                        <i className={pill.icon}></i> {pill.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Project Details & Action Buttons */}
                <div style={{
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px'
                }}>
                  <div>
                    {/* Category Eyebrow & Team Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: 'var(--primary-color)'
                      }}>
                        {currentProj.category}
                      </span>
                      {currentProj.teamBadge && (
                        <span className={`project-team-badge ${currentProj.teamBadge.type}`}>
                          <i className={currentProj.teamBadge.type === 'duo' ? "fa-solid fa-users" : "fa-solid fa-user"}></i>
                          {currentProj.teamBadge.label}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: '1.9rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '14px',
                      letterSpacing: '-0.5px'
                    }}>
                      {currentProj.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize: '0.96rem',
                      lineHeight: 1.68,
                      color: 'var(--text-secondary)',
                      marginBottom: '14px'
                    }}>
                      {currentProj.desc}
                    </p>

                    {/* My Direct Contributions Box (for group projects only) */}
                    {currentProj.myContributions && currentProj.myContributions.length > 0 && (
                      <div className="project-cv-highlights-box">
                        <div className="cv-highlights-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fa-solid fa-crown" style={{ color: '#10b981' }}></i>
                            <span>MY CORE SUBSYSTEM &amp; DIRECT CONTRIBUTIONS</span>
                          </div>
                          {currentProj.teamBadge?.role && (
                            <span className="cv-highlights-role-badge">
                              {currentProj.teamBadge.role}
                            </span>
                          )}
                        </div>
                        <ul className="cv-highlights-list">
                          {currentProj.myContributions.map((hl, hlIdx) => {
                            const colonIndex = hl.indexOf(':');
                            const hasPrefix = colonIndex !== -1;
                            const prefix = hasPrefix ? hl.slice(0, colonIndex + 1) : '';
                            const rest = hasPrefix ? hl.slice(colonIndex + 1) : hl;

                            return (
                              <li key={hlIdx} className="cv-highlight-item">
                                <i className="fa-solid fa-circle-check"></i>
                                <span>
                                  {hasPrefix && <strong style={{ color: 'var(--text-primary)', marginRight: '5px' }}>{prefix}</strong>}
                                  {rest}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '7px',
                      marginBottom: '20px'
                    }}>
                      {currentProj.tags.map(tag => (
                        <span
                          key={tag}
                          className="project-tag"
                          style={{
                            padding: '4px 11px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            borderRadius: '6px'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    paddingTop: '16px',
                    borderTop: theme === 'light' ? '1px solid #e2e8f0' : '1px solid #1e293b'
                  }}>
                    {currentProj.liveUrl && (
                      <a
                        href={currentProj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ padding: '9px 20px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                      </a>
                    )}

                    <a
                      href={currentProj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '9px 18px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <i className="fa-brands fa-github"></i> GitHub Repo
                    </a>

                    <button
                      onClick={() => setActiveProjectId(currentProj.detailsId)}
                      className="btn btn-secondary cursor-pointer"
                      style={{ padding: '9px 18px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <i className="fa-solid fa-circle-info"></i> Project Details
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Bottom Carousel Pill Dots Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginTop: '32px'
        }}>
          {projectsData.map((proj, idx) => {
            const isActive = idx === projectSlideIndex;
            return (
              <button
                key={proj.id}
                onClick={() => setProjectSlideIndex(idx)}
                aria-label={`Jump to project ${proj.title}`}
                style={{
                  width: isActive ? '34px' : '10px',
                  height: '8px',
                  borderRadius: '4px',
                  background: isActive ? 'var(--primary-color)' : (theme === 'light' ? '#cbd5e1' : '#26345d'),
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            );
          })}
        </div>
      </motion.section>

      {/* Leadership & Extracurricular Activities Section */}
      <motion.section 
        className="leadership-section" 
        id="leadership"
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1 }}
        style={{
          position: 'relative',
          padding: '90px 24px 80px',
          backgroundImage: theme === 'light'
            ? 'linear-gradient(rgba(0, 0, 0, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.035) 1px, transparent 1px)'
            : 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          flexWrap: 'wrap', 
          gap: '20px', 
          marginBottom: '28px', 
          maxWidth: '1200px', 
          margin: '0 auto 28px auto' 
        }}>
          <div>
            <span className="section-eyebrow" style={{ marginBottom: '8px' }}>// 05 &bull; COMMUNITY &amp; SERVICE</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>Leadership &amp; Extracurricular Activities</h2>
            <div className="section-accent-bar" style={{ margin: '6px 0 12px 0' }}></div>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0, maxWidth: '640px' }}>
              University organizing committees, volunteer initiatives, faculty media, and youth legal advocacy forums.
            </p>
          </div>

          {/* Carousel Slider Controls if items > 3 */}
          {leadershipActivities.length > 3 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
              <span style={{ 
                fontFamily: 'ui-monospace, monospace', 
                fontSize: '0.86rem', 
                fontWeight: 700, 
                color: 'var(--text-secondary)',
                letterSpacing: '0.06em',
                background: 'var(--card-bg)',
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid var(--card-border)'
              }}>
                {String(leadershipStartIndex + 1).padStart(2, '0')} - {String(Math.min(leadershipStartIndex + 3, leadershipActivities.length)).padStart(2, '0')} / {String(leadershipActivities.length).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  type="button"
                  aria-label="Previous leadership activities"
                  onClick={() => setLeadershipStartIndex(prev => (prev > 0 ? prev - 1 : maxLeadershipStart))}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                    e.currentTarget.style.color = 'var(--primary-color)';
                    e.currentTarget.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.85rem' }}></i>
                </button>
                <button 
                  type="button"
                  aria-label="Next leadership activities"
                  onClick={() => setLeadershipStartIndex(prev => (prev < maxLeadershipStart ? prev + 1 : 0))}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    border: 'none',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.06)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.4)';
                  }}
                >
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.85rem' }}></i>
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {visibleLeadership.map(org => (
            <motion.div 
              key={org.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ 
                padding: '28px 24px',
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: '18px',
                border: theme === 'light' ? '1px solid #d4deee' : '1px solid #222d4f',
                background: theme === 'light' ? '#ffffff' : '#13192e',
                position: 'relative',
                boxShadow: theme === 'light' 
                  ? '0 8px 24px rgba(79, 70, 229, 0.04)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(16px)'
              }}
            >
              {/* Card Header: Icon Box + Organization Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: theme === 'light' ? '#dee5f4' : '#18203b',
                  border: theme === 'light' ? '1px solid #cbd7eb' : '1px solid #26345d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme === 'light' ? '#4f46e5' : '#818cf8',
                  fontSize: '1.1rem',
                  flexShrink: 0
                }}>
                  <i className={org.icon}></i>
                </div>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.12rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.3px'
                }}>
                  {org.name}
                </h3>
              </div>

              {/* Vertical Timeline */}
              <div style={{ position: 'relative', paddingLeft: '24px', flex: 1 }}>
                {/* Connecting Line */}
                <div style={{
                  position: 'absolute',
                  left: '4px',
                  top: '10px',
                  bottom: org.roles.length > 1 ? '16px' : '10px',
                  width: '2px',
                  background: theme === 'light' ? '#cbd7eb' : '#26345d'
                }} />

                {org.roles.map((r, rIdx) => (
                  <div key={rIdx} style={{ position: 'relative', marginBottom: rIdx === org.roles.length - 1 ? '0' : '20px' }}>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute',
                      left: '-24px',
                      top: '5px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: r.active ? '#10b981' : (theme === 'light' ? '#cbd5e1' : '#52525b'),
                      boxShadow: r.active ? '0 0 10px rgba(16, 185, 129, 0.8)' : 'none',
                      border: r.active ? 'none' : '2px solid var(--card-bg)',
                      animation: r.active ? 'pulseGlow 2.5s infinite ease-in-out' : 'none'
                    }} />

                    {/* Role Title */}
                    <h4 style={{
                      margin: '0 0 4px 0',
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)'
                    }}>
                      {r.title}
                    </h4>

                    {/* Period / Term */}
                    <div style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      fontFamily: 'ui-monospace, monospace',
                      textTransform: 'uppercase',
                      color: theme === 'light' ? '#64748b' : '#71717a',
                      marginBottom: r.desc ? '6px' : '0'
                    }}>
                      {r.period}
                    </div>

                    {/* Description */}
                    {r.desc && (
                      <p style={{
                        margin: 0,
                        fontSize: '0.82rem',
                        lineHeight: 1.55,
                        color: 'var(--text-secondary)'
                      }}>
                        {r.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Event Volunteering / Initiatives Sub-Section */}
              {org.volunteering && (
                <div style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: theme === 'light' ? '1px dashed #cbd7eb' : '1px dashed #26345d'
                }}>
                  <div style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: 'var(--primary-color)',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '12px'
                  }}>
                    <i className="fa-regular fa-calendar"></i> {org.volunteering.title}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {org.volunteering.items.map((item, itemIdx) => (
                      <span key={itemIdx} style={{
                        fontSize: '0.74rem',
                        fontWeight: 500,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: theme === 'light' ? '#dee5f4' : '#18203b',
                        border: theme === 'light' ? '1px solid #cbd7eb' : '1px solid #26345d',
                        color: theme === 'light' ? '#334155' : '#cbd5e1',
                        letterSpacing: '0.2px',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section className="contact" id="contact"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      >
        <div className="section-header-editorial">
          <span className="section-eyebrow">// 06 &bull; GET IN TOUCH</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have an internship opportunity, project collaboration, or engineering discussion? Feel free to reach out directly.</p>
          <div className="section-accent-bar"></div>
        </div>
        
        <div className="contact-container">
          <div className="contact-info">
            {/* 1-Click Interactive Copy Email Card */}
            <div 
              className="contact-card glass-card copy-email-card"
              onClick={() => {
                navigator.clipboard.writeText('appuhamysithum@gmail.com');
                showToast('Email copied to clipboard! Ready to paste ✉️', 'success');
              }}
              style={{ cursor: 'pointer' }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-icon"><i className="fa-solid fa-copy"></i></div>
              <div className="contact-details" style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <h4>Email Me</h4>
                  <span className="copy-badge-pill"><i className="fa-regular fa-clipboard"></i> 1-Click Copy</span>
                </div>
                <p style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.92rem' }}>
                  appuhamysithum@gmail.com
                </p>
              </div>
            </div>
            {/* Direct WhatsApp Chat Card */}
            <div 
              className="contact-card glass-card whatsapp-chat-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-icon" style={{ color: '#25d366', background: 'rgba(37, 211, 102, 0.12)', border: '1px solid rgba(37, 211, 102, 0.25)' }}>
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="contact-details" style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <h4>WhatsApp Chat</h4>
                  <span className="gmt-status-badge">
                    <span className="gmt-status-dot"></span> Available
                  </span>
                </div>
                <p style={{ margin: '3px 0 10px 0', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  Instant messaging &amp; opportunity discussions
                </p>
                <a 
                  href="https://wa.me/94775520570?text=Hi%20Sithum%2C%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn whatsapp-btn-pulse"
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    borderRadius: '8px',
                    textDecoration: 'none'
                  }}
                >
                  <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Location & Timezone Card */}
            <div 
              className="contact-card glass-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div className="contact-details" style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                  <h4>Location &amp; Timezone</h4>
                  <span className="gmt-status-badge">
                    <span className="gmt-status-dot"></span> GMT +5:30 (Sri Lanka)
                  </span>
                </div>
                <p style={{ margin: '3px 0 0 0', fontWeight: 600, color: 'var(--text-primary)' }}>Moratuwa, Sri Lanka</p>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Open for On-site, Hybrid &amp; Remote Software Engineering &amp; QA roles
                </p>
              </div>
            </div>

            {/* Phone Call Card */}
            <div 
              className="contact-card glass-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-icon"><i className="fa-solid fa-phone"></i></div>
              <div className="contact-details">
                <h4>Call Me</h4>
                <p><a href="tel:+94775520570" onClick={() => showToast('Launching dialer... 📞', 'info')}>+94 77 552 0570</a></p>
              </div>
            </div>

            {/* Social Links Card */}
            <div 
              className="contact-card glass-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="contact-icon"><i className="fa-solid fa-share-nodes"></i></div>
              <div className="contact-details">
                <h4>Online Profiles</h4>
                <div className="social-links" style={{ marginTop: '6px' }}>
                  <a href="https://linkedin.com/in/sithum-manusha" target="_blank" rel="noopener noreferrer" className="social-btn linkedin" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="https://github.com/SithumManusha" target="_blank" rel="noopener noreferrer" className="social-btn github" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                  <a href="https://medium.com/@sithummanusha" target="_blank" rel="noopener noreferrer" className="social-btn medium" aria-label="Medium"><i className="fa-brands fa-medium"></i></a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper glass-card">
            <form className="contact-form" id="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" name="name" id="name" className="form-control" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input type="email" name="email" id="email" className="form-control" placeholder="name@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" className="form-control" placeholder="Hi, let's connect..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Floating Back-to-Top Button */}
      {scrollProgress > 10 && (
        <button
          onClick={handleBackToTop}
          id="back-to-top"
          aria-label="Back to Top"
          style={{
            position: 'fixed', bottom: '32px', right: '32px', zIndex: 999,
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'var(--primary-color)', color: '#fff',
            border: 'none', cursor: 'pointer', fontSize: '1.1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(var(--primary-rgb), 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}

      {/* Footer Section */}
      <footer className="footer" style={{ 
        position: 'relative', 
        padding: '42px 0 32px 0', 
        marginTop: '70px',
        background: theme === 'light' ? '#ebf0f9' : '#0c1020',
        borderTop: theme === 'light' ? '1px solid #d4deee' : '1px solid #222d4f',
        textAlign: 'center'
      }}>
        {/* Subtle Top Accent Highlight Line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          maxWidth: '450px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.5), transparent)'
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
          
          {/* GitHub and LinkedIn Logos with Distinct Vibrant Accent Colors */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <a 
              href="https://linkedin.com/in/sithum-manusha" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: theme === 'light' ? 'rgba(10, 102, 194, 0.12)' : 'rgba(10, 102, 194, 0.2)',
                border: '1px solid rgba(10, 102, 194, 0.45)',
                color: theme === 'light' ? '#0a66c2' : '#38bdf8',
                fontSize: '1.2rem',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 10px rgba(10, 102, 194, 0.25)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
                e.currentTarget.style.background = '#0a66c2';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(10, 102, 194, 0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = theme === 'light' ? 'rgba(10, 102, 194, 0.12)' : 'rgba(10, 102, 194, 0.2)';
                e.currentTarget.style.color = theme === 'light' ? '#0a66c2' : '#38bdf8';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(10, 102, 194, 0.25)';
              }}
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

            <a 
              href="https://github.com/SithumManusha" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.12)' : 'rgba(var(--primary-rgb), 0.2)',
                border: '1px solid rgba(var(--primary-rgb), 0.45)',
                color: 'var(--primary-color)',
                fontSize: '1.2rem',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 10px rgba(var(--primary-rgb), 0.25)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
                e.currentTarget.style.background = '#10b981';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = theme === 'light' ? 'rgba(var(--primary-rgb), 0.12)' : 'rgba(var(--primary-rgb), 0.2)';
                e.currentTarget.style.color = theme === 'light' ? '#059669' : '#34d399';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(var(--primary-rgb), 0.25)';
              }}
            >
              <i className="fa-brands fa-github"></i>
            </a>

            <a 
              href="https://medium.com/@sithummanusha" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Medium"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: theme === 'light' ? 'rgba(0, 171, 108, 0.12)' : 'rgba(0, 171, 108, 0.2)',
                border: '1px solid rgba(0, 171, 108, 0.45)',
                color: theme === 'light' ? '#00ab6c' : '#34d399',
                fontSize: '1.2rem',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 10px rgba(0, 171, 108, 0.25)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
                e.currentTarget.style.background = '#00ab6c';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 171, 108, 0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = theme === 'light' ? 'rgba(0, 171, 108, 0.12)' : 'rgba(0, 171, 108, 0.2)';
                e.currentTarget.style.color = theme === 'light' ? '#00ab6c' : '#34d399';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 171, 108, 0.25)';
              }}
            >
              <i className="fa-brands fa-medium"></i>
            </a>
          </div>

          {/* Copyright Line with Highlighted Name */}
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            &copy; {new Date().getFullYear()} <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Sithum Manusha</strong>. All Rights Reserved.
          </p>

        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        id="back-to-top" 
        className={showBackToTop ? 'show' : ''} 
        aria-label="Back to top"
        onClick={handleBackToTop}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      {/* ==========================================
           PROJECT DETAIL MODAL
           ========================================== */}
      <AnimatePresence>
      {activeProjectId && (() => {
        const project = projectDetailsData[activeProjectId];
        if (!project) return null;
        return (
          <motion.div
            className="project-modal active" id="project-modal"
            onClick={(e) => e.target === e.currentTarget && setActiveProjectId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="project-modal-content glass-card"
              style={{ maxWidth: '820px' }}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button className="project-modal-close" id="project-modal-close" onClick={() => setActiveProjectId(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="project-modal-body" id="project-modal-body">
                {activeProjectId === 'careerflow' ? (
                  <>
                    {/* Header: Title, Subtitle, and Quick Links */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                      <div style={{ flex: '1 1 360px' }}>
                        <h3 className="modal-project-title" style={{ margin: '0 0 6px 0', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          CareerFlow Enterprise
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--primary-color)', fontWeight: 600, lineHeight: 1.4 }}>
                          Distributed ATS Talent Pipeline, Scikit-learn NLP Engine &amp; AI Mock Interview Studio
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <a href="https://careerflow-app.onrender.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                          <i className="fa-solid fa-rocket" style={{ marginRight: '6px' }}></i> Live Demo
                        </a>
                        <a href="https://github.com/SithumManusha/careerflow" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                          <i className="fa-brands fa-github" style={{ marginRight: '6px' }}></i> Source Code
                        </a>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                      {[
                        "Java 21",
                        "Spring Boot 3.3.4",
                        "Python 3.12",
                        "FastAPI",
                        "Next.js 14 (App Router)",
                        "PostgreSQL (Neon)",
                        "Scikit-learn (TF-IDF & Cosine)",
                        "Docker & Compose",
                        "Render Cloud",
                        "Playwright (E2E)",
                        "JUnit 5",
                        "Pytest",
                        "OpenAPI / Swagger 3.0"
                      ].map(tech => (
                        <span key={tech} style={{ 
                          fontSize: '0.8rem', 
                          background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.1)' : 'rgba(var(--primary-rgb), 0.08)', 
                          border: theme === 'light' ? '1px solid rgba(var(--primary-rgb), 0.35)' : '1px solid rgba(var(--primary-rgb), 0.25)', 
                          color: 'var(--text-primary)', 
                          padding: '4px 12px', 
                          borderRadius: '20px', 
                          fontWeight: 600 
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '20px 0' }} />

                    {/* Architecture & Overview */}
                    <h4 style={{ margin: '0 0 14px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-solid fa-layer-group" style={{ color: 'var(--primary-color)' }}></i> Architecture &amp; System Design
                    </h4>
                    <div style={{ 
                      background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.04)' : 'rgba(15, 23, 42, 0.75)',
                      border: theme === 'light' ? '1px solid rgba(var(--primary-rgb), 0.2)' : '1px solid rgba(99, 102, 241, 0.25)',
                      borderLeft: '4px solid #38bdf8',
                      borderRadius: '12px',
                      padding: '20px 24px',
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '14px', 
                      fontSize: '0.95rem', 
                      lineHeight: 1.72, 
                      color: theme === 'light' ? '#334155' : '#e2e8f0',
                      marginBottom: '22px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}>
                      <p style={{ margin: 0 }}>
                        Candidate rejection in technical recruitment frequently stems from automated Applicant Tracking Systems (ATS) filtering out resumes before human recruiters even see them. To solve this, I designed <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>CareerFlow Enterprise</strong>—a decoupled cloud-native microservices platform providing instant, transparent ATS resume scoring, automated Google XYZ bullet point rewriting, and 5-round tailored technical mock interview simulations.
                      </p>
                      <p style={{ margin: 0 }}>
                        The core backend is powered by <strong style={{ color: theme === 'light' ? 'var(--primary-color)' : '#38bdf8', fontWeight: 700 }}>Java 21 and Spring Boot 3.3.4</strong>, optimized for low memory overhead (~48MB RAM) with a token-bucket sliding-window rate limiter (10 req/min per IP), OpenAPI 3.0 Swagger documentation, and connection pooling to serverless <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>PostgreSQL (Neon)</strong>.
                      </p>
                      <p style={{ margin: 0 }}>
                        Complex natural language processing is delegated to an asynchronous <strong style={{ color: theme === 'light' ? 'var(--primary-color)' : '#38bdf8', fontWeight: 700 }}>Python 3.12 FastAPI</strong> microservice using <code style={{ background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.1)' : 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.84rem', fontFamily: 'monospace', color: theme === 'light' ? '#059669' : '#a7f3d0' }}>Scikit-learn</code> for TF-IDF vectorization and Cosine Similarity, while the user interface is built on <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>Next.js 14 (App Router) and Tailwind CSS</strong> with real-time A4 height overflow detection. The entire system is validated by <strong style={{ color: theme === 'light' ? 'var(--primary-color)' : '#38bdf8', fontWeight: 700 }}>26 automated tests (JUnit 5, Pytest, Playwright)</strong> and deployed 24/7 on Render Cloud.
                      </p>
                    </div>

                    {/* Key Capabilities */}
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--primary-color)' }}></i> Key Capabilities
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { icon: "🎯", title: "Dual-Scoring ATS Engine", desc: "Instant Job Match % via Scikit-learn TF-IDF & Cosine Similarity + ATS Format Health score" },
                        { icon: "📝", title: "1-Page Smart A4 CV Builder", desc: "Taleo-safe single column layout with real-time height overflow guard & Google XYZ rewriter" },
                        { icon: "🤖", title: "5-Round AI Technical Mock Interview", desc: "JVM internals, distributed architecture, database tuning, resilience, and STAR behavioral with scoring" },
                        { icon: "🛡️", title: "Core Java 21 Gateway & Rate Limiter", desc: "Spring Boot 3 with token-bucket sliding-window rate limiting (10 req/min) & Swagger UI docs" },
                        { icon: "🗄️", title: "Cloud Database Persistence", desc: "Automated candidate account authentication, historical scan records, and cloud CV draft storage on PostgreSQL" },
                        { icon: "🧪", title: "100% Automated Test Coverage", desc: "26 unit, integration, and E2E browser tests across JUnit 5, Pytest, and Playwright" }
                      ].map((cap, capIdx) => (
                        <div key={capIdx} style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '12px', 
                          background: theme === 'light' ? 'rgba(16, 185, 129, 0.04)' : 'rgba(255, 255, 255, 0.02)', 
                          border: theme === 'light' ? '1px solid rgba(var(--primary-rgb), 0.2)' : '1px solid var(--card-border)', 
                          borderRadius: '10px', 
                          padding: '12px 16px' 
                        }}>
                          <span style={{ fontSize: '1.25rem', lineHeight: 1, marginTop: '2px', flexShrink: 0 }}>{cap.icon}</span>
                          <div style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                            <strong style={{ color: 'var(--text-primary)', marginRight: '6px' }}>{cap.title}:</strong>
                            {cap.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : activeProjectId === 'ledgerly' ? (
                  <>
                    {/* Header: Title, Subtitle, and Quick Links */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                      <div style={{ flex: '1 1 360px' }}>
                        <h3 className="modal-project-title" style={{ margin: '0 0 6px 0', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          Ledgerly
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--primary-color)', fontWeight: 600, lineHeight: 1.4 }}>
                          Autonomous AI Financial Intelligence &amp; Real-Time Collaborative Ledger
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <a href="https://ledgerly-mbcd.onrender.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                          <i className="fa-solid fa-rocket" style={{ marginRight: '6px' }}></i> Live Demo
                        </a>
                        <a href="https://github.com/SithumManusha/Ledgerly" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                          <i className="fa-brands fa-github" style={{ marginRight: '6px' }}></i> Source Code
                        </a>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                      {[
                        "React 19",
                        "TypeScript",
                        "tRPC 11",
                        "Tailwind CSS",
                        "Node.js",
                        "Express.js",
                        "PostgreSQL",
                        "Server-Sent Events (SSE)",
                        "Recharts",
                        "Vitest (68 Tests)",
                        "PDFKit",
                        "Render Cloud"
                      ].map(tech => (
                        <span key={tech} style={{ 
                          fontSize: '0.8rem', 
                          background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.1)' : 'rgba(var(--primary-rgb), 0.08)', 
                          border: theme === 'light' ? '1px solid rgba(var(--primary-rgb), 0.35)' : '1px solid rgba(var(--primary-rgb), 0.25)', 
                          color: 'var(--text-primary)', 
                          padding: '4px 12px', 
                          borderRadius: '20px', 
                          fontWeight: 600 
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '20px 0' }} />

                    {/* Architecture & Overview */}
                    <h4 style={{ margin: '0 0 14px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-solid fa-layer-group" style={{ color: 'var(--primary-color)' }}></i> Architecture &amp; System Overview
                    </h4>
                    <div style={{ 
                      background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.04)' : 'rgba(15, 23, 42, 0.75)',
                      border: theme === 'light' ? '1px solid rgba(var(--primary-rgb), 0.2)' : '1px solid rgba(99, 102, 241, 0.25)',
                      borderLeft: '4px solid #38bdf8',
                      borderRadius: '12px',
                      padding: '20px 24px',
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '14px', 
                      fontSize: '0.95rem', 
                      lineHeight: 1.72, 
                      color: theme === 'light' ? '#334155' : '#e2e8f0',
                      marginBottom: '22px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}>
                      <p style={{ margin: 0 }}>
                        Managing personal budgets and splitting expenses across roommates or group trips often results in tangled debts, uneven payments, and messy spreadsheet calculation errors. My goal was to build <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>Ledgerly</strong>—an enterprise-grade financial intelligence platform and collaborative ledger that acts as an autonomous financial advisor and automated accountant in your pocket.
                      </p>
                      <p style={{ margin: 0 }}>
                        Beyond basic CRUD bookkeeping, Ledgerly integrates an <strong style={{ color: theme === 'light' ? 'var(--primary-color)' : '#38bdf8', fontWeight: 700 }}>Autonomous AI Financial Copilot</strong> evaluating composite financial health (0–100 score, A+ to D grade) and alerting users to category spending velocity spikes (&gt;25% surge). An interactive <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>"What-If" Financial Runway Simulator</strong> stress-tests discretionary spending cuts and capital purchases with comparative 6-month Recharts cash-flow trajectories.
                      </p>
                      <p style={{ margin: 0 }}>
                        For shared households and trips, Ledgerly pairs mathematical debt-minimization algorithms supporting <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>4 distinct split models (Equal, Percentage, Exact, and Occupancy Days)</strong> with a <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>real-time Server-Sent Events (SSE) notification bell and live chronological activity audit stream</strong>. Storing data securely in <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>PostgreSQL with Drizzle ORM</strong> and fortified by <strong style={{ color: theme === 'light' ? 'var(--primary-color)' : '#38bdf8', fontWeight: 700 }}>68 automated Vitest unit/integration tests</strong>, this project exemplifies production-ready, bank-grade financial engineering balancing complex algorithms with an intuitive user experience.
                      </p>
                    </div>

                    {/* Key Capabilities */}
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--primary-color)' }}></i> Key Capabilities
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                      {[
                        { icon: "🧠", title: "Autonomous AI Copilot & Anomaly Alerts", desc: "Proprietary 0–100 health scoring, letter grades (A+ to D), and spending velocity anomaly alerts (>25% surge)" },
                        { icon: "🎛️", title: "Interactive 'What-If' Runway Simulator", desc: "Dynamic sliders for discretionary spend cuts, capital outlay impacts, and 6-month projected comparative Recharts curves" },
                        { icon: "🔔", title: "Real-Time Notification Bell & SSE Push", desc: "Global reactive notification center in header pushing live anomaly flags, budget breach warnings, and debt alerts" },
                        { icon: "📜", title: "Live Activity Audit Stream & Shared Ledger", desc: "Immutable chronological collaborative audit timeline synchronizing group splits and payment proof slips in real-time" },
                        { icon: "🧮", title: "Mathematical Debt-Minimization", desc: "Across 4 split models (Equal, Percentage, Exact, and Occupancy Days) settling group debts with minimum cash transfers" },
                        { icon: "📄", title: "Instant In-Memory PDF Settlement Statements", desc: "Streamed dynamically via backend PDFKit with dynamic currency formatting" },
                        { icon: "🔒", title: "Enterprise-Grade Security", desc: "With Bcryptjs hashing (12 rounds), signed HTTP-only cookies, and PostgreSQL relational data isolation" },
                        { icon: "🧪", title: "Production-Grade Test Automation", desc: "With 68 passing Vitest unit/integration tests and CI/CD automated deployment on Render Cloud" }
                      ].map((cap, capIdx) => (
                        <div key={capIdx} style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '14px', 
                          background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.04)' : 'rgba(255, 255, 255, 0.045)', 
                          border: theme === 'light' ? '1px solid rgba(var(--primary-rgb), 0.18)' : '1px solid rgba(255, 255, 255, 0.08)', 
                          borderRadius: '12px', 
                          padding: '13px 18px',
                          boxShadow: theme === 'light' ? '0 1px 3px rgba(0,0,0,0.02)' : '0 2px 5px rgba(0,0,0,0.15)'
                        }}>
                          <div style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '8px',
                            background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.1)' : 'rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            flexShrink: 0
                          }}>
                            {cap.icon}
                          </div>
                          <div style={{ fontSize: '0.91rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
                            <strong style={{ color: 'var(--text-primary)', marginRight: '6px', fontSize: '0.94rem' }}>{cap.title}:</strong>
                            {cap.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : activeProjectId === 'robotic-sorting' ? (
                  <>
                    {/* Header: Title, Subtitle, and Quick Links */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                      <div style={{ flex: '1 1 360px' }}>
                        <h3 className="modal-project-title" style={{ margin: '0 0 6px 0', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          Automated Robotic Sorting System
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--primary-color)', fontWeight: 600, lineHeight: 1.4 }}>
                          Dual-Microcontroller Mechatronic Platform, 4-DOF Articulated Arm &amp; RFID Conveyor
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <a href="https://github.com/SithumManusha/robotic-sorting-system" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                          <i className="fa-brands fa-github" style={{ marginRight: '6px' }}></i> Source Code
                        </a>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                      {[
                        "Embedded C++",
                        "Arduino Mega 2560",
                        "Arduino Uno",
                        "UART Serial Bus (9600 Baud)",
                        "NEMA 17 Stepper Motors",
                        "28BYJ-48 Stepper & ULN2003",
                        "A4988 Stepper Drivers",
                        "MFRC522 RFID (SPI)",
                        "HC-SR04 Ultrasonic Sensors",
                        "TowerPro MG995 Servos",
                        "16x2 I2C LCD Display",
                        "EasyEDA PCB Design"
                      ].map(tech => (
                        <span key={tech} style={{ 
                          fontSize: '0.8rem', 
                          background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.1)' : 'rgba(var(--primary-rgb), 0.08)', 
                          border: theme === 'light' ? '1px solid rgba(var(--primary-rgb), 0.35)' : '1px solid rgba(var(--primary-rgb), 0.25)', 
                          color: 'var(--text-primary)', 
                          padding: '4px 12px', 
                          borderRadius: '20px', 
                          fontWeight: 600 
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '20px 0' }} />

                    {/* Architecture & Overview */}
                    <h4 style={{ margin: '0 0 14px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-solid fa-layer-group" style={{ color: 'var(--primary-color)' }}></i> Architecture &amp; System Overview
                    </h4>
                    <div style={{ 
                      background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.04)' : 'rgba(15, 23, 42, 0.75)',
                      border: theme === 'light' ? '1px solid rgba(var(--primary-rgb), 0.2)' : '1px solid rgba(99, 102, 241, 0.25)',
                      borderLeft: '4px solid #38bdf8',
                      borderRadius: '12px',
                      padding: '20px 24px',
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '14px', 
                      fontSize: '0.95rem', 
                      lineHeight: 1.72, 
                      color: theme === 'light' ? '#334155' : '#e2e8f0',
                      marginBottom: '18px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}>
                      <p style={{ margin: 0 }}>
                        Modern automated sorting warehouses and logistics centers require continuous, high-speed routing of parcels without bottlenecks or kinematic stalling. Single-microcontroller designs suffer from severe timing conflicts when attempting to calculate real-time multi-joint trigonometric trajectories while concurrently executing non-blocking stepper pulse routines, polling high-frequency RFID transponders, and calculating ultrasonic echo timings.
                      </p>
                      <p style={{ margin: 0 }}>
                        To eliminate these concurrency bottlenecks, we architected a <strong style={{ color: theme === 'light' ? 'var(--primary-color)' : '#38bdf8', fontWeight: 700 }}>distributed dual-microcontroller embedded platform</strong>. An <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>Arduino Uno</strong> operates as the slave kinematics engine dedicated to computing 4-DOF pick-and-place trajectories, homing sequences with physical microswitch endstops, and step-accurate gripper actuation. An <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>Arduino Mega 2560</strong> serves as the master conveyor controller, coordinating A4988 high-torque stepper transport, SPI-based MFRC522 RFID item classification, 3x MG995 diverter flaps, and real-time ultrasonic bin overflow protection.
                      </p>
                    </div>

                    {/* My Key Contributions Card */}
                    <div style={{
                      background: theme === 'light' ? 'rgba(16, 185, 129, 0.04)' : 'rgba(16, 185, 129, 0.03)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '14px',
                      padding: '20px 22px',
                      marginBottom: '22px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '14px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid rgba(16, 185, 129, 0.2)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontWeight: 800,
                          fontSize: '0.94rem',
                          color: '#10b981',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase'
                        }}>
                          <i className="fa-solid fa-crown"></i>
                          <span>My Core Subsystem &amp; Direct Architectural Ownership</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                          Lead Mechatronics, Firmware &amp; Circuit Engineer
                        </span>
                      </div>

                      {/* Team Context Scope */}
                      <div style={{
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        color: 'var(--text-secondary)',
                        background: theme === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        marginBottom: '14px'
                      }}>
                        <strong style={{ color: 'var(--text-primary)' }}>👥 Group Scope (5-Member Team — Microbotics, Group 17, University of Moratuwa):</strong> While the broader team engineered the structural conveyor chassis, RFID identification, and servo diverter gates, I personally owned and engineered the end-effector gripper mechatronics, C++ kinematics step calibration, custom PCB circuit, and the dual-MCU UART communication bridge.
                      </div>

                      <ul className="duo-scope-list" style={{ gap: '12px' }}>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Two-Finger Mechanical Gripper Design:</strong> Evaluated two-finger, three-finger, and suction designs; selected and engineered a two-finger mechanical gripper driven by a <strong>28BYJ-48 stepper motor</strong> for lightweight arm payload balance and precise angular step resolution.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Stepper Motor Interfacing &amp; Power Drive:</strong> Interfaced gripper mechanism with 28BYJ-48 stepper motor and <strong>ULN2003 driver module</strong> to achieve smooth motion, isolate inductive back-EMF, and deliver calibrated holding torque.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Precision C++ Firmware Calibration (<code>openGripper()</code> / <code>closeGripper()</code>):</strong> Programmed Arduino C++ stepper routines, meticulously calibrating step counts and motor speeds across varying object dimensions and surface textures to achieve <strong>98% pick-and-place precision</strong> without slipping or crushing.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Conveyor Belt Mechanical Assembly:</strong> Designed and assembled structural conveyor frame, aligned rollers and pulleys, calibrated belt tension to eliminate slipping or stalling under continuous transport load, and aligned drive motor.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Multi-Stage Kinematics &amp; Timing Synchronization:</strong> Independently bench-tested gripper kinematics, then synchronized drop timing with continuous conveyor transport to ensure smooth hand-off to the RFID classification stage.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Custom Single-Layer PCB Design (EasyEDA):</strong> Engineered custom PCB layout with <strong>1mm track/clearance specifications</strong>, decoupling motor back-EMF and preventing microcontroller logic resets from high stall currents.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Dual-Microcontroller Distributed Architecture:</strong> Implemented a non-blocking asynchronous <strong>UART serial protocol (9600 baud)</strong> linking the Arduino Uno kinematics slave with the Arduino Mega 2560 conveyor master.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Key Capabilities */}
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--primary-color)' }}></i> Key Technical Capabilities
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { icon: "🦾", title: "4-DOF Articulated Robotic Arm", desc: "Kinematics trajectory control with SPDT microswitch origin homing and 98% repeatable pick-and-place precision" },
                        { icon: "🔄", title: "Dual-MCU Asynchronous UART Bus", desc: "Non-blocking event dispatch between Uno kinematics engine and Mega conveyor manager at 9600 baud" },
                        { icon: "🏷️", title: "MFRC522 Non-Contact RFID Sorting", desc: "Sub-50ms UID classification dynamically routing tagged components into 3 designated output compartments" },
                        { icon: "🚪", title: "High-Torque Diverter Servo Gates", desc: "TowerPro MG995 servos executing 90-degree mechanical deflections to channel parts reliably" },
                        { icon: "📡", title: "Closed-Loop Ultrasonic Bin Safety", desc: "3x HC-SR04 depth transceivers with 8.0 cm detection threshold, triggering 16x2 I2C LCD alerts and piezo audio alarms" },
                        { icon: "⚡", title: "Custom PCB & Power Distribution", desc: "Designed in EasyEDA with 1mm track/clearance specs, isolating stepper back-EMF and high-current noise spikes" }
                      ].map((cap, capIdx) => (
                        <div key={capIdx} style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '12px', 
                          background: theme === 'light' ? 'rgba(16, 185, 129, 0.04)' : 'rgba(255, 255, 255, 0.02)', 
                          border: theme === 'light' ? '1px solid rgba(var(--primary-rgb), 0.2)' : '1px solid var(--card-border)', 
                          borderRadius: '10px', 
                          padding: '12px 16px' 
                        }}>
                          <span style={{ fontSize: '1.25rem', lineHeight: 1, marginTop: '2px', flexShrink: 0 }}>{cap.icon}</span>
                          <div style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                            <strong style={{ color: 'var(--text-primary)', marginRight: '6px' }}>{cap.title}:</strong>
                            {cap.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Header: Title, Subtitle, and Quick Links */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                      <div style={{ flex: '1 1 360px' }}>
                        <h3 className="modal-project-title" style={{ margin: '0 0 6px 0', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          Ryzera POS
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.98rem', color: theme === 'light' ? '#0284c7' : '#38bdf8', fontWeight: 600, lineHeight: 1.4 }}>
                          Enterprise-grade, multi-branch supermarket POS &amp; retail ERP platform with offline-first distributed synchronization.
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                            <i className="fa-brands fa-github" style={{ marginRight: '6px' }}></i> Source Code
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                      {[
                        "Next.js 16",
                        "React 19",
                        "TypeScript",
                        "Tailwind CSS",
                        "NestJS",
                        "PostgreSQL (Supabase)",
                        "Prisma ORM",
                        "Socket.io WebSockets",
                        "IndexedDB"
                      ].map(tech => (
                        <span key={tech} style={{ 
                          fontSize: '0.8rem', 
                          background: theme === 'light' ? 'rgba(2, 132, 199, 0.1)' : 'rgba(56, 189, 248, 0.08)', 
                          border: theme === 'light' ? '1px solid rgba(2, 132, 199, 0.35)' : '1px solid rgba(56, 189, 248, 0.25)', 
                          color: 'var(--text-primary)', 
                          padding: '4px 12px', 
                          borderRadius: '20px', 
                          fontWeight: 600 
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '20px 0' }} />

                    {/* Architecture & Overview */}
                    <h4 style={{ margin: '0 0 14px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-solid fa-layer-group" style={{ color: theme === 'light' ? '#0284c7' : '#38bdf8' }}></i> Architecture &amp; Overview
                    </h4>
                    <div style={{ 
                      background: theme === 'light' ? 'rgba(var(--primary-rgb), 0.04)' : 'rgba(15, 23, 42, 0.75)',
                      border: theme === 'light' ? '1px solid rgba(var(--primary-rgb), 0.2)' : '1px solid rgba(99, 102, 241, 0.25)',
                      borderLeft: '4px solid #38bdf8',
                      borderRadius: '12px',
                      padding: '20px 24px',
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '14px', 
                      fontSize: '0.95rem', 
                      lineHeight: 1.72, 
                      color: theme === 'light' ? '#334155' : '#e2e8f0',
                      marginBottom: '18px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}>
                      <p style={{ margin: 0 }}>
                        Modern retail supermarket chains operating across geographically dispersed branches demand high availability, synchronized inventory, and continuous checkout reliability. However, unexpected internet blackouts, network drops, and power cuts frequently paralyze traditional cloud POS counters, causing stranded queues and direct financial losses. Furthermore, naive offline billing systems trigger destructive version collisions upon reconnection—resulting in phantom inventory, inaccurate accounting, and compliance failures. <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>Ryzera POS</strong> was engineered as a full-stack, multi-branch enterprise retail platform that unifies point-of-sale billing, centralized inventory management, role-based governance, and an autonomous offline-first synchronization backbone.
                      </p>
                      <p style={{ margin: 0 }}>
                        To bring this enterprise platform to life, we architected an end-to-end type-safe distributed stack: <strong style={{ color: theme === 'light' ? 'var(--primary-color)' : '#38bdf8', fontWeight: 700 }}>Next.js 16 (App Router), React 19, and Tailwind CSS</strong> for a modular, high-performance UI suite, communicating with a scalable <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>NestJS</strong> backend and an AWS Singapore <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>Supabase PostgreSQL</strong> cluster managed via <strong style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>Prisma ORM</strong>. The platform bridges four mission-critical retail domains: high-speed cashier checkout with barcode scanning, branch-level stock tracking and replenishment, granular Role-Based Access Control (Admin, Branch Manager, Cashier), and dynamic business intelligence reporting.
                      </p>
                    </div>

                    {/* My Key Contributions Card */}
                    <div style={{
                      background: theme === 'light' ? 'rgba(16, 185, 129, 0.04)' : 'rgba(16, 185, 129, 0.03)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '14px',
                      padding: '20px 22px',
                      marginBottom: '22px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '14px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid rgba(16, 185, 129, 0.2)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontWeight: 800,
                          fontSize: '0.94rem',
                          color: '#10b981',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase'
                        }}>
                          <i className="fa-solid fa-crown"></i>
                          <span>My Core Subsystem &amp; Direct Architectural Ownership</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                          Lead Backend, Data &amp; Offline Sync Architect
                        </span>
                      </div>

                      {/* Team Context Scope */}
                      <div style={{
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        color: 'var(--text-secondary)',
                        background: theme === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        marginBottom: '14px'
                      }}>
                        <strong style={{ color: 'var(--text-primary)' }}>👥 Group Scope (4-Member Team):</strong> While the overall engineering team focused on cashier checkout screens, multi-branch product cataloging, and store-level revenue reporting, I personally architected and engineered the offline-first distributed synchronization engine, 3-way conflict resolution engine, real-time edge telemetry, and zero-trust device management console.
                      </div>

                      <ul className="duo-scope-list" style={{ gap: '12px' }}>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Offline-First Synchronization Engine:</strong> Architected browser <strong>IndexedDB local caching</strong> (<code>offlineQueue</code>) and PWA Service Worker background sync worker, delivering sub-50ms cashier billing during network outages with automated idempotent batch reconciliation to <strong>PostgreSQL</strong> upon reconnection.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>3-Way Deterministic Conflict Engine:</strong> Engineered mathematical collision resolution across 3 domain policies: <strong>Trust Local (Branch Wins)</strong> for clearance sales, <strong>Trust Master (Cloud Authority)</strong> for corporate catalog updates, and <strong>Smart Field-Level Merging</strong> for concurrent stock counts with visual audit diffs.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Real-Time Edge Telemetry &amp; Mesh Radar:</strong> Built 7-node regional mesh visualizer (Colombo HQ, Kandy, Galle, Kurunegala, Negombo, Jaffna, Matara) with sub-20ms WebSocket heartbeat telemetry and live <strong>Socket.io</strong> latency tracking.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Zero-Trust Terminal Fleet Console &amp; Remote Kill-Switch:</strong> Created real-time terminal fleet management dashboard tracking battery levels (91% ⚡), Wi-Fi strength, and live connection states with 1-click remote security revocation (instant WebSocket termination and cryptographic JWT token invalidation).</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Centralized Runtime System Configuration:</strong> Engineered dynamic management of 44 system parameters (including Sri Lankan 15% VAT, LKR currency, and sync throttle intervals) applied live without server restarts.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Executive Health Watchdog &amp; Compliance Exports:</strong> Implemented real-time 24-hour 15ms Latency Pulse tracking, automated dead-letter error quarantine with exponential backoff recovery, and instant client-side C-level compliance PDF report export via <strong>jsPDF</strong>.</span>
                        </li>
                        <li className="duo-scope-item">
                          <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '3px' }}></i>
                          <span><strong style={{ color: 'var(--text-primary)' }}>Relational Database Architecture:</strong> Designed normalized 3NF PostgreSQL relational schema (8 master tables: branches, registers, cashiers, products, inventory_ledger, sales_orders, sale_items, sync_events) with <strong>Prisma ORM</strong> and ACID transaction integrity.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Key Capabilities */}
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: theme === 'light' ? '#0284c7' : '#38bdf8' }}></i> Key Capabilities
                    </h4>

                    {/* Subsection 1: Platform & Retail Core */}
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="fa-solid fa-store" style={{ color: 'var(--primary-color)' }}></i> Platform &amp; Retail Core:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {[
                        { icon: "🛒", title: "High-Speed Point-of-Sale Billing", desc: "Fast touch-and-barcode checkout supporting dynamic discounts, itemized receipts, and multi-tenant store operations" },
                        { icon: "📦", title: "Multi-Branch Inventory & Stock Management", desc: "Centralized product catalog, real-time stock transfer workflows, and automated low-stock threshold alerts" },
                        { icon: "🛡️", title: "Role-Based Access Control (RBAC)", desc: "Strict operational separation of concerns across Super Admin, Branch Manager, and Cashier roles" },
                        { icon: "📊", title: "Business Intelligence & Reporting", desc: "Visual revenue analytics, category performance breakdowns, and financial audit reports" }
                      ].map((item, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '12px', 
                          background: theme === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)', 
                          border: '1px solid var(--card-border)', 
                          borderRadius: '10px', 
                          padding: '12px 16px' 
                        }}>
                          <span style={{ fontSize: '1.25rem', lineHeight: 1, marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                          <div style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                            <strong style={{ color: 'var(--text-primary)', marginRight: '6px' }}>{item.title}:</strong>
                            {item.desc}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Subsection 2: Distributed Sync & Edge Telemetry */}
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: theme === 'light' ? '#0284c7' : '#38bdf8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="fa-solid fa-network-wired"></i> Distributed Synchronization &amp; Edge Telemetry (My Key Contribution):
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { icon: "⚡", title: "Offline-First Non-Blocking Billing", desc: "Continuous cashier sales processing backed by browser IndexedDB local persistence with 100% Zero Data Loss" },
                        { icon: "🔄", title: "Smart Conflict Resolution Engine", desc: "Algorithmic resolution across domain policies (Additive Stock Merging, HQ Server Wins, and Last-Write-Wins) with an IDE-style visual diff" },
                        { icon: "📡", title: "Live Edge Telemetry & Remote Kill-Switch", desc: "Real-time hardware fleet observability tracking battery levels (91% ⚡), Wi-Fi strength, and a 1-click remote security revocation" },
                        { icon: "🚀", title: "Sub-50ms Real-Time Push Broadcasting", desc: "Instant emergency notice dispatch powered by Socket.io WebSockets without page reloads" },
                        { icon: "⚙️", title: "Centralized Runtime System Configuration", desc: "Dynamic management of 44 system parameters (including Sri Lankan 15% VAT and LKR currency) without server restarts" },
                        { icon: "🩺", title: "Executive Health Watchdog", desc: "Real-time 24-hour 15ms Latency Pulse tracking, proactive error detection, and instant client-side C-level compliance PDF exports" }
                      ].map((item, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '12px', 
                          background: theme === 'light' ? 'rgba(2, 132, 199, 0.05)' : 'rgba(56, 189, 248, 0.03)', 
                          border: theme === 'light' ? '1px solid rgba(2, 132, 199, 0.25)' : '1px solid rgba(56, 189, 248, 0.15)', 
                          borderRadius: '10px', 
                          padding: '12px 16px' 
                        }}>
                          <span style={{ fontSize: '1.25rem', lineHeight: 1, marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                          <div style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                            <strong style={{ color: 'var(--text-primary)', marginRight: '6px' }}>{item.title}:</strong>
                            {item.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

              </div>
            </motion.div>
          </motion.div>
        );
      })()}
      </AnimatePresence>

      {/* ==========================================
          BUG AUDIT DEEP-DIVE MODAL (RCA & SPECS)
          ========================================== */}
      <AnimatePresence>
      {activeBugAuditId && (() => {
        const audit = bugAuditsData[activeBugAuditId];
        if (!audit) return null;
        return (
          <motion.div
            className="project-modal active" id="bug-audit-modal"
            onClick={(e) => e.target === e.currentTarget && setActiveBugAuditId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="project-modal-content glass-card"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button className="project-modal-close" onClick={() => setActiveBugAuditId(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="project-modal-body">
                {/* Platform Selector Switcher Bar */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid var(--card-border)' }}>
                  {Object.entries(bugAuditsData).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setActiveBugAuditId(key)}
                      style={{
                        background: activeBugAuditId === key ? 'rgba(var(--primary-rgb), 0.15)' : 'rgba(255, 255, 255, 0.04)',
                        border: activeBugAuditId === key ? '1px solid var(--primary-color)' : '1px solid var(--card-border)',
                        color: activeBugAuditId === key ? 'var(--primary-color)' : 'var(--text-secondary)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <i className={item.platformIcon} style={{ color: item.platformColor }}></i>
                      <span>{item.platform}</span>
                      <span style={{ fontSize: '0.68rem', opacity: 0.8 }}>({item.id})</span>
                    </button>
                  ))}
                </div>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ 
                        fontFamily: 'monospace', 
                        fontSize: '0.85rem', 
                        color: 'var(--primary-color)', 
                        background: 'rgba(var(--primary-rgb), 0.12)', 
                        padding: '3px 10px', 
                        borderRadius: '6px', 
                        border: '1px solid rgba(var(--primary-rgb), 0.3)',
                        fontWeight: 700 
                      }}>
                        {audit.id}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <i className={audit.platformIcon} style={{ color: audit.platformColor, marginRight: '5px' }}></i> {audit.platform} &bull; {audit.domain}
                      </span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                      {audit.title}
                    </h3>
                  </div>

                  <span className={
                    audit.severity.includes('P1') ? 'severity-pill-critical' :
                    audit.severity.includes('P2') ? 'severity-pill-high' :
                    'severity-pill-medium'
                  } style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
                    <i className="fa-solid fa-triangle-exclamation"></i> {audit.severity}
                  </span>
                </div>

                <div className="modal-project-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                  <span className="modal-meta-item"><i className="fa-solid fa-layer-group" style={{ color: 'var(--primary-color)' }}></i> <strong>Category:</strong> {audit.category}</span>
                  <span className="modal-meta-item"><i className="fa-solid fa-desktop" style={{ color: 'var(--primary-color)' }}></i> <strong>Environment:</strong> {audit.environment}</span>
                  <a className="modal-meta-item" href={audit.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}><i className="fa-solid fa-arrow-up-right-from-square"></i> {audit.sourceLabel}</a>
                </div>
                <div className="bug-evidence-note">
                  <i className="fa-solid fa-shield-halved"></i>
                  <span><strong>Evidence type:</strong> {audit.evidenceType}. This case study separates public facts from QA analysis and does not claim a current production defect.</span>
                </div>

                {/* Preconditions & Steps to Reproduce */}
                <h4 className="modal-section-title"><i className="fa-solid fa-list-check"></i> Steps to Reproduce &amp; Preconditions</h4>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '18px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Pre-conditions:</strong> {audit.preconditions}
                  </p>
                  <ol style={{ paddingLeft: '20px', margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.65 }}>
                    {audit.stepsToReproduce.map((step, sIdx) => (
                      <li key={sIdx} style={{ marginBottom: '6px' }}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Expected vs Actual Side-by-Side */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ background: 'rgba(var(--primary-rgb), 0.06)', border: '1px solid rgba(var(--primary-rgb), 0.25)', borderRadius: '12px', padding: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.95rem' }}>
                      <i className="fa-solid fa-circle-check"></i> Expected Behavior
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {audit.expectedResult}
                    </p>
                  </div>
                  <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#f87171', fontWeight: 700, fontSize: '0.95rem' }}>
                      <i className="fa-solid fa-circle-xmark"></i> Actual Observed Defect
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {audit.actualResult}
                    </p>
                  </div>
                </div>

                {/* Deep Root Cause Analysis (RCA) */}
                <h4 className="modal-section-title"><i className="fa-solid fa-magnifying-glass-chart"></i> Deep Root Cause Analysis (RCA)</h4>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '18px', marginBottom: '24px' }}>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                    {audit.rootCauseAnalysis}
                  </p>
                  <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Observed System Diagnostics &amp; Trace Logs:
                  </span>
                  <pre style={{ background: '#090d16', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '14px', borderRadius: '8px', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.45 }}>
                    {audit.systemLogs}
                  </pre>
                </div>

                {/* QA Remediation Recommendation */}
                <h4 className="modal-section-title" style={{ color: 'var(--primary-color)' }}>
                  <i className="fa-solid fa-shield-halved"></i> QA Remediation &amp; Engineering Fix Blueprint
                </h4>
                <div style={{ background: 'rgba(var(--primary-rgb), 0.08)', border: '1px solid rgba(var(--primary-rgb), 0.3)', borderRadius: '12px', padding: '18px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: audit.verificationQuery ? '0 0 14px 0' : 0 }}>
                    {audit.qaRecommendation}
                  </p>
                  {audit.verificationQuery && (
                    <>
                      <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Automated Data Integrity Verification Query:
                      </span>
                      <pre style={{ background: '#071511', color: '#6ee7b7', border: '1px solid rgba(var(--primary-rgb), 0.3)', padding: '12px', borderRadius: '8px', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.8rem', margin: 0 }}>
                        {audit.verificationQuery}
                      </pre>
                    </>
                  )}
                </div>

                {/* Tech Tags */}
                <div className="modal-tech-list" style={{ marginTop: '16px' }}>
                  {audit.tags.map(t => <span key={t} className="modal-tech-item">{t}</span>)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })()}
      </AnimatePresence>

      {/* Interactive Certificate Preview Lightbox Modal */}
      <AnimatePresence>
        {previewCert && (
          <motion.div
            className="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewCert(null)}
          >
            <motion.div
              className="cert-modal-container"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="cert-modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(var(--primary-rgb), 0.12)',
                    color: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    <i className={`fa-solid fa-${previewCert.badge}`}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                      {previewCert.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span>{previewCert.issuer}</span>
                      <span>&bull;</span>
                      <span style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--primary-color)', fontWeight: 600 }}>{previewCert.credId}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <a
                    href={previewCert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '7px 15px', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '7px' }}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> Open Full PDF
                  </a>
                  <button
                    type="button"
                    aria-label="Close Certificate Preview"
                    onClick={() => setPreviewCert(null)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '1.05rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#ef4444';
                      e.currentTarget.style.borderColor = '#ef4444';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.borderColor = 'var(--card-border)';
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>

              <div className="cert-modal-body">
                <iframe
                  src={`${previewCert.file}#toolbar=0&navpanes=0`}
                  title={previewCert.title}
                  className="cert-modal-iframe"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <div id="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type} show`} style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <i className={`fa-solid ${
                toast.type === 'success' ? 'fa-circle-check' :
                toast.type === 'info' ? 'fa-circle-info' :
                'fa-circle-exclamation'
              }`}></i>
              <span>{toast.message}</span>
            </div>
            <div className="toast-progress-bar" />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
