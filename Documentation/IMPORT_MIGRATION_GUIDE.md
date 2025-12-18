# Import Migration Guide - Project Restructure

This document lists all files that will need import statement changes when migrating to the new project structure. Each file is analyzed with specific line numbers and required changes.

## Overview

When restructuring from the current flat structure to the new organized structure, the following import paths will change:

### Current Structure → New Structure Mapping

```
src/components/ → src/components/layout/, src/components/common/, src/components/forms/, etc.
src/assets/ → src/assets/images/, src/assets/icons/
src/api/ → src/services/api/
src/components/contexts/ → src/context/
```

---

## Files Requiring Import Changes

### 1. **my-app/src/App.js**

**Current imports that need changes:**
- Line 7: `import Preloader from './components/Preloader';` 
  - **Change to:** `import Preloader from './components/common/Preloader';`
- Line 8: `import './components/PreloaderAnimations.css';`
  - **Change to:** `import './components/common/PreloaderAnimations.css';`
- Line 11: `import AdnanKhan from './assets/Adnan-Khan.webp';`
  - **Change to:** `import AdnanKhan from './assets/images/testimonials/Adnan-Khan.webp';`
- Line 12: `import AnkitMehta from './assets/Ankit-Mehta.webp';`
  - **Change to:** `import AnkitMehta from './assets/images/testimonials/Ankit-Mehta.webp';`
- Line 17: `const LandingPage = lazy(() => import('./components/LandingPage'));`
  - **Change to:** `const LandingPage = lazy(() => import('./pages/Home/Home'));`
- Line 18-26: All page imports from `./pages/` 
  - **Change to:** `./pages/[PageName]/[PageName]` (e.g., `./pages/About/About`)
- Line 27: `const WealthTracker = lazy(() => import('./components/WealthTracker'));`
  - **Change to:** `const WealthTracker = lazy(() => import('./pages/WealthTracker/WealthTracker'));`
- Line 28: `const Page = lazy(() => import('./components/Page'));`
  - **Change to:** `const Page = lazy(() => import('./components/layout/Page'));`
- Line 29: `const ShowQR = lazy(() => import('./components/ShowQR'));`
  - **Change to:** `const ShowQR = lazy(() => import('./components/common/ShowQR'));`
- Line 34-42: All component imports from `./components/`
  - **Change to:** `./components/forms/` or `./components/common/` based on component type

---

### 2. **my-app/src/components/LandingPage.js** → **src/pages/Home/Home.js**

**Current imports that need changes:**
- Line 7: `import Header from "./Header";`
  - **Change to:** `import Header from "../../components/layout/Header";`
- Line 8: `import Footer from "./Footer";`
  - **Change to:** `import Footer from "../../components/layout/Footer";`
- Line 9: `import ReviewMyPortfolioForm from "./ReviewMyportfolioForm";`
  - **Change to:** `import ReviewMyPortfolioForm from "../../components/forms/ReviewMyPortfolioForm";`
- Line 10: `import GlassSurface from "./GlassSurface";`
  - **Change to:** `import GlassSurface from "../../components/common/GlassSurface";`
- Line 15: `import { userDataContext } from "./contexts/userDataContext";`
  - **Change to:** `import { userDataContext } from "../../context/userDataContext";`

---

### 3. **my-app/src/components/Header.js** → **src/components/layout/Header.js**

**Current imports that need changes:**
- Line 4: `import GlassSurface from './GlassSurface';`
  - **Change to:** `import GlassSurface from '../common/GlassSurface';`
- Line 8: `import { userDataContext } from './contexts/userDataContext';`
  - **Change to:** `import { userDataContext } from '../../context/userDataContext';`

---

### 4. **my-app/src/components/Footer.js** → **src/components/layout/Footer.js**

**Current imports that need changes:**
- Line 4: `import { sendContactMessage } from "../api/flowApi";`
  - **Change to:** `import { sendContactMessage } from "../../services/api/flowApi";`

