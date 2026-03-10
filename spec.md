# AstroAvi

## Current State
- Homepage with spinning zodiac wheel, service sections (Love/Family/Career), Why AstroAvi stats, zodiac grid, expertise grid
- About page still references old brand name "OMSHASHTRI ASTROLOGY"
- No testimonials section
- No contact/enquiry form
- No structured data (schema.org) for SEO
- Good meta tags already in place

## Requested Changes (Diff)

### Add
- Testimonials section on homepage with 3-4 sample reviews
- Contact/enquiry form section on homepage (name, phone, problem type, submit opens WhatsApp)
- Schema.org JSON-LD structured data in index.html (Person/ProfessionalService type)

### Modify
- About page: update all references from "OMSHASHTRI ASTROLOGY" to "AstroAvi"

### Remove
- Nothing

## Implementation Plan
1. Update index.html to add JSON-LD structured data block
2. Update AboutPage.tsx: fix brand name and fallback text to AstroAvi-specific content
3. Add Testimonials section to HomePage.tsx with 4 sample reviews
4. Add Contact/Enquiry form section to HomePage.tsx
