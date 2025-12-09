# CarConnect Platform - Complete Documentation

## 🚗 Overview

CarConnect is a comprehensive driver-mechanic connection platform that enables drivers to find trusted mechanics, book services, get maintenance reminders, and access car care education. The platform consists of three main applications:

1. **Mobile App** (React Native/Expo) - For drivers
2. **Web Dashboard** (Next.js 14+) - For mechanics
3. **Admin Panel** (Next.js 14+) - For platform administrators

## 📐 Architecture

### Tech Stack

#### Frontend (Mobile App - Drivers)
- **Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation 6
- **State Management**: Redux Toolkit + React Query
- **Maps**: React Native Maps
- **Real-time**: Socket.io Client
- **Storage**: AsyncStorage
- **Auth**: JWT + Firebase Auth
- **Push Notifications**: Firebase Cloud Messaging

#### Frontend (Web - Mechanics & Admin)
- **Framework**: Next.js 14.2+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: tRPC + React Query
- **Auth**: NextAuth.js
- **Charts**: Recharts
- **Calendar**: React Big Calendar

#### Backend
- **API Framework**: Next.js API Routes + tRPC
- **Database**: PostgreSQL 15+
- **ORM**: Prisma 7.0+
- **Real-time**: Socket.io (separate service)
- **File Upload**: Uploadthing or AWS S3
- **Email**: Resend or Nodemailer
- **Payments**: Stripe
- **AI**: Anthropic Claude API (for car diagnosis)

#### Infrastructure
- **Deployment**: Vercel (web apps), EAS (mobile)
- **Database Hosting**: Neon or Supabase
- **File Storage**: AWS S3 or Uploadthing
- **Monitoring**: Sentry
- **Analytics**: PostHog or Mixpanel

## 📊 Database Schema

### Core Models

#### Users & Authentication
- `User` - Base user model (email, password, role)
- `Driver` - Driver-specific profile
- `Mechanic` - Mechanic-specific profile with shop info

#### Bookings & Services
- `Booking` - Service requests and appointments
- `Vehicle` - Driver's vehicles
- `Review` - Reviews with multi-category ratings
- `ReviewCategory` - Detailed ratings (quality, punctuality, etc.)
- `ReviewTag` - Quick sentiment tags
- `ReviewResponse` - Mechanic responses to reviews

#### Communication
- `Message` - In-app chat messages
- `Notification` - Push/email notifications

#### Maintenance
- `MaintenanceReminder` - Scheduled maintenance alerts

#### Loyalty & Referrals
- `LoyaltyPoints` - User points balance and tier
- `PointTransaction` - Points history
- `Referral` - Referral tracking

#### Content
- `Article` - Educational content
- `ArticleBookmark` - Saved articles

#### Emergency
- `EmergencyRequest` - Emergency service requests

#### Payments
- `Payment` - Payment transactions
- `PaymentMethod` - Saved payment methods

#### Additional
- `SavedMechanic` - Bookmarked mechanics
- `ShopPhoto` - Mechanic shop gallery

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-blue: #2563EB;
--primary-blue-dark: #1E40AF;
--secondary-green: #10B981;
--warning-orange: #F59E0B;
--error-red: #EF4444;

