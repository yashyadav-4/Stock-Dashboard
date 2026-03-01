# Stock Search Dashboard

A clean, responsive Stock Search Dashboard built with **React** and **Vite**, powered by the [Financial Modeling Prep](https://financialmodelingprep.com/) API.

---

## Features

| # | Requirement | Status |
|---|---|---|
| 1 | Search page to enter a stock symbol (AAPL, TSLA, etc.) | ✅ |
| 2 | Fetch stock data using API key | ✅ |
| 3 | Display: Company Name, Current Price, Day High, Day Low, Last Updated | ✅ |
| 4 | Frontend caching — same stock searched again does NOT call API | ✅ |
| 5 | Loading state while fetching | ✅ |
| 6 | Graceful API error handling | ✅ |

## Bonus Features

| Feature | Status |
|---|---|
| Debounced search input (800ms) | ✅ |
| Dual-layer caching (in-memory Map + sessionStorage) | ✅ |
| Stale request cancellation (only latest search result is used) | ✅ |
| Animated falling stars background | ✅ |
| Distinct error alerts per error type (404, 403, 429, network) | ✅ |
| Popular stock shortcuts (AAPL, TSLA, GOOGL, AMZN) | ✅ |

---

## Tech Stack

- **React 19** — Functional components with Hooks
- **Vite 7** — Fast dev server and build tool
- **Vanilla CSS** — Custom light-theme design system with CSS variables
- **Inter Font** — Google Fonts for clean typography

---

## Project Structure

```
Stock_Dashboard/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx        # Search input with placeholder
│   │   ├── StockCard.jsx        # Displays the 5 stock data points
│   │   ├── LoadingSpinner.jsx   # Animated loading spinner
│   │   ├── ErrorAlert.jsx       # Context-aware error alerts
│   │   └── FallingStars.jsx     # Animated background effect
│   ├── hooks/
│   │   ├── Debounce.js          # Custom debounce hook (800ms)
│   │   └── StockCaching.js      # Dual-layer caching hook
│   ├── services/
│   │   └── StockMarket.js       # FMP API integration
│   ├── App.jsx                  # Main application logic
│   ├── App.css                  # Component styles
│   ├── index.css                # Design tokens and global reset
│   └── main.jsx                 # React entry point
├── .env                         # API key (not committed)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- A **Financial Modeling Prep API key** — [Get one here](https://financialmodelingprep.com/developer/docs/)

### Step 1: Clone the repository
```bash
git clone <repository-url>
cd Stock_Dashboard
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Configure the API key
Open the `.env` file in the project root and add your API key:
```
VITE_API_KEY=your_api_key_here
```

### Step 4: Start the development server
```bash
npm run dev
```

The app will open at **http://localhost:5173**.

---

## How It Works

1. Type a stock ticker symbol (e.g., `AAPL`) in the search bar.
2. The input is **debounced** — the app waits 800ms after you stop typing before searching.
3. The app checks the **cache** first. If the stock was already searched, data loads instantly — no API call.
4. If not cached, the app fetches from the FMP API, caches the result, and displays the stock card.
5. Clicking a **popular search** pill (AAPL, TSLA, GOOGL, AMZN) auto-fills and searches that ticker.

---

## Caching Implementation

The app uses a **dual-layer caching** strategy:

- **Layer 1 — In-Memory Map**: Instant lookups using a `useRef(new Map())`. Fastest possible access.
- **Layer 2 — sessionStorage**: Persists data across component re-renders within the same browser session.

When a stock is searched:
1. Check in-memory Map → if found, return immediately (zero API calls)
2. Check sessionStorage → if found, restore to memory and return
3. If neither has it → call the API, then store in both layers

---

## Error Handling

| Error | Cause | Alert Style |
|---|---|---|
| Symbol Not Found | Invalid ticker symbol | 🔍 Yellow warning |
| Invalid API Key | Missing or wrong key in `.env` | 🔑 Red alert |
| Rate Limit | Exceeded 250 daily API calls | ⏱️ Orange alert |
| Network Error | No internet connection | 🌐 Blue alert |
| Unknown Error | Any other failure | ⚠️ Red alert |

---

## Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder, ready for deployment.
