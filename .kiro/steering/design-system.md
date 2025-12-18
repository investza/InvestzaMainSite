---
inclusion: always
---

# Investza Design System Rules

## Project Overview
Investza is a comprehensive wealth management platform built with React 19.2.0, featuring a sophisticated glassmorphism design system with advanced animations and responsive layouts.

## Design System Structure

### 1. Token Definitions

**Color Palette:**
- Primary Background: `#000000` (Black)
- Secondary Background: `#E6E6E6` (Light Gray for specific pages)
- Accent Color: `#04d9ff` (Cyan Blue)
- Text Colors:
  - Primary: `#ffffff` (White)
  - Secondary: `rgba(255, 255, 255, 0.8)` (Semi-transparent white)
  - Muted: `rgba(255, 255, 255, 0.6)` (More transparent white)
  - Dark Mode: `#000000`, `#333333`

**Typography Scale:**
- Primary Font: `'Playfair Display', serif` (Headings, elegant text)
- Secondary Font: `'Manrope', sans-serif` (Body text, UI elements)
- Font Sizes:
  - Hero: `3.3rem` (Desktop), `1.6rem` (Mobile)
  - Section Titles: `3.5rem` (Desktop), `2.5rem` (Mobile)
  - Body: `1.1rem` (Desktop), `1rem` (Mobile)
  - Small: `0.9rem` (Desktop), `0.85rem` (Mobile)

**Spacing System:**
- Base unit: `1rem` (16px)
- Common gaps: `1rem`, `1.5rem`, `2rem`, `3rem`, `4rem`
- Container max-width: `1200px` (content), `1400px` (wide layouts)
- Padding: `0 2rem` (Desktop), `0 1rem` (Mobile)

**Border Radius:**
- Small: `8px`, `12px`
- Medium: `16px`, `20px`
- Large: `24px`, `30px`
- Extra Large: `35px` (Header when scrolled)

### 2. Component Library Architecture

**Component Organization:**
```
src/components/
├── Layout/           # Header, Footer, Navbar
├── Sections/         # HeroSection, Section2, Section3, Section4
├── Forms/           # ReviewMyportfolioForm, WealthTracker
├── CallScheduling/  # Multi-step flow components
├── Shared/          # Accordion, TeamCard, Vision, Page
└── UI/              # GlassSurface, buttons, cards
```

**Component Patterns:**
- Functional components with hooks
- React Context API for state management
- CSS Modules for component-specific styles
- Regular CSS for page-level styles

### 3. Frameworks & Libraries

**Core Stack:**
- **Framework:** React 19.2.0 with Create React App
- **Routing:** react-router-dom 6.30.1
- **Styling:** CSS Modules + Tailwind CSS 4.1.17
- **Animations:** GSAP 3.13.0, Framer Motion 12.23.24, Lenis (smooth scroll)
- **Icons:** lucide-react, react-icons
- **HTTP:** axios 1.13.2

**Build System:**
- react-scripts 5.0.1
- PostCSS with Autoprefixer
- Tailwind CSS 4.1.17

### 4. Asset Management

**Asset Structure:**
```
src/assets/          # Images, videos, static files
public/             # Static assets served directly
├── videos/         # hero_vid.mp4, expert*.mp4, learnwhy*.mp4
├── images/         # WebP format preferred for optimization
├── logo.svg        # Main logo
└── favicon.ico     # Site icon
```

**Optimization:**
- WebP format preferred for images
- Video assets for hero backgrounds
- SVG for logos and icons
- Lazy loading for performance

### 5. Icon System

**Icon Libraries:**
- **Primary:** lucide-react (Modern, consistent icons)
- **Secondary:** react-icons (Fallback for specific needs)

**Usage Patterns:**
```jsx
import { ArrowRight, Menu, X } from 'lucide-react';

// Standard size: 24x24px
<ArrowRight size={24} />

// Small size: 16x16px for inline elements
<ArrowRight size={16} />
```

### 6. Styling Approach

**CSS Architecture:**
- **Component Styles:** CSS Modules (`.module.css`)
- **Page Styles:** Regular CSS (`.css`)
- **Global Styles:** Tailwind CSS utilities
- **Animations:** GSAP + CSS animations

**Glassmorphism System:**
The project uses a sophisticated glassmorphism design with the `GlassSurface` component:

