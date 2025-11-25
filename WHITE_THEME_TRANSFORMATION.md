# White Theme Transformation Plan

## Pages to Transform

1. ✅ About Us Page
2. ✅ Team Page  
3. ✅ Terms & Conditions Page
4. ✅ Disclaimer Page
5. ✅ Refund Policy Page
6. ✅ FAQ Page
7. ✅ Contact Us Page

## Design Specifications (from Newsletter Page)

### Colors:
- **Page Background**: `#E7F0FF` (light blue)
- **Hero Gradient**: `linear-gradient(135deg, #4a9eff 0%, #2d7dd2 100%)`
- **Hero Text**: Black (`#000`)
- **Body Text**: Dark gray/black
- **Content Background**: White cards/sections

### Hero Section Structure:
```css
.page-hero {
  height: 100vh;
  background: linear-gradient(135deg, #4a9eff 0%, #2d7dd2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
}

.page-hero::after {
  content: '';
  background: linear-gradient(to bottom, transparent 0%, transparent 40%, #E7F0FF 100%);
}

.hero-content h1 {
  color: #000;
  font-weight: 1000;
}
```

## Transformation Checklist

### For Each Page:

#### 1. Add Hero Section (if missing)
- [ ] Create hero container with gradient background
- [ ] Add page title in black
- [ ] Add subtitle/description
- [ ] Add gradient fade to white background

#### 2. Update Page Background
- [ ] Change from `#000` to `#E7F0FF`

#### 3. Update Text Colors
- [ ] Headings: Black
- [ ] Body text: Dark gray (`rgba(0, 0, 0, 0.8)`)
- [ ] Links: Blue accent

#### 4. Update Content Sections
- [ ] Add white background cards
- [ ] Update borders and shadows
- [ ] Adjust spacing for light theme

#### 5. Update Footer
- [ ] Ensure footer works with light theme
- [ ] May need dark footer or gradient transition

## Implementation Order

1. **Start with simplest**: Terms, Disclaimer, Refund Policy (text-heavy pages)
2. **Medium complexity**: FAQ Page, Contact Us
3. **Most complex**: About Us, Team Page (have existing styling)

## Notes

- Privacy Policy already has similar styling (check if it needs updates)
- Ensure all pages maintain consistent hero height and gradient
- Test mobile responsiveness after changes
- Verify text readability on all backgrounds
