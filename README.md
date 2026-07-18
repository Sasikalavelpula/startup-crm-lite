# 🚀 Startup CRM Lite

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-8E44AD?style=for-the-badge" alt="MERN Stack" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge" alt="Express 5" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge" alt="License ISC" />
  <img src="https://img.shields.io/badge/Build-Passing-28A745?style=for-the-badge" alt="Build Status" />
</p>

---

## 📌 Table of Contents
1. [Project Overview](#-project-overview)
2. [Problem Statement](#-problem-statement)
3. [Vision & Objectives](#-vision--objectives)
4. [Key Features](#-key-features)
5. [Target Users](#-target-users)
6. [Use Cases](#-use-cases)
7. [Business Value](#-business-value)
8. [Screenshots](#-screenshots)
9. [Complete System Architecture](#-complete-system-architecture)
   - [High-Level Architecture Overview](#high-level-architecture-overview)
   - [Application Workflow](#application-workflow)
   - [End-to-End User Flow](#end-to-end-user-flow)
10. [Technology Stack](#-technology-stack)
11. [Project Folder Structure](#-project-folder-structure)
    - [Folder Directory Tree](#folder-directory-tree)
    - [Major Folder Explanations](#major-folder-explanations)
    - [Important File Explanations](#important-file-explanations)
12. [Frontend Architecture](#-frontend-architecture)
13. [Backend Architecture](#-backend-architecture)
14. [Database Architecture](#-database-architecture)
15. [API Overview](#-api-overview)
16. [Authentication & Authorization](#-authentication--authorization)
17. [State Management](#-state-management)
18. [Storage Strategy](#-storage-strategy)
19. [Third-Party Services & Integrations](#-third-party-services--integrations)
20. [AI/Automation Components (Planned)](#-aiautomation-components-planned)
21. [Development Prerequisites](#-development-prerequisites)
22. [Installation Guide](#-installation-guide)
23. [Environment Variables (".env") Documentation](#-environment-variables-env-documentation)
24. [Project Configuration](#-project-configuration)
25. [Running the Project (Development)](#-running-the-project-development)
26. [Running the Project (Production)](#-running-the-project-production)
27. [Build Process](#-build-process)
28. [Deployment Guide](#-deployment-guide)
29. [CI/CD Overview](#-cicd-overview)
30. [Testing Strategy](#-testing-strategy)
31. [Debugging Tips](#-debugging-tips)
32. [Logging & Monitoring](#-logging--monitoring)
33. [Security Considerations](#-security-considerations)
34. [Performance Optimizations](#-performance-optimizations)
35. [Coding Standards & Project Conventions](#-coding-standards--project-conventions)
36. [Versioning & Branching Strategy](#-versioning--branching-strategy)
37. [Contribution Guidelines](#-contribution-guidelines)
38. [Release Process](#-release-process)
39. [Known Limitations](#-known-limitations)
40. [Future Roadmap](#-future-roadmap)
41. [Frequently Asked Questions (FAQ)](#-frequently-asked-questions-faq)
42. [Troubleshooting Guide](#-troubleshooting-guide)
43. [Changelog](#-changelog)
44. [License](#-license)
45. [Credits & Acknowledgements](#-credits--acknowledgements)
46. [Contact Information](#-contact-information)
47. [Final Project Summary](#-final-project-summary)

---

## 📖 Project Overview
**Startup CRM Lite** is a lightweight, performant, and secure Customer Relationship Management (CRM) application built specifically to address the deal-tracking and lead-flow organization challenges faced by early-stage startup teams. Combining a robust Node.js/Express API with a highly responsive, modern React dashboard, it gives founders and sales agents a visual hub to capture, track, update, and analyze their sales pipeline.

The application leverages premium visual design components including custom theme providers (supporting system-integrated dark/light toggles), animated layouts, real-time KPI card tracking, and advanced charting dashboards (utilizing Recharts) to display monthly lead growth, deal value, pipeline distribution, and overall conversion velocity.

---

## ⚠️ Problem Statement
Early-stage startup teams rarely need the complexity, bloated licensing fees, and heavy onboarding curves associated with enterprise CRM systems like Salesforce or Hubspot. However, resorting to static spreadsheets leads to:
* **Fragmented Lead Data:** Deal communications, notes, value details, and acquisition sources are spread across multiple documents.
* **Lack of Visibility:** No visual indication of pipeline health, sales conversion rates, or historical growth curves.
* **Security & Isolation Risks:** Sharing single sheets often exposes entire leads datasets to incorrect stakeholders, lacking user-level tenancy separation.

---

## 🎯 Vision & Objectives
* **Simplistic Tenancy:** Provide secure, user-isolated spaces where each registered sales agent owns, updates, and reviews only their self-created or self-assigned leads.
* **Instant Insights:** A dashboard that provides conversion metrics and pipeline distributions out-of-the-box.
* **Premium UX/UI:** Implement glassmorphism layouts, subtle micro-animations, and seamless dark mode support.
* **Robust Core Security:** Standardize around strict security layers, including rate limiters, Helmet HTTP headers, Mongo injection sanitizers, and validation rules.

---

## ✨ Key Features
* **Stateless Authentication:** Secure signup and login flows powered by JSON Web Tokens (JWT) stored in LocalStorage.
* **Pipeline Status Control:** Move leads between pipeline stages (`New`, `Contacted`, `Meeting Scheduled`, `Proposal Sent`, `Won`, `Lost`) with database validation.
* **Interactive Charts:** Rich visualizations using Recharts, showing:
  * Monthly Lead Ingestion trends.
  * Pipeline conversion percentages.
  * Lead acquisition channels breakdown (Website, Referral, LinkedIn, Cold Calls).
  * Sales Velocity and revenue forecasting.
* **Dynamic Search & Filtering:** Live autocomplete lead search queries (matching names, companies, or emails) and custom filters based on source, status, or date.
* **CSV Ingestion/Export:** Download leads lists instantly into standard CSV format for third-party auditing.
* **Adaptive Theme System:** LocalStorage persisted dark/light layout options using Tailwind CSS v4 variables.

---

## 👥 Target Users
* **Startup Founders:** To track overall revenue pipeline values and check general lead conversion dynamics.
* **Sales Representatives:** To log contacts, update statuses, record communications, and keep track of daily interactions.
* **Growth Marketers:** To review lead sources and see which channels (Website, Referral, LinkedIn) bring in high-value conversions.

---

## 💼 Use Cases
1. **Managing the Deal Pipeline:** A sales agent receives a lead from the website, changes their status from `New` to `Meeting Scheduled`, and appends specific follow-up notes.
2. **Reviewing Marketing Ingestion:** An executive reviews the dashboard charts and notices that the "Referral" channel yields an 80% conversion rate compared to 15% for "Cold Calls", driving budget reallocation.
3. **Data Portability:** An agent exports their list to CSV to run mail merges in third-party newsletters.

---

## 📈 Business Value
* **Reduction in Time-to-Onboard:** A new representative is ready to log deals in under 5 minutes due to the intuitive interface.
* **Higher Conversion Ratios:** Visualizing lost or proposal-sent deals prevents leads from falling through the cracks.
* **Data Security Compliance:** Fully separates tenant spaces to prevent accidental data leaks or unauthorized data access.

---

## 🖼️ Screenshots
*(Visual placeholders representing key application spaces)*

| Feature Space | Light Theme Layout | Dark Theme Layout |
| :--- | :--- | :--- |
| **Authentication Screen** | `[Placeholder: Light Auth Screen Mockup]` | `[Placeholder: Dark Auth Screen Mockup]` |
| **Main Dashboard Grid** | `[Placeholder: Light Dashboard Chart Mockup]` | `[Placeholder: Dark Dashboard Chart Mockup]` |
| **Leads Catalog / Table** | `[Placeholder: Light Catalog & Form Mockup]` | `[Placeholder: Dark Catalog & Form Mockup]` |
| **Analytics Charts Feed** | `[Placeholder: Light Analytics Visualization]`| `[Placeholder: Dark Analytics Visualization]` |

---

## 🏗️ Complete System Architecture

### High-Level Architecture Overview
The application follows a traditional decoupled client-server architecture. The Client is a single-page application built on Vite/React, compiling into optimized HTML, JS, and CSS static bundles hosted on Vercel. The Backend is an Express.js application acting as a stateless API server hosted on Render/Railway. MongoDB Atlas serves as the managed cloud database.

```mermaid
graph TD
    Client[React SPA Frontend] -->|HTTPS Requests| LB[Vercel Router/Rewrites]
    Client -->|Axios Calls + JWT Bearer Token| Server[Express.js API Backend]
    Server -->|Mongoose Queries| DB[(MongoDB Atlas Cloud Database)]
    
    subgraph Security Layer
        Server --> Sec1[Helmet Headers]
        Server --> Sec2[Mongo Sanitize]
        Server --> Sec3[General / Auth Rate Limiters]
        Server --> Sec4[Dynamic CORS Whitelist]
    end
    
    subgraph Input Validation
        Server --> Val1[Auth JWT Validation]
        Server --> Val2[Express Validator Chains]
    end
```

### Application Workflow
The following sequence details how client API requests flow through backend middlewares to database endpoints:

```mermaid
sequenceDiagram
    participant Client as React Client
    participant Express as Express API Server
    participant Middleware as Auth/Validate Middlewares
    participant Controller as Lead Controller
    participant DB as MongoDB Atlas
    
    Client->>Express: GET /api/leads?status=Won (Header: Bearer JWT)
    Express->>Middleware: Trigger protect middleware
    Middleware->>Middleware: Decode JWT and verify signature
    alt Token Invalid/Expired
        Middleware-->>Client: 401 Unauthorized / Token Expired
    else Token Valid
        Middleware->>Express: Attach active User object to req.user
        Express->>Controller: Call getLeads Handler
        Controller->>DB: Lead.find({ owner: req.user._id, status: 'Won' })
        DB-->>Controller: Return matching documents
        Controller-->>Client: 200 OK { success: true, data: [...] }
    end
```

### End-to-End User Flow
From initial registration to data management and deep analytics dashboards:

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated
    Unauthenticated --> RegisterPage: Create Account
    RegisterPage --> LoginPage: Registration Successful
    Unauthenticated --> LoginPage: Log In
    LoginPage --> Authenticated: Session Initialized
    
    state Authenticated {
        [*] --> Dashboard
        Dashboard --> LeadCatalog: View Leads
        LeadCatalog --> AddLeadForm: Click "Add Lead"
        AddLeadForm --> LeadCatalog: Lead Added (Context Re-sync)
        LeadCatalog --> EditLead: Edit Status/Value
        LeadCatalog --> ExportCSV: Export Leads to CSV
        Dashboard --> Analytics: View Metrics Deep-dive
        Analytics --> FilterMetrics: Filter by Date/Source
    }
    
    Authenticated --> Logout: Clear LocalStorage
    Logout --> Unauthenticated
```

---

## 🛠️ Technology Stack

### Frontend Core
* **React 19.2.6:** Frontend framework leveraging the latest component rendering APIs.
* **React Router DOM 7.17.0:** Handles client-side page transitions, route guards, and layouts.
* **Tailwind CSS 4.3.0 & @tailwindcss/vite:** Utility styling engine utilizing native CSS custom variables.
* **Recharts 3.8.1:** Responsive charting library for rendering area, bar, line, and pie visualizations.
* **Lucide React 1.18.0:** Modern, scalable vector icon library.
* **Axios 1.18.1:** Promise-based HTTP client featuring custom interceptors for authentication injection and error handling.
* **React Hot Toast 2.6.0:** Customizable alert notifications.

### Backend Core
* **Node.js:** Server runtime environment.
* **Express 5.2.1:** High-performance routing framework.
* **Mongoose 9.7.3:** MongoDB Object Document Mapping (ODM) layer.
* **Bcryptjs 3.0.3:** Secure password hashing (10 salt rounds).
* **Jsonwebtoken 9.0.3:** Token-based session verification.
* **Helmet 8.2.0:** Secure HTTP response headers protection.
* **Express Mongo Sanitize 2.2.0:** Sanitizes user inputs against MongoDB query injection attacks.
* **Express Rate Limit 8.5.2:** Prevents Denial-of-Service and brute-force attacks.
* **Express Validator 7.3.2:** Declarative request body validation chains.
* **Morgan 1.11.0:** Request logging tool.

### Database
* **MongoDB Atlas:** Multi-region, managed NoSQL database engine.

---

## 📂 Project Folder Structure

### Folder Directory Tree
```text
startup-crm-lite/
├── .env                       # Frontend local dev environment configuration
├── .gitignore                 # Root git ignores
├── .vercelignore              # Vercel deployment exclusions
├── eslint.config.js           # Client linting configuration
├── index.html                 # Single page application base HTML
├── package.json               # Frontend dependencies & package scripts
├── vercel.json                # Vercel routing configuration
├── vite.config.js             # Vite compiler plugin configurations
├── backend/                   # Backend API codebase
│   ├── .env                   # Backend local environment keys
│   ├── package.json           # Backend dependencies & package scripts
│   ├── server.js              # Application entry point & Express configuration
│   ├── config/
│   │   └── database.js        # Mongoose database client & DNS settings
│   ├── controllers/
│   │   ├── authcontroller.js  # User auth controllers (login, signup, update)
│   │   └── leadcontroller.js  # Leads management CRUD & analytics calculations
│   ├── middleware/
│   │   ├── auth.js            # JWT protection route guards
│   │   ├── errorHandler.js    # Centralized global Express error handler
│   │   └── validate.js        # express-validator result handler helper
│   ├── models/
│   │   ├── Lead.js            # Leads MongoDB validation schemas & indexing
│   │   └── User.js            # User authentication schemas & password hashing
│   ├── routes/
│   │   ├── authroutes.js      # User API endpoints routing maps
│   │   └── leadroutes.js      # Leads API endpoints routing maps
│   └── utils/
│       └── apiresponse.js     # Standardized JSON response formatting helpers
└── src/                       # Frontend SPA codebase
    ├── App.jsx                # Router mount & context wraps initialization
    ├── index.css              # Tailwind CSS imports & custom variables layout
    ├── main.jsx               # React DOM DOM root initialization
    ├── assets/                # Static local images
    ├── constants/
    │   └── analyticsColors.js # Centrally managed chart color palettes
    ├── context/
    │   ├── AuthContext.jsx    # Authentication state, login, signup managers
    │   ├── LeadContext.jsx    # Leads CRUD context, fetching & update hooks
    │   └── ThemeContext.jsx   # Theme switcher state & document dark class injector
    ├── data/
    │   └── sampleLeads.js     # Dev-testing sample mock database array
    ├── hooks/
    │   ├── useAnalytics.js    # Data aggregation client hook
    │   └── useLocalStorage.js # LocalStorage read-write state sync hook
    ├── pages/
    │   ├── Analytics.jsx      # Multi-chart analytics grid page
    │   ├── Dashboard.jsx      # High-level stats, overview, and acquisition trends
    │   ├── Leads.jsx          # Lead table, search, modal operations
    │   ├── Login.jsx          # Auth credentials login form
    │   ├── Register.jsx       # Auth new user registration form
    │   └── NotFound.jsx       # Fallback 404 router page
    ├── routes/
    │   └── index.jsx          # Lazy loading client paths & route guards
    ├── services/
    │   ├── api.js             # Axios client instance & response interceptors
    │   ├── authService.js     # Auth API server-request methods
    │   └── leadService.js     # Leads CRUD API server-request methods
    └── utils/
        ├── analyticsHelpers.js# Chart transformations, counts, rates
        └── csvExport.js       # JSON array parsing to downloadable client CSV
```

### Major Folder Explanations
* **`backend/`**: Contains the API server logic. Organized by model-view-controller paradigm subsets. All business logic is decoupled from routes.
* **`src/`**: Contains the React codebase, organizing files by UI pages, reusable components, context managers, hooks, and services.
* **`src/components/`**: House directories: `common` (layout structure, loaders, sidebar), `dashboard` (aggregated views), `leads` (forms, tables, lists), and `analytics` (individual chart card components).

### Important File Explanations
* **`backend/server.js`**: Bootstraps the application, registers middleware (Helmet, rate limits, CORS), initializes routes, and gracefully closes DB connection pools on termination.
* **`backend/config/database.js`**: Manages the connection to MongoDB. Configures Node's internal DNS resolver to use Google servers on local Windows machines to bypass DNS Srv lookup issues.
* **`backend/models/User.js`**: Defines the user schema, performs password pre-save hashing, exposes password comparisons, and overrides `toJSON` to strip hashes from responses.
* **`backend/models/Lead.js`**: Core data schema for Leads. Configures indexes on emails and owners, compound query indexes, and virtual fields like lead `age` (days since creation).
* **`src/services/api.js`**: Centralized Axios instance. Sets up request interceptors to auto-inject JWT tokens and response interceptors to catch `401 Unauthorized` errors and trigger automatic logout redirects.

---

## 🎨 Frontend Architecture
The React application follows a modular, layout-driven design pattern:
1. **Lazy Loading:** All page components are lazily loaded using `React.lazy` and `Suspense` inside `src/routes/index.jsx` to reduce initial bundle size.
2. **Context Providers:** State is managed via three context layers (`AuthContext`, `LeadContext`, `ThemeContext`) wrapping the main application mount point in `src/App.jsx`.
3. **Responsive Grids:** CSS layouts utilize Tailwind CSS utility classes to adapt between desktop displays and mobile screen dimensions.
4. **Data Visualizations:** Recharts coordinates visual scales, animations, tooltips, and gradients dynamically based on the active dark/light mode context.

---

## ⚙️ Backend Architecture
The backend is structured as a decoupled, layered API:
```text
HTTP Request ➔ Security Middlewares ➔ Routing Gateways ➔ Controller Logic ➔ ODM Layer ➔ database
                                                                               │
                                                                               └➔ Response Helpers
```
* **Routing Layer:** Maps HTTP endpoints, validates incoming payloads using `express-validator` rules, and enforces JWT validation.
* **Controller Layer:** Contains controller handlers, coordinates database queries, and handles errors using the global handler.
* **Data Access Layer:** Uses Mongoose schemas to validate model constraints, format documents, and return query projections.

---

## 🗄️ Database Architecture
The application uses two collections inside MongoDB:

### 1. `users` Collection
* **`name`**: String, required, trimmed, 2-50 characters.
* **`email`**: String, unique, lowercase, trimmed, email regex validated.
* **`password`**: String, required, hashed.
* **`role`**: String, Enum: `['admin', 'user']`, default: `'user'`.
* **`isActive`**: Boolean, default: `true`.
* **Timestamps**: `createdAt`, `updatedAt` auto-generated.

### 2. `leads` Collection
* **`name`**: String, required, trimmed, 2-100 characters.
* **`company`**: String, required, trimmed.
* **`email`**: String, required, trimmed, email regex validated.
* **`phone`**: String, optional, trimmed.
* **`status`**: String, Enum: `['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost']`, default: `'New'`.
* **`source`**: String, Enum: `['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other']`, default: `'Website'`.
* **`value`**: Number, default: `0`, minimum: `0`.
* **`notes`**: String, optional, max 1000 characters.
* **`owner`**: ObjectId referencing the `User` collection.
* **Virtual Field**: `age` (calculates elapsed days since creation date).

### Database Query Optimization Indexes
To ensure fast queries as datasets grow, the following indexes are applied:
* `email` (single index for validation lookups)
* `{ owner: 1, status: 1 }` (compound index for fast Kanban dashboard filtering)
* `{ owner: 1, createdAt: -1 }` (compound index for default catalog sorting)
* `{ owner: 1, source: 1 }` (compound index for analytics segmentation)
* Autocomplete prefix indexes: `{ owner: 1, name: 1 }`, `{ owner: 1, company: 1 }`, and `{ owner: 1, email: 1 }`.

---

## 🔌 API Overview
All API routes are prefixed with `/api`. Requests to protected endpoints must include the `Authorization: Bearer <token>` header.

### Authentication Endpoints
| HTTP Method | Endpoint Path | Authentication | Description | Expected Payload | Success Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Create user account | `{ name, email, password }` | `201 Created` |
| **POST** | `/api/auth/login` | Public | Authenticate session | `{ email, password }` | `200 OK` |
| **POST** | `/api/auth/logout` | Protected | Statelss JWT logout | None | `200 OK` |
| **GET** | `/api/auth/profile` | Protected | Get profile details | None | `200 OK` |
| **PUT** | `/api/auth/profile` | Protected | Update credentials | `{ name, currentPassword, newPassword }` | `200 OK` |

### Leads Management Endpoints
| HTTP Method | Endpoint Path | Authentication | Description | Expected Payload | Success Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/leads` | Protected | Get filtered leads | Query: `?status=Won&search=Sasi` | `200 OK` |
| **GET** | `/api/leads/search`| Protected | Live autocomplete search| Query: `?q=Sasi&limit=5` | `200 OK` |
| **GET** | `/api/leads/stats` | Protected | Get aggregated KPIs | None | `200 OK` |
| **GET** | `/api/leads/monthly-stats`| Protected| Get 6-month trends | None | `200 OK` |
| **POST** | `/api/leads` | Protected | Create a new lead | `{ name, company, email, status, source, value, phone, notes }` | `201 Created` |
| **GET** | `/api/leads/:id` | Protected | Fetch a single lead | None | `200 OK` |
| **PUT** | `/api/leads/:id` | Protected | Update lead fields | `{ name, company, email, status, source, value, phone, notes }` | `200 OK` |
| **PATCH**| `/api/leads/:id/status`| Protected| Update lead pipeline | `{ status }` | `200 OK` |
| **DELETE**| `/api/leads/:id` | Protected | Delete lead | None | `200 OK` |

---

## 🔐 Authentication & Authorization
* **JSON Web Tokens:** Verified using the `protect` middleware inside `backend/middleware/auth.js`.
* **Flow:** The client sends credentials, the API validates them and returns a signed token payload (`{ id: user._id }`). The client stores this token in LocalStorage under the key `crm-token` and includes it in all future headers.
* **Account Status Validation:** The auth middleware checks if the user's `isActive` property is `true`. Deactivated accounts are automatically blocked (HTTP 403 Forbidden).

---

## 🧠 State Management
* **`AuthContext`:** Exposes the active `user`, raw `token`, `isLoading` initialization state, and functions for `login`, `register`, and `logout`.
* **`LeadContext`:** Exposes the `leads` array, fetching configurations, pagination states (`total`, `page`, `limit`, `pages`), and CRUD handlers. Re-syncs component states automatically on any write operations.
* **`ThemeContext`:** Manages the `isDarkMode` state. Adds or removes the `dark` class from `document.documentElement` to trigger Tailwind's dark utility styles.

---

## 💾 Storage Strategy
To maintain a stateless, scalable architecture:
* **Client-Side Preferences:** Persistent data (JWT tokens and theme selections) are stored directly in `localStorage` under the keys `crm-token` and `startup-crm-theme`.
* **Session Cache:** Leads data is stored in the React `LeadContext` state, serving as a runtime cache to prevent redundant API queries.
* **No Server-Side Sessions:** The Express API is stateless. It does not store user sessions in memory or in database collections, validating requests solely by verifying the incoming JWT.

---

## 🤝 Third-Party Services & Integrations
* **MongoDB Atlas:** Cloud hosting provider for database clusters.
* **Vercel:** Hosts the frontend SPA, handling single-page application routing rewrites.
* **Render / Railway:** Managed PaaS hosting platforms used to deploy the containerized Express application.

---

## 🤖 AI/Automation Components (Planned)
* **Automated Lead Scoring:** An upcoming machine learning module designed to prioritize high-value leads.
* **AI Follow-up Assistants:** Automated drafting of contextual email messages based on communication logs and the current pipeline status.

---

## 📋 Development Prerequisites
Make sure you have the following software installed locally:
* **Node.js** >= 18.0.0
* **npm** >= 9.0.0
* **MongoDB Atlas Account** or a local instance of MongoDB Server.

---

## 🚀 Installation Guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sasikalavelpula/startup-crm-lite.git
   cd startup-crm-lite
   ```

2. **Set up the Frontend variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. **Install Frontend dependencies:**
   ```bash
   npm install
   ```

4. **Set up the Backend environment:**
   Navigate into the `backend/` folder and create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_key_make_it_long_and_random
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. **Install Backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

---

## 🔑 Environment Variables (".env") Documentation

### Frontend Environment Variables (Root Folder)
| Variable Name | Required | Description | Example / Default Value |
| :--- | :--- | :--- | :--- |
| **`VITE_API_URL`** | Yes | Address of the Express API server | `http://localhost:5000` |

### Backend Environment Variables (`backend/` Folder)
| Variable Name | Required | Description | Example / Default Value |
| :--- | :--- | :--- | :--- |
| **`PORT`** | Yes | The port the Express application listens on | `5000` |
| **`MONGODB_URI`** | Yes | Connection string to the MongoDB Atlas cluster | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| **`JWT_SECRET`** | Yes | Private key used to sign JSON Web Tokens | `a_long_random_string` |
| **`JWT_EXPIRES_IN`**| No | Expiration window for signed tokens | `7d` |
| **`NODE_ENV`** | No | Current application environment | `development` or `production` |
| **`FRONTEND_URL`** | No | Allowed CORS origins configuration | `http://localhost:5173` |

---

## 🛠️ Project Configuration

### Vite Compiler Settings (`vite.config.js`)
Configured to bundle React components and compile Tailwind CSS v4 assets using the native Vite integration:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Vercel Routing Configuration (`vercel.json`)
Rewrites all routing requests to `/index.html` to support client-side navigation in Single Page Applications (SPA):
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 💻 Running the Project (Development)

Run the backend and frontend development servers concurrently:

1. **Start the API Server (Backend):**
   ```bash
   cd backend
   npm run dev
   ```
   *Uses nodemon to automatically restart the server on file changes.*

2. **Start the React Dev Server (Frontend):**
   Open a separate terminal window at the root folder:
   ```bash
   npm run dev
   ```
   *Launches the Vite dev server, typically running at `http://localhost:5173`.*

---

## 🏗️ Running the Project (Production)

### 1. Build and Preview the Frontend Locally
```bash
# Build the optimized production bundle
npm run build

# Preview the built application locally
npm run preview
```

### 2. Start the Production API Server
```bash
cd backend
# Starts the server directly using Node (without nodemon monitoring)
npm start
```

---

## 📦 Build Process
Building the application compiles all static assets:
* **Command:** `npm run build`
* **Output:** Creates a `dist/` directory at the project root containing HTML, optimized CSS chunks, and JavaScript files bundled by Vite.
* **Deployment Ready:** The contents of the `dist/` directory are static assets that can be served by web servers like Nginx, Apache, or static hosting providers like Vercel, Netlify, and AWS S3.

---

## 🚢 Deployment Guide

### Frontend Deployment (Vercel)
1. Install the Vercel CLI (`npm install -g vercel`) or link your GitHub repository to Vercel.
2. Ensure `vercel.json` exists in the root folder.
3. Configure the environment variable: `VITE_API_URL` (points to your hosted backend).
4. Run:
   ```bash
   vercel --prod
   ```

### Backend Deployment (Railway / Render)
1. Create a web service on Render or Railway, linking the backend subfolder.
2. In the deployment settings, configure the build and start commands:
   * **Build Command:** `npm install`
   * **Start Command:** `node server.js`
3. Configure your production environment variables: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `PORT`, and `FRONTEND_URL`.

---

## 🔄 CI/CD Overview
We recommend implementing a basic CI/CD pipeline using GitHub Actions to automate code checks:
```yaml
name: CRM CI/CD Build pipeline
on:
  push:
    branches: [ main ]
jobs:
  lint-and-validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Node
        uses: actions/setup-node@v3
        with:
          node-size: 18
      - run: npm install
      - run: npm run lint
      - run: npm run build
```

---

## 🧪 Testing Strategy
* **Unit Verification:** Validate model validations and utility functions, such as `analyticsHelpers.js` and `csvExport.js`.
* **API Testing:** We recommend using Postman, Insomnia, or curl to test API endpoints locally using the `.env` configurations.
* **End-to-End Testing (Planned):** Implement Cypress or Playwright test suites to test key user journeys (login, adding leads, switching themes) on preview deployments.

---

## 🔍 Debugging Tips
* **CORS Blocked Responses:** Ensure your backend `.env` file's `FRONTEND_URL` matches the frontend's address exactly (including protocols and port numbers).
* **Mongoose Connection Failures on Windows:** If you run into DNS lookups errors on Windows, `backend/config/database.js` will automatically redirect local DNS lookups to Google's public DNS servers (`8.8.8.8`).
* **Console Dev Mode Logging:** Keep `NODE_ENV` set to `development` to log database operations and requests (via Morgan's concise layout) directly to your terminal.

---

## 📝 Logging & Monitoring
* **Express Request Logger:** Morgan logs HTTP requests to the console.
  * *Development:* Uses colorized output (Morgan's `'dev'` layout).
  * *Production:* Standardizes on the Apache-common log output format (Morgan's `'combined'` layout).
* **Error Tracing:** The global error handler middleware catches and logs stack traces to the console in development, while returning clean JSON error responses to the client.

---

## 🛡️ Security Considerations
* **HTTP Headers Security:** Helmet configures standard HTTP security headers to protect against cross-site scripting (XSS) and clickjacking attacks.
* **NoSQL Query Injection Prevention:** `express-mongo-sanitize` strips out key prefix characters (like `$` and `.`) from user inputs.
* **Rate Limit Enforcement:** Protects public authentication endpoints (max 10 requests / 15 minutes per IP) and standard API endpoints (max 100 requests / 15 minutes per IP).
* **Cross-Site Request Forgery (CORS):** Limits access to whitelist URLs and subdomains deployed on Vercel.
* **Stateless Data Protection:** Strips sensitive user fields (like `password`) from JSON responses before returning them to the client.

---

## ⚡ Performance Optimizations
* **Database Indexes:** Compound indexing avoids collection scans on queries, speeding up dashboard loads.
* **Client-Side Code Splitting:** Uses lazy loading to dynamically load pages, improving initial page load times.
* **Axios Interceptors:** Checks localStorage cache states locally before triggering API requests to prevent redundant server round-trips.

---

## 📐 Coding Standards & Project Conventions
* **ESLint Configuration:** Managed using the rules in `eslint.config.js`.
* **Naming Conventions:**
  * **React Components:** PascalCase (e.g., `PipelineOverview.jsx`).
  * **Helper Scripts:** camelCase (e.g., `analyticsHelpers.js`).
  * **Controllers/Models:** CamelCase for server-side controllers, capital Singular for Mongoose models (e.g. `User.js`, `Lead.js`).
* **Asynchronous Code:** Use `async/await` rather than Promise callback chains (`.then()`).

---

## 🌿 Versioning & Branching Strategy
* **Versioning:** Follows Semantic Versioning (SemVer) specs (`MAJOR.MINOR.PATCH`).
* **Branching Strategy:** Use Git Flow patterns:
  * `main` / `master`: Production-ready code.
  * `develop`: Main development branch where features are integrated.
  * `feature/*`: Short-lived feature branches branched from `develop` (e.g., `feature/analytics-export`).

---

## 🤝 Contribution Guidelines
We welcome contributions to the Startup CRM Lite project:
1. **Fork** the repository to your account.
2. Create a new branch for your feature: `git checkout -b feature/amazing-feature`.
3. Commit your changes following standard guidelines.
4. Verify your changes pass ESLint checks: `npm run lint`.
5. Open a **Pull Request** targeting the `develop` branch.

---

## 🚀 Release Process
1. Test and freeze release code on the `develop` branch.
2. Merge `develop` into `main`.
3. Tag the merge commit with the version number: `git tag -a v1.0.0 -m "Release version 1.0.0"`.
4. Push tags to your repository (`git push origin --tags`) to trigger the deployment pipeline.

---

## 🛑 Known Limitations
* **Stateless JWT Sign-out:** Sign-out operations are handled client-side by deleting the JWT from `localStorage`. The backend cannot invalidate tokens on logout before they expire.
* **Local In-Memory Rate Limiting:** The API server tracks rate limits in memory. Deploying the API across multiple server instances may reset limits unless connected to a Redis backend.

---

## 🗺️ Future Roadmap
* [ ] **Active Notification Feed:** System alerts when deals move status or reach high pipeline values.
* [ ] **Google Workspace Calendar Integration:** Automatically schedule meetings and sync them with leads profiles.
* [ ] **Bulk CSV Importing:** Bulk import leads from third-party CRM systems using CSV uploads.
* [ ] **Team Collaborations:** Add support for multiple sales agents to manage shared lead pipelines.

---

## ❓ Frequently Asked Questions (FAQ)

#### Q: Where is my authentication token stored?
A: The client stores the JWT in `localStorage` under the key `crm-token`. It is automatically attached to the headers of all Axios requests.

#### Q: How do I change the backend URL for the frontend application?
A: Create or edit the `.env` file in your project's root directory and set the `VITE_API_URL` variable to point to your hosted backend.

#### Q: Can I run this database locally?
A: Yes. Replace the cloud `MONGODB_URI` connection string in your backend `.env` file with a local connection string, typically `mongodb://127.0.0.1:27017/startup-crm`.

#### Q: Why is my dashboard blank after logging in?
A: Ensure your user account has leads created. If you have no leads, navigate to the **Leads** catalog and create one.

---

## 🔧 Troubleshooting Guide

#### 1. "Not allowed by CORS" Error
* **Cause:** The backend's `FRONTEND_URL` environment variable does not match the frontend's address.
* **Solution:** Verify the address and port match exactly. If you are developing locally, ensure the backend whitelist includes `http://localhost:5173`.

#### 2. Mongoose Timeout / Connection Issues
* **Cause:** Your IP address is not whitelisted in the MongoDB Atlas console, or your local router's DNS settings are blocking connection lookup requests.
* **Solution:** Whitelist `0.0.0.0/0` (any IP) in MongoDB Atlas for testing, or check `backend/config/database.js` to ensure the DNS server override is working correctly.

#### 3. Frontend App Shows Blank Screen
* **Cause:** The API server is down, or the `VITE_API_URL` variable in your frontend `.env` file is pointing to the wrong address.
* **Solution:** Open your browser's developer console, inspect the failed network requests, and verify the backend API server is running and accessible.

---

## 📝 Changelog

### [v1.0.0] - 2026-07-18
* Initial release of **Startup CRM Lite**.
* Implemented user isolation, MERN CRUD capabilities, and Recharts metrics dashboards.
* Configured CORS, Helmet protection, express-mongo-sanitize, and user request rate-limit validation layers.

---

## 📄 License
This project is open-source and licensed under the [ISC License](LICENSE) terms.

---

## 🏆 Credits & Acknowledgements
* **Lucide React Team:** Providing modern vector iconography.
* **Tailwind CSS Team:** Delivering clean, CSS-variable-based layout utility styles.
* **Mongoose & MongoDB Teams:** Simplifying document validation pipelines.

---

## ✉️ Contact Information
For questions, support, or security notifications, please contact:
* **Lead Architect:** Sasikala Velpula
* **GitHub Repository:** [Sasikalavelpula/startup-crm-lite](https://github.com/Sasikalavelpula/startup-crm-lite)

---

## 🏁 Final Project Summary
**Startup CRM Lite** is a lightweight, secure MERN platform designed to help startup teams organize, track, and analyze their sales pipeline. Built with secure authentication, user isolation, data visualization charts, and responsive layouts, it serves as an excellent developer template or standalone pipeline manager for founders and growing teams.
