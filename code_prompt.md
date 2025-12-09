Complete AI Prompt to Build Driver-Mechanic Connection Platform

MASTER PROMPT FOR AI DEVELOPER
You are an expert full-stack developer tasked with building a complete MVP for a driver-mechanic connection platform. This platform connects drivers who need car help with nearby mechanics, provides car maintenance education, and enables seamless booking and communication.

Build three interconnected applications:
1. Mobile app for drivers (React Native)
2. Web dashboard for mechanics (React + Node.js)
3. Admin panel (React + Node.js)

Follow these exact specifications:

---



---

## DATABASE SCHEMA

Create PostgreSQL database with these tables:

### Users Table
- id (UUID, primary key)
- email (unique, required)
- password_hash (required)
- role (enum: 'driver', 'mechanic', 'admin')
- full_name (required)
- phone_number (required)
- profile_photo_url
- created_at
- updated_at
- is_verified (boolean)
- fcm_token (for push notifications)

### Drivers Table
- id (UUID, primary key)
- user_id (foreign key to Users)
- current_location (geometry point)
- preferred_language
- emergency_contact_name
- emergency_contact_phone

### Mechanics Table
- id (UUID, primary key)
- user_id (foreign key to Users)
- shop_name (required)
- shop_address (required)
- shop_location (geometry point)
- service_radius_km
- certifications (text array)
- specializations (text array)
- years_experience
- hourly_rate
- is_available (boolean)
- working_hours (JSON)
- rating_average (decimal)
- total_reviews (integer)
- verification_status (enum: 'pending', 'verified', 'rejected')
- subscription_tier (enum: 'free', 'pro', 'premium')

### Vehicles Table
- id (UUID, primary key)
- driver_id (foreign key to Drivers)
- make (required)
- model (required)
- year (required)
- color
- license_plate
- current_mileage
- last_service_date
- vin_number

### Bookings Table
- id (UUID, primary key)
- driver_id (foreign key to Drivers)
- mechanic_id (foreign key to Mechanics)
- vehicle_id (foreign key to Vehicles)
- service_type (required)
- description (text)
- issue_photos (text array - URLs)
- status (enum: 'requested', 'accepted', 'in_progress', 'completed', 'cancelled')
- scheduled_time (timestamp)
- location (geometry point)
- location_address (text)
- estimated_price
- final_price
- payment_status (enum: 'pending', 'paid', 'refunded')
- created_at
- completed_at

### Reviews Table
- id (UUID, primary key)
- booking_id (foreign key to Bookings)
- driver_id (foreign key to Drivers)
- mechanic_id (foreign key to Mechanics)
- rating (integer 1-5, required)
- comment (text)
- created_at

### Messages Table
- id (UUID, primary key)
- booking_id (foreign key to Bookings)
- sender_id (foreign key to Users)
- receiver_id (foreign key to Users)
- message_text (text)
- media_urls (text array)
- is_read (boolean)
- created_at

### Maintenance_Reminders Table
- id (UUID, primary key)
- vehicle_id (foreign key to Vehicles)
- reminder_type (enum: 'oil_change', 'tire_rotation', 'brake_inspection', 'general')
- due_date
- due_mileage
- is_completed (boolean)
- notes (text)

---

## MOBILE APP (DRIVER APPLICATION) - DETAILED SPECIFICATIONS

### DESIGN PRINCIPLES
- **Clean and minimal**: Use plenty of white space
- **Large touch targets**: All buttons minimum 48x48dp
- **Primary color**: #2563EB (blue) for trust and professionalism
- **Secondary color**: #10B981 (green) for success states
- **Error color**: #EF4444 (red)
- **Typography**: System fonts (San Francisco on iOS, Roboto on Android)
- **Bottom navigation**: 4 tabs with icons

### SCREEN SPECIFICATIONS

#### 1. SPLASH SCREEN
- App logo centered
- App name "CarConnect" below logo
- Tagline: "Your trusted car care companion"
- Auto-navigate after 2 seconds

#### 2. ONBOARDING SCREENS (3 screens, swipeable)
Screen 1:
- Illustration: Car with wrench icon
- Heading: "Find Trusted Mechanics Near You"
- Body: "Connect with verified mechanics in your area within minutes"

Screen 2:
- Illustration: Calendar with checkmark
- Heading: "Never Miss Maintenance"
- Body: "Get reminders for oil changes, tire rotations, and more"

Screen 3:
- Illustration: Chat bubbles
- Heading: "Get Expert Advice Instantly"
- Body: "Chat with mechanics and share photos of car issues"
- "Get Started" button at bottom

#### 3. AUTHENTICATION SCREENS

**Sign Up Screen:**
- Header: "Create Your Account"
- Fields:
  * Full Name (text input)
  * Email (email input)
  * Phone Number (phone input with country code)
  * Password (password input with show/hide toggle)
  * Confirm Password
- "Sign Up" button (full width, rounded)
- "Already have an account? Login" link at bottom
- Social auth: "Continue with Google" button

**Login Screen:**
- Header: "Welcome Back"
- Fields:
  * Email or Phone
  * Password (with "Forgot Password?" link)
- "Login" button
- "Don't have an account? Sign Up" link

#### 4. HOME SCREEN (Main Dashboard)
Layout:
- **Top Section:**
  * Profile photo (left corner) - tap to go to profile
  * "Hello, [Name]" greeting
  * Location indicator with current city
  * Notification bell icon (right corner)

- **Emergency Card (Prominent):**
  * Red/orange gradient background
  * Large icon of warning triangle
  * "Need Help Now?" heading
  * "Find nearest mechanic for emergency" subtext
  * "Get Emergency Help" button

- **Quick Actions (2x2 grid):**
  * "Find Mechanic" - magnifying glass icon
  * "Book Service" - calendar icon
  * "My Vehicles" - car icon
  * "Chat with Expert" - message icon

- **Upcoming Appointments Card:**
  * If appointments exist:
    - Mechanic photo and name
    - Service type
    - Date and time
    - "View Details" button
  * If no appointments:
    - "No upcoming appointments"
    - "Schedule a service" link

- **Maintenance Reminders Section:**
  * List of upcoming maintenance
  * Each item shows:
    - Icon for service type
    - Service name
    - "Due in X days" or "Overdue by X days" (red if overdue)
  * "View All" link

- **Educational Content:**
  * Horizontal scrolling cards
  * Each card: thumbnail image, title, "2 min read"
  * Examples: "How to Check Oil Level", "Warning Light Guide"

**Bottom Navigation (always visible):**
- Home (house icon)
- Find (search icon)
- Bookings (calendar icon)
- Profile (user icon)

#### 5. FIND MECHANIC SCREEN
- **Search Bar at Top:**
  * "Search by name, specialty, or location"
  * Filter icon on right

- **Map View (top half of screen):**
  * Show user's current location (blue dot)
  * Show nearby mechanics (red pin markers)
  * Mechanic pins show rating badge on tap
  * "List View" toggle button

- **Filter Sheet (slides up when filter tapped):**
  * Distance slider (0-50 km)
  * Specialization checkboxes:
    - Engine Repair
    - Brake Service
    - Electrical Systems
    - Transmission
    - Air Conditioning
    - Tire Service
    - General Maintenance
  * Rating filter (4+ stars, 3+ stars, etc.)
  * Availability (Available Now, Available Today)
  * "Apply Filters" button

- **List View (bottom half or full screen):**
  * Each mechanic card shows:
    - Profile photo (circular, left)
    - Name and shop name
    - Star rating (X.X ⭐) + number of reviews
    - Specializations (chip badges)
    - Distance away ("2.3 km away")
    - "Available Now" green badge or "Opens at 9 AM"
    - Hourly rate or "Starting from $X"
    - "View Profile" button
  * Cards are tappable to open full profile

