# Queen Veloura — React/Vite

Converted from a single-file HTML site (~9,000 lines) to a fully componentised **React + Vite** project.

---

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build → dist/
npm run preview   # preview production build
```

---

## Project Structure

```
src/
├── main.jsx                 Vite entry point
├── App.jsx                  Root — global state, layout
├── App.css                  Global utilities (buttons, reveal, eyebrow)
├── index.css                CSS custom properties, body styles
├── data/siteData.js         All content (products, reviews, collections…)
└── components/
    ├── Cursor               Custom glowing gold cursor + ring
    ├── AnnouncementBar      Top banner strip
    ├── Navbar               Sticky nav, scroll-aware, mobile drawer
    ├── Hero                 Slideshow hero with CSS hair art
    ├── Marquee              Infinite scrolling ticker
    ├── Collections          Asymmetric 5-card grid
    ├── ProductCard          Flip card, variants, urgency, BIS trigger
    ├── ProductsSection      4-column products grid
    ├── CostCalculator       Live slider calculator
    ├── CompareSection       Feature comparison table
    ├── WhySection           Dark split-panel stats + features
    ├── VideoSection         Film section with animated play button
    ├── ReviewsSection       Review cards + rating breakdown
    ├── LoyaltySection       Tier cards (Pearl / Gold / Platinum)
    ├── Newsletter           Email capture with success state
    ├── Footer               Full footer, links, socials, payment icons
    ├── CartSidebar          Slide-out cart, free-shipping progress bar
    ├── AuthModal            Sign In / Join Free tabbed modal
    ├── WigQuiz              4-step Wig Finder Quiz → personalised result
    ├── BISModal             Back-In-Stock waitlist capture
    ├── AIStylist            Floating AI chatbot with keyword replies
    ├── StickyCTA            Scroll-triggered sticky add-to-bag bar
    ├── ExitPopup            Exit-intent 15% discount popup
    └── CookieBanner         GDPR consent + preferences overlay
```

---

## Design Tokens

```css
--pearl:      #FAFAF8   /* page background   */
--champagne:  #C9A96E   /* primary accent    */
--gold:       #B8974A   /* hover accent      */
--cocoa:      #1E1510   /* dark backgrounds  */
--warm-gray:  #8C7B70   /* secondary text    */
--silk:       #F7F0EA   /* card backgrounds  */
--lace:       #EDE0D4
```

## Fonts
- **Cormorant Garamond** — headlines, display
- **Jost** — body, UI labels

---

## Wiring Up Real Features

| Feature | What to replace |
|---|---|
| Products/Cart | `siteData.js` → Shopify Storefront API |
| Auth | `AuthModal` handlers → Clerk / Firebase |
| Newsletter/BIS | Form POSTs → Klaviyo / Mailchimp |
| AI Stylist | `getReply()` in `AIStylist.jsx` → real API |
