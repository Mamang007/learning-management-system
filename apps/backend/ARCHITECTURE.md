# Backend Architecture & Strategy

This document outlines the chosen architecture and implementation strategy for the ElysiaJS backend, tailored specifically for the LMS project's requirements.

## Chosen Architecture: Feature-Based Modular Approach

We use a modular structure where code is grouped by **domain feature** rather than technical role. This maximizes cohesion and leverages ElysiaJS's plugin system effectively.

### Directory Structure

```text
apps/backend/src/
├── index.ts              # Main entry point (Elysia app setup, CORS, global error handling)
├── db/                   # Database connection (re-exported from packages/database)
├── middleware/           # Shared Elysia plugins (e.g., auth header parser)
└── modules/              # Domain-specific feature modules
    ├── users/            # Profile management (User role)
    ├── catalogue/        # Public products and mixed-auth reading
    └── admin/            # Superadmin CMS routes (Users, Products)
```

## Use Case Handling & Security Boundaries

The architecture is designed to handle the mixed authentication requirements outlined in the PRD using Elysia's local middleware and guards (`onBeforeHandle`).

### 1. Mixed-Auth Read Access (Catalogue)
*   **Location:** `modules/catalogue/`
*   **Strategy:** Routes are public by default. The controller checks for the presence of the `user` object (injected by the global auth middleware via proxy headers).
*   **Behavior:** 
    *   If no user: Returns standard public product data.
    *   If user exists: Modifies the response to include ownership flags (e.g., `isBought: true`).

### 2. User Profile Management (Users)
*   **Location:** `modules/users/`
*   **Strategy:** The entire module is protected by a local guard requiring authentication.
*   **Security:** Routes act strictly on the authenticated `user.id` from the context, preventing users from modifying other profiles via URL parameters.

### 3. CMS & Administration (Admin)
*   **Location:** `modules/admin/`
*   **Strategy:** The entire module is protected by a strict local guard requiring `user.role === 'SUPERADMIN'`.
*   **Responsibilities:** 
    *   **Product Management:** CREATE, UPDATE, DELETE routes for products live here (not in `catalogue`).
    *   **User Management:** Viewing registration stats and managing users.

## Global Application Flow (`index.ts`)

The main entry point remains clean and declarative, composing the application from these isolated modules:

```typescript
// Conceptual Flow
import { Elysia } from "elysia";
import { authMiddleware } from "./middleware/auth"; 
import { catalogueModule } from "./modules/catalogue/catalogue.controller";
import { usersModule } from "./modules/users/users.controller";
import { adminModule } from "./modules/admin/admin.controller";

const app = new Elysia()
  .use(authMiddleware) // 1. Global: Parse proxy headers (x-user-id, x-user-role)
  .use(catalogueModule) // 2. Public/Mixed routes
  .use(usersModule)     // 3. Authenticated-only routes
  .use(adminModule)     // 4. Superadmin-only routes
  .listen(process.env.PORT || 3001);
```