#### 6. MECHANIC PROFILE SCREEN
- **Header:**
  * Back button
  * Share icon
  * Bookmark icon

- **Profile Section:**
  * Large profile photo
  * Name and credentials (e.g., "ASE Certified")
  * Shop name
  * Star rating (X.X ⭐) with "(based on X reviews)"
  * Verification badge "✓ Verified by CarConnect"

- **Quick Info Bar:**
  * Distance icon + "2.3 km away"
  * Clock icon + "Open until 6 PM"
  * Price icon + "$$" ($ to $$$)

- **About Section:**
  * Years of experience
  * Specializations (chip badges)
  * Shop description text

- **Services & Pricing:**
  * Expandable list of common services
  * Each shows service name and price range

- **Photos Section:**
  * Horizontal scrolling gallery
  * Shop exterior, interior, equipment photos

- **Reviews Section:**
  * Overall rating bars (5 stars: X%, 4 stars: X%, etc.)
  * Recent reviews (show 3-5):
    - Reviewer name and photo
    - Star rating
    - Date
    - Comment text
    - Helpful/Not Helpful buttons
  * "See All Reviews" button

- **Location Section:**
  * Small map preview
  * Full address
  * "Get Directions" button

- **Bottom Bar (sticky):**
  * "Book Appointment" button (primary)
  * "Chat Now" button (secondary)

#### 7. BOOKING FLOW

**Step 1 - Select Vehicle:**
- List of user's vehicles
- Each shows: make, model, year, photo
- "+ Add New Vehicle" button
- "Next" button

**Step 2 - Select Service Type:**
- Grid or list of service categories:
  * Oil Change
  * Brake Service
  * Engine Diagnostics
  * Tire Service
  * Electrical Issues
  * Air Conditioning
  * General Checkup
  * Other (opens text field)
- "Next" button

**Step 3 - Describe Issue:**
- Text area: "Describe the problem or service needed"
- "+ Add Photos" button (opens camera/gallery)
- Uploaded photos shown as thumbnails with X to remove
- "Next" button

**Step 4 - Choose Date & Time:**
- Calendar picker (shows available dates)
- Time slots grid (e.g., "9:00 AM", "10:00 AM", etc.)
- Unavailable slots are grayed out
- "Next" button

**Step 5 - Location:**
- "Use Current Location" button with GPS icon
- OR
- Search bar to enter different address
- Small map preview showing selected location
- "Next" button

**Step 6 - Review & Confirm:**
- Summary card showing:
  * Mechanic name and photo
  * Service type
  * Vehicle info
  * Date and time
  * Location
  * Estimated price range
- "Confirm Booking" button
- "Edit" links for each section

**Confirmation Screen:**
- Success checkmark animation
- "Booking Confirmed!" heading
- Booking reference number
- Mechanic will contact you message
- "View Booking" button
- "Back to Home" link

#### 8. MY BOOKINGS SCREEN
- **Tabs at top:**
  * Upcoming
  * In Progress
  * Completed
  * Cancelled

- **Each booking card shows:**
  * Mechanic photo and name
  * Service type icon and name
  * Date and time
  * Status badge (color-coded)
  * Location
  * For upcoming: "Cancel" and "Reschedule" links
  * For in progress: "Track Mechanic" and "Chat" buttons
  * For completed: "Review" button if not reviewed
  * Tap card for full details

- **Empty state (if no bookings):**
  * Illustration
  * "No bookings yet"
  * "Find a mechanic to get started" button

#### 9. BOOKING DETAILS SCREEN
- **Status Banner (top):**
  * Color-coded by status
  * Status text and icon
  * Timestamp of last update

- **Mechanic Info Card:**
  * Photo, name, rating
  * "Call" and "Chat" buttons
  * Shop address with "Get Directions"

- **Service Details:**
  * Service type
  * Vehicle info
  * Description text
  * Photos uploaded by driver

- **Timeline (for in progress/completed):**
  * Booking requested - timestamp
  * Mechanic accepted - timestamp
  * Work started - timestamp
  * Work completed - timestamp
  * Each step has checkmark if completed

- **Pricing Breakdown (if available):**
  * Labor costs
  * Parts costs
  * Service fee
  * Total

- **Actions (based on status):**
  * If upcoming: "Reschedule" and "Cancel Booking"
  * If in progress: "Track Mechanic Live"
  * If completed: "Download Invoice" and "Leave Review"

#### 10. CHAT SCREEN
- **Header:**
  * Back button
  * Mechanic photo, name, online status
  * Call icon

- **Message List:**
  * Messages arranged chronologically
  * Sent messages (right-aligned, blue background)
  * Received messages (left-aligned, gray background)
  * Support for:
    - Text messages
    - Images (thumbnail, tap to fullscreen)
    - Voice messages (play button with waveform)
  * Timestamps every few messages
  * "Read" status (double checkmarks)

- **Input Area (bottom):**
  * Text input field
  * Paperclip icon (attach image)
  * Mic icon (record voice note)
  * Send button (airplane icon)

#### 11. MY VEHICLES SCREEN
- **Header:**
  * "My Vehicles"
  * "+ Add Vehicle" button (top right)

- **Vehicle Cards:**
  * Large car image (generic by make/model)
  * Make, Model, Year
  * License plate
  * Current mileage
  * "Edit" and "Delete" buttons
  * Tap card to see details

- **Vehicle Details View:**
  * All info fields
  * Maintenance history timeline
  * Upcoming reminders for this vehicle
  * "Schedule Service" button

- **Add Vehicle Form:**
  * Make (dropdown)
  * Model (dropdown, filtered by make)
  * Year (dropdown)
  * Color (optional)
  * License Plate
  * Current Mileage
  * VIN (optional)
  * Photo upload
  * "Save Vehicle" button

#### 12. MAINTENANCE REMINDERS SCREEN
- **List grouped by status:**
  * Overdue (red section)
  * Due Soon (yellow section)
  * Upcoming (green section)

- **Each reminder card:**
  * Service type icon
  * Service name
  * Vehicle info (if multiple vehicles)
  * Due date or mileage
  * "Mark as Done" button
  * "Schedule Service" button

- **Reminder Details:**
  * Service description
  * Why it's important (educational)
  * Recommended interval
  * Notes field
  * "Edit" and "Delete" options

#### 13. CAR EDUCATION HUB SCREEN
- **Categories (horizontal tabs/chips):**
  * Basics
  * Warning Lights
  * Maintenance
  * Troubleshooting
  * Seasonal Care

- **Article/Video Cards:**
  * Thumbnail image
  * Title
  * Read time or video length
  * Bookmark icon
  * Tap to open content

- **Content View:**
  * Article text or video player
  * Progress indicator
  * "Was this helpful?" feedback
  * Related articles at bottom

#### 14. PROFILE SCREEN
- **Profile Header:**
  * Large profile photo (editable)
  * Name and email
  * "Edit Profile" button

- **Menu Options:**
  * My Vehicles (chevron right)
  * Payment Methods (chevron right)
  * Saved Mechanics (chevron right)
  * Maintenance Reminders (chevron right)
  * Notification Settings (chevron right)
  * Help & Support (chevron right)
  * Terms & Privacy (chevron right)
  * About CarConnect (chevron right)
  * Logout (red text)

- **Edit Profile Screen:**
  * Photo upload
  * Name, email, phone (editable fields)
  * Emergency contact info
  * Preferred language
  * "Save Changes" button

#### 15. NOTIFICATIONS SCREEN
- **List of notifications:**
  * Each shows icon, title, message, timestamp
  * Unread highlighted with blue dot
  * Tap to open related screen
  * Swipe left to delete

