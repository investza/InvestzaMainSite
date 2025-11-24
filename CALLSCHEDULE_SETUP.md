# CallSchedule Integration Setup

## Overview
The CallSchedule feature has been integrated from the [CallSchedule repository](https://github.com/InvestzaDeveloper123/CallSchedule). This is a multi-step scheduling flow that allows users to book consultation calls.

## Frontend Setup (Completed)

### Components Copied
All components from the CallSchedule repo have been copied to `my-app/src/components/`:
- `Information.jsx` - Left panel information display
- `NameDetails.jsx` - Step 1: Name input
- `ContactDetails.jsx` - Step 2: Contact information
- `VerifyOtp.jsx` - Step 3: OTP verification
- `InvestmentDetails.jsx` - Step 4: Investment range selection
- `ScheduleComponent.jsx` - Step 5: Date/time picker
- `EmailDetails.jsx` - Step 6: Email details
- `ConfirmationPage.jsx` - Final confirmation page
- `Vision.jsx` - Testimonial component
- `Page.jsx` - Layout wrapper
- `BookingList.jsx` - Admin booking list view

### Routes Added
The following routes have been added to App.js:
- `/schedule-call` - Entry point (Name input)
- `/contactDetails` - Contact information
- `/verification` - OTP verification
- `/investmentDetails` - Investment range
- `/scheduleCall` - Date/time selection
- `/emailDetails` - Email details
- `/confirmation` - Confirmation page
- `/bookings` - Admin booking list

### Dependencies Installed
```bash
npm install axios date-fns framer-motion react-datepicker
```

### Assets
Images copied to `my-app/src/assets/`:
- `Adnan-Khan.webp` - Testimonial image
- `Ankit-Mehta.webp` - Testimonial image
- Other assets from the CallSchedule repo

## Backend Setup (Required)

### Backend Location
The backend is a Spring Boot application located in the cloned repo at:
```
/tmp/CallSchedule/demo/
```

### Backend Requirements
- Java 21
- Maven
- Spring Boot 3.5.8
- Runs on port 8081

### API Endpoints
The backend provides these endpoints (configured in `my-app/src/api/flowApi.js`):
- `POST /api/flow/start` - Start the flow with full name
- `POST /api/flow/send-otp` - Send OTP to mobile
- `POST /api/flow/verify-otp` - Verify OTP
- `POST /api/flow/investment` - Save investment range
- `GET /api/flow/check-slot` - Check if time slot is available
- `POST /api/flow/create-booking` - Create final booking
- `GET /api/flow/bookings` - Get all bookings (admin)

**Note:** The backend runs on port 8080 (not 8081). The API URL has been updated in `flowApi.js`.

### Starting the Backend

**Prerequisites:**
- Java 21 must be installed. Check with: `java -version`
- If Java is not installed, download from: https://www.oracle.com/java/technologies/downloads/

To start the Spring Boot backend:

```bash
cd callschedule-backend
chmod +x mvnw  # Make the Maven wrapper executable
./mvnw spring-boot:run
```

Or if you have Maven installed globally:
```bash
cd callschedule-backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**Note:** The backend has been copied to `callschedule-backend/` in your project root.

### MongoDB Requirement
The backend requires MongoDB to be running on `localhost:27017`. If MongoDB is not installed:

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Or use Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

The backend will still start without MongoDB, but booking operations will fail.

## Testing the Flow

### Current Status
All servers are running:
- ✅ React frontend: `http://localhost:3000`
- ✅ Node.js backend: `http://localhost:5000`
- ✅ Spring Boot CallSchedule backend: `http://localhost:8080`
- ⚠️ MongoDB: Not running (optional for testing UI)

### Steps to Test
1. Navigate to `http://localhost:3000`
2. Click "Schedule a Call" button on the landing page
3. You'll be redirected to `http://localhost:3000/schedule-call`
4. Follow the multi-step flow:
   - Enter your name
   - Enter contact details (phone number)
   - Verify OTP
   - Select investment range
   - Choose date and time
   - Enter email details
   - View confirmation

## Integration with Landing Page

The "Schedule a Call" button on the landing page has been updated to navigate to `/schedule-call` instead of opening a modal.

## Notes

- The flow uses React Context for state management across steps
- Data is persisted in localStorage
- The backend handles OTP generation and verification
- Time slot availability is checked in real-time
- The flow includes form validation at each step

## Troubleshooting

### Backend Not Running
If you see network errors, ensure the Spring Boot backend is running on port 8081.

### Missing Images
If testimonial images don't load, check that the assets were copied correctly to `my-app/src/assets/`.

### API Errors
Check the browser console and backend logs for detailed error messages.
