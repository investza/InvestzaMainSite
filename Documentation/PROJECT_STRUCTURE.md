# Project Structure - Investza Frontend

## Recommended Frontend Architecture

This document outlines the optimal folder structure for the React frontend (`my-app/`) to improve maintainability, performance, and scalability.

```
my-app/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── team/                    # Team member photos
│   │   │   │   ├── abhishek.webp
│   │   │   │   ├── pooja.webp
│   │   │   │   └── ...
│   │   │   ├── clients/                 # Client testimonial images
│   │   │   │   ├── client1.webp
│   │   │   │   └── ...
│   │   │   ├── events/                  # Event images
│   │   │   │   ├── event1.jpeg
│   │   │   │   └── ...
│   │   │   ├── icons/                   # SVG icons and small graphics
│   │   │   │   ├── app_store_icon.svg
│   │   │   │   ├── google_play_icon.svg
│   │   │   │   └── ...
│   │   │   ├── backgrounds/             # Background images
│   │   │   │   ├── hero_bg.webp
│   │   │   │   ├── footer_bg.jpeg
│   │   │   │   └── ...
│   │   │   ├── ui/                      # UI elements, textures
│   │   │   │   ├── card-texture.jpeg
│   │   │   │   └── ...
│   │   │   └── newsletter/              # Newsletter related images
│   │   │       ├── newsletter7_graph.png
│   │   │       └── ...
│   │   ├── videos/
│   │   │   ├── hero/
│   │   │   │   └── hero_vid.mp4
│   │   │   ├── experts/
│   │   │   │   ├── expert1.mp4
│   │   │   │   └── ...
│   │   │   └── learn-why/
│   │   │       ├── learnwhy_1.mp4
│   │   │       └── ...
│   │   └── fonts/                       # Custom fonts (if any)
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── common/                      # Reusable components
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Modal/
│   │   │   ├── LoadingSpinner/
│   │   │   └── ...
│   │   ├── layout/                      # Layout components
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Header.module.css
│   │   │   ├── Footer/
│   │   │   ├── Navbar/
│   │   │   └── ...
│   │   ├── sections/                    # Page sections
│   │   │   ├── HeroSection/
│   │   │   ├── AboutSection/
│   │   │   └── ...
│   │   ├── forms/                       # Form components
│   │   │   ├── ContactForm/
│   │   │   ├── PortfolioForm/
│   │   │   └── ...
│   │   └── ui/                          # UI-specific components
│   │       ├── Accordion/
│   │       ├── TeamCard/
│   │       └── ...
│   │
│   ├── pages/                           # Route components
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── About/
│   │   ├── Contact/
│   │   └── ...
│   │
│   ├── hooks/                           # Custom React hooks
│   │   ├── useApi.js
│   │   ├── useLocalStorage.js
│   │   └── ...
│   │
│   ├── context/                         # React Context providers
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   └── ...
│   │
│   ├── services/                        # API and external services
│   │   ├── api/
│   │   │   ├── flowApi.js
│   │   │   ├── portfolioApi.js
│   │   │   └── ...
│   │   └── utils/
│   │       ├── validation.js
│   │       ├── formatters.js
│   │       └── ...
│   │
│   ├── assets/                          # Bundled assets (imported in JS)
│   │   ├── images/
│   │   │   ├── app-screenshots/         # App mockups
│   │   │   │   ├── MainScreen.png
│   │   │   │   └── ...
│   │   │   └── charts/                  # Data visualizations
│   │   │       ├── RateCutChart.png
│   │   │       └── ...
│   │   └── icons/                       # SVG icons as React components
│   │       ├── ArrowIcon.jsx
│   │       └── ...
│   │
│   ├── styles/                          # Global styles
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── animations.css
│   │
│   ├── constants/                       # App constants
│   │   ├── routes.js
│   │   ├── apiEndpoints.js
│   │   └── ...
│   │
│   └── utils/                           # Utility functions
│       ├── helpers.js
│       ├── dateUtils.js
│       └── ...
```

## Key Benefits

### 1. **Organized Asset Management**
- **Public Assets**: Static files served directly by the web server
- **Bundled Assets**: Images imported in JavaScript for optimization
- **Categorized Images**: Team, clients, events, backgrounds, UI elements
- **Video Organization**: Grouped by purpose (hero, experts, educational)

### 2. **Component Architecture**
- **Common**: Reusable UI components across the app
- **Layout**: Header, footer, navigation components
- **Sections**: Page-specific sections (hero, about, etc.)
- **Forms**: All form-related components
- **UI**: Specialized UI components (accordions, cards, etc.)

### 3. **Service Layer**
- **API**: External service integrations
- **Utils**: Helper functions and utilities
- **Validation**: Form and data validation logic

### 4. **State Management**
- **Context**: React Context providers for global state
- **Hooks**: Custom React hooks for reusable logic

### 5. **Styling Organization**
- **Global Styles**: App-wide CSS variables and base styles
- **Component Styles**: CSS Modules for component-specific styling
- **Animation Styles**: Centralized animation definitions

## Implementation Notes

- This structure maintains backward compatibility with existing code
- No existing files need to be modified during restructuring
- Assets can be migrated gradually to the new organization
- Component refactoring can happen incrementally