- **Types of notifications:**
  * Booking confirmed
  * Mechanic en route
  * Service completed
  * Payment received
  * Maintenance reminder
  * New message

#### 16. EMERGENCY HELP FLOW
- **Emergency Screen (activated from home):**
  * Large "Finding Nearest Mechanics..." animation
  * Map showing user location
  * List of closest available mechanics (3-5)
  * Each shows:
    - Photo, name, rating
    - Distance and ETA
    - "Request Emergency Help" button

- **Emergency Request Sent:**
  * "Emergency request sent!"
  * "Mechanic will contact you shortly"
  * Countdown timer
  * Mechanic details when accepted
  * "Cancel Request" option

### NAVIGATION & TRANSITIONS
- Use native navigation transitions (slide for iOS, fade for Android)
- Bottom sheet modals for filters and quick actions
- Swipe gestures for going back
- Pull to refresh on list screens
- Loading states: skeleton screens, not spinners
- Error states: friendly messages with retry button

### OFFLINE FUNCTIONALITY
- Cache recent mechanics and bookings
- Allow viewing saved content offline
- Queue actions (like messages) when offline
- Show "You're offline" banner at top

### ACCESSIBILITY
- All buttons have accessibility labels
- Minimum font size 14sp
- Color contrast ratio 4.5:1 minimum
- Support for screen readers
- Scalable text

---

## API ENDPOINTS TO IMPLEMENT

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password - Reset password with token
- GET /api/auth/me - Get current user info

### Drivers
- GET /api/drivers/profile - Get driver profile
- PUT /api/drivers/profile - Update driver profile
- PUT /api/drivers/location - Update current location
- GET /api/drivers/vehicles - Get user's vehicles
- POST /api/drivers/vehicles - Add new vehicle
- PUT /api/drivers/vehicles/:id - Update vehicle
- DELETE /api/drivers/vehicles/:id - Delete vehicle

### Mechanics
- GET /api/mechanics - Search mechanics (filters: location, radius, specialty, rating)
- GET /api/mechanics/:id - Get mechanic details
- GET /api/mechanics/:id/reviews - Get mechanic reviews
- GET /api/mechanics/:id/availability - Get mechanic available time slots

### Bookings
- POST /api/bookings - Create new booking
- GET /api/bookings - Get user's bookings (filter by status)
- GET /api/bookings/:id - Get booking details
- PUT /api/bookings/:id - Update booking (reschedule, cancel)
- PUT /api/bookings/:id/status - Update booking status (mechanic only)
- POST /api/bookings/:id/review - Submit review after completion

### Messages
- GET /api/messages/:booking_id - Get messages for a booking
- POST /api/messages - Send new message
- PUT /api/messages/:id/read - Mark message as read

### Maintenance
- GET /api/maintenance/reminders - Get all reminders
- POST /api/maintenance/reminders - Create reminder
- PUT /api/maintenance/reminders/:id - Update reminder
- DELETE /api/maintenance/reminders/:id - Delete reminder
- POST /api/maintenance/reminders/:id/complete - Mark as completed

### Content
- GET /api/content/articles - Get educational articles
- GET /api/content/articles/:id - Get article details
- GET /api/content/dashboard-symbols - Get warning light guide

### Payments
- POST /api/payments/create-intent - Create Stripe payment intent
- POST /api/payments/confirm - Confirm payment
- GET /api/payments/history - Get payment history

---

## MECHANIC WEB DASHBOARD

### Design System
- Clean, professional admin-style interface
- Sidebar navigation (collapsible on mobile)
- White background with blue accents
- Data tables with sorting and filtering
- Dashboard cards with statistics

### Pages

#### 1. Login Page
- Simple centered form
- Logo at top
- Email and password fields
- "Remember me" checkbox
- "Login" button
- "Forgot password?" link
- "Don't have an account? Apply to join" link

#### 2. Dashboard (Home)
- **Stats Cards (top row):**
  * Total Bookings (this month) - with trend indicator
  * Revenue (this month) - with trend
  * Average Rating - star display
  * Active Bookings - count

- **Quick Actions:**
  * Update availability status (toggle switch)
  * View new booking requests (red badge if any)

- **Upcoming Appointments:**
  * Table showing next 5 appointments
  * Columns: Date/Time, Customer, Service, Location, Actions
  * Actions: View, Start, Cancel

- **Recent Reviews:**
  * List of 3-5 recent reviews
  * Each shows rating, customer name, comment, date

- **Charts:**
  * Line chart: Bookings over time (last 30 days)
  * Pie chart: Service types breakdown

#### 3. Bookings Page
- **Tabs:**
  * New Requests (with count badge)
  * Upcoming
  * In Progress
  * Completed
  * Cancelled

- **Filters (top bar):**
  * Date range picker
  * Service type dropdown
  * Search by customer name

- **Bookings Table:**
  * Columns: ID, Date/Time, Customer, Service, Vehicle, Status, Amount, Actions
  * Actions dropdown: View, Accept/Decline, Start, Complete, Cancel
  * Pagination at bottom

- **Booking Detail Modal:**
  * Customer info and contact buttons
  * Service details
  * Vehicle information
  * Customer's description and photos
  * Status update buttons
  * Add notes field
  * Upload work photos
  * Update pricing
  * "Complete Booking" button

#### 4. Calendar View
- Full calendar showing all bookings
- Color-coded by status
- Click date to see bookings for that day
- Click booking to open details
- Drag-and-drop to reschedule (with confirmation)

#### 5. Messages Page
- Split view: conversations list (left) + active chat (right)
- Conversations list shows:
  * Customer photo and name
  * Last message preview
  * Timestamp
  * Unread count badge
- Chat interface similar to mobile app
- Support for text, images, voice notes

#### 6. Profile Management
- **Shop Information:**
  * Shop name, address
  * Location on map (draggable pin)
  * Service radius slider
  * Working hours (day-by-day time pickers)
  * Shop photos (upload multiple)

- **Professional Details:**
  * Years of experience
  * Certifications (upload files)
  * Specializations (multi-select checkboxes)
  * Bio/description textarea

- **Services & Pricing:**
  * Table: Service Name, Description, Price Range
  * Add/edit/delete rows
  * "Save All Changes" button

- **Availability:**
  * Current status (Available / Busy / Offline) toggle
  * Vacation mode (date range when unavailable)

#### 7. Reviews Page
- Overall rating statistics
- Rating distribution chart
- Reviews table:
  * Columns: Date, Customer, Rating, Comment, Booking ID
  * Filter by rating
- Respond to reviews (optional feature)

#### 8. Analytics Page
- **Date range selector**
- **Key Metrics:**
  * Total revenue (line chart)
  * Bookings completed (bar chart)
  * Average rating over time (line chart)
  * Revenue by service type (pie chart)
  * Peak booking hours (heatmap)
  * Customer retention rate

- **Export Reports:**
  * CSV download button
  * PDF report generator

#### 9. Settings Page
- **Account Settings:**
  * Email, phone, password change
- **Notification Preferences:**
  * Email notifications toggle
  * SMS notifications toggle
  * Push notifications toggle
  * Notification types (new bookings, messages, reviews)
- **Payment Settings:**
  * Bank account details
  * Payment history
  * Payout schedule
- **Subscription:**
  * Current plan (Free/Pro/Premium)
  * Upgrade/downgrade options
  * Billing history

---

## ADMIN PANEL

### Pages

#### 1. Dashboard
- **Overview Cards:**
  * Total Users (drivers + mechanics)
  * Total Bookings
  * Platform Revenue
  * Active Mechanics