---

### 5. **my-app/src/components/WealthTracker.jsx** → **src/pages/WealthTracker/WealthTracker.jsx**

**Current imports that need changes:**
- Line 6: `import HeroSection from "./HeroSection";`
  - **Change to:** `import HeroSection from "../../components/sections/HeroSection";`
- Line 7: `import Section2 from "./Section2";`
  - **Change to:** `import Section2 from "../../components/sections/Section2";`
- Line 8: `import Navbar from "./Navbar";`
  - **Change to:** `import Navbar from "../../components/layout/Navbar";`
- Line 9: `import Section4 from "./Section4";`
  - **Change to:** `import Section4 from "../../components/sections/Section4";`
- Line 10: `import Section3 from "./Section3";`
  - **Change to:** `import Section3 from "../../components/sections/Section3";`
- Line 11: `import Accordion from "./Accordion";`
  - **Change to:** `import Accordion from "../../components/ui/Accordion";`
- Line 12: `import Footer from "./Footer";`
  - **Change to:** `import Footer from "../../components/layout/Footer";`
- Line 13: `import ReviewMyportfolioForm from "./ReviewMyportfolioForm";`
  - **Change to:** `import ReviewMyportfolioForm from "../../components/forms/ReviewMyPortfolioForm";`
- Line 14: `import GlassSurface from "./GlassSurface";`
  - **Change to:** `import GlassSurface from "../../components/common/GlassSurface";`
- Line 15: `import { showFormContext } from "./contexts/showFormContext";`
  - **Change to:** `import { showFormContext } from "../../context/showFormContext";`

---

### 6. **my-app/src/components/VerifyOtp.jsx** → **src/components/forms/VerifyOtp.jsx**

**Current imports that need changes:**
- Line 6: `import { verifyOtp } from "../api/flowApi";`
  - **Change to:** `import { verifyOtp } from "../../services/api/flowApi";`
- Line 7: `import { verifyOtp_reviewPortfolio } from "../api/flowApi";`
  - **Change to:** `import { verifyOtp_reviewPortfolio } from "../../services/api/flowApi";`
- Line 9: `import { sendOtp } from "../api/flowApi";`
  - **Change to:** `import { sendOtp } from "../../services/api/flowApi";`
- Line 10: `import { sendOtp_reviewPortfolio } from "../api/flowApi";`
  - **Change to:** `import { sendOtp_reviewPortfolio } from "../../services/api/flowApi";`
- Line 13: `import { userDataContext } from "./contexts/userDataContext";`
  - **Change to:** `import { userDataContext } from "../../context/userDataContext";`

---

### 7. **my-app/src/components/ShowQR.jsx** → **src/components/common/ShowQR.jsx**

**Current imports that need changes:**
- Line 4: `import QrImg from "../assets/QrOverlay.png";`
  - **Change to:** `import QrImg from "../../assets/images/ui/QrOverlay.png";`

---

### 8. **my-app/src/components/Section4.jsx** → **src/components/sections/Section4.jsx**

**Current imports that need changes:**
- Line 5: `import trio from "../assets/pm1.png";`
  - **Change to:** `import trio from "../../assets/images/app-screenshots/pm1.png";`

---

### 9. **my-app/src/components/Section2.jsx** → **src/components/sections/Section2.jsx**

**Current imports that need changes:**
- Line 5: `import slider1 from "../assets/holdingsScreen.png";`
  - **Change to:** `import slider1 from "../../assets/images/app-screenshots/holdingsScreen.png";`
- Line 6: `import slider2 from "../assets/ExitSuggestionsScreen.png";`
  - **Change to:** `import slider2 from "../../assets/images/app-screenshots/ExitSuggestionsScreen.png";`
- Line 7: `import slider3 from "../assets/AssetAllocationScreen.png";`
  - **Change to:** `import slider3 from "../../assets/images/app-screenshots/AssetAllocationScreen.png";`
