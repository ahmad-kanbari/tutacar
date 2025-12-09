## REVISED TECH STACK REQUIREMENTS (Next.js Architecture)

### Frontend (Mobile App)
- React Native with Expo (for cross-platform iOS/Android)
- React Navigation for routing
- Zustand for state management (lighter than Redux)
- Axios or Fetch API for API calls
- React Native Maps for location features
- Firebase for push notifications and real-time chat
- AsyncStorage for local data persistence
- React Query (TanStack Query) for data fetching and caching

### Frontend & Backend (Web Dashboards - Unified with Next.js 14+)
- **Next.js 14+ with App Router** (replaces separate React + Node.js)
- TypeScript for type safety across full stack
- **Server Components** for improved performance
- **Server Actions** for form submissions and mutations
- **API Routes** (app/api/) for backend endpoints
- React Router NOT needed (Next.js built-in file-based routing)
- Tailwind CSS + **shadcn/ui** for UI components
- Recharts or Chart.js for analytics visualizations
- **tRPC** for end-to-end type-safe API calls (optional but recommended)
- **Zod** for schema validation on both client and server
- **NextAuth.js (Auth.js v5)** for authentication
- **Prisma ORM** for database operations
- **React Query (TanStack Query)** for client-side data fetching

### Database & Storage
- **PostgreSQL** (hosted on Supabase, Neon, or AWS RDS)
- **Prisma ORM** for type-safe database queries
- **Prisma Client** for migrations and seeding
- **AWS S3** or **Cloudflare R2** for file storage (images, documents)
- **Vercel Blob** for quick file uploads (alternative)

### Real-time & Background Services
- **Separate Node.js microservice** ONLY for:
  * **Socket.io** (real-time chat between drivers and mechanics)
  * **Bull/BullMQ** (job queues for background tasks)
  * Webhook handlers (Stripe, third-party integrations)
- Deploy this separately from Next.js app

### Authentication & Authorization
- **NextAuth.js v5 (Auth.js)** integrated with Next.js
- JWT tokens with HTTP-only cookies
- Role-based access control (RBAC): driver, mechanic, admin
- Session management with Prisma adapter
- OAuth providers: Google, Facebook (optional)

### Payment Processing
- **Stripe** for payment processing
- Stripe Checkout for hosted payment pages
- Stripe Webhooks handled in API routes
- Stripe SDK integrated in Next.js API routes

### Email & Notifications
- **Resend** or **SendGrid** for transactional emails (better than Nodemailer)
- Email templates with **React Email**
- **Firebase Cloud Messaging (FCM)** for mobile push notifications
- In-app notifications stored in database

### File Upload & Processing
- **uploadthing** (Next.js-friendly) or **Vercel Blob**
- Image optimization with **next/image**
- Alternative: **AWS S3** with **@aws-sdk/client-s3**
- File validation with **Zod schemas**

### API Architecture
- **Next.js API Routes** (app/api/) for REST endpoints
- **tRPC** for type-safe RPC calls (highly recommended)
- **Server Actions** for form submissions and mutations
- Input validation with **Zod**
- Error handling with try-catch and error boundaries
- Rate limiting with **@upstash/ratelimit** or **express-rate-limit** (for Socket.io service)

### Security & Middleware
- **Next.js Middleware** for:
  * Authentication checks
  * Route protection
  * CORS configuration
  * Request logging
- **Helmet.js** for security headers (in Socket.io service)
- Input sanitization with **validator.js**
- SQL injection prevention (Prisma handles this)
- XSS protection built into React/Next.js
- CSRF protection with NextAuth.js

### Development & Build Tools
- **TypeScript** for entire codebase
- **ESLint** + **Prettier** for code formatting
- **Husky** + **lint-staged** for pre-commit hooks
- **Turbo** or **nx** for monorepo management (optional)
- **Docker** for containerization (optional)

### Testing
- **Jest** for unit tests
- **React Testing Library** for component tests
- **Playwright** for E2E tests (web dashboards)
- **Detox** for E2E tests (React Native)
- **MSW (Mock Service Worker)** for API mocking