- **Charts:**
  * Users growth over time
  * Bookings by month
  * Revenue by region (map visualization)
  * Top performing mechanics

- **Recent Activity Feed:**
  * New user registrations
  * Completed bookings
  * Pending mechanic verifications

#### 2. Users Management
- **Tabs:** All Users, Drivers, Mechanics, Admins

- **Users Table:**
  * Columns: ID, Name, Email, Phone, Role, Status, Joined Date, Actions
  * Search and filters
  * Actions: View, Edit, Suspend, Delete

- **User Detail View:**
  * Full profile information
  * Activity history
  * Bookings/services provided
  * Reviews given/received
  * "Suspend Account" / "Delete Account" buttons with confirmation

#### 3. Mechanic Verification
- **Pending Verifications Queue:**
  * List of mechanics awaiting approval
  * Each shows: Name, Shop Name, Location, Applied Date

- **Verification Detail View:**
  * All mechanic information
  * Uploaded certifications (preview/download)
  * Shop photos
  * Verification checklist:
    - Valid certifications
    - Shop address verified
    - Contact information verified
  * Notes field for admin
  * "Approve" button (green)
  * "Reject" button with reason dropdown (red)

#### 4. Bookings Management
- Similar to mechanic dashboard but shows ALL bookings
- Can view any booking details
- Resolve disputes
- Issue refunds

#### 5. Reviews & Ratings
- All reviews across platform
- Flag inappropriate reviews
- Respond to reported reviews
- Delete fake/spam reviews

#### 6. Content Management
- **Educational Articles:**
  * Create/edit/delete articles
  * Rich text editor
  * Upload images
  * Publish/unpublish toggle

- **Dashboard Symbols Guide:**
  * Add/edit warning light explanations
  * Upload symbol images

#### 7. Financial Management
- **Revenue Dashboard:**
  * Total platform revenue
  * Revenue by commission
  * Revenue by subscriptions

- **Payouts:**
  * Pending payouts to mechanics
  * Payout history
  * "Process Payouts" button

- **Pricing Configuration:**
  * Set platform commission percentage
  * Set subscription tier prices

#### 8. Settings
- Platform settings
- Email templates
- Push notification templates
- Terms of service editor
- Privacy policy editor

---

## IMPLEMENTATION INSTRUCTIONS

### Step 1: Setup (Day 1-2)
1. Initialize project structure:
mkdir carconnect-platform
cd carconnect-platform
mkdir mobile-app web-dashboard admin-panel backend

2. Setup backend:
cd backend
npm init -y
npm install express pg prisma @prisma/client bcryptjs jsonwebtoken cors dotenv express-validator multer socket.io nodemailer stripe
npx prisma init

3. Setup mobile app:
cd ../mobile-app
npx create-expo-app@latest . --template blank
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-maps axios redux @reduxjs/toolkit react-native-async-storage

4. Setup web dashboard:
cd ../web-dashboard
npm create vite@latest . -- --template react
npm install react-router-dom axios recharts tailwindcss

### Step 2: Database Setup (Day 2-3)
1. Create Prisma schema with all tables listed above
2. Run migrations: `npx prisma migrate dev --name init`
3. Generate Prisma client: `npx prisma generate`
4. Create seed file with sample data

### Step 3: Backend Development (Day 3-10)
1. Create Express server with middleware
2. Implement authentication routes with JWT
3. Implement all API endpoints listed above
4. Add input validation and error handling
5. Setup Socket.io for real-time chat
6. Integrate Stripe for payments
7. Setup file upload handling with Multer
8. Add email notifications with Nodemailer

### Step 4: Mobile App Development (Day 10-25)
1. Setup navigation structure
2. Create reusable components (buttons, cards, inputs)
3. Implement authentication screens
4. Build home screen with all sections
5. Implement mechanic search with maps
6. Build booking flow (all 6 steps)
7. Create chat interface with Socket.io
8. Implement vehicle management
9. Build maintenance reminders
10. Add profile and settings screens
11. Integrate push notifications with Firebase
12. Test on both iOS and Android

### Step 5: Mechanic Dashboard (Day 25-35)
1. Setup routing and layout
2. Create dashboard with analytics
3. Build bookings management
4. Implement calendar view
5. Add profile management forms
6. Create messaging interface
7. Build reviews display
8. Implement settings page

### Step 6: Admin Panel (Day 35-45)
1. Setup authentication and routing
2. Create admin dashboard
3. Build user management
4. Implement mechanic verification workflow
5. Create content management system
6. Build financial management tools
7. Add settings and configuration

### Step 7: Testing & Polish (Day 45-50)
1. Test all API endpoints with Postman
2. Test mobile app on real devices
3. Test web dashboards in different browsers
4. Fix bugs and improve UI/UX
5. Add loading states and error handling
6. Optimize performance
7. Add analytics tracking

### Step 8: Deployment (Day 50-55)
1. Deploy backend to cloud provider (AWS/Heroku/DigitalOcean)
2. Setup PostgreSQL database
3. Configure environment variables
4. Deploy web dashboards to Vercel/Netlify
5. Build and submit mobile app (Expo EAS Build)
6. Setup monitoring and logging

---

## SECURITY REQUIREMENTS
- Hash all passwords with bcrypt (10 rounds)
- Validate all inputs server-side
- Use HTTPS only in production
- Implement rate limiting on auth endpoints
- Add CORS whitelist
- Sanitize file uploads
- Use prepared statements for SQL queries
- Implement JWT token refresh
- Add XSS protection headers
- Validate user permissions on all endpoints

---

## TESTING CHECKLIST
- [ ] User can register and login
- [ ] Driver can search for mechanics by location
- [ ] Driver can book an appointment
- [ ] Mechanic receives booking notification
- [ ] Mechanic can accept/decline bookings
- [ ] Real-time chat works between driver and mechanic
- [ ] Driver can add and manage vehicles
- [ ] Maintenance reminders are created and sent
- [ ] Payment processing works end-to-end
- [ ] Reviews can be submitted and displayed
- [ ] Admin can verify mechanics
- [ ] All dashboards display correct analytics
- [ ] Mobile app works offline (cached data)
- [ ] Push notifications are received
- [ ] Email notifications are sent

---

## ADDITIONAL FEATURES TO IMPLEMENT LATER (Phase 2)
- AI chatbot for diagnosing issues
- Video call feature for remote diagnosis
- Loyalty program and referral system
- In-app spare parts marketplace
- Fleet management for businesses
- Multi-language support
- Dark mode for mobile app

---

BUILD THIS ENTIRE SYSTEM FOLLOWING THESE SPECIFICATIONS EXACTLY. 
Create clean, well-commented code with proper error handling.
Use TypeScript for type safety.
Follow REST API best practices.
Implement responsive design for web dashboards.
Make mobile app feel native with smooth animations.
Prioritize user experience and performance.

START WITH THE DATABASE SCHEMA AND BACKEND API, THEN BUILD THE FRONTEND APPLICATIONS.

HOW TO USE THIS PROMPT
Give this entire prompt to an AI coding assistant (like Claude with Code feature, Cursor, or GPT-4 with Code Interpreter) in sections:

First, share the tech stack requirements and database schema section
Then, share the mobile app specifications (this is the longest part)
Next, share the mechanic dashboard and admin panel specs
Finally, share the implementation instructions

The AI will generate:

Complete database schema
All API endpoints with code
React Native mobile app screens
React web dashboards
Authentication system
Real-time chat functionality
Payment integration
Complete working MVP

Estimated Development Time:

With AI assistance: 6-8 weeks
Manual coding: 4-6 months

