# 📈 The Stock Search Dashboard

Hey there! Welcome to the **Stock Search Dashboard**. If you're looking for a beautifully designed, fast, and simple way to check real-time U.S. stock prices, you're in the right place. 

I built this project to show how we can combine sleek, modern UI design (think smooth animations and frosted glass effects) with real-time financial data. 

---

## ✨ Why You'll Love This

- **It's Fast:** We aggressively cache results. If you search the same stock twice, it loads instantly instead of re-fetching from the internet.
- **It Looks Great:** A custom dark theme that’s easy on the eyes, built without relying on heavy CSS frameworks. Just pure, clean design.
- **It's Bulletproof:** Whether your internet drops or you type a stock that doesn't exist, the app will politely tell you what went wrong.

---

## 🛠️ Let's Get You Set Up!

Don't worry if you're new to React or Node.js. Just follow these steps, and you'll be up and running in less than 5 minutes.

### Step 1: Open the Project
First, make sure you are inside the `Stock_Dashboard` folder in your terminal or command prompt. If you aren't sure, run this:
```bash
cd Stock_Dashboard
```

### Step 2: Install the Necessary Packages
The project needs a few tools to run (like React and Vite). We install them by running:
```bash
npm install
```
*(Grab a coffee, this might take a few seconds!)*

### Step 3: Get Your Free API Key
We use **Financial Modeling Prep** to get our stock data.
1. Head over to [financialmodelingprep.com](https://site.financialmodelingprep.com/) and sign up for a free account.
2. Once you log in, find your API key on the dashboard. Copy it.

### Step 4: Tell the App Your Key
The app needs your key to work, but we keep keys secret using a file called `.env`.
1. Look inside the `Stock_Dashboard` folder for a file named `.env`.
2. Open it, and replace the placeholder text with the key you just copied so it looks like this:
```env
VITE_API_KEY=your_copied_api_key_here
```
*(Make sure there are no spaces around the equals sign!)*

### Step 5: Start the App!
You're ready to go. Run this final command:
```bash
npm run dev
```
Your terminal will show you a local web address (usually `http://localhost:5173`). Ctrl+Click that link, or paste it into your browser. 

🎉 **Congratulations! Try typing "AAPL" to see Apple's current stock price.**

---

*Found a bug or have an idea to make it better? Feel free to poke around the code in the `src` folder. Happy coding!*