```jsx
<GlassSurface
  width="auto"
  height="auto"
  borderRadius={35}
  brightness={30}
  opacity={0.5}
  blur={15}
  backgroundOpacity={0}
  saturation={1.2}
  className="glass-element"
>
  {children}
</GlassSurface>
```

**Glass Effect Properties:**
- Background: `rgba(255, 255, 255, 0.15)` (Light mode)
- Background: `rgba(255, 255, 255, 0.08)` (Dark mode)
- Backdrop Filter: `blur(100px) saturate(1.8) brightness(1.1)`
- Border: `1px solid rgba(255, 255, 255, 0.12)`

### 7. Responsive Design Patterns

**Breakpoints:**
- Mobile: `max-width: 768px`
- Tablet: `max-width: 1024px`
- Desktop: `min-width: 1025px`
- Large Desktop: `min-width: 1400px`

**Grid Systems:**
- Desktop: `grid-template-columns: repeat(3, 1fr)` (Cards)
- Tablet: `grid-template-columns: repeat(2, 1fr)`
- Mobile: `grid-template-columns: 1fr`

**Typography Scaling:**
```css
/* Desktop */
.hero-title { font-size: 3.3rem; }

/* Mobile */
@media (max-width: 768px) {
  .hero-title { font-size: 1.6rem; }
}
```

### 8. Animation Patterns

**GSAP Animations:**
- Scroll-triggered animations
- Parallax effects for background images
- Smooth transitions between sections

**CSS Animations:**
- Hover effects with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Loading animations with `ease-out` timing
- Transform animations for cards and buttons

**Lenis Smooth Scroll:**
- Implemented for smooth page scrolling
- Integrated with GSAP ScrollTrigger

### 9. Component Naming Conventions

**React Components:**
- PascalCase: `HeroSection.jsx`, `TeamCard.js`
- Descriptive names: `ScheduleComponentPortfolio.jsx`

**CSS Classes:**
- BEM-like methodology: `.header-container`, `.dropdown-card-title`
- Component-specific: `.hero-text-above`, `.stat-card`
- State classes: `.scrolled`, `.active`, `.visible`

**Files:**
- Components: PascalCase (e.g., `Header.js`)
- CSS Modules: PascalCase.module.css
- Regular CSS: PascalCase.css
- Contexts: camelCase (e.g., `userDetails.js`)

### 10. State Management Patterns

**React Context API:**
```javascript
// Context files in src/components/contexts/
- Details.js          # Main details context
- OtpVerification.js  # OTP flow state
- userDetails.js      # User information
- showFormContext.js  # Form visibility state
```

**State Patterns:**
- Local state with `useState` for component-specific data
- Context for shared state across components
- Custom hooks for reusable logic

### 11. Form Patterns

**Multi-step Forms:**
- Call scheduling flow: 6-step process
- Portfolio review form: Single-step with validation
- OTP verification with timeout handling

**Form Libraries:**
- react-datepicker for date selection
- react-google-recaptcha for security
- Custom validation logic

### 12. Performance Optimizations

**Code Splitting:**
- Route-based splitting with React Router
- Lazy loading for heavy components

**Asset Optimization:**
- WebP images for better compression
- Video optimization for hero backgrounds
- SVG icons for scalability

**Animation Performance:**
- GPU acceleration with `transform: translateZ(0)`
- `will-change` property for animated elements
- Efficient scroll listeners with throttling

### 13. Accessibility Guidelines

**Semantic HTML:**
- Proper heading hierarchy (h1, h2, h3)
- ARIA labels for interactive elements
- Focus management for modals and dropdowns

**Color Contrast:**
- High contrast white text on dark backgrounds
- Semi-transparent overlays for readability
- Alternative text for all images

### 14. Integration Guidelines for Figma

**Design Token Mapping:**
- Map Figma color variables to CSS custom properties
- Use consistent spacing scale from Figma
- Maintain typography hierarchy alignment

**Component Mapping:**
- Figma components → React components
- Design system tokens → CSS variables
- Interactive states → CSS hover/focus states

**Workflow:**
1. Extract design tokens from Figma
2. Convert to CSS custom properties
3. Apply to existing component structure
4. Maintain glassmorphism aesthetic
5. Ensure responsive behavior matches designs

**Code Generation Guidelines:**
- Replace Tailwind utilities with project's design tokens
- Reuse existing components (buttons, cards, forms)
- Maintain glassmorphism visual style
- Follow existing animation patterns
- Respect responsive breakpoints and grid systems