/* Neutrals */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-600: #4B5563;
--gray-900: #111827;
```

### Typography
- **Font Family**: Inter (web), System (mobile)
- **Headings**: 700, 600 weight
- **Body**: 400 weight
- **Scale**: 12px, 14px, 16px, 20px, 24px, 32px

### Spacing
- **Base**: 8px
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px

### Border Radius
- **Small**: 6px (buttons, inputs)
- **Medium**: 12px (cards)
- **Large**: 16px (modals)
- **Full**: 9999px (pills, avatars)

## 📱 Mobile App Features

### Core Screens

1. **Onboarding** (3 screens)
   - Find Trusted Mechanics
   - Never Miss Maintenance
   - Get Expert Advice

2. **Authentication**
   - Sign Up / Sign In
   - Social Auth (Google)
   - Password Recovery

3. **Home Dashboard**
   - Emergency Help Card
   - Quick Actions Grid
   - Upcoming Appointments
   - Maintenance Reminders
   - Educational Content

4. **Find Mechanic**
   - Map View with pins
   - List View with cards
   - Advanced Filters
   - Search functionality

5. **Mechanic Profile**
   - Profile info & ratings
   - Services & pricing
   - Photo gallery
   - Reviews
   - Location & directions

6. **Booking Flow** (6 steps)
   - Select Vehicle
   - Select Service Type
   - Describe Issue (+ photos)
   - Choose Date & Time
   - Select Location
   - Review & Confirm

7. **My Bookings**
   - Upcoming / In Progress / Completed / Cancelled
   - Booking details
   - Status tracking
   - Actions (reschedule, cancel, review)

8. **Chat**
   - Real-time messaging
   - Photo sharing
   - Voice messages
   - Read receipts

9. **My Vehicles**
   - Vehicle list
   - Add/Edit vehicle
   - Maintenance history
   - Service scheduling

10. **Maintenance Reminders**
    - Overdue / Due Soon / Upcoming
    - Service descriptions
    - Schedule from reminder

11. **Car Education Hub**
    - Articles by category
    - Video tutorials
    - Warning light guide
    - Bookmarked content

12. **Profile & Settings**
    - Edit profile
    - Payment methods
    - Saved mechanics
    - Notification settings
    - Help & support

### Advanced Features

#### AI Car Diagnosis
- Photo upload and analysis
- Conversational diagnosis
- Issue severity assessment
- Recommended actions
- Auto-fill booking

#### Emergency Services
- One-tap emergency request
- Nearest mechanic dispatch
- Live tracking
- Direct communication

#### Loyalty Program
- Points for actions
- Tier levels (Bronze → Platinum)
- Rewards redemption
- Referral system

#### Smart Maintenance
- Mileage-based reminders
- Seasonal alerts
- Predictive maintenance
- Service history timeline

## 🖥️ Mechanic Web Dashboard

### Pages

1. **Dashboard Home**
   - Key metrics cards
   - Upcoming appointments
   - Recent reviews
   - Charts (bookings, revenue)

2. **Bookings Management**
   - Tabs (New, Upcoming, In Progress, Completed, Cancelled)
   - Filters & search
   - Booking details modal
   - Status updates
   - Pricing management

3. **Calendar View**
   - Full calendar with bookings
   - Drag-and-drop rescheduling
   - Day/week/month views

4. **Messages**
   - Split view (conversations + chat)
   - Real-time updates
   - Media sharing

5. **Profile Management**
   - Shop information
   - Professional details
   - Services & pricing
   - Availability settings
   - Photo gallery

6. **Reviews**
   - Overall statistics
   - Rating distribution
   - Reviews table
   - Response functionality

7. **Analytics**
   - Revenue charts
   - Booking trends
   - Rating over time
   - Service breakdown
   - Peak hours heatmap
   - Export reports

8. **Settings**
   - Account settings
   - Notification preferences
   - Payment/payout settings
   - Subscription management

### Advanced Features no nwws doe noq

#### Automated Marketing
- Follow-up campaigns
- Promotion codes
- Win-back campaigns
- Review requests

#### Smart Scheduling
- AI time slot optimization
- Route optimization
- Buffer time management
- Cancellation prediction

#### Inventory Management (Premium)
- Parts tracking
- Low stock alerts
- Supplier integration
- Cost & profit tracking

## 👨‍💼 Admin Panel

### Pages

1. **Dashboard**
   - Platform metrics
   - User growth charts
   - Revenue analytics
   - Active mechanics
   - Recent activity feed

2. **Users Management**
   - All users table
   - Filters (role, status)
   - User details
   - Account actions (suspend, delete)
   - Activity history

3. **Mechanic Verification**
   - Pending queue
   - Verification details
   - Document review
   - Approve/reject workflow

4. **Bookings Management**
   - All bookings view
   - Dispute resolution
   - Refund processing

5. **Reviews & Ratings**
   - Flag inappropriate reviews
   - Spam detection
   - Content moderation

6. **Content Management**
   - Article CRUD
   - Rich text editor
   - Publish/unpublish
   - Warning lights guide

7. **Financial Management**
   - Revenue dashboard
   - Commission tracking
   - Payout processing
   - Pricing configuration

8. **Settings**
   - Platform settings
   - Email templates
   - Terms & privacy
   - Notification templates

### Advanced Features

#### Fraud Detection
- Suspicious pattern detection
- AI review analysis
- Document verification
- Ban/suspend actions

#### Dynamic Pricing
- Supply/demand pricing
- Time-based commission
- Loyalty tier discounts
- Surge pricing

#### Content Recommendation
- Personalized content
- Push timing optimization
- A/B testing
- Performance analytics

#### Multi-City Expansion
- City onboarding wizard
- Mechanic recruitment
- City performance comparison
- Localized content

## 🔐 Authentication & Authorization

### Roles
- `driver` - Mobile app users
- `mechanic` - Web dashboard users
- `admin` - Admin panel users

### Authentication Flow
1. User registers/logs in
2. JWT token issued
3. Token stored (AsyncStorage mobile, httpOnly cookie web)
4. Protected routes check role
5. Session management with NextAuth

### Security
- Password hashing (bcrypt, 10 rounds)
- JWT with expiration
- CSRF protection
- Rate limiting
- Input sanitization
- SQL injection prevention (Prisma)
- XSS protection

## 💳 Payment Processing

### Stripe Integration
- Payment intents for bookings
- Saved payment methods
- 3D Secure support
- Refund processing
- Webhook handling

### Commission Structure
- Platform takes 15% base commission
- Adjustable by admin
- Dynamic pricing based on factors
- Subscription tier discounts

## 📬 Notifications

### Types
- Push (Firebase Cloud Messaging)
- Email (Resend/Nodemailer)
- In-app (Notification model)

### Triggers
- Booking status changes
- New messages
- Maintenance reminders
- Payment confirmations
- Emergency requests
- Review requests

## 🤖 AI Features

### Car Diagnosis Assistant
- **API**: Anthropic Claude 3.5 Sonnet
- **Capabilities**:
  - Image analysis (dashboard, engine, issues)
  - Conversational diagnosis
  - Severity assessment
  - Recommended actions

### Smart Recommendations
- Content personalization
- Mechanic matching
- Scheduling optimization
- Pricing suggestions

## 🔄 Real-time Features

### Socket.io Implementation
- Separate Node.js service
- Namespaces for bookings
- Rooms for chat conversations
- Events:
  - `message:new`
  - `message:read`
  - `booking:status_update`
  - `location:update` (mechanic en route)

## 📊 Analytics & Monitoring

### Metrics to Track
- User growth (drivers, mechanics)
- Booking conversion rate
- Average booking value
- Mechanic utilization rate
- User retention
- App performance
- Error rates

### Tools
- **Analytics**: PostHog or Mixpanel
- **Error Tracking**: Sentry
- **Performance**: Vercel Analytics
- **Database**: Prisma Pulse

## 🧪 Testing Strategy

### Unit Tests
- Utility functions
- Business logic
- API endpoints (tRPC routers)

### Integration Tests
- Database operations
- API flows
- Payment processing

### E2E Tests
- **Web**: Playwright
- **Mobile**: Detox
- Critical user flows

## 🚀 Deployment Strategy

### Web Applications (Mechanic Dashboard + Admin)
- **Platform**: Vercel
- **Branch Previews**: Enabled
- **Environment**: Production + Staging
- **Domain**: Custom domain with SSL

### Mobile Application
- **Build**: EAS Build
- **Distribution**:
  - iOS: TestFlight → App Store
  - Android: Internal Testing → Production
- **OTA Updates**: Expo Updates

### Database
- **Hosting**: Neon (PostgreSQL)
- **Backups**: Daily automated
- **Migrations**: Prisma Migrate
- **Connection Pooling**: PgBouncer

### Socket Service
- **Hosting**: Railway or Render
- **Auto-scaling**: Enabled
- **Health checks**: Implemented

### File Storage
- **Service**: AWS S3 or Uploadthing
- **CDN**: CloudFront
- **Image Optimization**: Sharp

## 📈 Roadmap

### Phase 1: MVP (Current)
- Core booking flow
- Basic messaging
- Payment processing
- Reviews & ratings

### Phase 2: Advanced Features
- AI diagnosis
- Loyalty program
- Emergency services
- Fleet management

### Phase 3: Scale
- Multi-city expansion
- Video consultations
- Parts marketplace
- Advanced analytics

### Phase 4: Innovation
- AR warning light guide
- Blockchain service records
- IoT car diagnostics
- Autonomous booking (connected cars)

## 🛠️ Development Setup

### Prerequisites
```bash
Node.js 20+
PostgreSQL 15+
Expo CLI
Stripe CLI (for webhooks)
```

### Environment Variables

#### Web (.env)
```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
ANTHROPIC_API_KEY=
UPLOADTHING_SECRET=
RESEND_API_KEY=
SOCKET_SERVER_URL=
```

#### Mobile (.env)
```
API_URL=
GOOGLE_MAPS_API_KEY=
FIREBASE_API_KEY=
STRIPE_PUBLISHABLE_KEY=
```

### Installation

```bash
# Clone repository
git clone <repo-url>

