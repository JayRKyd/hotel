# Localization Plan for Maswadeh Tourism & Travel

This document outlines a comprehensive plan to localize the entire Maswadeh Tourism & Travel application to Hebrew. The plan is organized by sections and components, with a checklist to track progress.

## Core Setup (Completed)

- [x] Set up i18next configuration in `src/i18n.ts`
- [x] Create Hebrew translation file in `src/locales/he/translation.json`
- [x] Create English translation file in `src/locales/en/translation.json`
- [x] Create LanguageSwitcher component in `src/components/LanguageSwitcher.tsx`

## Components

### Common Components

- [x] Header (`src/components/Header.tsx`)
- [x] Footer (`src/components/Footer.tsx`)
- [x] WhyChooseUs (`src/components/WhyChooseUs.tsx`)
- [x] Testimonials (`src/components/Testimonials.tsx`)
- [x] RecommendedPlaces (`src/components/RecommendedPlaces.tsx`)
- [ ] ContactForm (`src/components/ContactForm.tsx`)
- [ ] Newsletter (`src/components/Newsletter.tsx`)
- [ ] Breadcrumbs (`src/components/Breadcrumbs.tsx`)
- [ ] SearchBar (`src/components/SearchBar.tsx`)
- [ ] Pagination (`src/components/Pagination.tsx`)

### Form Components

- [x] QuoteForm (`src/components/QuoteForm.tsx`)
- [ ] BookingForm (`src/components/BookingForm.tsx`)
- [ ] FilterForm (`src/components/FilterForm.tsx`)

### Admin Components

- [x] AdminLayout (`src/components/admin/AdminLayout.tsx`)
- [x] HotelForm (`src/components/admin/HotelForm.tsx`)
- [x] MapPicker (`src/components/admin/MapPicker.tsx`)
- [x] TripForm (`src/components/admin/TripForm.tsx`)
- [ ] DestinationManager (`src/components/admin/DestinationManager.tsx`)
- [x] AddDestinationDialog (`src/pages/admin/components/AddDestinationDialog.tsx`)
- [x] AddRecommendedPlaceDialog (`src/pages/admin/components/AddRecommendedPlaceDialog.tsx`)
- [x] Dashboard (`src/pages/admin/components/Dashboard.tsx`)
- [x] Destinations (`src/pages/admin/components/Destinations.tsx`)
- [x] EditHotel (`src/pages/admin/components/EditHotel.tsx`)

## Pages

### Main Pages

- [x] Home (`src/pages/Index.tsx`)
- [x] About Us (`src/pages/AboutUs.tsx`)
- [x] Quote (`src/pages/Quote.tsx`)
- [x] Detailed Quote (`src/pages/DetailedQuote.tsx`)
- [ ] Contact (`src/pages/Contact.tsx`)
- [ ] Destinations (`src/pages/Destinations.tsx`)
- [ ] Destination Detail (`src/pages/DestinationDetail.tsx`)
- [ ] FAQ (`src/pages/FAQ.tsx`)
- [ ] Terms and Conditions (`src/pages/Terms.tsx`)
- [ ] Privacy Policy (`src/pages/Privacy.tsx`)

### Admin Pages

- [x] Hotels (`src/pages/admin/Hotels.tsx`)
- [x] NewHotel (`src/pages/admin/NewHotel.tsx`)
- [x] EditTrip (`src/pages/admin/EditTrip.tsx`)
- [x] Trips (`src/pages/admin/Trips.tsx`)
- [x] NewTrip (`src/pages/admin/NewTrip.tsx`)
- [x] RecommendedPlaces (`src/pages/admin/RecommendedPlaces.tsx`)

## Translation File Updates

- [x] Common translations (buttons, labels, etc.)
- [x] Home page translations
- [x] About page translations
- [x] Quote page translations
- [x] Admin section translations
- [x] Fix duplicate entries in translation.json
- [x] Add missing translations for MapPicker component
- [x] Add translations for admin pages (NewHotel, EditTrip, Trips)
- [x] Add translations for error messages and notifications
- [x] Add translations for form validation messages

## Testing

- [ ] Test language switching functionality
- [ ] Verify RTL layout in Hebrew mode
- [ ] Test all forms with Hebrew input
- [ ] Test admin functionality in Hebrew
- [ ] Verify all dates and numbers are properly formatted
- [ ] Test on different screen sizes and devices

## Implementation Strategy

1. **Component-by-Component Approach**: 
   - Update each component to use the useTranslation hook
   - Replace hardcoded text with translation keys
   - Update any direction-specific styling for RTL support

2. **Translation Key Organization**:
   - Group translations by component/page
   - Use consistent naming conventions (e.g., `componentName.section.element`)
   - Keep nesting to a maximum of 3 levels for maintainability

3. **RTL Styling Considerations**:
   - Use logical properties where possible (e.g., `margin-inline-start` instead of `margin-left`)
   - Apply RTL-specific styles conditionally based on the current language
   - Test layout in both LTR and RTL modes

4. **Quality Assurance**:
   - Verify all user-facing text is translated
   - Check for text overflow or layout issues in Hebrew
   - Ensure proper text alignment (right-aligned for Hebrew)
   - Validate form submissions with Hebrew input

## Next Steps

1. ✅ Fix duplicate entries in the translation file
2. Continue form components localization (BookingForm, FilterForm)
3. Continue admin components localization (TripForm, DestinationManager, etc.)
4. Complete remaining admin pages (NewTrip, RecommendedPlaces)
5. Add missing page translations (Contact, Destinations, FAQ, etc.)
6. Conduct comprehensive testing
