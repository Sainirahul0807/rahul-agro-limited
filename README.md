# 🌾 Rahul Agro Limited — Cold Storage Web Platform

A full-stack, production-ready agri-tech web application for Rahul Agro Limited, a premium cold storage facility located at Sainipura, Taoru, Nuh District, Haryana.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/rahul-agro)

---

## 🏢 Company Details

| | |
|---|---|
| **Name** | Rahul Agro Limited |
| **Main Office** | Sainipura, Taoru, Nuh District, Haryana — 122105 |
| **Support Number** | +91 9728517836 |
| **Gate Timings** | 6:00 AM – 10:00 PM (All Days) |
| **Facilities** | 3 Cold Chambers · 15,000 MT Capacity · 100% DG Backup · IoT Monitoring |

---

## ✨ Features

- 🌡️ **Cold Storage Chamber Directory** — Filter by crop, temperature range, and stacking type
- 📊 **Storage Rent Calculator** — Instant cost estimates with insurance levy and advance token
- 📋 **Multi-Step Booking Flow** — 4-step form with animated confirmation modal and QR code
- 🏛️ **Government Procurement Portal** — FCI/HAFED/NAFED tender-based bulk space leasing with GSTIN verification
- 🤖 **Gemini AI Chatbot** — “Rahul Agro Sahayak” powered by Google Gemini
- 🌐 **3-Language Support** — English, हिंदी (Hindi), Haryanvi (Latin Script)
- 📱 **Fully Responsive** — Mobile-first with hamburger nav
- ⚡ **Neo-Brutalist Design** — Boxy cards, bold borders, mustard-gold accents

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Typography | Plus Jakarta Sans (Google Fonts) |
| AI | Google Gemini (`@google/genai`) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/rahul-agro.git
cd rahul-agro
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and add your Gemini API key:

```bash
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

> Get your free Gemini API key at: https://aistudio.google.com/app/apikey

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## ☁️ Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/rahul-agro)

### Manual Deployment

1. Push this repo to your GitHub account
2. Go to vercel.com → New Project → Import your repo
3. Add Environment Variable:
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key
4. Click Deploy — done! ✅

---

## 📁 Project Structure

```text
rahul-agro/
├── app/
│   ├── layout.tsx              # Root layout (Navbar, Footer, ChatWidget)
│   ├── page.tsx                # Home page
│   ├── chambers/page.tsx       # Chamber directory with filters
│   ├── calculator/page.tsx     # Rent calculator
│   ├── book/page.tsx           # 4-step booking flow
│   ├── govt-procurement/page.tsx # Government portal
│   ├── contact/page.tsx        # Contact & depot map
│   └── api/chat/route.ts       # Gemini AI chatbot API
├── components/
│   ├── layout/Navbar.tsx       # Sticky navbar with language switcher
│   ├── layout/Footer.tsx       # Footer with contact info
│   └── chatbot/ChatWidget.tsx  # Floating AI chatbot widget
├── contexts/
│   └── LanguageContext.tsx     # Language state provider
├── locales/
│   └── dictionary.ts           # EN / HI / HRY translations
├── lib/
│   └── constants.ts            # Crop data, chamber status, company info
├── .env.example                # Environment variable template
├── next.config.js              # Image domain config
├── tailwind.config.ts          # Custom design tokens
└── vercel.json                 # Vercel config
```

---

## 🌐 Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, category grid, featured chambers, features |
| `/chambers` | Chamber directory with sidebar filters |
| `/calculator` | Storage rent calculator |
| `/book` | 4-step booking form + confirmation modal |
| `/govt-procurement` | Government tender application portal |
| `/contact` | Depot map, contact info, message form |

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for the AI chatbot |

> The chatbot gracefully falls back with a phone number message if the key is missing.

---

## 📞 Contact

For cold storage inquiries: **+91 9728517836**  
Office: Sainipura, Taoru, Nuh District, Haryana

---

© 2025 Rahul Agro Limited. All rights reserved.

