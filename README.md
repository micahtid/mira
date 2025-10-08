# Mira

> **Role:** Project Lead & Full-Stack Developer
> **Status:** Halted — Limited reach in niche market

## Overview
**Mira** is a two-sided platform designed to connect **youth-led organizations** with potential interns and volunteers.
**Key functions:**
- Post and manage onsite or remote internship and volunteer opportunities
- Review applications, select candidates, and track placements
- Browse and apply for opportunities as a high school student
- Manage all activity through role-specific dashboards
- Enhance workflow with email notifications and Stripe-powered subscriptions

---

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router for server-side rendering and routing
- **React 19** - UI component library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library for smooth transitions and interactions
- **Radix UI** - Unstyled, accessible component primitives
- **React Hook Form** - Form validation and management
- **Zustand** - Lightweight state management

### Backend & Database
- **Firebase 11** - Backend-as-a-Service platform
  - **Firestore** - NoSQL cloud database for storing user data, positions, and applications
  - **Firebase Authentication** - User authentication and authorization
  - **Firebase Storage** - File storage for user uploads
- **Nodemailer** - Email notification system
- **Resend** - Transactional email service

### UI/UX Libraries
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets
- **React Hot Toast** - Toast notifications
- **React Select** - Custom select dropdowns
- **TSParticles** - Particle animations for landing page
- **Lenis** - Smooth scrolling experience

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS transformations
- **date-fns** - Date utility library

---

## Project Structure

```
mira/
├── app/                              # Next.js App Router directory
│   ├── applicant-dashboard/          # Student dashboard routes
│   │   ├── components/               # Dashboard-specific components
│   │   └── page.tsx                  # Main applicant dashboard page
│   ├── organization-dashboard/       # Organization dashboard routes
│   │   ├── components/               # Dashboard-specific components
│   │   └── page.tsx                  # Main organization dashboard page
│   ├── organization/                 # Organization public profile routes
│   ├── register/                     # User registration flow
│   ├── terms-and-policy/             # Legal pages
│   ├── globals.css                   # Global styles and utility classes
│   ├── layout.tsx                    # Root layout component
│   └── page.tsx                      # Landing page
│
├── components/                       # Reusable React components
│   ├── landing-page/                 # Landing page sections
│   │   ├── ui/                       # Landing page UI primitives
│   │   ├── Hero.tsx                  # Hero section
│   │   ├── Features.tsx              # Features showcase
│   │   ├── Pricing.tsx               # Pricing plans
│   │   ├── FAQ.tsx                   # Frequently asked questions
│   │   ├── CTA.tsx                   # Call-to-action section
│   │   ├── Footer.tsx                # Footer component
│   │   └── VideoDemo.tsx             # Demo video section
│   ├── dashboard/                    # Shared dashboard components
│   └── common/                       # Common shared components
│
├── utils/                            # Utility functions
│   └── firebaseFunctions.ts          # Firebase integration logic
│
├── hooks/                            # Custom React hooks
├── lib/                              # Library configurations
├── providers/                        # Context providers
├── data/                             # Static data and constants
└── public/                           # Static assets (images, icons)
```

---

## Dashboard Architecture

### Applicant Dashboard (`/applicant-dashboard`)
The student-facing dashboard where applicants can:
- **Browse Positions**: Search and filter volunteer/internship opportunities
- **Submit Applications**: Apply to positions with custom application forms
- **Track Applications**: Monitor application status (pending, accepted, rejected)
- **Manage Profile**: Update student profile, skills, and availability

**Key Components:**
- Position browsing and filtering system
- Application submission forms
- Application status tracking
- User profile management

### Organization Dashboard (`/organization-dashboard`)
The organization-facing dashboard where nonprofits can:
- **Post Positions**: Create and manage volunteer/internship listings
- **Review Applications**: View and evaluate applicant submissions
- **Manage Candidates**: Accept or reject applications
- **Track Placements**: Monitor filled positions and volunteer engagement
- **Subscription Management**: Upgrade to Pro plan via Stripe integration

**Key Components:**
- Position creation and management
- Application review system
- Candidate selection workflow
- Analytics and reporting
- Stripe payment integration

---

## Applicant Dashboard
| Dashboard View 1 | Dashboard View 2 | Dashboard View 3 |
|------------------|------------------|------------------|
| <img src="https://micahtid.vercel.app/mira/2.jpg" width="300"/> | <img src="https://micahtid.vercel.app/mira/3.jpg" width="300"/> | <img src="https://micahtid.vercel.app/mira/4.jpg" width="300"/> |

## Organization Dashboard
| Dashboard View 1 | Dashboard View 2 |
|------------------|------------------|
| <img src="https://micahtid.vercel.app/mira/5.jpg" width="300"/> | <img src="https://micahtid.vercel.app/mira/6.jpg" width="300"/> |

---

## Key Features

### For Students
- Browse youth-led volunteer opportunities
- Filter by location, type, and commitment level
- Submit applications with custom questions
- Track application status in real-time
- Receive email notifications for updates

### For Organizations
- Post unlimited positions (Pro plan)
- Customize application questions
- Review and manage applicants
- Email communication system
- Subscription tiers (Free & Pro)

---

## Getting Started

### Prerequisites
- Node.js 20+
- Firebase account
- Stripe account (for payments)

### Installation
```bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
STRIPE_SECRET_KEY=
RESEND_API_KEY=
```

---

Built with ❤️ by Micah Tid
