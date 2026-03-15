# Queen Veloura — Backend Integration Guide

This document maps every backend hookup point in the React frontend.
All API calls are ready — just uncomment and point to your server.

---

## 🏗 Recommended Stack
- **Backend:** Node.js + Express on Railway.app
- **Database:** PostgreSQL (Railway) or Supabase
- **Email:** SendGrid or Klaviyo
- **Payments:** Stripe + PayPal (SDK)
- **Auth:** Supabase Auth or Clerk
- **Membership/Loyalty:** Custom DB tables or Yotpo

---

## 1. Stripe & PayPal Payments
**File:** `src/components/CheckoutModal.jsx`  
**Function:** `handlePayment(method)`

```js
// Stripe
POST /api/checkout/stripe
Body: { customer: { firstName, lastName, email, phone, address, preferences }, items: [] }
Response: { url: 'https://checkout.stripe.com/...' }
→ window.location.href = url

// PayPal
POST /api/checkout/paypal
Body: { customer, items }
Response: { approvalUrl: 'https://paypal.com/...' }
→ window.location.href = approvalUrl
```

**Stripe Server Setup (Node.js):**
```js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
app.post('/api/checkout/stripe', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body.items.map(item => ({
      price_data: { currency: 'usd', product_data: { name: item.name },
        unit_amount: item.price * 100 },
      quantity: item.qty,
    })),
    mode: 'payment',
    success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SITE_URL}/`,
    customer_email: req.body.customer.email,
  });
  res.json({ url: session.url });
});
```

---

## 2. Back-In-Stock (BIS) Email Follow-Up
**File:** `src/components/BISModal.jsx`  
**Function:** `handleSubmit()`

```js
POST /api/bis/subscribe
Body: { productSku, productName, productPrice, firstName, lastName,
        email, phone, capSize, alertChannel, source, timestamp }

// When product restocks:
POST /api/bis/notify?sku=VH-BW-24
→ Emails all subscribers with 24h priority access link
```

**DB Schema:**
```sql
CREATE TABLE bis_subscribers (
  id SERIAL PRIMARY KEY,
  product_sku VARCHAR(50),
  product_name VARCHAR(255),
  customer_email VARCHAR(255),
  first_name VARCHAR(100),
  cap_size VARCHAR(10),
  alert_channel VARCHAR(10),
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. Customer Accounts & Auth
**File:** `src/components/AuthModal.jsx`

```js
// Sign In
POST /api/auth/signin
Body: { email, password }
Response: { token, user: { id, firstName, email, loyaltyPoints } }

// Register
POST /api/auth/register
Body: { firstName, email, password, newsletterOptIn }
Response: { token, user }

// Social Auth
GET /api/auth/google → OAuth redirect
GET /api/auth/facebook → OAuth redirect
```

**With Supabase:**
```js
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
await supabase.auth.signInWithPassword({ email, password })
await supabase.auth.signUp({ email, password, options: { data: { first_name } } })
```

---

## 4. Email List / Newsletter
**File:** `src/components/Newsletter.jsx` + `CheckoutModal.jsx`

```js
POST /api/email/subscribe
Body: { email, firstName, source: 'newsletter' | 'checkout' | 'bis' | 'exit_popup' }

// With Klaviyo:
POST https://a.klaviyo.com/api/profiles/
Headers: { Authorization: 'Klaviyo-API-Key YOUR_KEY' }
Body: { data: { type: 'profile', attributes: { email, first_name } } }
```

---

## 5. Loyalty / Membership (Beauty Circle)
**File:** `src/components/LoyaltySection.jsx` + `CheckoutModal.jsx`

```js
// Award points after purchase
POST /api/loyalty/credit
Body: { customerId, orderId, orderTotal, pointsAwarded }

// Get member status
GET /api/loyalty/status?email=user@example.com
Response: { tier: 'Gold', points: 847, nextTierAt: 1500 }
```

**DB Schema:**
```sql
CREATE TABLE loyalty_accounts (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  points INTEGER DEFAULT 0,
  tier VARCHAR(20) DEFAULT 'Pearl', -- Pearl, Gold, Platinum
  lifetime_spend DECIMAL(10,2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. Order Confirmation Email
**After payment webhook fires:**
```js
POST /api/email/order-confirmation
Body: { orderId, customerEmail, firstName, items, total, estimatedDelivery }

// With SendGrid:
const msg = {
  to: customerEmail,
  from: 'orders@queenveloura.shop',
  subject: `Your Queen Veloura order is confirmed! 👑`,
  templateId: 'd-YOUR_SENDGRID_TEMPLATE_ID',
  dynamicTemplateData: { firstName, orderId, items, total },
};
await sgMail.send(msg);
```

---

## 7. AI Stylist (Already Connected)
**File:** `src/components/AIStylist.jsx`  
Uses `https://api.anthropic.com/v1/messages` directly with system prompt.  
**Note:** For production, proxy through your backend to protect the API key:
```js
// Replace direct API call with:
POST /api/ai/chat
Body: { messages: conversationHistory }
Response: { reply: '...' }

// Your server then calls Anthropic with the secret key
```

---

## 8. Environment Variables
Create `.env` in the React root for local dev:
```
VITE_API_BASE_URL=https://api.queenveloura.shop
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_PAYPAL_CLIENT_ID=...
VITE_ANTHROPIC_API_KEY=...  ← move to backend in production
```

Usage in React:
```js
const apiBase = import.meta.env.VITE_API_BASE_URL;
fetch(`${apiBase}/api/checkout/stripe`, ...)
```

---

## ✅ What's Already Working (No Backend Needed)
- Full checkout form with validation + localStorage autofill
- BIS capture with localStorage dedup
- Cart state management
- Auth modal with validation + success states
- Cookie consent persistence
- Exit intent popup with session storage
- Loyalty tier display
- All info cards / policies

## 🔴 What Needs a Backend to Go Live
- Stripe / PayPal real payment processing
- BIS email notifications when products restock
- User account creation / login
- Order history
- Loyalty points tracking
- Newsletter email sends
- Order confirmation emails
