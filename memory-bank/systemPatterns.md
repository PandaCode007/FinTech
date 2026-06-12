# System Patterns: FinTech Butterfield Banking Platform

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Frontend (React SPA)                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │ Landing  │ │ Dashboard│ │ Admin    │ │ Auth/Codes    │  │
│  │ Pages    │ │ (User)   │ │ Dashboard│ │ (Code Retrieval│  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘  │
│         │           │           │              │            │
│         └───────────┴───────────┴──────────────┘            │
│                         │ Axios API                          │
│                    /api/* calls                              │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    Backend (Express/Node.js)                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │ Auth     │ │ User     │ │ Admin    │ │ Public        │  │
│  │ Routes   │ │ Routes   │ │ Routes   │ │ Routes        │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬────────┘  │
│       │            │            │               │           │
│  ┌────▼────────────▼────────────▼───────────────▼────┐      │
│  │           Mongoose Models / Controllers            │      │
│  │  User, Admin, Transfer, TempTransfer, Transaction  │      │
│  │  SupportTicket, Notification, Beneficiary, etc.   │      │
│  └───────────────────────┬───────────────────────────┘      │
│                          │                                   │
│              ┌───────────▼───────────┐                       │
│              │   MongoDB Atlas       │                       │
│              └───────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Legacy (PHP CodeIgniter 4)                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │Controllers│   Models   │   Views    │  Config/Routes  │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘  │
│              MySQL Database (butterfield.sql)                │
└─────────────────────────────────────────────────────────────┘
```

## Key Technical Decisions

### 1. PHP → MERN Migration Strategy
- **Controllers → Routes**: Each PHP controller method maps to an Express route handler
- **Models → Mongoose Schemas**: Each PHP model (with SQL queries) maps to a Mongoose schema/model
- **Views → React Components**: Each PHP view template maps to a React component
- **Session → JWT**: PHP sessions replaced with JWT tokens stored in localStorage
- **Password PHPass → bcryptjs**: Legacy PHPass passwords handled via fallback comparison in User.comparePassword()

### 2. MongoDB Collections and SQL Table Mapping

| MySQL Table | MongoDB Collection | Mongoose Model | Status |
|-------------|-------------------|----------------|--------|
| ci_accounts | users | User | ✅ Migrated |
| ci_admin | admins | Admin | ✅ Migrated |
| ci_transactions | transactions | Transaction | ✅ Migrated |
| ci_transfer | transfers | Transfer | ✅ Migrated |
| ci_temp_transfer | temptransfers | TempTransfer | ✅ Migrated |
| ci_beneficiary | beneficiaries | Beneficiary | ✅ Migrated |
| ci_support_tickets | supporttickets | SupportTicket | ✅ Migrated |
| ci_notifications | notifications | Notification | ✅ Migrated |
| ci_settings | settings | Setting | ✅ Migrated |
| ci_payment_gateways | paymentgateways | PaymentGateway | ✅ Migrated |
| ci_faqs | faqs | FAQ | ✅ Migrated |
| ci_testimonials | testimonials | Testimonial | ✅ Migrated |
| ci_news | news | News | ✅ Migrated |
| ci_basic | basiccontents | BasicContent | ✅ Migrated |
| ci_email_template | emailtemplates | EmailTemplate | ✅ Migrated |
| ci_checks | checkdeposits | CheckDeposit | ✅ Migrated |
| auth_accounts | authaccounts | AuthAccount | ✅ Migrated |
| auth_config | authconfigs | AuthConfig | ✅ Migrated |
| ci_sessions | *(not migrated - replaced by JWT)* | - | ❌ Replaced |

### 3. Route Architecture

```
/api/auth/*        → Auth routes (login, register, admin login, OTP verify)
/api/user/*        → User routes (dashboard, transfers, beneficiaries, tickets, profile)
/api/admin/*       → Admin routes (stats, users, transfers, tickets, settings)
/api/public/*      → Public routes (about, terms, FAQs, news, auth lookup, auth config)
```

### 4. Component Architecture (Frontend)

```
src/
├── api.js              # Axios API client with all endpoint functions
├── App.jsx             # React Router configuration
├── main.jsx            # Entry point
├── index.css           # Global styles + Tailwind
└── pages/
    ├── Landing.jsx         # Public landing/banking website
    ├── Login.jsx           # User login form
    ├── Register.jsx        # User registration with KYC
    ├── OtpVerify.jsx       # OTP verification page
    ├── Dashboard.jsx       # User banking dashboard
    ├── Transfer.jsx        # Fund transfer page
    ├── Beneficiaries.jsx   # Beneficiary management
    ├── Support.jsx         # Support ticket system
    ├── AdminLogin.jsx      # Admin authentication
    ├── AdminDashboard.jsx  # Admin management panel
    ├── AuthLogin.jsx       # Auth code system login
    ├── CodeRetrieval.jsx   # Code retrieval (COT/IMF/Tax)
    ├── PaymentProcess.jsx  # Payment processing page
    ├── AuthSuccess.jsx     # Auth success page
    └── AuthFailed.jsx      # Auth failure page
```

## Critical Implementation Paths

### 1. Account Registration Flow
PHP Home::open_account() → POST /api/auth/register (Express)
- Validates reCAPTCHA (or skips)
- Generates account_id, savings_acc, check_acc, COT/Tax/IMF codes
- Handles KYC/passport file uploads
- Creates user with "Dormant" status (pending admin approval)
- Sends confirmation email
- In Node: simplified to "Active" status, JWT returned immediately

### 2. User Login Flow
PHP Auth::login() → POST /api/auth/login (Express)
- User identified by account_id OR check_acc OR savings_acc
- Password verified via PHPass CheckPassword() or bcrypt comparePassword()
- OTP generation (commented out in PHP, active in Node)
- Login notification email
- Session created with user_id

### 3. Fund Transfer Flow
PHP User::transfer() → POST /api/user/transfer (Express)
- PIN validation required
- Status checks (Dormant, Blocked, etc.)
- Balance verification
- COT code check if status is "CotExpire"
- Savings or checking account debit
- Internal/External/Wire transfer types
- Monthly credit/debit tracking

### 4. Admin Flow
PHP Admin controllers → /api/admin/* (Express)
- Admin login with JWT
- User management (CRUD, status changes, balance adjustments)
- Transaction oversight
- Support ticket management
- System settings management

## Design Patterns in Use

1. **Middleware Chain Pattern**: authMiddleware validates JWT, attaches user/admin to req
2. **Repository Pattern**: Mongoose models abstract database operations
3. **Controller Pattern**: Route handlers contain business logic (migrated from PHP controllers)
4. **Component Composition**: React pages composed of reusable UI elements
5. **API Gateway Pattern**: Single Express server routes to modular route files
6. **Seeder Pattern**: Initial data seeding for defaults (admin account, settings)