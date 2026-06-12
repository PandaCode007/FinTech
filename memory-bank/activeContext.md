# Active Context: FinTech Butterfield Banking Platform

## Current Work Focus
PHP-to-MERN migration is complete. All PHP app pages, routes, controllers, and models have been migrated to React/Node.js/MongoDB. The app now runs as a unified MERN stack application with a clean project structure.

## Recent Changes (Latest Session)
- **Project cleanup**: Removed all PHP-related folders (app/, system/, Main php app/, auth.butterfield/, auth-react/, assets/, templates/, themes/, sessions/, uploads/, writable/) and PHP config files (.htaccess, php.ini, phpinfo.php, etc.)
- **Black theme**: Changed default CSS theme from dark blue (#0a0a1a) to pure black (#000000) for a professional look
- **Dark/Light toggle**: Added theme toggle button (sun/moon icon) in the header nav bar with localStorage persistence
- **Light theme support**: Added complete light mode CSS overrides with data-theme="light" selector
- **Admin login UI**: Rebuilt AdminLogin page with professional styling using bf-* design system classes
- **Admin credentials**: Updated seeder to use pandashoki / Loskiloose00@@22 (auto-updates existing admin)
- **Public settings endpoint**: Added /api/public/settings route so frontend can fetch company settings without auth

## Architecture (Final)
```
FinTech/
├── frontend/          # React + Vite (20 pages, Header/Footer components)
├── backend/           # Node.js + Express + MongoDB
│   ├── models/        # 13 MongoDB models (User, Admin, Transaction, Transfer, etc.)
│   ├── routes/        # auth, user, admin, public
│   ├── controllers/   # userController, adminController, pagesController
│   └── utils/         # seeder, migrateFromSQL
├── memory-bank/       # Project documentation
└── workflows/         # GitHub Actions
```

## Active Decisions & Considerations

### 1. Theme System
- Default theme: Dark (pure black #000000)
- Toggle button in header persists to localStorage
- CSS uses data-theme attribute on <html> element
- All bf-* component classes support both themes

### 2. Admin Credentials
- Username: pandashoki
- Password: Loskiloose00@@22
- Seeder auto-updates on server restart if credentials don't match

### 3. MongoDB Connection
- Connected via MONGODB_URI env var
- Default: mongodb+srv://FinTech cluster
- Seeder runs on startup if collections are empty

## Next Steps (Priority Order)
1. **Real Email Integration**: Replace console.log OTP with actual email sending (Nodemailer)
2. **Admin Dashboard Enhancement**: Full user management, settings editing, ticket management UI
3. **Testing**: End-to-end testing of all user flows
4. **Deployment**: Production deployment configuration

## Important Patterns & Preferences
- All API routes use JWT middleware for protected endpoints
- Frontend uses localStorage for token management
- Backend uses `authMiddleware('role')` pattern for role-based access
- CSS uses bf-* design system with CSS custom properties for theming
- Theme toggled via data-theme attribute on document element
- Memory bank must be updated per .clinerules/MemoryBank.md

## Learnings & Insights
- The PHP code had extensive commented-out code and debug statements
- Most PHP features had placeholder implementations
- The auth.butterfield system was a separate authentication/code-selling system
- SQL database had ~19 tables mapped to 13 MongoDB models
- JWT replaced session-based auth (ci_sessions table not needed)
- The app uses both Tailwind CSS (dashboard pages) and bf-* custom CSS (public pages)