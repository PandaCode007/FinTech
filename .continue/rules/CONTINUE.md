# Project Guide: RCB-BANK FinTech Platform

This document serves as a comprehensive guide for new and existing team members working on the RCB-BANK platform. This project utilizes a modern, decoupled architecture blending traditional PHP backend frameworks with cutting-edge React frontend components and specialized Node.js APIs.

## 🚀 Project Overview

**Purpose:**
The RCB-BANK platform is a unified FinTech application designed to manage various banking services. Its goal is to provide a seamless, feature-rich user experience by integrating multiple backend logic layers (PHP for core business logic, Node.js/Express for specialized microservices, and React for the presentation layer).

**Key Technologies Used:**
*   **Frontend:** React (SPA), Vite, Tailwind CSS.
*   **Backend Core Logic:** PHP (CodeIgniter framework - MVC Pattern).
*   **API & Services:** Node.js, Express.js, Mongoose (for MongoDB interactions).
*   **State Management/Auth:** JWT (JSON Web Tokens), BcryptJS.

**High-Level Architecture:**
The system employs a tiered architecture:
1.  **Client Tier (Frontend):** React SPA handles all user interaction and renders components. It communicates exclusively via REST APIs.
2.  **API Gateway/Proxy:** The entry point for the frontend, routing requests to appropriate backends.
3.  **Business Logic Tier (PHP/CodeIgniter):** Handles core banking functions (e.g., account management, transaction history) using robust PHP MVC patterns.
4.  **Microservice Tier (Node/Express):** Manages specialized, high-throughput services (e.g., payment processing, complex data synchronization).

## ⚙️ Getting Started

### Prerequisites
You must have the following installed on your development machine:
1.  **PHP:** Version `7.4` or higher (Required for CodeIgniter core logic).
2.  **Composer:** PHP package manager (`composer global require composer`).
3.  **Node.js & npm/yarn:** For managing React and Node dependencies.
4.  **Database:** Access to both MySQL/MariaDB (used by CI) and MongoDB (used by the Node API).

### Installation Instructions
The project structure requires multiple installation steps due to its hybrid nature:

1.  **Install PHP Dependencies (Core Backend):**
    ```bash
    composer install --working-dir=backend/ # Adjust path if needed
    # Follow any necessary database migrations for CodeIgniter
    ./app/spark migrate 
    ```
2.  **Install Node.js Dependencies (Frontend & Secondary API):**
    *   (Assuming root `package.json` handles coordination)
    ```bash
    npm install # Installs common dependencies
    cd backend && npm install # Installs Express/Mongoose dependencies
    cd frontend && npm install # Installs React/Vite dependencies
    ```

### Running the Application
To start the full stack, use the provided scripts:

*   **Development Mode (Recommended):**
    ```bash
    npm run dev 
    # This command uses 'concurrently' to start both PHP and React servers simultaneously.
    ```
*   **Build Production Assets:**
    ```bash
    cd frontend && npm run build # Builds optimized static assets
    # Followed by a manual deployment step for the backend services.
    ```

### Running Tests
Testing should be done modularly:
1.  **Unit/Integration Tests (PHP):** Use CodeIgniter's testing utilities or PHPUnit.
2.  **API Logic Tests (Node/Express):** Write tests using Jest/Mocha within the `backend` directory.
3.  **Component Tests (React):** Use React Testing Library within the `frontend` directory.

## 📂 Project Structure