- Line 8: `import slider4 from "../assets/MutualFundsScreen.png";`
  - **Change to:** `import slider4 from "../../assets/images/app-screenshots/MutualFundsScreen.png";`
- Line 10: `import { showFormContext } from "./contexts/showFormContext";`
  - **Change to:** `import { showFormContext } from "../../context/showFormContext";`

---

### 10. **my-app/src/components/ScheduleComponent.jsx** → **src/components/forms/ScheduleComponent.jsx**

**Current imports that need changes:**
- Line 6: `import { checkSlot } from "../api/flowApi";`
  - **Change to:** `import { checkSlot } from "../../services/api/flowApi";`
- Line 7: `import { checkSlot_reviewPortfolio } from "../api/flowApi";`
  - **Change to:** `import { checkSlot_reviewPortfolio } from "../../services/api/flowApi";`
- Line 10: `import { userDataContext } from "./contexts/userDataContext";`
  - **Change to:** `import { userDataContext } from "../../context/userDataContext";`

---

### 11. **my-app/src/components/NameDetails.jsx** → **src/components/forms/NameDetails.jsx**

**Current imports that need changes:**
- Line 9: `import { startFlow } from "../api/flowApi";`
  - **Change to:** `import { startFlow } from "../../services/api/flowApi";`
- Line 10: `import { startReviewPortfolio } from "../api/flowApi";`
  - **Change to:** `import { startReviewPortfolio } from "../../services/api/flowApi";`
- Line 13: `import { userDataContext } from "./contexts/userDataContext";`
  - **Change to:** `import { userDataContext } from "../../context/userDataContext";`

---

### 12. **my-app/src/components/InvestmentDetails.jsx** → **src/components/forms/InvestmentDetails.jsx**

**Current imports that need changes:**
- Line 4: `import { selectInvestment } from "../api/flowApi";`
  - **Change to:** `import { selectInvestment } from "../../services/api/flowApi";`
- Line 5: `import { setInvestment } from "../api/flowApi";`
  - **Change to:** `import { setInvestment } from "../../services/api/flowApi";`

---

### 13. **my-app/src/components/Information.jsx** → **src/components/common/Information.jsx**

**Current imports that need changes:**
- Line 3: `import Abhishek from "../assets/abhishek.webp";`
  - **Change to:** `import Abhishek from "../../assets/images/team/abhishek.webp";`
- Line 4: `import groupPhoto from "../assets/pm2.png";`
  - **Change to:** `import groupPhoto from "../../assets/images/app-screenshots/pm2.png";`
- Line 7: `import { userDataContext } from "./contexts/userDataContext";`
  - **Change to:** `import { userDataContext } from "../../context/userDataContext";`

---

### 14. **my-app/src/components/HeroSection.jsx** → **src/components/sections/HeroSection.jsx**

**Current imports that need changes:**
- Line 6: `import mobileimg from "../assets/MainScreen.png";`
  - **Change to:** `import mobileimg from "../../assets/images/app-screenshots/MainScreen.png";`
- Line 8: `import { showFormContext } from "./contexts/showFormContext";`
  - **Change to:** `import { showFormContext } from "../../context/showFormContext";`

---

### 15. **my-app/src/components/EmailDetails.jsx** → **src/components/forms/EmailDetails.jsx**

**Current imports that need changes:**
- Line 9: `import { createBooking } from "../api/flowApi";`
  - **Change to:** `import { createBooking } from "../../services/api/flowApi";`
- Line 10: `import { submit_reviewPortfolio } from "../api/flowApi";`
  - **Change to:** `import { submit_reviewPortfolio } from "../../services/api/flowApi";`

---

### 16. **my-app/src/components/ContactDetails.jsx** → **src/components/forms/ContactDetails.jsx**

**Current imports that need changes:**
- Line 6: `import { sendOtp } from "../api/flowApi";`
  - **Change to:** `import { sendOtp } from "../../services/api/flowApi";`
