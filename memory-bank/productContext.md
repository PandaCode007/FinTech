# Product Context: Butterfield Banking Platform

## Why This Project Exists
This project is a comprehensive digital banking platform designed to provide a full suite of online banking services. It was originally built as a PHP/CodeIgniter application to serve as a modern banking website with customer-facing features, user account management, and administrative oversight. The ongoing migration to MERN architecture aims to modernize the stack for better performance, scalability, and developer experience.

## Problems It Solves
1. **Digital Banking Access** - Provides customers with 24/7 access to their accounts, balances, and transaction history
2. **Online Account Opening** - Streamlines the account registration process with KYC document upload
3. **Fund Transfers** - Enables both internal and external fund transfers between accounts
4. **Code Retrieval System** - External authentication system allowing users to retrieve banking codes (COT, IMF, Tax) through a separate payment process
5. **Admin Oversight** - Administrative dashboard for managing users, monitoring transactions, handling support tickets
6. **Customer Support** - Built-in ticketing system for customer support requests

## How It Should Work

### User Flow
1. **Visitor** → Lands on public banking website → Views services, FAQs, news
2. **Registration** → Opens account via form → Provides personal info + KYC documents → Receives account ID
3. **Login** → Authenticates with account ID + password → OTP verification → Access dashboard
4. **Dashboard** → View balances (checking/savings), recent transactions, monthly summaries
5. **Banking Operations** → Transfer funds, manage beneficiaries, view history, update profile
6. **Code Retrieval** → External users authenticate → Pay for codes → Receive COT/IMF/Tax codes
7. **Support** → Submit tickets, track resolution status

### Admin Flow
1. **Admin Login** → Secure admin authentication → Dashboard overview
2. **User Management** → View all users, approve accounts, modify statuses, manage balances
3. **Transaction Oversight** → View all transfers, create manual transactions
4. **Content Management** → Manage FAQs, news, testimonials, site settings, email templates
5. **Support Management** → View and respond to support tickets

## User Experience Goals
- Clean, professional banking interface
- Responsive design for mobile and desktop
- Secure authentication flow
- Real-time balance and transaction updates
- Intuitive navigation between banking features
- Professional banking aesthetic with modern UI components