| Directory | Purpose | Key Technologies | Role |
| :--- | :--- | :--- | :--- |
| **app/** | Core PHP application logic. Contains Controllers, Models, Views, and Config files for CodeIgniter. | PHP, CI Framework | Primary business logic (legacy/core). |
| **backend/** | Node.js API layer. Houses specialized microservices, handles MongoDB interaction, and manages JWT validation. | Node.js, Express, Mongoose | Secondary service layer (API calls). |
| **frontend/** | The Single Page Application (SPA). All UI components are defined here. | React, Vite, JavaScript/TypeScript | Presentation Layer (User Interface). |
| **public/** / **writable/** | Publicly accessible assets and temporary data storage (sessions, uploads, caches). | N/A | System operational files. |
| **config/** (.env) | Environment variables for configuration (DB credentials, API keys). | .env | Configuration management. |

## 🛠️ Development Workflow

### Coding Standards & Conventions
*   **PHP:** Adhere to PSR-12 standards within the `app/` directory. Use meaningful naming conventions (e.g., `camelCase` for methods, `PascalCase` for classes).
*   **React:** Use functional components and hooks. Maintain strict separation between presentation logic and state management (Context API recommended).
*   **Node/Express:** Follow standard RESTful API design principles (`GET /resource`, `POST /resource`).

### Testing Approach
We follow a pyramid testing approach:
1.  **Unit Tests:** Test isolated functions and components.
2.  **Integration Tests:** Verify that services (e.g., React component talking to the Express endpoint) work together correctly.
3.  **End-to-End (E2E) Tests:** Simulate full user flows using tools like Cypress or Playwright across the entire stack.

### Build and Deployment Process
1.  **Frontend:** Run `npm run build` in `frontend/`. This generates optimized static assets that must be served by the main web server.
2.  **Backend (PHP):** Ensure all database migrations are run (`./app/spark migrate`). PHP code is deployed to the standard PHP runtime environment.
3.  **Backend (Node):** Build and test the Express services separately. The API endpoints must be containerized (Docker recommended) for stable deployment.

### Contribution Guidelines
*   Before creating a new feature or bug fix, create a dedicated branch (`git checkout -b feature/issue-description`).
*   Write corresponding unit tests covering all affected paths before submitting a Pull Request.
*   Ensure documentation updates are included with the code changes.

## ✨ Key Concepts

**Domain Terminology:**
*   **FinTech:** Financial Technology—the umbrella term for this system's purpose.
*   **SPA (Single Page Application):** The frontend experience, where only data/components change rather than reloading the entire page.
*   **CodeIgniter MVC:** A Model-View-Controller pattern used for core backend PHP logic.
*   **Middleware:** Functions executed in Express.js or CodeIgniter before the main request handler runs (used heavily for authentication and logging).

**Core Abstractions & Patterns:**
*   **Repository Pattern (PHP):** Used in `app/` to abstract database access away from business logic, making testing easier.
*   **Client-Server Architecture:** Clear separation where React is the client and both PHP and Node are dedicated servers.
*   **Authentication Flow:** Client sends credentials $\rightarrow$ API Gateway intercepts $\rightarrow$ Auth service validates (using `bcryptjs` & JWT) $\rightarrow$ Token issued and stored on the client side.

## 🏃 Common Tasks Guides

### Task: Adding a New Feature Endpoint
1.  Determine if the feature belongs in **PHP/CodeIgniter** (core banking logic, e.g., calculating interest) or **Node.js/Express** (specialized service, e.g., SMS integration).
2.  If Node.js: Create the route handler in `backend/`, implement business logic, and ensure validation middleware is used.
3.  If PHP: Define a new Controller in `app/Controllers/` that calls necessary Models in `app/Models/`.
4.  Update the React component (`frontend/src/...`) to consume this new endpoint.

### Task: Debugging CORS Issues
When running the frontend and backend concurrently, cross-origin restrictions (CORS) are common. Ensure your root server or proxy is configured to allow requests from `http://localhost:3000` (React default port) to all necessary API origins (`*`). Check `backend/config/cors.js` for proper settings.

## ⚠️ Troubleshooting

| Issue | Possible Cause | Solution |
| :--- | :--- | :--- |
| **"Cannot read properties of undefined..."** (React) | State or props were accessed before initialization, or a dependency is missing in the `useEffect`. | Check component lifecycle hooks; ensure all required data is loaded via API calls first. |
| **API returns 500 Internal Server Error.** | Usually PHP syntax error, database connection failure, or middleware exception. | Check PHP logs (`writable/logs/`) and Node crash logs (`backend/error_log`). Always validate environment variables in `.env`. |
| **Stale Data on Frontend.** | The cache is holding outdated state or the backend API wasn't forced to refresh data. | Implement a simple cache-busting mechanism (e.g., adding timestamps to API response headers) or use React Query for robust fetching management. |

## 📚 References

*   [CodeIgniter Documentation](https://codeigniter.com/)
*   [React Official Docs](https://react.dev/)
*   [Express.js Guide](https://expressjs.com/guidebook)
*   **Important:** Always consult the specific READMEs for the `backend/` and `frontend/` directories for detailed, module-specific instructions.