- Line 7: `import { sendOtp_reviewPortfolio } from "../api/flowApi";`
  - **Change to:** `import { sendOtp_reviewPortfolio } from "../../services/api/flowApi";`
- Line 10: `import { userDataContext } from "./contexts/userDataContext";`
  - **Change to:** `import { userDataContext } from "../../context/userDataContext";`

---

### 17. **my-app/src/components/BookingList.jsx** → **src/components/common/BookingList.jsx**

**Current imports that need changes:**
- Line 2: `import { getBookings } from "../api/flowApi";`
  - **Change to:** `import { getBookings } from "../../services/api/flowApi";`

---

## Page Files (src/pages/)

### 18. **All Newsletter Pages** (NewsletterRBI.js, NewsletterGRCTC.js, etc.)

**Pattern of changes needed:**
- Line 3: `import Header from '../components/Header';`
  - **Change to:** `import Header from '../../components/layout/Header';`
- Asset imports like `import RateCutChart from "../assets/RateCutChart.png";`
  - **Change to:** `import RateCutChart from "../../assets/images/charts/RateCutChart.png";`

### 19. **All Main Pages** (AboutUs.js, ContactUs.js, TeamPage.js, etc.)

**Pattern of changes needed:**
- Line 4-7: `import Header from '../components/Header';`
  - **Change to:** `import Header from '../../components/layout/Header';`
- Footer imports: `import AboutUsFooter from './AboutUsFooter';`
  - **Change to:** `import AboutUsFooter from '../../components/layout/AboutUsFooter';`
- Component imports: `import TeamCard from '../components/TeamCard';`
  - **Change to:** `import TeamCard from '../../components/ui/TeamCard';`

### 20. **EventsPage.js**

**Current imports that need changes:**
- Line 3: `import Header from '../components/Header';`
  - **Change to:** `import Header from '../../components/layout/Header';`
- Line 6: `import {getEvents} from "../api/flowApi";`
  - **Change to:** `import {getEvents} from "../../services/api/flowApi";`

---

## Context Files Migration

### 21. **src/components/contexts/** → **src/context/**

All context files need to be moved and their imports updated:
- `userDataContext.js` → `src/context/userDataContext.js`
- `showFormContext.js` → `src/context/showFormContext.js`

---

## API Files Migration

### 22. **src/api/flowApi.js** → **src/services/api/flowApi.js**

No internal changes needed, but all files importing from this need path updates as shown above.

---

## CSS and Asset Files

### 23. **CSS Module Imports**

All CSS module imports will need path updates when components move:
- `import styles from "./ComponentName.module.css";` 
- Path updates depend on new component location

### 24. **Public Asset References**

Public assets (in `/public/`) don't need import changes, but organization will improve:
- Current: `/expert1.mp4`, `/client1.webp`
- New: `/assets/videos/experts/expert1.mp4`, `/assets/images/clients/client1.webp`

---

## Migration Strategy

### Phase 1: Create New Folder Structure
1. Create all new folders as per the structure
2. Don't move files yet

### Phase 2: Move Files Systematically
1. Move API files first (`src/api/` → `src/services/api/`)
2. Move context files (`src/components/contexts/` → `src/context/`)
3. Move components by category (layout, forms, sections, etc.)
4. Move pages last

### Phase 3: Update Imports
1. Update imports in moved files
2. Test each category after moving
3. Update any remaining references

### Phase 4: Update Public Assets (Optional)
1. Reorganize public folder structure
2. Update public asset references in HTML/CSS

---

## Testing Checklist

After migration, verify:
- [ ] All pages load without import errors
- [ ] All components render correctly
- [ ] All API calls work
- [ ] All assets load properly
- [ ] All routes function correctly
- [ ] Build process completes successfully

---

## Notes

- This migration can be done incrementally
- Test thoroughly after each phase
- Keep backup of current working version
- Consider using find-and-replace tools for bulk import updates
- Some bundled assets in `src/assets/` may need to be moved to `public/assets/` based on usage patterns