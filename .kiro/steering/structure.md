# Project Structure

## Repository Organization

This is a monorepo containing three main applications:

```
project-root/
├── my-app/                    # React frontend
├── server/                    # Node.js backend (portfolio reviews)
├── callschedule-backend/      # Spring Boot backend (call scheduling)
└── [documentation files]      # Setup and deployment guides
```

## Frontend Structure (my-app/)

### Component Organization

**Pages** (`src/pages/`): Full-page components with their own routes
- AboutUs, ContactUs, EventsPage, TeamPage, FAQPage, Newsletter, etc.
- Legal pages: PrivacyPolicy, TermsConditions, Disclaimer, RefundPolicy
- Each page typically has a corresponding `.css` file

**Components** (`src/components/`): Reusable UI components
- Layout: Header, Footer, Navbar, LandingPage
- Sections: HeroSection, Section2, Section3, Section4
- Forms: ReviewMyportfolioForm, WealthTracker
- Call Scheduling Flow: NameDetails, ContactDetails, VerifyOtp, InvestmentDetails, ScheduleComponent, EmailDetails, ConfirmationPage, BookingList
- Shared: Accordion, TeamCard, Vision, Page, Information

**Styling Convention**: CSS Modules (`.module.css`) for component-specific styles, regular `.css` for pages

**Contexts** (`src/components/contexts/`): React Context providers
- Details.js, OtpVerification.js, userDetails.js, showFormContext.js

**API Layer** (`src/api/`): API client functions
- flowApi.js: Handles all call scheduling API calls

**Assets** (`src/assets/`): Images, videos, and static files
- Team photos, testimonials, slider images, logos

**Public** (`public/`): Static assets served directly
- Videos (hero_vid.mp4, expert*.mp4, learnwhy*.mp4)
- Images (webp format preferred for optimization)
- Favicon, manifest, robots.txt

### Routing Structure

- `/` - Landing page
- `/schedule-call` - Call scheduling flow entry
- `/contactDetails`, `/verification`, `/investmentDetails`, `/scheduleCall`, `/emailDetails`, `/confirmation` - Multi-step flow
- `/about`, `/team`, `/events`, `/contact`, `/faq`, `/learn-why` - Info pages
- `/newsletter`, `/newsletter/:id` - Newsletter listing and details
- `/privacy`, `/terms`, `/disclaimer`, `/refund` - Legal pages
- `/wealth-tracker` - Wealth tracker feature
- `/bookings` - Admin booking list

## Backend Structure (server/)

```
server/
├── models/              # Mongoose schemas
│   └── PortfolioReview.js
├── server.js            # Main Express app
├── package.json
├── .env                 # Environment variables (not in git)
└── .env.example         # Template for environment setup
```

**API Endpoints**:
- `POST /api/portfolio-review` - Submit portfolio review
- `GET /api/submissions` - Get all submissions
- `GET /api/submissions/:id` - Get single submission
- `PATCH /api/submissions/:id` - Update submission status

## Backend Structure (callschedule-backend/)

Standard Spring Boot Maven project structure:

```
callschedule-backend/
├── src/main/java/com/example/demo/
│   ├── Controllers/         # REST endpoints
│   │   ├── UserFlowController.java
│   │   ├── ContactController.java
│   │   ├── ReviewPortfolioController.java
│   │   └── TextController.java
│   ├── Models/              # MongoDB entities
│   │   ├── Booking.java
│   │   ├── UserTemp.java
│   │   ├── ContactMessage.java
│   │   └── ReviewPortfolio.java
│   ├── Repositories/        # Data access layer
│   │   ├── BookingRepository.java
│   │   ├── UserTempRepository.java
│   │   ├── ContactMessageRepository.java
│   │   └── ReviewPortfolioRepository.java
│   ├── Services/            # Business logic
│   │   ├── UserFlowService.java
│   │   ├── ContactService.java
│   │   ├── ReviewPortfolioService.java
│   │   ├── SmsService.java (interface)
│   │   ├── RealSmsService.java
│   │   └── impl/
│   │       └── ContactServiceImpl.java
│   ├── dto/                 # Data transfer objects
│   │   ├── ApiResponse.java
│   │   ├── CreateBookingRequest.java
│   │   ├── SendOtpRequest.java
│   │   ├── VerifyOtpRequest.java
│   │   └── [other DTOs]
│   ├── config/              # Configuration classes
│   │   ├── AppConfig.java
│   │   └── CorsConfig.java
│   ├── util/                # Utility classes
│   │   └── OtpUtil.java
│   └── DemoApplication.java # Main application class
├── src/main/resources/
│   ├── application.properties
│   └── templates/           # Thymeleaf email templates
│       ├── call-schedule-admin-notification.html
│       ├── call-schedule-user-email.html
│       ├── contact-thankyou.html
│       ├── review-portfolio-notification.html
│       └── review-portfolio-thankyou.html
└── pom.xml                  # Maven dependencies
```

**API Endpoints** (prefix: `/api/flow`):
- `POST /start` - Initialize user flow
- `POST /send-otp` - Send OTP to mobile
- `POST /verify-otp` - Verify OTP code
- `POST /investment` - Save investment range
- `GET /check-slot` - Check time slot availability
- `POST /create-booking` - Create final booking
- `GET /bookings` - Get all bookings

## Naming Conventions

### Frontend
- **Components**: PascalCase (e.g., `HeroSection.jsx`, `TeamCard.js`)
- **CSS Modules**: PascalCase.module.css (e.g., `HeroSection.module.css`)
- **Regular CSS**: PascalCase.css (e.g., `LandingPage.css`)
- **Contexts**: camelCase (e.g., `userDetails.js`, `showFormContext.js`)
- **API files**: camelCase (e.g., `flowApi.js`)

### Backend (Java)
- **Classes**: PascalCase (e.g., `UserFlowController`, `BookingRepository`)
- **Packages**: lowercase (e.g., `controllers`, `services`, `dto`)
- **DTOs**: Descriptive names ending in Request/Response (e.g., `CreateBookingRequest`)

### Backend (Node.js)
- **Files**: PascalCase for models (e.g., `PortfolioReview.js`)
- **Variables**: camelCase

## Key Architectural Patterns

1. **Frontend**: Component-based architecture with Context API for state management
2. **Spring Boot**: Layered architecture (Controller → Service → Repository)
3. **Node.js**: Simple Express server with direct MongoDB access
4. **Communication**: REST APIs with JSON payloads
5. **Email**: HTML templates for both backends (Thymeleaf for Java, inline HTML for Node.js)
6. **CORS**: Enabled on both backends for cross-origin requests