### Monitoring & Analytics
- **Vercel Analytics** (built-in with Vercel deployment)
- **Sentry** for error tracking
- **LogRocket** or **Fullstory** for session replay
- **Mixpanel** or **PostHog** for product analytics
- **Uptime monitoring** with UptimeRobot or Checkly

### Deployment & Infrastructure
- **Vercel** (recommended for Next.js - automatic deployment)
- OR **AWS** (EC2/ECS + RDS + S3 for self-hosting)
- **Railway** or **Render** for Socket.io microservice
- **PostgreSQL** on Supabase, Neon, or AWS RDS
- **Redis** on Upstash or AWS ElastiCache (for caching and rate limiting)
- **CDN**: Vercel Edge Network or Cloudflare

### Environment Configuration
- **.env.local** for local development
- **.env.production** for production
- Environment variables managed in Vercel dashboard
- Secrets stored securely (never committed to git)

### CI/CD Pipeline
- **GitHub Actions** or **Vercel CI/CD**
- Automated testing on every PR
- Type checking with TypeScript
- Linting and formatting checks
- Automatic deployment to staging/production
- Database migrations with Prisma Migrate

---

## PROJECT STRUCTURE (Next.js App Router)
```
carconnect-platform/
├── apps/
│   ├── web/                          # Next.js web application
│   │   ├── app/                      # Next.js 14+ App Router
│   │   │   ├── (auth)/              # Auth routes group
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (dashboard)/         # Dashboard routes (protected)
│   │   │   │   ├── mechanic/       # Mechanic dashboard
│   │   │   │   └── admin/          # Admin panel
│   │   │   ├── api/                 # API routes
│   │   │   │   ├── auth/
│   │   │   │   ├── bookings/
│   │   │   │   ├── mechanics/
│   │   │   │   └── webhooks/
│   │   │   ├── layout.tsx           # Root layout
│   │   │   └── page.tsx             # Home page
│   │   ├── components/              # React components
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── forms/
│   │   │   └── layouts/
│   │   ├── lib/                     # Utility functions
│   │   │   ├── prisma.ts           # Prisma client
│   │   │   ├── auth.ts             # NextAuth config
│   │   │   └── utils.ts
│   │   ├── server/                  # Server-only code
│   │   │   ├── actions/            # Server Actions
│   │   │   └── services/           # Business logic
│   │   ├── public/                  # Static files
│   │   ├── middleware.ts            # Next.js middleware
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   └── tsconfig.json
│   │
│   ├── mobile/                       # React Native app
│   │   ├── app/                      # Expo Router
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/                 # API calls
│   │   ├── store/                    # Zustand stores
│   │   ├── utils/
│   │   └── app.json
│   │
│   └── socket-service/               # Separate Node.js service
│       ├── src/
│       │   ├── index.ts             # Socket.io server
│       │   ├── handlers/            # Socket event handlers
│       │   └── middleware/
│       ├── package.json
│       └── Dockerfile
│
├── packages/                         # Shared code (monorepo setup)
│   ├── database/                     # Prisma schema and client
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   └── index.ts
│   │
│   ├── typescript-config/            # Shared TypeScript configs
│   ├── eslint-config/                # Shared ESLint configs
│   └── ui/                           # Shared UI components (optional)
│
├── .github/
│   └── workflows/                    # GitHub Actions CI/CD
│       ├── test.yml
│       └── deploy.yml
│
├── .env.example
├── .gitignore
├── package.json                      # Root package.json (monorepo)
├── turbo.json                        # Turborepo config (if using monorepo)
└── README.md
```

---

## KEY ARCHITECTURAL DECISIONS

### ✅ Why Next.js Over Separate React + Node.js?

1. **Single Codebase**: Frontend and backend in one project
2. **Shared Types**: TypeScript types shared between client and server
3. **Better Performance**: Server components reduce client-side JavaScript
4. **Simplified Deployment**: One deployment instead of two
5. **Built-in API Routes**: No need for separate Express server
6. **Better Developer Experience**: Hot reload for both frontend and backend
7. **SEO Benefits**: Server-side rendering out of the box
8. **Easier Maintenance**: One codebase to update and debug

