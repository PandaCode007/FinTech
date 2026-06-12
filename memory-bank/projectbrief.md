# Project Brief: FinTech Butterfield Banking Application

## Overview
This is a full-stack FinTech banking application originally built on PHP (CodeIgniter 4) with MySQL, being actively migrated to a MERN stack (MongoDB, Express, React, Node.js). The application is a complete online banking platform with user-facing banking features, an admin dashboard, and an external authentication/code retrieval system.

## Core Requirements

### Original PHP Application (Legacy)
- **Framework**: CodeIgniter 4
- **Database**: MySQL (MariaDB via cPanel)
- **Structure**: MVC architecture with Controllers, Models, Views
- **Authentication**: PasswordHash (PHPass) for password hashing, session-based auth
- **Templates**: Multiple theme support (bank-pro, finapp-light)

### Target MERN Stack (In Progress)
- **Frontend**: React 18+ with Vite, Tailwind CSS, React Router
- **Backend**: Node.js with Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT-based with bcrypt password hashing

## Key Features
1. **Public Banking Website** - Landing pages with services, FAQs, testimonials, news
2. **User Banking Portal** - Dashboard, transfers, beneficiaries, support tickets, profile management
3. **Admin Dashboard** - User management, transaction oversight, settings, support ticket management
4. **Auth/Codes System** - External authentication for code retrieval (COT, IMF, Tax codes), payment processing
5. **Account Management** - Registration with KYC upload, login with OTP, password reset

## Project Status
The PHP source is in `Main php app/` directory. A partial MERN migration exists in `backend/` and `frontend/` directories. Additional auth-related functionality is in `auth.butterfield/` and `auth-react/`. The migration is ongoing with many PHP controllers/views still needing conversion.