This prompt is production-ready and covers every detail needed to build the platform. The AI will create deployable code that you can immediately test and iterate on.ACAN YOU CONTINUE THIS PROMPT WITH ADDITIONAL FEATURES,  AND TELL THE AI TO DO GOOD DESIGN AND DO YOU SUGGEST DOING IT WITH NEXT.JS OR REACT AND NODE.JSCONTINUATION: ADVANCED FEATURES & DESIGN EXCELLENCE

EXTENDED PROMPT - PART 2: ADVANCED FEATURES
IMPORTANT DESIGN & ARCHITECTURE DECISION:

Use NEXT.JS 14+ (App Router) instead of separate React + Node.js for the following reasons:
1. **Unified Codebase**: Frontend and backend in one project
2. **Server Components**: Better performance and SEO
3. **API Routes**: Built-in backend without separate Express server
4. **Optimized Images**: Automatic image optimization
5. **TypeScript Native**: Better type safety across full stack
6. **Easier Deployment**: Single deployment on Vercel
7. **Better DX**: Hot reload for both frontend and backend

REVISED TECH STACK:

### Mobile App
- React Native (Expo) - KEEP AS IS

### Web Applications (Mechanic Dashboard + Admin Panel)
- **Next.js 14+ with App Router** (replaces React + Node.js)
- TypeScript
- Tailwind CSS + shadcn/ui components
- Prisma ORM for database
- NextAuth.js for authentication
- tRPC for type-safe API calls
- Zustand for state management
- React Query for data fetching
- Zod for validation

### Backend Services (Separate microservices only)
- Keep separate Node.js service ONLY for:
  * Socket.io (real-time chat)
  * Complex background jobs
  * Third-party webhooks

---

## DESIGN EXCELLENCE REQUIREMENTS

### CRITICAL: This platform must NOT look like a generic AI-generated app.

Follow these strict design principles:

### 1. VISUAL DESIGN SYSTEM

**Color Palette (Professional & Trustworthy):**
Primary Blue: #2563EB (trust, reliability)
Primary Blue Dark: #1E40AF (hover states)
Secondary Green: #10B981 (success, available)
Warning Orange: #F59E0B (alerts, reminders)
Error Red: #EF4444 (errors, urgent)
Neutral Gray Scale:

Gray 50: #F9FAFB (backgrounds)
Gray 100: #F3F4F6 (cards)
Gray 200: #E5E7EB (borders)
Gray 600: #4B5563 (secondary text)
Gray 900: #111827 (primary text)


**Typography:**
Primary Font: Inter (modern, readable)
Headings:

H1: 32px/40px, font-weight: 700
H2: 24px/32px, font-weight: 600
H3: 20px/28px, font-weight: 600
Body: 16px/24px, font-weight: 400
Small: 14px/20px, font-weight: 400
Caption: 12px/16px, font-weight: 500


**Spacing System (8px base):**
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px

**Border Radius:**
Small: 6px (buttons, inputs)
Medium: 12px (cards)
Large: 16px (modals, sheets)
Full: 9999px (pills, avatars)

**Shadows (Subtle depth):**
sm: 0 1px 2px 0 rgba(0,0,0,0.05)
md: 0 4px 6px -1px rgba(0,0,0,0.1)
lg: 0 10px 15px -3px rgba(0,0,0,0.1)
xl: 0 20px 25px -5px rgba(0,0,0,0.1)

### 2. MOBILE APP DESIGN ENHANCEMENTS

**Add Micro-interactions:**
- Button press: Scale down to 0.95 with haptic feedback
- Card tap: Subtle shadow increase
- Pull-to-refresh: Custom animation with car icon
- Success actions: Checkmark animation with confetti (use lottie-react-native)
- Loading states: Skeleton screens with shimmer effect
- Page transitions: Smooth slide with slight fade

**Enhanced UI Components:**

**Better Cards:**
Standard Card Design:

White background
12px border radius
Shadow: md
16px padding
Subtle hover/press state (scale 0.98)
Border: 1px solid Gray-100 (very subtle)

Elevated Card (important info):

Gradient background (Blue-50 to Blue-100)
No border
Shadow: lg
Slightly larger padding (20px)


**Better Buttons:**
Primary Button:

Background: Blue-600
Text: White, 16px, font-weight: 600
Height: 48px
Border radius: 12px
Shadow: sm
Press state: Blue-700, scale 0.95
Disabled: Gray-300, opacity 0.6

Secondary Button:

Background: Transparent
Border: 2px solid Blue-600
Text: Blue-600
Same dimensions as primary

Text Button:

No background, no border
Text: Blue-600, underline on press


**Better Input Fields:**
Standard Input:

Background: White
Border: 2px solid Gray-200
Focus border: Blue-600 with subtle glow
Height: 56px
Border radius: 12px
Padding: 16px
Font size: 16px
Placeholder: Gray-400
Error state: Red border + error text below


**Status Badges:**
Available: Green background, dark green text
Busy: Orange background, dark orange text
Offline: Gray background, dark gray text
Verified: Blue background with checkmark icon
Each badge: 8px padding, 16px radius, 12px text

**Add Empty States with Personality:**
- Each empty state needs:
  * Custom illustration (not generic icons)
  * Friendly heading (e.g., "No bookings yet" → "Your first ride awaits!")
  * Helpful subtext
  * Clear call-to-action button
  * Light background color

**Better Navigation Bar:**
Bottom Tab Bar:

Height: 65px
Background: White
Top border: 1px Gray-200
Active tab: Blue icon + Blue text + subtle scale up
Inactive: Gray-400
Tab press: Haptic + smooth animation
Selected indicator: Small blue dot above icon


### 3. WEB DASHBOARD DESIGN ENHANCEMENTS

**Modern Dashboard Layout:**
Sidebar (Mechanic & Admin):

Width: 280px
Background: White
Border right: 1px Gray-200
Logo at top (48px height)
Navigation items:

Height: 44px
Padding: 12px 20px
Border radius: 8px (inside sidebar)
Hover: Gray-100 background
Active: Blue-50 background + Blue-600 left border (4px)
Icon + text (16px)


Collapse to icon-only on tablets (70px width)


**Top Navigation Bar:**

Height: 64px
Background: White
Border bottom: 1px Gray-200
Left: Breadcrumbs (Home > Bookings > Details)
Right: Search bar + Notifications bell + Profile dropdown
Sticky at top when scrolling


**Dashboard Cards (Stats):**
Modern Glass-morphism Style:

Semi-transparent background
Backdrop blur
Subtle border
Larger numbers (32px, bold)
Small trend indicator (↑ 12% from last month)
Icon in top-right corner (colored, subtle)
Hover: Slight lift (transform translateY(-2px))


**Data Tables:**
Modern Table Design:

No outer borders
Header: Gray-50 background, 14px bold text
Rows: White background, 1px bottom border Gray-100
Hover row: Gray-50 background
Alternate row colors: Optional subtle Gray-25
Action buttons: Icon buttons with tooltip on hover
Pagination: Modern number pills (not old-style prev/next)
Filters: Inline filter chips above table
Search: Integrated in table header


**Better Modals:**

Background overlay: rgba(0,0,0,0.4) with blur
Modal: White, 24px border radius, shadow-xl
Max width: 600px
Padding: 32px
Close button: Top-right, subtle gray circle
Actions: Right-aligned at bottom, 16px gap
Smooth scale-in animation (0.95 → 1.0)


### 4. ADVANCED MOBILE APP FEATURES

**Feature 1: AI-Powered Car Issue Diagnosis**

**New Screen: "AI Diagnosis Assistant"**

Accessible from:
- Home screen quick action
- "Describe Issue" step in booking flow

**Flow:**
1. **Welcome Screen:**
   - Friendly AI bot illustration
   - "I'm here to help diagnose your car issue"
   - "Take a photo or describe what's wrong"
   - Two buttons: "Take Photo" | "Describe Problem"

