# Technology Stack

## Frontend (my-app/)

**Framework**: React 19.2.0 with Create React App  
**Build Tool**: react-scripts 5.0.1  
**Styling**: CSS Modules + Tailwind CSS 4.1.17  
**Routing**: react-router-dom 6.30.1  
**State Management**: React Context API  
**Animations**: GSAP 3.13.0, Framer Motion 12.23.24, Lenis (smooth scroll)  
**UI Libraries**: lucide-react, react-icons  
**Forms**: react-datepicker, react-google-recaptcha  
**HTTP Client**: axios 1.13.2

### Common Commands
```bash
cd my-app
npm install          # Install dependencies
npm start            # Start dev server (localhost:3000)
npm run build        # Production build
npm test             # Run tests
```

## Backend - Node.js Server (server/)

**Runtime**: Node.js with ES Modules  
**Framework**: Express 4.18.2  
**Database**: MongoDB with Mongoose 7.8.7  
**Email**: Nodemailer 6.9.7  
**Environment**: dotenv 16.3.1

### Common Commands
```bash
cd server
npm install          # Install dependencies
npm start            # Start server (localhost:5000)
npm run dev          # Start with auto-reload
```

### Environment Variables Required
- `ADMIN_EMAIL`: Gmail address for notifications
- `ADMIN_PASSWORD`: Gmail app password
- `MONGODB_URI`: MongoDB connection string
- `SMTP_HOST`: smtp.gmail.com
- `SMTP_PORT`: 587

## Backend - Spring Boot (callschedule-backend/)

**Language**: Java 21  
**Framework**: Spring Boot 3.5.8  
**Build Tool**: Maven (mvnw wrapper included)  
**Database**: MongoDB (Spring Data MongoDB)  
**Template Engine**: Thymeleaf  
**Email**: Spring Boot Mail Starter

### Common Commands
```bash
cd callschedule-backend
./mvnw spring-boot:run    # Start server (localhost:8080)
./mvnw clean install      # Build project
./mvnw test               # Run tests (currently disabled)
```

### Key Dependencies
- spring-boot-starter-web
- spring-boot-starter-data-mongodb
- spring-boot-starter-validation
- spring-boot-starter-mail
- lombok (for boilerplate reduction)

## Database

**MongoDB**: Used by both Node.js and Spring Boot backends  
**Default Port**: 27017  
**Collections**: portfolioreviews, bookings, usertemps

## Development Environment

- **Frontend**: http://localhost:3000
- **Node.js Backend**: http://localhost:5000
- **Spring Boot Backend**: http://localhost:8080
- **MongoDB**: mongodb://localhost:27017

## Deployment

- **Frontend**: Vercel (recommended)
- **Node.js Backend**: Heroku (recommended)
- **Spring Boot Backend**: AWS, Heroku, or similar
- **Database**: MongoDB Atlas (cloud)
