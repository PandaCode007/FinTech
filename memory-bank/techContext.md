# Technical Context: FinTech Butterfield Banking Platform

## Technologies Used

### Legacy PHP App (`Main php app/`)
- **Framework**: CodeIgniter 4 (PHP MVC framework)
- **Language**: PHP 8.4
- **Database**: MySQL/MariaDB via `mysqli`
- **Web Server**: Apache with `.htaccess` rewrites
- **Templating**: Native PHP views with multiple themes
- **Password Hashing**: PHPass (Portable PHP password hashing framework)
- **Session**: PHP native sessions with file-based storage
- **File Uploads**: Standard PHP file handling

### MERN Stack (Target - In Progress)
- **Frontend**: React 18+ with Vite, Tailwind CSS, React Router v6
- **Backend**: Node.js with Express 4
- **Database**: MongoDB Atlas (cloud-hosted)
- **ODM**: Mongoose 7+
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Uploads**: Multer
- **HTTP Client**: Axios

### External Auth System (`auth.butterfield/`)
- **Frontend**: Static HTML/CSS/JS
- **Backend**: PHP scripts for code retrieval and payment processing
- **API**: JSON-based communication with main app
- **Migration**: Partial MERN migration in `auth-react/` (React TypeScript)

## Development Setup
- **OS**: Windows 11 (development)
- **IDE**: VS Code
- **Version Control**: Git (GitHub remote)
- **Node Version**: Latest stable (managed via npm)
- **MongoDB Connection**: Atlas cluster with SRV connection string
- **Port**: Backend on 3000, Frontend on Vite dev server (default 5173)

## Technical Constraints
1. **PHP Password Compatibility**: Existing users have PHPass-hashed passwords; migration needs to handle both old and new hashing
2. **Session Migration**: PHP session-based auth → JWT stateless auth
3. **SQL to NoSQL**: Complex relational queries (JOINs, aggregations) need MongoDB equivalents
4. **File Uploads**: KYC documents, profile images stored on filesystem, served via Express static
5. **Theme System**: PHP supports multiple themes (bank-pro, finapp-light); React needs a unified theming approach
6. **External Auth**: Separate auth system for code retrieval must integrate with main app

## Dependencies

### Backend (`backend/package.json`)
- express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs, multer

### Frontend (`frontend/package.json`)
- react, react-dom, react-router-dom, axios, tailwindcss, vite

### Legacy PHP Dependencies
- CodeIgniter 4 core framework
- PHPass password compatibility library
- reCAPTCHA (Google)

## Key Design Patterns
1. **MVC Architecture** (PHP) → **Component-based Architecture** (React)
2. **Session-based Auth** → **JWT Token Auth**
3. **Server-side Rendering** (PHP views) → **Client-side Rendering** (React SPA)
4. **Active Record Pattern** (CodeIgniter Models) → **Repository Pattern** (Mongoose Models)
5. **Helper Functions** (PHP Common.php) → **Utility Modules** (Node.js utils)