2. **Photo Analysis:**
   - Camera interface with guides
   - "Point camera at dashboard, engine, or issue"
   - Capture multiple photos
   - AI analyzes using Claude API (Anthropic) or GPT-4 Vision
   - Shows analysis: "Detected: Low tire pressure warning light"

3. **Conversational Diagnosis:**
   - Chat interface with AI
   - AI asks follow-up questions:
     * "When did this start?"
     * "Any unusual sounds?"
     * "How's the car driving?"
   - Driver answers via text or voice
   - AI narrows down issue

4. **Diagnosis Results:**
   - Primary diagnosis card:
     * Issue name and icon
     * Severity level (color-coded)
     * Urgency (Fix today / This week / Not urgent)
   - Possible causes (expandable list)
   - Recommended action
   - "Find Mechanic for This Issue" button
   - "Get Second Opinion" button

5. **Auto-Fill Booking:**
   - If user taps "Find Mechanic"
   - Pre-fill booking with:
     * Issue description from AI
     * Photos already attached
     * Suggested specialization filter
     * Urgency-based scheduling

**Implementation:**
```javascript
// API Integration Example
const diagnoseCar = async (images, description) => {
  const response = await fetch('/api/ai/diagnose', {
    method: 'POST',
    body: JSON.stringify({
      images: images.map(img => img.base64),
      description,
      conversationHistory
    })
  });
  return response.json(); // Returns diagnosis object
};
```

**Feature 2: Video Call Consultation**

**New Feature: "Quick Video Consult"**

- Available before booking
- Driver pays $5-10 for 5-minute video call
- Mechanic sees issue in real-time
- Can provide immediate advice or book service

**Implementation:**
- Use Agora.io or Daily.co SDK
- In-app video call interface
- Screen recording for reference
- After call: Transcript + diagnosis saved

**UI Design:**
Video Call Screen:

Mechanic video: Large (top 60% of screen)
Driver video: Small pip (bottom-right)
Bottom controls:

Mute/Unmute
Switch camera (front/back)
End call (red)


Side panel:

Chat messages
Quick actions: "Take photo", "Share screen"




**Feature 3: Smart Maintenance Assistant**

**AI-Powered Features:**

1. **Mileage-Based Smart Reminders:**
   - User inputs mileage regularly
   - AI predicts when service needed
   - "Your car needs oil change in ~200 miles"
   - Push notification when threshold reached

2. **Seasonal Maintenance Alerts:**
   - Geolocation-based
   - "Winter is coming - time for antifreeze check"
   - Summer: AC check, coolant
   - Spring: Wiper blades, battery test

3. **Predictive Maintenance:**
   - Based on car age, model, mileage
   - "Cars like yours typically need [X] around this time"
   - Links to educational content

4. **Service History Timeline:**
   - Visual timeline (Instagram story style)
   - Each service as a node with photo
   - Tap to see full details
   - Export as PDF for resale value

**Feature 4: AR Warning Light Guide**

**Augmented Reality Feature:**

- User points camera at dashboard
- AR overlay identifies warning lights
- Shows name + explanation overlay
- Urgency indicator
- "What to do" quick guide

**Implementation:**
- Use React Native Vision Camera
- TensorFlow Lite for light detection
- Pre-trained model on common warning lights
- Fallback: Manual selection from grid

**Feature 5: Parts Price Transparency**

**New Section: "Parts Needed"**

In booking details, driver sees:
- List of parts needed (if mechanic knows)
- Each part with:
  * Name and photo
  * OEM price vs. Aftermarket price
  * "Search Online" button (opens Amazon/eBay)
  * "Bring my own part" checkbox

**Driver Options:**
1. Let mechanic supply parts (markup included)
2. Buy parts themselves (discount on labor)
3. Bring used/refurbished parts

**Feature 6: Mechanic Live Tracking**

**Enhanced Tracking Screen:**

- Real-time map showing mechanic en route
- ETA countdown timer
- Mechanic photo and vehicle info
- "Call Mechanic" floating button
- Progress bar: "On the way" → "Arrived" → "Working" → "Complete"
- Push notifications at each stage

**Gamification Elements:**
- Mechanic gets "On-time arrival" badge
- Driver sees mechanic's punctuality rate
- Incentivizes reliability

**Feature 7: Emergency Roadside Assistance Network**

**Premium Feature:**

**How it works:**
1. Driver subscribes: $9.99/month or $99/year
2. Includes:
   - 24/7 emergency dispatch
   - Guaranteed mechanic within 30 min
   - Towing coordination
   - Jump start, tire change, fuel delivery
   - Priority booking for subscribers

**Emergency Flow:**
1. Tap "Emergency" button
2. Auto-detect location
3. One-tap call to dispatch
4. Dispatcher assigns nearest mechanic
5. Live tracking + ETA
6. In-app chat with dispatcher

**UI: Emergency Mode**
- Entire app turns red theme
- Large "HELP IS ON THE WAY" message
- Countdown timer
- "Cancel Emergency" hidden (prevent accidental)

**Feature 8: Social Proof & Trust Building**

**Enhanced Review System:**

1. **Verified Reviews Only:**
   - Can only review after service completion
   - "Verified Service" badge on review

2. **Photo/Video Reviews:**
   - Upload before/after photos
   - Short video testimonials
   - Highlighted in mechanic profile

3. **Review Categories:**
   - Quality of work (5 stars)
   - Punctuality (5 stars)
   - Communication (5 stars)
   - Fair pricing (5 stars)
   - Cleanliness (5 stars)

4. **Mechanic Response:**
   - Mechanic can respond to reviews
   - Shows engagement and care

5. **"Helped me with..." Tags:**
   - Quick tags: "Great explanation", "Fixed quickly", "Fair price", "Went above and beyond"
   - Show as chips on profile

**Feature 9: Fleet Management (B2B)**

**New User Type: "Fleet Manager"**

For businesses with multiple vehicles:

**Dashboard Features:**
- See all company vehicles
- Assign vehicles to drivers
- Track maintenance across fleet
- Bulk booking
- Spend analytics
- Compliance tracking (inspections, registrations)

**Driver Assignment:**
- Each driver gets limited app access
- Can only see their assigned vehicle
- Report issues to fleet manager
- Fleet manager approves bookings

**Reporting:**
- Export monthly maintenance reports
- Cost per vehicle
- Downtime tracking
- Mechanic performance

**Feature 10: Loyalty & Referral Program**

**Points System:**

**Earn Points:**
- Complete booking: 100 points
- Leave review: 50 points
- Refer a friend: 500 points (when they book)
- Upload car photo: 25 points
- Complete profile: 100 points

**Redeem Points:**
- $5 off booking: 500 points
- Free oil change: 2000 points
- Priority booking: 1000 points
- Premium subscription (1 month): 3000 points

**UI: Gamified Experience**
- Progress bar to next reward
- Level system (Bronze → Silver → Gold → Platinum)
- Badges for achievements
- Leaderboard (optional, opt-in)

**Referral Flow:**
1. Tap "Refer Friends" in profile
2. Get unique referral code
3. Share via WhatsApp, SMS, social media
4. Track referrals in app
5. Get notification when friend signs up/books

---

## 5. WEB DASHBOARD ADVANCED FEATURES

**Feature 11: Mechanic Mobile App (Lightweight Version)**

In addition to web dashboard, create simplified mechanic mobile app:

**Key Screens:**
- Login
- Today's Schedule
- Booking Notifications (push)
- Accept/Decline Bookings
- Update Booking Status
- Chat with Customers
- Navigation to Job Site
- Clock in/out for time tracking