# Install dependencies
cd apps/web && npm install
cd ../mobile && npm install
cd ../socket-server && npm install

# Setup database
cd apps/web
npx prisma generate
npx prisma migrate dev

# Run development servers
cd apps/web && npm run dev
cd apps/mobile && npm start
cd apps/socket-server && npm run dev
```

## 📝 API Endpoints (tRPC)

### Auth
- `auth.register` - Register new user
- `auth.login` - Login user
- `auth.me` - Get current user

### Drivers
- `driver.profile` - Get/update profile
- `driver.vehicles` - CRUD operations
- `driver.updateLocation` - Update current location

### Mechanics
- `mechanic.search` - Search with filters
- `mechanic.getById` - Get details
- `mechanic.updateAvailability` - Toggle availability
- `mechanic.profile` - Update profile

### Bookings
- `booking.create` - Create booking
- `booking.list` - Get user's bookings
- `booking.getById` - Get details
- `booking.updateStatus` - Update status
- `booking.cancel` - Cancel booking

### Reviews
- `review.create` - Submit review
- `review.listForMechanic` - Get mechanic reviews
- `review.respond` - Mechanic response

### Messages
- `message.list` - Get conversation
- `message.send` - Send message
- `message.markRead` - Mark as read

### Payments
- `payment.createIntent` - Create payment intent
- `payment.confirm` - Confirm payment
- `payment.history` - Payment history

### Content
- `article.list` - Get articles
- `article.getBySlug` - Get article
- `article.bookmark` - Toggle bookmark

## 🎯 Success Metrics

### User Metrics
- Driver signups/month
- Mechanic applications/month
- Active users (DAU, MAU)
- Retention rate (30-day)

### Business Metrics
- Bookings/month
- Average booking value
- Commission revenue
- Subscription revenue

### Quality Metrics
- Average mechanic rating
- Booking completion rate
- Response time (messages)
- Customer satisfaction (CSAT)

## 📞 Support & Contact

- **Documentation**: `/docs`
- **API Reference**: `/api/docs`
- **Support Email**: support@carconnect.app
- **GitHub Issues**: For bug reports
- **Discord**: Community support

---

## 🏆 Best Practices

### Code Quality
- TypeScript strict mode
- ESLint + Prettier
- Pre-commit hooks (Husky)
- Code reviews required

### Performance
- Image optimization
- Code splitting
- Lazy loading
- Database indexing
- Caching strategy

### Security
- Regular dependency updates
- Security audits
- Penetration testing
- GDPR compliance
- Data encryption

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast
- Alt text for images

---

**Version**: 1.0.0
**Last Updated**: December 2025
**License**: Proprietary