### ✅ When to Use Separate Socket.io Service?

Keep Socket.io in a separate Node.js service because:
1. Next.js API routes aren't ideal for long-lived WebSocket connections
2. Allows independent scaling of real-time features
3. Can be deployed separately for better resource management
4. Easier to optimize for concurrent connections

### ✅ tRPC vs REST API Routes?

**Use tRPC if:**
- You want end-to-end type safety
- Your team is comfortable with TypeScript
- You want better developer experience
- You're building a monorepo

**Use REST API Routes if:**
- You need public APIs (mobile app from different codebase)
- You want simpler architecture for beginners
- You need compatibility with non-TypeScript clients

**Recommendation**: Start with REST API routes, add tRPC later if needed.

---

## DEVELOPMENT WORKFLOW

### 1. Setup (Day 1)
```bash
# Create Next.js project
npx create-next-app@latest web --typescript --tailwind --app

# Install dependencies
cd web
npm install @prisma/client prisma next-auth zod react-query @tanstack/react-query

# Setup Prisma
npx prisma init

# Install shadcn/ui
npx shadcn-ui@latest init
```

### 2. Database Setup (Day 2)
```bash
# Create schema in prisma/schema.prisma
# Run migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Seed database (optional)
npx prisma db seed
```

### 3. Development (Day 3+)
```bash
# Run Next.js dev server
npm run dev

# Run Prisma Studio (database GUI)
npx prisma studio

# Run Socket.io service (separate terminal)
cd ../socket-service
npm run dev
```

### 4. Testing
```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Type check
npm run type-check

# Lint
npm run lint
```

### 5. Deployment
```bash
# Deploy to Vercel (automatic with GitHub integration)
git push origin main

# Or manual deploy
vercel --prod

# Deploy Socket.io service to Railway
railway up
```

---

## ENVIRONMENT VARIABLES REQUIRED
```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email
RESEND_API_KEY=""
EMAIL_FROM="noreply@tutaller.com"

# File Upload
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

# Firebase (for mobile push notifications)
FIREBASE_PROJECT_ID=""
FIREBASE_PRIVATE_KEY=""
FIREBASE_CLIENT_EMAIL=""

# Socket.io Service
SOCKET_SERVICE_URL="http://localhost:3001"

# Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Monitoring
SENTRY_DSN=""
NEXT_PUBLIC_SENTRY_DSN=""
```

---

## COMPARISON: OLD vs NEW STACK

| **Aspect** | **Old (React + Node.js)** | **New (Next.js)** |
|------------|---------------------------|-------------------|
| **Projects** | 2 separate (frontend + backend) | 1 unified project |
| **Type Safety** | Separate type definitions | Shared types end-to-end |
| **Deployment** | 2 deployments | 1 deployment |
| **API Calls** | Axios to external API | Direct server functions or API routes |
| **Authentication** | Custom JWT setup | NextAuth.js integrated |
| **State Management** | Redux Toolkit | Zustand + React Query |
| **SSR/SEO** | Manual setup with Express | Built-in with Next.js |
| **File Upload** | Multer + Express | Vercel Blob or uploadthing |
| **Hot Reload** | 2 dev servers | 1 dev server |
| **Learning Curve** | Moderate | Moderate (Next.js concepts) |
| **Performance** | Client-side rendering | Server components + SSR |
| **Cost** | 2 hosting instances | 1 hosting instance |

---

## MIGRATION PATH (If Starting Fresh)

1. **Week 1**: Setup Next.js project with Prisma
2. **Week 2**: Build authentication with NextAuth.js
3. **Week 3**: Create API routes for core features
4. **Week 4**: Build mechanic dashboard UI
5. **Week 5**: Build admin panel UI
6. **Week 6**: Setup Socket.io microservice
7. **Week 7**: Integrate Stripe payments
8. **Week 8**: Testing and deployment

---

This revised tech stack is **modern, scalable, and significantly simpler** than maintaining separate React and Node.js projects. It's the industry standard for 2024-2025 full-stack TypeScript applications.Claude can make mistakes. Please double-check responses.