**Simpler than full dashboard, focused on field use**

**Feature 12: Automated Marketing Tools (Mechanic Dashboard)**

**New Section: "Grow Your Business"**

1. **Automated Follow-ups:**
   - "It's been 6 months since [Customer]'s oil change"
   - One-click: Send reminder SMS/email
   - Template: "Hi [Name], it's been 6 months since your last oil change. Book your next service with us!"

2. **Promotions Manager:**
   - Create discount codes
   - Set expiry dates
   - Track usage
   - "Send to all past customers" button

3. **Win-back Campaigns:**
   - See customers who haven't returned in 6+ months
   - Send "We miss you" offers

4. **Reviews Automation:**
   - Auto-send review request 24hrs after service
   - Template customizable
   - Track review request → review received conversion

**Feature 13: Advanced Analytics Dashboard**

**Interactive Charts:**

1. **Revenue Forecasting:**
   - ML-based prediction of next month revenue
   - Based on historical trends
   - "You're on track for $X this month"

2. **Customer Lifetime Value:**
   - See CLV for each customer
   - Identify high-value customers
   - Target retention efforts

3. **Service Profitability:**
   - Which services make most profit
   - Which services take most time
   - Optimize service menu based on data

4. **Heatmaps:**
   - Busiest hours/days
   - Optimize working hours
   - "Most customers book on Tuesday 10AM"

5. **Competitor Benchmarking:**
   - Compare your stats to area average
   - "Your rating is 0.3 stars above average"
   - "Your prices are 15% below average"

**Feature 14: Smart Scheduling with AI**

**Auto-Scheduling Features:**

1. **Optimal Time Slots:**
   - AI suggests best times to offer based on:
     * Historical booking patterns
     * Service duration estimates
     * Travel time between jobs
     * Mechanic break times

2. **Buffer Time:**
   - Automatically adds buffer between bookings
   - Accounts for service type complexity

3. **Route Optimization:**
   - If multiple bookings, AI sorts by location
   - Minimizes travel time
   - "Rearrange for efficiency?" prompt

4. **Cancellation Prediction:**
   - ML model predicts cancellation likelihood
   - Overbook slightly to account for it
   - "This booking has 30% cancellation risk - consider confirming"

**Feature 15: Inventory Management (Premium Feature)**

**For mechanics who stock parts:**

**Features:**
- Add parts to inventory
- Track quantities
- Low stock alerts
- Auto-deduct when used in booking
- Supplier integration (order directly)
- Cost tracking & profit margins
- Parts usage analytics

**Integration with Booking:**
- When creating invoice, select parts used
- Automatically deducts from inventory
- Adds to customer invoice

---

## 6. ADMIN PANEL ADVANCED FEATURES

**Feature 16: Fraud Detection System**

**Automated Monitoring:**

1. **Suspicious Pattern Detection:**
   - Multiple accounts from same device
   - Fake reviews (same IP, rapid submissions)
   - Booking abuse (book & cancel repeatedly)
   - Payment fraud attempts

2. **AI Review Analysis:**
   - Detect fake reviews by language patterns
   - Compare to reviewer's other reviews
   - Flag for manual review

3. **Mechanic Verification AI:**
   - OCR on certification documents
   - Verify against public databases
   - Cross-reference with business registries

4. **Dashboard:**
   - Flagged accounts queue
   - Investigation tools
   - Ban/suspend actions
   - Appeal process

**Feature 17: Dynamic Pricing Engine**

**Algorithm Factors:**
- Supply/demand in area
- Time of day
- Urgency
- Driver loyalty tier
- Mechanic rating
- Historical booking patterns

**Admin Controls:**
- Set base commission %
- Set surge pricing triggers
- Cap maximum surge
- Create promotional periods (reduce commission)

**Example:**
- Normal: 15% commission
- High demand (Friday evening): 20% commission
- New driver (first 3 bookings): 10% commission
- Platinum loyalty tier: 12% commission

**Feature 18: Content Recommendation Engine**

**Educational Content Targeting:**

1. **Personalized Content:**
   - Based on driver's car age/model
   - Based on past issues
   - Based on season/location

2. **Push Timing Optimization:**
   - Send content when most likely to engage
   - A/B test subject lines
   - Track open rates

3. **Content Performance:**
   - Which articles most helpful
   - Which videos most watched
   - Optimize content library

**Feature 19: Multi-City Expansion Tools**

**For scaling to new cities:**

1. **City Onboarding Wizard:**
   - Add new city to platform
   - Set operational radius
   - Localize content
   - Configure city-specific pricing

2. **Mechanic Recruitment Dashboard:**
   - Landing page generator for new city
   - Track applications by city
   - Bulk verify mechanics
   - Launch checklist (need 20 mechanics before go-live)

3. **City Performance Comparison:**
   - Compare metrics across cities
   - Identify best/worst performing
   - Replicate success patterns

**Feature 20: Customer Support AI Chatbot**

**Integrated Support:**

1. **In-App Chatbot (Driver & Mechanic):**
   - Answers FAQs instantly
   - "How do I cancel a booking?"
   - "How do I update my payment method?"
   - Escalates to human when needed

2. **Admin Support Ticketing:**
   - All escalated chats become tickets
   - Priority queue (urgent/normal/low)
   - Assignment to support agents
   - Response templates
   - SLA tracking

3. **Knowledge Base:**
   - Searchable help articles
   - Video tutorials
   - Integrated in app

---

## 7. DESIGN IMPLEMENTATION GUIDE

**Create a Design System Document:**

File: `design-system.md`

Include:
- Color palette with hex codes
- Typography scale with font sizes
- Spacing scale
- Component specifications
- Animation guidelines
- Accessibility requirements

**Use shadcn/ui for Web:**

Install shadcn components:
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input table dialog dropdown-menu
```

Customize theme in `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#10B981',
        // ... rest of palette
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

**Create Reusable Components:**

For Mobile:
- `components/Button.tsx`
- `components/Card.tsx`
- `components/Input.tsx`
- `components/StatusBadge.tsx`
- `components/LoadingState.tsx`
- `components/EmptyState.tsx`

For Web:
- Use shadcn/ui as base
- Customize for brand
- Create composite components (StatCard, DataTable, etc.)

**Animation Library:**

Mobile: 
- Use `react-native-reanimated` for smooth animations
- Use `lottie-react-native` for complex animations
- Use `react-native-haptic-feedback` for tactile feedback

Web:
- Use `framer-motion` for smooth transitions
- Use `react-spring` for physics-based animations

---

## 8. PERFORMANCE OPTIMIZATION

**Mobile App:**
- Implement `React.memo` for heavy components
- Use `FlatList` with `windowSize` optimization
- Image lazy loading with `react-native-fast-image`
- Debounce search inputs (500ms)
- Cache API responses with React Query
- Optimize map markers (cluster when >50)

**Web Dashboard:**
- Server-side rendering with Next.js
- Image optimization with `next/image`
- Code splitting by route
- Lazy load charts/analytics
- Implement virtual scrolling for long tables
- Use SWR or React Query for caching

**Backend:**
- Database indexing on foreign keys
- Connection pooling
- Redis for session storage
- Pagination for all list endpoints (limit 20)
- Implement GraphQL or tRPC for efficient data fetching
- Background jobs with Bull or Agenda

---

## 9. MONETIZATION ENHANCEMENTS

**Additional Revenue Streams:**

1. **Premium Driver Subscription** ($4.99/month):
   - Priority booking
   - No platform fees
   - Extended warranty on services
   - Free AI diagnoses (normally $2 each)
   - Access to premium mechanics

2. **Featured Mechanic Listings:**
   - Pay $199/month to appear at top of search
   - "Sponsored" badge
   - Higher visibility = more bookings

3. **Advertising:**
   - Car parts retailers
   - Insurance companies
   - Car dealerships
   - Native ads in feed

4. **Data Insights (B2B):**
   - Sell anonymized data to:
     * Car manufacturers (common issues)
     * Parts suppliers (demand forecasting)
     * Insurance companies (risk assessment)

5. **White Label Solution:**
   - License platform to:
     * Car dealerships (for service departments)
     * Car manufacturers (branded service networks)
     * Insurance companies (approved repair networks)

---

## 10. ACCESSIBILITY & INCLUSIVITY

**Mobile App:**
- Screen reader support (VoiceOver, TalkBack)
- Minimum touch target: 44x44dp
- Color contrast ratio: 4.5:1
- Support for large text sizes
- Voice input for all text fields
- Reduce motion option

**Multi-Language Support:**
- i18n implementation with `react-i18next`
- RTL support for Arabic, Hebrew
- Date/number formatting per locale
- Language switcher in settings
- Start with: English, Spanish, Arabic

**Feature: Women Safety Focus**
- Filter: "Women-friendly shops"
- Verification: Women-owned businesses badge
- Reviews category: "Felt safe and respected"
- Emergency contact auto-notification
- Share live location during service

---

## 11. TESTING & QUALITY ASSURANCE

**Implement:**

1. **Unit Tests:**
   - Jest for mobile & web
   - Test all utility functions
   - Test Redux/Zustand stores
   - Target: 70%+ coverage

2. **Integration Tests:**
   - Test API endpoints
   - Test authentication flows
   - Test payment processing

3. **E2E Tests:**
   - Detox for mobile
   - Playwright for web
   - Critical user journeys:
     * Sign up → Find mechanic → Book → Pay
     * Mechanic accepts → Complete service → Review

4. **Performance Testing:**
   - Lighthouse for web (score 90+)
   - React Native Performance for mobile
   - Load testing API with k6

5. **Security Testing:**
   - OWASP security checklist
   - Penetration testing
   - SQL injection prevention
   - XSS prevention

---

## 12. DEPLOYMENT & DEVOPS

**Infrastructure:**

1. **Mobile App:**
   - Use Expo EAS Build
   - Separate environments: dev, staging, production
   - OTA updates for minor fixes
   - App Store + Google Play submission

2. **Web (Next.js):**
   - Deploy to Vercel (recommended)
   - OR AWS (EC2 + RDS + S3)
   - CDN for static assets
   - Environment variables per environment

3. **Database:**
   - PostgreSQL on Supabase OR AWS RDS
   - Daily automated backups
   - Read replicas for scaling

4. **File Storage:**
   - AWS S3 or Cloudflare R2
   - CDN for image delivery
   - Automatic image resizing

5. **Monitoring:**
   - Sentry for error tracking
   - Google Analytics / Mixpanel for usage
   - LogRocket for session replay
   - Uptime monitoring (UptimeRobot)

**CI/CD Pipeline:**
```yaml
# Example GitHub Actions workflow
- Run tests on every PR
- Lint code
- Type check (TypeScript)
- Deploy to staging on merge to develop
- Deploy to production on merge to main
- Automated database migrations
- Slack notifications
```

---

## FINAL IMPLEMENTATION CHECKLIST

### Phase 1: Core MVP (Weeks 1-8)
- [ ] Next.js project setup with TypeScript
- [ ] Database schema and Prisma setup
- [ ] Authentication (NextAuth.js)
- [ ] React Native mobile app setup
- [ ] Basic CRUD for users, mechanics, vehicles
- [ ] Mechanic search with maps
- [ ] Booking flow (all 6 steps)
- [ ] Basic chat (Socket.io)
- [ ] Payment integration (Stripe)
- [ ] Review system
- [ ] Admin panel (basic user management)

### Phase 2: Polish & Advanced Features (Weeks 9-12)
- [ ] AI diagnosis integration
- [ ] Video consultation feature
- [ ] Smart maintenance reminders
- [ ] Enhanced analytics dashboards
- [ ] Loyalty & referral program
- [ ] Push notifications (Firebase)
- [ ] Email notifications
- [ ] SEO optimization for web
- [ ] Performance optimization
- [ ] Security hardening

### Phase 3: Scale & Growth (Weeks 13-16)
- [ ] Fleet management (B2B)
- [ ] Premium subscriptions
- [ ] Multi-language support
- [ ] Fraud detection system
- [ ] Dynamic pricing
- [ ] Marketing automation tools
- [ ] Advanced analytics & ML
- [ ] White-label preparations
- [ ] Load testing & optimization
- [ ] Beta testing with real users

### Phase 4: Launch (Weeks 17-20)
- [ ] App store submissions
- [ ] Landing page & marketing site
- [ ] Social media presence
- [ ] Mechanic onboarding campaign
- [ ] Driver acquisition campaign
- [ ] PR & media outreach
- [ ] Monitoring & support setup
- [ ] SOFT LAUNCH (one city)
- [ ] Gather feedback & iterate
- [ ] FULL LAUNCH

---

## CRITICAL DESIGN MANDATE

THIS PLATFORM MUST LOOK AND FEEL LIKE:
- Uber (for booking flow smoothness)
- Airbnb (for trust & design polish)
- Notion (for dashboard cleanliness)
- Linear (for attention to micro-interactions)

NOT LIKE:
- Generic admin templates
- Bootstrap default themes
- Outdated Material Design
- Cluttered enterprise software

**EVERY SCREEN** should feel:
- Intentional (nothing is there by accident)
- Delightful (small animations, thoughtful copy)
- Fast (optimistic updates, skeleton screens)
- Trustworthy (verification badges, real photos, detailed reviews)
- Professional (polish in every detail)

---

## FINAL INSTRUCTION TO AI

BUILD THIS PLATFORM WITH:
1. ✅ **Next.js 14+ (App Router)** for web applications
2. ✅ **React Native (Expo)** for mobile app
3. ✅ **TypeScript** throughout for type safety
4. ✅ **Tailwind CSS + shadcn/ui** for consistent design
5. ✅ **Prisma** for database ORM
6. ✅ **tRPC** for type-safe APIs
7. ✅ **NextAuth.js** for authentication
8. ✅ **PostgreSQL** for database
9. ✅ **Zod** for validation

PRIORITIZE:
- User experience over feature count
- Design quality over speed of development
- Type safety over flexibility
- Performance over convenience

CREATE:
- Clean, well-documented code
- Reusable component library
- Comprehensive error handling
- Graceful degradation
- Meaningful loading states
- Helpful error messages

RESULT: A production-ready, beautifully designed, technically solid platform that drivers and mechanics will love to use.

START BUILDING NOW. 🚀

WHY NEXT.JS OVER REACT + NODE.JS?
FactorNext.jsReact + Node.jsSetup ComplexitySingle projectTwo separate projectsType SafetyFull-stack TypeScript shared typesNeed to duplicate typesAPI DevelopmentBuilt-in API routesSeparate Express setupDeploymentOne deploy (Vercel)Two deploys (frontend + backend)PerformanceServer components, automatic optimizationManual optimization neededSEOBuilt-in SSR/SSGRequires manual setupDeveloper ExperienceHot reload for everythingSeparate dev serversCostSingle hostingTwo hosting instancesMaintenanceOne codebase to maintainTwo codebases
Verdict: Next.js is the clear winner for this project.
Use separate Node.js service ONLY for Socket.io (real-time chat) since Next.js API routes aren't ideal for WebSockets.

This complete prompt with advanced features will produce a world-class, production-ready platform that stands out in design and functionality. Give this to an AI coding assistant and you'll get a comprehensive, well-architected application! 🎯